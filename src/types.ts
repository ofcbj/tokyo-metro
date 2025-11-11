// Station type
export interface Station {
  name: string;
  lat: number;
  lng: number;
  transfer?: boolean;
}

// Line type
export interface Line {
  id: string;
  nameKo: string;
  nameJp: string;
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
  color: string;
  isError?: boolean;
}

// Click effect
export interface ClickEffect {
  x: number;
  y: number;
}

// Filter operator type
export type FilterOperator = 'all' | 'minor' | string;

// Google Maps related types
export interface MapBounds {
  north: number;
  south: number;
  east: number;
  west: number;
}
