import { LineData, Line, Station } from '../types';
import { animDurationMs } from './mapUtils';

// window.google 전역 선언은 useGoogleMap.tsx 에 있다 (전역 augmentation은 프로젝트 전체에 적용됨)

interface CanvasOverlayOptions {
  lineData: LineData;
  selectedLines: string[];
  animationSpeed: number;
  isGameMode: boolean;
  onStationClick: (name: string, lat: number, lng: number, isTransfer?: boolean, groupId?: number) => void;
  onStationRightClick: (name: string, lat: number, lng: number) => void;
}

interface AnimatedLine {
  lineId: string;
  line: Line;
  progress: number; // 0-1
  startTime: number;
  duration: number;
  originIndex: number; // 애니메이션이 퍼져나가는 기점 역 인덱스 (클릭한 역)
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
  private tooltipEl: HTMLDivElement | null = null; // 역 호버 툴팁 (화면 위치에 맞춰 위/아래 뒤집힘)
  private overlay: google.maps.OverlayView;

  // 렌더링 최적화용 상태
  private renderScheduled = false; // rAF 쓰로틀 플래그
  private allLinesCache: Line[]; // lineData를 flat()한 결과 캐시
  private selectedSet: Set<string>; // selectedLines 조회용 Set
  private groupToLines = new Map<number, Set<string>>(); // groupId → 그 환승그룹을 지나는 노선 id들
  private mapListeners: google.maps.MapsEventListener[] = []; // onRemove에서 정리
  private offsetX = 0; // 캔버스 배치 오프셋 (div 픽셀 → 캔버스 로컬 좌표 변환)
  private offsetY = 0;
  private lastClick: { lat: number; lng: number; time: number } | null = null; // 애니메이션 기점(클릭 위치)
  private followLineId: string | null = null; // 게임 중 선두 역을 따라갈 노선
  private lastFrontIndex = -1; // 마지막으로 카메라를 옮긴 선두 역 인덱스

  // 줌 단계별 LOD(Level of Detail) 임계값
  private static readonly ZOOM_ALL_STATIONS = 12; // 이 줌 이상: 모든 역 표시
  private static readonly ZOOM_TRANSFER_ONLY = 10; // 이 줌 이상: 환승역만 표시 (미만: 역 원 생략)

  constructor(options: CanvasOverlayOptions) {
    this.options = options;
    this.allLinesCache = Object.values(options.lineData).flat();
    this.selectedSet = new Set(options.selectedLines);
    this.buildGroupIndex();

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
    if (this.tooltipEl && this.tooltipEl.parentNode) {
      this.tooltipEl.parentNode.removeChild(this.tooltipEl);
    }
    this.tooltipEl = null;
    this.stopAnimation();
  }

  // groupId → 노선 id 집합 인덱스 (게임 모드 '소진된 환승역' 판정용)
  private buildGroupIndex() {
    const map = new Map<number, Set<string>>();
    for (const line of this.allLinesCache) {
      for (const s of line.stations) {
        if (s.groupId == null) continue;
        let set = map.get(s.groupId);
        if (!set) { set = new Set(); map.set(s.groupId, set); }
        set.add(line.id);
      }
    }
    this.groupToLines = map;
  }

  // 이 환승 그룹의 모든 노선이 이미 선택(게임에선 발견)되었는가
  private isGroupExhausted(groupId: number): boolean {
    const lines = this.groupToLines.get(groupId);
    if (!lines) return false;
    for (const id of lines) if (!this.selectedSet.has(id)) return false;
    return true;
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

    // 게임 종반 힌트: 남은 노선이 10개 이하면 미발견 노선이 남은 환승역을
    // 줌 레벨(LOD)과 무관하게 항상 표시해 마지막 노선 찾기를 돕는다.
    const remaining = this.options.isGameMode
      ? this.allLinesCache.length - selectedLineObjects.length
      : 0;
    const hintActive = this.options.isGameMode && remaining > 0 && remaining <= 10;

    // 역 마커 그리기 (저줌에서는 생략 → 클릭 캐시도 비움. 단, 힌트 역은 저줌에도 그린다)
    this.stationCache.clear();
    if (stationMode !== 'none' || hintActive) {
      selectedLineObjects.forEach(line => {
        const stationMarkers = this.drawStations(line, projection, bounds, stationMode, hintActive);
        this.stationCache.set(line.id, stationMarkers);
      });
    }

    // 호버된 역 하이라이트
    if (this.hoveredStation) {
      this.drawStationHighlight(this.hoveredStation);
    }
  }

  // 애니메이션 진행에 따라 드러난 폴리라인 경로(거리 기준, 선두는 보간)와
  // 완전히 드러난 역 인덱스 범위 [lo, hi]를 반환한다.
  // 인덱스가 아닌 누적 거리로 진행해 역 간격과 무관하게 펜이 일정 속도로 움직인다.
  private revealedPath(
    line: Line,
    animatedLine?: AnimatedLine
  ): { points: { lat: number; lng: number }[]; lo: number; hi: number } {
    const st = line.stations;
    const n = st.length;
    if (!animatedLine || animatedLine.progress >= 1) {
      return { points: st.map(s => ({ lat: s.lat, lng: s.lng })), lo: 0, hi: n - 1 };
    }
    // 누적 거리
    const cum = new Array(n);
    cum[0] = 0;
    for (let i = 1; i < n; i++) {
      const dLat = st[i].lat - st[i - 1].lat;
      const dLng = st[i].lng - st[i - 1].lng;
      cum[i] = cum[i - 1] + Math.hypot(dLat, dLng);
    }
    const o = animatedLine.originIndex;
    const oD = cum[o];
    const maxReach = Math.max(oD - cum[0], cum[n - 1] - oD) || 1;
    const revealed = maxReach * animatedLine.progress;
    const backT = Math.max(cum[0], oD - revealed);
    const fwdT = Math.min(cum[n - 1], oD + revealed);

    let lo = o, hi = o;
    while (lo > 0 && cum[lo - 1] >= backT) lo--;
    while (hi < n - 1 && cum[hi + 1] <= fwdT) hi++;

    const lerp = (a: Station, b: Station, t: number) => ({
      lat: a.lat + (b.lat - a.lat) * t,
      lng: a.lng + (b.lng - a.lng) * t,
    });
    const points: { lat: number; lng: number }[] = [];
    // 뒤쪽 보간 선두
    if (lo > 0 && backT < cum[lo]) {
      const seg = cum[lo] - cum[lo - 1] || 1;
      points.push(lerp(st[lo - 1], st[lo], (backT - cum[lo - 1]) / seg));
    }
    for (let i = lo; i <= hi; i++) points.push({ lat: st[i].lat, lng: st[i].lng });
    // 앞쪽 보간 선두
    if (hi < n - 1 && fwdT > cum[hi]) {
      const seg = cum[hi + 1] - cum[hi] || 1;
      points.push(lerp(st[hi], st[hi + 1], (fwdT - cum[hi]) / seg));
    }
    return { points, lo, hi };
  }

  private drawLine(line: Line, projection: google.maps.MapCanvasProjection, bounds: google.maps.LatLngBounds, step: number) {
    const animatedLine = this.animatedLines.get(line.id);

    // 뷰포트에 보이는 역이 하나라도 있는지 (첫 발견 시 중단하는 컬링)
    const hasVisible = line.stations.some(station =>
      bounds.contains({ lat: station.lat, lng: station.lng })
    );
    if (!hasVisible) return;

    // 애니메이션: 기점에서 거리 기준으로 퍼져나가는 경로(선두 보간 포함)
    const { points: pathPoints } = this.revealedPath(line, animatedLine);

    if (pathPoints.length < 2) return;

    // 애니메이션 중인 노선은 더 굵게 + 글로우로 강조
    const animating = !!animatedLine && animatedLine.progress < 1;

    // 폴리라인 그리기
    this.ctx.strokeStyle = line.color;
    this.ctx.lineWidth = animating ? 7 : 4;
    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.ctx.globalAlpha = animating ? 1.0 : 0.8;
    if (animating) {
      this.ctx.shadowColor = line.color;
      this.ctx.shadowBlur = 14;
    }

    this.ctx.beginPath();
    const lastIdx = pathPoints.length - 1;
    let started = false;
    for (let idx = 0; idx <= lastIdx; idx++) {
      // 저줌에서는 step 간격으로 정점을 솎되, 마지막 점은 항상 포함해 선이 끊기지 않게 한다
      if (step > 1 && idx % step !== 0 && idx !== lastIdx) continue;

      const pt = pathPoints[idx];
      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(pt.lat, pt.lng)
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
    this.ctx.shadowBlur = 0; // 이후 그리기에 글로우 번지지 않게 리셋
    this.ctx.globalAlpha = 1.0;
  }

  private drawStations(line: Line, projection: google.maps.MapCanvasProjection, bounds: google.maps.LatLngBounds, stationMode: 'all' | 'transfer' | 'none', hintActive = false): StationMarker[] {
    const animatedLine = this.animatedLines.get(line.id);
    const { lo, hi } = this.revealedPath(line, animatedLine);
    const total = line.stations.length;
    const animating = !!animatedLine && animatedLine.progress < 1;
    // 애니메이션 중 확장 링 위상 (매 프레임 갱신되어 원이 커졌다 사라짐)
    const ripplePhase = animating ? (Date.now() % 750) / 750 : 0;

    const markers: StationMarker[] = [];

    for (let i = lo; i <= hi; i++) {
      const station = line.stations[i];
      // 게임 종반 힌트 역: 미발견 노선이 남은 환승역은 LOD와 무관하게 항상 그린다
      const isHint = hintActive && station.transfer && station.groupId != null && !this.isGroupExhausted(station.groupId);
      if (!isHint) {
        // LOD: 저줌에서는 역 생략, 중간 줌에서는 환승역만 그린다
        if (stationMode === 'none') continue;
        if (stationMode === 'transfer' && !station.transfer) continue;
      }
      // 뷰포트 체크 (가상화)
      if (!bounds.contains({ lat: station.lat, lng: station.lng })) continue;

      const point = projection.fromLatLngToDivPixel(
        new google.maps.LatLng(station.lat, station.lng)
      );
      if (!point) continue;
      const x = point.x - this.offsetX;
      const y = point.y - this.offsetY;

      // 역 마커 그리기 (애니메이션 중엔 크게)
      const baseRadius = station.transfer ? 8 : 5;
      const radius = animating ? baseRadius + 3 : baseRadius;
      const fillColor = station.transfer ? '#FFFFFF' : line.color;

      // 퍼져나가는 선두 역에 확장 링(ripple) 연출
      const isFront = animating && ((i === lo && lo > 0) || (i === hi && hi < total - 1) || lo === hi);
      if (isFront) {
        this.ctx.globalAlpha = (1 - ripplePhase) * 0.9;
        this.ctx.strokeStyle = line.color;
        this.ctx.lineWidth = 2.5;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + ripplePhase * 18, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.globalAlpha = 1.0;
      }

      // 게임 종반 힌트 역: 금색 글로우 링으로 강조 (축소 상태에서도 눈에 띄게)
      if (isHint) {
        this.ctx.shadowColor = '#FFB300';
        this.ctx.shadowBlur = 12;
        this.ctx.strokeStyle = '#FFB300';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius + 4, 0, Math.PI * 2);
        this.ctx.stroke();
        this.ctx.shadowBlur = 0;
      }

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

      // 연결된 모든 노선이 표시(게임에선 발견)된 환승역은 X 표시(소진됨 → 헛클릭 방지)
      if (station.transfer && station.groupId != null && this.isGroupExhausted(station.groupId)) {
        const d = radius * 0.55;
        this.ctx.strokeStyle = '#555555';
        this.ctx.lineWidth = 2;
        this.ctx.lineCap = 'round';
        this.ctx.beginPath();
        this.ctx.moveTo(x - d, y - d);
        this.ctx.lineTo(x + d, y + d);
        this.ctx.moveTo(x - d, y + d);
        this.ctx.lineTo(x + d, y - d);
        this.ctx.stroke();
      }

      markers.push({ station, line, screenX: x, screenY: y });
    }

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
    const station = p ? this.findStationAt(p.x, p.y) : null;

    // 터치 기기는 hover가 없으므로 탭(클릭) 시에도 정보 팝업을 띄운다.
    if (station) {
      // 애니메이션 기점으로 사용 (누른 역에서 노선이 퍼져나가게)
      this.lastClick = { lat: station.station.lat, lng: station.station.lng, time: Date.now() };
      this.hoveredStation = station;
      this.showTooltip(station);
      this.requestDraw();
      this.options.onStationClick(
        station.station.name,
        station.station.lat,
        station.station.lng,
        station.station.transfer,
        station.station.groupId
      );
    } else {
      // 빈 곳 탭 → 팝업 닫기
      this.hoveredStation = null;
      this.hideTooltip();
      this.requestDraw();
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

      // 툴팁 표시/숨김
      if (station) {
        this.showTooltip(station);
      } else {
        this.hideTooltip();
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

        if (distance <= radius + 9) { // 클릭/탭 허용 범위 (터치 대응 위해 여유)
          return marker;
        }
      }
    }
    return null;
  }

  // 역 툴팁 HTML 내용 생성
  private buildStationHtml(marker: StationMarker): string {
    if (marker.station.transfer) {
      const lineIds = this.findLinesForStationByMarker(marker);
      const visibleStationLines = lineIds
        .filter(id => this.selectedSet.has(id))
        .map(id => this.allLinesCache.find(l => l.id === id))
        .filter((l): l is Line => l !== undefined);

      const linesHtml = visibleStationLines
        .map(l => `<span style="color: ${l.color}; font-size: 18px; line-height: 1.8; font-weight: 500;">● ${l.nameJp} / ${l.nameKo}</span>`)
        .join('<br/>');

      return `<div style="padding: 0px 4px 2px 4px;">
          <strong style="font-size: 19px;">${marker.station.name}</strong><br/>
          <span style="color: #666; font-size: 13px;">乗換駅</span><br/>
          ${linesHtml}
        </div>`;
    }
    return `<div style="padding: 0px 4px 2px 4px;">
          <strong style="font-size: 19px;">${marker.station.name}</strong><br/>
          <span style="color: ${marker.line.color}; font-size: 18px; line-height: 1.8; font-weight: 500;">● ${marker.line.nameJp} / ${marker.line.nameKo}</span>
        </div>`;
  }

  private ensureTooltip(): HTMLDivElement | null {
    if (this.tooltipEl) return this.tooltipEl;
    const map = this.overlay.getMap() as google.maps.Map | null | undefined;
    if (!map) return null;
    const mapDiv = map.getDiv() as HTMLElement;
    // 절대배치 툴팁이 지도 컨테이너를 기준으로 놓이도록 보장
    if (getComputedStyle(mapDiv).position === 'static') mapDiv.style.position = 'relative';
    const el = document.createElement('div');
    // 터치 기기: 탭으로 뜨는 팝업이라 내부 스크롤 필요 → pointer-events:auto + 스크롤.
    // 데스크톱: hover 팝업이라 pointer-events:none 유지(마우스가 지나가도 깜빡이지 않게).
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    el.style.cssText =
      'position:absolute; z-index:1000; background:#fff;' +
      'border-radius:8px; box-shadow:0 2px 10px rgba(0,0,0,0.35); padding:6px 10px;' +
      'max-width:400px; font-family:sans-serif; display:none;' +
      (coarse
        ? 'pointer-events:auto; max-height:60vh; overflow-y:auto; -webkit-overflow-scrolling:touch; overscroll-behavior:contain;'
        : 'pointer-events:none;');
    mapDiv.appendChild(el);
    this.tooltipEl = el;
    return el;
  }

  // 역의 화면(컨테이너) 좌표에 맞춰 툴팁을 배치한다.
  // 위쪽 공간이 부족하면 아래로 뒤집고, 좌우로도 화면 안에 들어오도록 클램프한다.
  private showTooltip(marker: StationMarker) {
    const projection = this.overlay.getProjection();
    const map = this.overlay.getMap() as google.maps.Map | null | undefined;
    if (!projection || !map) return;
    const el = this.ensureTooltip();
    if (!el) return;

    el.innerHTML = this.buildStationHtml(marker);
    el.style.display = 'block';

    const pt = projection.fromLatLngToContainerPixel(
      new google.maps.LatLng(marker.station.lat, marker.station.lng)
    );
    if (!pt) { this.hideTooltip(); return; }

    const mapDiv = map.getDiv();
    const mapW = mapDiv.offsetWidth;
    const mapH = mapDiv.offsetHeight;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    const GAP = 14;   // 역 마커와의 간격
    const EDGE = 6;   // 화면 가장자리 여백

    // 세로: 기본은 역 위. 위가 잘리면 아래로 뒤집고, 그래도 넘치면 화면 안으로 클램프.
    let top = pt.y - GAP - h;
    if (top < EDGE) top = pt.y + GAP;
    if (top + h > mapH - EDGE) top = Math.max(EDGE, mapH - EDGE - h);

    // 가로: 역 중앙 정렬 후 좌우 클램프.
    let left = pt.x - w / 2;
    left = Math.max(EDGE, Math.min(left, mapW - w - EDGE));

    el.style.left = `${Math.round(left)}px`;
    el.style.top = `${Math.round(top)}px`;
  }

  private hideTooltip() {
    if (this.tooltipEl) this.tooltipEl.style.display = 'none';
  }

  private findLinesForStationByMarker(marker: StationMarker): string[] {
    const allLines = Object.values(this.options.lineData).flat();
    const lineIds: string[] = [];
    const groupId = marker.station.groupId;

    for (const line of allLines) {
      for (const station of line.stations) {
        // 같은 환승 그룹(groupId)이면 좌표가 달라도 하나로 묶는다.
        // groupId가 없는 역(드묾)은 이름+초근접 좌표로 폴백.
        const match = groupId !== undefined
          ? station.groupId === groupId
          : (station.name === marker.station.name &&
             Math.abs(station.lat - marker.station.lat) < 0.0001 &&
             Math.abs(station.lng - marker.station.lng) < 0.0001);
        if (match) {
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

      // 게임 모드: 따라가는 노선의 선두 역으로 카메라 이동
      this.followFrontStation();

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
    const line = this.allLinesCache.find(l => l.id === lineId);
    if (!line) return;

    // 노선 길이에 비례(클램프)한 애니메이션 길이 — 짧은 노선은 짧게, 긴 노선은 펜이 안 튀게
    const baseDuration = animDurationMs(line, this.options.animationSpeed || 1.0);

    this.animatedLines.set(lineId, {
      lineId,
      line,
      progress: 0,
      startTime: Date.now(),
      duration: baseDuration,
      originIndex: this.computeOriginIndex(line),
    });

    // 게임 모드: 가장 최근 발견한 노선의 선두 역을 카메라가 따라간다
    if (this.options.isGameMode) {
      this.followLineId = lineId;
      this.lastFrontIndex = -1;
    }

    this.startAnimation();
  }

  // 최근 클릭한 역이 이 노선 위에 있으면 그 역 인덱스를, 아니면 0(시작역)을 기점으로.
  private computeOriginIndex(line: Line): number {
    const c = this.lastClick;
    // 게임은 노선을 순차로(노선당 수 초~십수 초) 발견하므로 창을 아주 넉넉히 둔다.
    // 정확성은 아래 거리 조건이 담당: 클릭 위치가 이 노선 위에 있을 때만 기점으로 사용.
    if (!c || Date.now() - c.time > 300000) return 0;
    let best = 0, bestD = Infinity;
    line.stations.forEach((s, i) => {
      const d = Math.abs(s.lat - c.lat) + Math.abs(s.lng - c.lng);
      if (d < bestD) { bestD = d; best = i; }
    });
    return bestD < 0.02 ? best : 0; // 클릭 위치가 노선에서 멀면 시작역부터
  }

  // 게임 중: 따라가는 노선의 선두(퍼지는 끝) 역으로 카메라를 부드럽게 이동
  private followFrontStation() {
    if (!this.options.isGameMode || !this.followLineId) return;
    const al = this.animatedLines.get(this.followLineId);
    if (!al || al.progress >= 1) { this.followLineId = null; this.lastFrontIndex = -1; return; }
    const line = al.line;
    const total = line.stations.length;
    const { lo, hi } = this.revealedPath(line, al);
    // 아직 확장 중인 선두: 앞쪽(hi) 우선, 없으면 뒤쪽(lo)
    const front = hi < total - 1 ? hi : (lo > 0 ? lo : -1);
    if (front < 0 || front === this.lastFrontIndex) return; // 새 역이 드러났을 때만 이동
    this.lastFrontIndex = front;
    const s = line.stations[front];
    const map = this.overlay.getMap() as google.maps.Map | null | undefined;
    if (!map) return;
    // 역 원이 보이는 최소 줌 미만이면 확대(그 이상이면 그대로 둔다)
    if ((map.getZoom() ?? 0) < CanvasMetroOverlay.ZOOM_ALL_STATIONS) {
      map.setZoom(CanvasMetroOverlay.ZOOM_ALL_STATIONS);
    }
    map.panTo({ lat: s.lat, lng: s.lng });
  }

  // 외부에서 호출: 노선 제거
  public removeLine(lineId: string) {
    this.animatedLines.delete(lineId);
    this.requestDraw();
  }

  // 외부에서 호출: 옵션 업데이트
  public updateOptions(newOptions: Partial<CanvasOverlayOptions>) {
    // 병합 전의 이전 선택 목록을 기준으로 diff 한다.
    // (animatedLines는 애니메이션이 끝나면 비워지므로 "이미 표시된 노선"의 기준으로 쓸 수 없다.
    //  이전 선택과 비교해야 새로 추가된 노선만 애니메이션하고 나머지는 건드리지 않는다.)
    const prevSelected = this.options.selectedLines || [];
    this.options = { ...this.options, ...newOptions };

    // lineData가 바뀌면 flat 캐시 + groupId 인덱스 갱신
    if (newOptions.lineData) {
      this.allLinesCache = Object.values(newOptions.lineData).flat();
      this.buildGroupIndex();
    }

    // 선택된 노선 변경 시 Set 캐시 갱신 + 새로 추가된 노선만 애니메이션
    if (newOptions.selectedLines) {
      this.selectedSet = new Set(newOptions.selectedLines);
      const prevSet = new Set(prevSelected);

      // 이전에 없던 노선만 새로 애니메이션
      newOptions.selectedLines.forEach(lineId => {
        if (!prevSet.has(lineId)) this.addLine(lineId);
      });

      // 이전엔 있었지만 지금 빠진 노선 제거
      prevSet.forEach(lineId => {
        if (!this.selectedSet.has(lineId)) this.removeLine(lineId);
      });
    }

    this.requestDraw();
  }

  // 지도에 오버레이 추가/제거
  public setMap(map: google.maps.Map | null) {
    this.overlay.setMap(map);
  }
}
