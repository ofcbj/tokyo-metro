
import { LineData, Line, Station } from '../types';

// Google Maps API는 전역 window 객체에서 로드됨
declare global {
  interface Window {
    google: typeof google;
  }
}

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

  constructor(options: CanvasOverlayOptions) {
    this.options = options;

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

    // 마우스 이벤트 처리를 위해 별도 레이어 추가
    this.setupEventHandling();
  }

  private setupEventHandling() {
    // 이벤트 처리용 투명 레이어 (나중에 구현)
    this.canvas.style.pointerEvents = 'auto';

    this.canvas.addEventListener('click', this.handleClick.bind(this));
    this.canvas.addEventListener('contextmenu', this.handleRightClick.bind(this));
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this));
  }

  onAdd() {
    const panes = this.overlay.getPanes();
    if (panes) {
      panes.overlayLayer.appendChild(this.canvas);
    }

    // 지도 이벤트 리스너 추가 (줌, 팬 등)
    const map = this.overlay.getMap();
    if (map) {
      (map as google.maps.Map).addListener('zoom_changed', () => this.draw());
      (map as google.maps.Map).addListener('bounds_changed', () => this.draw());
      (map as google.maps.Map).addListener('center_changed', () => this.draw());
    }

    this.startAnimation();
  }

  onRemove() {
    if (this.canvas.parentNode) {
      this.canvas.parentNode.removeChild(this.canvas);
    }
    this.stopAnimation();
  }

  draw() {
    const projection = this.overlay.getProjection();
    const map = this.overlay.getMap();
    if (!projection || !map) return;

    // Canvas 크기와 위치를 지도에 맞춤
    const mapDiv = (map as google.maps.Map).getDiv();
    const width = mapDiv.offsetWidth;
    const height = mapDiv.offsetHeight;

    // Canvas 위치를 지도 좌측 상단에 맞춤
    this.canvas.style.left = '0px';
    this.canvas.style.top = '0px';

    if (this.canvas.width !== width || this.canvas.height !== height) {
      this.canvas.width = width;
      this.canvas.height = height;
      this.canvas.style.width = `${width}px`;
      this.canvas.style.height = `${height}px`;
    }

    // Canvas 클리어
    this.ctx.clearRect(0, 0, width, height);

    // 뷰포트 bounds 가져오기 (가상화용)
    const bounds = (map as google.maps.Map).getBounds();
    if (!bounds) return;

    // 선택된 노선만 렌더링
    const allLines = Object.values(this.options.lineData).flat();
    const selectedLineObjects = allLines.filter(line =>
      this.options.selectedLines.includes(line.id)
    );

    selectedLineObjects.forEach(line => {
      this.drawLine(line, projection, bounds);
    });

    // 역 마커 그리기
    this.stationCache.clear();
    selectedLineObjects.forEach(line => {
      const stationMarkers = this.drawStations(line, projection, bounds);
      this.stationCache.set(line.id, stationMarkers);
    });

    // 호버된 역 하이라이트
    if (this.hoveredStation) {
      this.drawStationHighlight(this.hoveredStation);
    }
  }

  private drawLine(line: Line, projection: google.maps.MapCanvasProjection, bounds: google.maps.LatLngBounds) {
    const animatedLine = this.animatedLines.get(line.id);

    // 뷰포트에 보이는 역만 필터링
    const visibleStations = line.stations.filter(station =>
      bounds.contains({ lat: station.lat, lng: station.lng })
    );

    if (visibleStations.length === 0) return;

    // 애니메이션 진행도 계산
    let progress = 1.0;
    if (animatedLine && animatedLine.progress < 1.0) {
      const elapsed = Date.now() - animatedLine.startTime;
      progress = Math.min(elapsed / animatedLine.duration, 1.0);
      animatedLine.progress = progress;
    }

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
    stationsToDraw.forEach((station, idx) => {
      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(station.lat, station.lng)
      );
      if (!point) return;

      if (idx === 0) {
        this.ctx.moveTo(point.x, point.y);
      } else {
        this.ctx.lineTo(point.x, point.y);
      }
    });
    this.ctx.stroke();
    this.ctx.globalAlpha = 1.0;
  }

  private drawStations(line: Line, projection: google.maps.MapCanvasProjection, bounds: google.maps.LatLngBounds): StationMarker[] {
    const animatedLine = this.animatedLines.get(line.id);
    const progress = animatedLine?.progress ?? 1.0;
    const stationsToDrawCount = Math.ceil(line.stations.length * progress);
    const stationsToDraw = line.stations.slice(0, stationsToDrawCount);

    const markers: StationMarker[] = [];

    stationsToDraw.forEach(station => {
      // 뷰포트 체크 (가상화)
      if (!bounds.contains({ lat: station.lat, lng: station.lng })) {
        return;
      }

      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(station.lat, station.lng)
      );
      if (!point) return;

      // 역 마커 그리기
      const radius = station.transfer ? 8 : 5;
      const fillColor = station.transfer ? '#FFFFFF' : line.color;

      // 외곽선
      this.ctx.strokeStyle = line.color;
      this.ctx.lineWidth = station.transfer ? 3 : 2;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      this.ctx.stroke();

      // 내부 채우기
      this.ctx.fillStyle = fillColor;
      this.ctx.beginPath();
      this.ctx.arc(point.x, point.y, radius, 0, Math.PI * 2);
      this.ctx.fill();

      markers.push({
        station,
        line,
        screenX: point.x,
        screenY: point.y
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

  private handleClick(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const station = this.findStationAt(x, y);
    console.log('Click at', x, y, 'found station:', station?.station.name);
    if (station) {
      this.options.onStationClick(
        station.station.name,
        station.station.lat,
        station.station.lng,
        station.station.transfer
      );
    }
  }

  private handleRightClick(event: MouseEvent) {
    event.preventDefault();
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const station = this.findStationAt(x, y);
    if (station) {
      this.options.onStationRightClick(
        station.station.name,
        station.station.lat,
        station.station.lng
      );
    }
  }

  private handleMouseMove(event: MouseEvent) {
    const rect = this.canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const station = this.findStationAt(x, y);

    if (station !== this.hoveredStation) {
      this.hoveredStation = station;
      this.canvas.style.cursor = station ? 'pointer' : 'default';

      // InfoWindow 표시/숨김
      if (station) {
        this.showInfoWindow(station, event);
      } else {
        this.hideInfoWindow();
      }

      this.draw(); // 리렌더
    }
  }

  private findStationAt(x: number, y: number): StationMarker | null {
    console.log('Finding station at', x, y, 'cache size:', this.stationCache.size);

    // 모든 캐시된 역 중에서 클릭 위치와 가까운 것 찾기
    for (const [lineId, markers] of this.stationCache.entries()) {
      for (const marker of markers) {
        const radius = marker.station.transfer ? 8 : 5;
        const distance = Math.sqrt(
          Math.pow(x - marker.screenX, 2) +
          Math.pow(y - marker.screenY, 2)
        );

        if (distance <= radius + 5) { // 클릭 허용 범위 약간 확대
          console.log('Found station:', marker.station.name, 'distance:', distance);
          return marker;
        }
      }
    }
    return null;
  }

  private showInfoWindow(marker: StationMarker, event: MouseEvent) {
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
      // 애니메이션 중인 라인이 있으면 계속 그리기
      let hasActiveAnimation = false;
      this.animatedLines.forEach(animLine => {
        if (animLine.progress < 1.0) {
          hasActiveAnimation = true;
        }
      });

      if (hasActiveAnimation) {
        this.draw();
        this.animationFrameId = requestAnimationFrame(animate);
      } else {
        this.animationFrameId = null;
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
    this.draw();
  }

  // 외부에서 호출: 옵션 업데이트
  public updateOptions(newOptions: Partial<CanvasOverlayOptions>) {
    this.options = { ...this.options, ...newOptions };

    // 선택된 노선 변경 시 애니메이션 초기화
    if (newOptions.selectedLines) {
      const currentAnimatedIds = new Set(this.animatedLines.keys());
      const newSelectedIds = new Set(newOptions.selectedLines);

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

    this.draw();
  }

  // 지도에 오버레이 추가/제거
  public setMap(map: google.maps.Map | null) {
    this.overlay.setMap(map);
  }
}
