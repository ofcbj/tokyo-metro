import { LineData, Line, Station } from '../types';

// window.google 전역 선언은 useGoogleMap.tsx 에 있다 (전역 augmentation은 프로젝트 전체에 적용됨)

interface CanvasOverlayOptions {
  lineData: LineData;
  selectedLines: string[];
  animationSpeed: number;
  isGameMode: boolean;
  onStationClick: (name: string, lat: number, lng: number, isTransfer?: boolean) => void;
  onStationRightClick: (name: string, lat: number, lng: number) => void;
}

interface AnimatedLine {
  lineId: string;
  line: Line;
  progress: number; // 0-1
  startTime: number;
  duration: number;
}

interface StationMarker {
  station: Station;
  line: Line;
  screenX: number;
  screenY: number;
}

export class CanvasMetroOverlay {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private options: CanvasOverlayOptions;
  private animatedLines: Map<string, AnimatedLine> = new Map();
  private animationFrameId: number | null = null;
  private hoveredStation: StationMarker | null = null;
  private stationCache: Map<string, StationMarker[]> = new Map(); // lineId -> stations
  private infoWindow: google.maps.InfoWindow | null = null;
  private infoWindowTimeoutId: number | null = null;
  private overlay: google.maps.OverlayView;

  // 렌더링 최적화용 상태
  private renderScheduled = false; // rAF 쓰로틀 플래그
  private allLinesCache: Line[]; // lineData를 flat()한 결과 캐시
  private selectedSet: Set<string>; // selectedLines 조회용 Set
  private mapListeners: google.maps.MapsEventListener[] = []; // onRemove에서 정리
  private offsetX = 0; // 캔버스 배치 오프셋 (div 픽셀 → 캔버스 로컬 좌표 변환)
  private offsetY = 0;

  // 줌 단계별 LOD(Level of Detail) 임계값
  private static readonly ZOOM_ALL_STATIONS = 12; // 이 줌 이상: 모든 역 표시
  private static readonly ZOOM_TRANSFER_ONLY = 10; // 이 줌 이상: 환승역만 표시 (미만: 역 원 생략)

  constructor(options: CanvasOverlayOptions) {
    this.options = options;
    this.allLinesCache = Object.values(options.lineData).flat();
    this.selectedSet = new Set(options.selectedLines);

    // Google Maps OverlayView 생성
    const OverlayViewClass = window.google.maps.OverlayView;
    this.overlay = new OverlayViewClass();

    // OverlayView 메서드 바인딩
    this.overlay.onAdd = this.onAdd.bind(this);
    this.overlay.onRemove = this.onRemove.bind(this);
    this.overlay.draw = this.draw.bind(this);

    // Canvas 생성
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'absolute';
    this.canvas.style.pointerEvents = 'none'; // 클릭 이벤트를 지도로 전달

    const ctx = this.canvas.getContext('2d', {
      alpha: true,
      willReadFrequently: false // 성능 힌트
    });
    if (!ctx) throw new Error('Canvas context not available');
    this.ctx = ctx;
    // 캔버스는 이벤트를 가로채지 않는다(pointerEvents: none). 클릭/호버는 지도 이벤트로 처리해
    // 지도 드래그/줌 제스처를 막지 않도록 한다.
  }

  onAdd() {
    const panes = this.overlay.getPanes();
    if (panes) {
      panes.overlayLayer.appendChild(this.canvas);
    }

    // 지도 이벤트 리스너 추가 (줌/팬 + 클릭/호버 히트테스트)
    const map = this.overlay.getMap() as google.maps.Map | null | undefined;
    if (map) {
      // pan/zoom 중 이벤트가 초당 수십 번 발생하므로 rAF로 프레임당 1회만 그린다
      this.mapListeners.push(map.addListener('zoom_changed', () => this.requestDraw()));
      this.mapListeners.push(map.addListener('bounds_changed', () => this.requestDraw()));
      this.mapListeners.push(map.addListener('center_changed', () => this.requestDraw()));
      // 히트테스트는 지도 마우스 이벤트의 latLng를 픽셀로 투영해 수행한다
      this.mapListeners.push(map.addListener('click', (e: google.maps.MapMouseEvent) => this.handleMapClick(e)));
      this.mapListeners.push(map.addListener('rightclick', (e: google.maps.MapMouseEvent) => this.handleMapRightClick(e)));
      this.mapListeners.push(map.addListener('mousemove', (e: google.maps.MapMouseEvent) => this.handleMapMouseMove(e)));
    }

    this.startAnimation();
  }

  // latLng를 캔버스 div 픽셀로 투영 (그리기와 동일한 좌표계)
  private latLngToPixel(latLng: google.maps.LatLng | null | undefined): { x: number; y: number } | null {
    const projection = this.overlay.getProjection();
    if (!projection || !latLng) return null;
    const p = projection.fromLatLngToDivPixel(latLng);
    return p ? { x: p.x - this.offsetX, y: p.y - this.offsetY } : null;
  }

  // draw() 호출을 requestAnimationFrame으로 병합 (연속 pan/zoom 이벤트를 프레임당 1회로 제한)
  private requestDraw() {
    if (this.renderScheduled) return;
    this.renderScheduled = true;
    requestAnimationFrame(() => {
      this.renderScheduled = false;
      this.draw();
    });
  }

  // 줌 레벨에 따른 렌더링 상세도 결정
  private getLOD(zoom: number): { stationMode: 'all' | 'transfer' | 'none'; step: number } {
    let stationMode: 'all' | 'transfer' | 'none';
    if (zoom >= CanvasMetroOverlay.ZOOM_ALL_STATIONS) stationMode = 'all';
    else if (zoom >= CanvasMetroOverlay.ZOOM_TRANSFER_ONLY) stationMode = 'transfer';
    else stationMode = 'none';

    // 저줌에서는 폴리라인 정점을 솎아내 투영 비용을 줄인다 (저줌에선 인접 역이 같은 픽셀로 뭉침)
    let step = 1;
    if (zoom < 7) step = 4;
    else if (zoom < 9) step = 3;
    else if (zoom < 11) step = 2;

    return { stationMode, step };
  }

  onRemove() {
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.mapListeners.forEach(l => l.remove());
    this.mapListeners = [];
    this.hideInfoWindow();
    this.stopAnimation();
  }

  draw() {
    const projection = this.overlay.getProjection();
    const map = this.overlay.getMap();
    if (!projection || !map) return;

    // 뷰포트 bounds 가져오기 (가상화 + 캔버스 배치용)
    const bounds = (map as google.maps.Map).getBounds();
    if (!bounds) return;

    // 캔버스를 현재 지도 경계에 맞춰 배치한다.
    // OverlayView의 div 픽셀 좌표계는 원점이 뷰포트 좌상단이 아니므로,
    // 경계의 NE/SW를 투영해 캔버스 위치·크기를 잡고 그리기 좌표를 offset으로 보정한다.
    const ne = projection.fromLatLngToDivPixel(bounds.getNorthEast());
    const sw = projection.fromLatLngToDivPixel(bounds.getSouthWest());
    if (!ne || !sw) return;

    const PAD = 128; // 화면 밖으로 이어지는 선/역이 가장자리에서 잘리지 않도록 여유
    const left = Math.min(sw.x, ne.x) - PAD;
    const top = Math.min(ne.y, sw.y) - PAD;
    const width = Math.round(Math.abs(ne.x - sw.x) + PAD * 2);
    const height = Math.round(Math.abs(sw.y - ne.y) + PAD * 2);
    this.offsetX = left;
    this.offsetY = top;

    this.canvas.style.left = `${left}px`;
    this.canvas.style.top = `${top}px`;
    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
    }

    // Canvas 클리어
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // 줌 레벨에 따른 렌더링 상세도
    const zoom = (map as google.maps.Map).getZoom() ?? 12;
    const { stationMode, step } = this.getLOD(zoom);

    // 선택된 노선만 렌더링 (캐시된 flat 배열 + Set 조회)
    const selectedLineObjects = this.allLinesCache.filter(line =>
      this.selectedSet.has(line.id)
    );

    selectedLineObjects.forEach(line => {
      this.drawLine(line, projection, bounds, step);
    });

    // 역 마커 그리기 (저줌에서는 생략 → 클릭 캐시도 비움)
    this.stationCache.clear();
    if (stationMode !== 'none') {
      selectedLineObjects.forEach(line => {
        const stationMarkers = this.drawStations(line, projection, bounds, stationMode);
        this.stationCache.set(line.id, stationMarkers);
      });
    }

    // 호버된 역 하이라이트
    if (this.hoveredStation) {
      this.drawStationHighlight(this.hoveredStation);
    }
  }

  private drawLine(line: Line, projection: google.maps.MapCanvasProjection, bounds: google.maps.LatLngBounds, step: number) {
    const animatedLine = this.animatedLines.get(line.id);

    // 뷰포트에 보이는 역이 하나라도 있는지 (첫 발견 시 중단하는 컬링)
    const hasVisible = line.stations.some(station =>
      bounds.contains({ lat: station.lat, lng: station.lng })
    );
    if (!hasVisible) return;

    // 애니메이션 진행도 (갱신은 animate 루프가 담당, 여기선 읽기만)
    const progress = animatedLine ? animatedLine.progress : 1.0;

    // 그릴 역의 개수 (애니메이션)
    const stationsToDrawCount = Math.ceil(line.stations.length * progress);
    const stationsToDraw = line.stations.slice(0, stationsToDrawCount);

    if (stationsToDraw.length < 2) return;

    // 폴리라인 그리기
    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = 4;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.globalAlpha = 0.8;

    this.ctx.beginPath();
    const lastIdx = stationsToDraw.length - 1;
    let started = false;
    for (let idx = 0; idx <= lastIdx; idx++) {
      // 저줌에서는 step 간격으로 정점을 솎되, 마지막 역은 항상 포함해 선이 끊기지 않게 한다
      if (step > 1 && idx % step !== 0 && idx !== lastIdx) continue;

      const station = stationsToDraw[idx];
      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(station.lat, station.lng)
      );
      if (!point) continue;
      const x = point.x - this.offsetX;
      const y = point.y - this.offsetY;

      if (!started) {
        this.ctx.moveTo(x, y);
        started = true;
      } else {
        this.ctx.lineTo(x, y);
      }
    }
    this.ctx.stroke();
    this.ctx.globalAlpha = 1.0;
  }

  private drawStations(line: Line, projection: google.maps.MapCanvasProjection, bounds: google.maps.LatLngBounds, stationMode: 'all' | 'transfer'): StationMarker[] {
    const animatedLine = this.animatedLines.get(line.id);
    const progress = animatedLine?.progress ?? 1.0;
    const stationsToDrawCount = Math.ceil(line.stations.length * progress);
    const stationsToDraw = line.stations.slice(0, stationsToDrawCount);

    const markers: StationMarker[] = [];

    stationsToDraw.forEach(station => {
      // LOD: 중간 줌에서는 환승역만 그린다
      if (stationMode === 'transfer' && !station.transfer) {
        return;
      }

      // 뷰포트 체크 (가상화)
      if (!bounds.contains({ lat: station.lat, lng: station.lng })) {
        return;
      }

      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(station.lat, station.lng)
      );
      if (!point) return;
      const x = point.x - this.offsetX;
      const y = point.y - this.offsetY;

      // 역 마커 그리기
      const radius = station.transfer ? 8 : 5;
      const fillColor = station.transfer ? '#FFFFFF' : line.color;

      // 외곽선
      this.ctx.strokeStyle = line.color;
      this.ctx.lineWidth = station.transfer ? 3 : 2;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.stroke();

      // 내부 채우기
      this.ctx.fillStyle = fillColor;
      this.ctx.beginPath();
      this.ctx.arc(x, y, radius, 0, Math.PI * 2);
      this.ctx.fill();

      markers.push({
        station,
        line,
        screenX: x,
        screenY: y
      });
    });

    return markers;
  }

  private drawStationHighlight(marker: StationMarker) {
    const radius = marker.station.transfer ? 12 : 9;

    // 하이라이트 원
    this.ctx.strokeStyle = '#FFD700';
    this.ctx.lineWidth = 3;
    this.ctx.beginPath();
    this.ctx.arc(marker.screenX, marker.screenY, radius, 0, Math.PI * 2);
    this.ctx.stroke();
  }

  private handleMapClick(e: google.maps.MapMouseEvent) {
    const p = this.latLngToPixel(e.latLng);
    if (!p) return;
    const station = this.findStationAt(p.x, p.y);
    if (station) {
      this.options.onStationClick(
        station.station.name,
        station.station.lat,
        station.station.lng,
        station.station.transfer
      );
    }
  }

  private handleMapRightClick(e: google.maps.MapMouseEvent) {
    const p = this.latLngToPixel(e.latLng);
    if (!p) return;
    const station = this.findStationAt(p.x, p.y);
    if (station) {
      this.options.onStationRightClick(
        station.station.name,
        station.station.lat,
        station.station.lng
      );
    }
  }

  private handleMapMouseMove(e: google.maps.MapMouseEvent) {
    const p = this.latLngToPixel(e.latLng);
    const station = p ? this.findStationAt(p.x, p.y) : null;

    if (station !== this.hoveredStation) {
      this.hoveredStation = station;
      const map = this.overlay.getMap() as google.maps.Map | null | undefined;
      if (map) map.getDiv().style.cursor = station ? 'pointer' : '';

      // InfoWindow 표시/숨김
      if (station) {
        this.showInfoWindow(station);
      } else {
        this.hideInfoWindow();
      }

      this.requestDraw(); // 리렌더
    }
  }

  private findStationAt(x: number, y: number): StationMarker | null {
    // 모든 캐시된 역 중에서 클릭 위치와 가까운 것 찾기
    for (const [, markers] of this.stationCache.entries()) {
      for (const marker of markers) {
        const radius = marker.station.transfer ? 8 : 5;
        const distance = Math.sqrt(
          Math.pow(x - marker.screenX, 2) +
          Math.pow(y - marker.screenY, 2)
        );

        if (distance <= radius + 5) { // 클릭 허용 범위 약간 확대
          return marker;
        }
      }
    }
    return null;
  }

  private showInfoWindow(marker: StationMarker) {
    // 기존 타임아웃 취소
    if (this.infoWindowTimeoutId) {
      clearTimeout(this.infoWindowTimeoutId);
    }

    // 약간의 지연 후 표시 (너무 빠르게 깜빡이는 것 방지)
    this.infoWindowTimeoutId = window.setTimeout(() => {
      const map = this.overlay.getMap();
      const projection = this.overlay.getProjection();
      if (!map || !projection) return;

      // 기존 InfoWindow 제거
      if (this.infoWindow) {
        this.infoWindow.close();
      }

      // InfoWindow 내용 생성
      let infoContent: string;
      if (marker.station.transfer) {
        const lineIds = this.findLinesForStationByMarker(marker);
        const allLinesArray = Object.values(this.options.lineData).flat();
        const visibleStationLines = lineIds
          .filter(id => this.options.selectedLines.includes(id))
          .map(id => allLinesArray.find(l => l.id === id))
          .filter((l): l is Line => l !== undefined);

        const linesHtml = visibleStationLines
          .map(l => `<span style="color: ${l.color}; font-size: 18px; line-height: 1.8; font-weight: 500;">● ${l.nameJp} / ${l.nameKo}</span>`)
          .join('<br/>');

        infoContent = `<div style="padding: 0px 4px 2px 4px;">
          <strong style="font-size: 19px;">${marker.station.name}</strong><br/>
          <span style="color: #666; font-size: 13px;">乗換駅</span><br/>
          ${linesHtml}
        </div>`;
      } else {
        infoContent = `<div style="padding: 0px 4px 2px 4px;">
          <strong style="font-size: 19px;">${marker.station.name}</strong><br/>
          <span style="color: ${marker.line.color}; font-size: 18px; line-height: 1.8; font-weight: 500;">● ${marker.line.nameJp} / ${marker.line.nameKo}</span>
        </div>`;
      }

      // InfoWindow 생성 및 표시
      this.infoWindow = new google.maps.InfoWindow({
        content: infoContent,
        position: { lat: marker.station.lat, lng: marker.station.lng },
        disableAutoPan: true
      });
      this.infoWindow.open(map);
    }, 100); // 100ms 지연
  }

  private hideInfoWindow() {
    if (this.infoWindowTimeoutId) {
      clearTimeout(this.infoWindowTimeoutId);
      this.infoWindowTimeoutId = null;
    }

    if (this.infoWindow) {
      this.infoWindow.close();
      this.infoWindow = null;
    }
  }

  private findLinesForStationByMarker(marker: StationMarker): string[] {
    const allLines = Object.values(this.options.lineData).flat();
    const lineIds: string[] = [];

    for (const line of allLines) {
      for (const station of line.stations) {
        if (
          station.name === marker.station.name &&
          Math.abs(station.lat - marker.station.lat) < 0.0001 &&
          Math.abs(station.lng - marker.station.lng) < 0.0001
        ) {
          lineIds.push(line.id);
          break;
        }
      }
    }

    return lineIds;
  }

  private startAnimation() {
    const animate = () => {
      // 진행도를 시간 기반으로 갱신 (화면 밖 노선이라 그리지 않아도 정상 완료되게 한다)
      const now = Date.now();
      let hasActiveAnimation = false;
      this.animatedLines.forEach(animLine => {
        animLine.progress = Math.min((now - animLine.startTime) / animLine.duration, 1.0);
        if (animLine.progress < 1.0) hasActiveAnimation = true;
      });
      // 완료된 애니메이션 정리 (이후엔 progress 기본값 1.0으로 전체 표시)
      this.animatedLines.forEach((animLine, id) => {
        if (animLine.progress >= 1.0) this.animatedLines.delete(id);
      });

      if (hasActiveAnimation) {
        this.draw();
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
        this.draw(); // 마지막 완료 프레임을 한 번 그려 최종 상태 확정
      }
    };

    if (!this.animationFrameId) {
      this.animationFrameId = requestAnimationFrame(animate);
    }
  }

  private stopAnimation() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  // 외부에서 호출: 새로운 노선 추가
  public addLine(lineId: string) {
    const allLines = Object.values(this.options.lineData).flat();
    const line = allLines.find(l => l.id === lineId);
    if (!line) return;

    const baseDuration = 1500 / (this.options.isGameMode ? this.options.animationSpeed : 1.0);

    this.animatedLines.set(lineId, {
      lineId,
      line,
      progress: 0,
      startTime: Date.now(),
      duration: baseDuration
    });

    this.startAnimation();
  }

  // 외부에서 호출: 노선 제거
  public removeLine(lineId: string) {
    this.animatedLines.delete(lineId);
    this.requestDraw();
  }

  // 외부에서 호출: 옵션 업데이트
  public updateOptions(newOptions: Partial<CanvasOverlayOptions>) {
    this.options = { ...this.options, ...newOptions };

    // lineData가 바뀌면 flat 캐시 갱신
    if (newOptions.lineData) {
      this.allLinesCache = Object.values(newOptions.lineData).flat();
    }

    // 선택된 노선 변경 시 Set 캐시 갱신 + 애니메이션 초기화
    if (newOptions.selectedLines) {
      this.selectedSet = new Set(newOptions.selectedLines);
      const currentAnimatedIds = new Set(this.animatedLines.keys());
      const newSelectedIds = this.selectedSet;

      // 새로 추가된 노선
      newSelectedIds.forEach(lineId => {
        if (!currentAnimatedIds.has(lineId)) {
          this.addLine(lineId);
        }
      });

      // 제거된 노선
      currentAnimatedIds.forEach(lineId => {
        if (!newSelectedIds.has(lineId)) {
          this.removeLine(lineId);
        }
      });
    }

    this.requestDraw();
  }

  // 지도에 오버레이 추가/제거
  public setMap(map: google.maps.Map | null) {
    this.overlay.setMap(map);
  }
}
