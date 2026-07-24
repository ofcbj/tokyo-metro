// Station type
export interface Station {
  name: string;
  /** 역명 카나 읽기 (TTS/후리가나용 — 난독 역명 오독 방지, 예: 御徒町 → おかちまち) */
  nameKana?: string;
  lat: number;
  lng: number;
  transfer?: boolean;
  // 환승 그룹 id (ekidata station_g_cd). 같은 물리 역/환승 그룹을 공유하는 역끼리 동일 값.
  // 팝업에서 한 환승역의 모든 노선을 묶는 데 사용. transfer 역에만 부여됨.
  groupId?: number;
}

// Line type
export interface Line {
  id: string;
  nameKo: string;
  nameJp: string;
  /** 노선명 카나 읽기 (TTS용 — 한자 오독 방지, 예: 山手線 → ヤマノテセン) */
  nameKana?: string;
  color: string;
  stations: Station[];
}

// Operator data structure
export type OperatorData = Record<string, Line[]>;

// Line data (all operators combined)
export type LineData = Record<string, Line[]>;

// Game log entry
export interface GameLogEntry {
  timestamp: Date;
  message: string;
  lineColor: string;
}

// Game result
export interface GameResult {
  type: 'win' | 'lose';
  discoveredCount: number;
  totalCount: number;
  remainingClicks: number;
}

// Toast message
export interface ToastMessage {
  text: string;
  subText?: string; // 보조 텍스트(한국어명 등). 괄호로 합치지 않고 별도 표시.
  color: string;
  isError?: boolean;
}

// Click effect
export interface ClickEffect {
  x: number;
  y: number;
}

// Google Maps related types
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
