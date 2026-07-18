import { LineData, Line } from '../types';

// 노선 전체 호 길이(위·경도 유클리드 근사)
export const lineArcLength = (line: Line): number => {
  const st = line.stations;
  let d = 0;
  for (let i = 1; i < st.length; i++) {
    d += Math.hypot(st[i].lat - st[i - 1].lat, st[i].lng - st[i - 1].lng);
  }
  return d;
};

// 애니메이션 길이(ms):
//  - 중간 길이 노선은 고정 시간(D_BASE ≈ 예전 느낌)을 유지
//  - 아주 짧은 노선(펜이 너무 느려짐)은 펜 속도 하한(S_MIN)으로 → 더 빨리
//  - 극단적으로 역 간격이 먼 노선(펜이 너무 빨라짐)은 펜 속도 상한(S_MAX)으로 → 더 느리게
// 즉 펜 속도(=호길이/시간)를 [S_MIN, S_MAX]로 클램프한다.
const D_BASE = 6000;        // 중간 노선 기준 시간(1x)
const S_MIN = 0.00002;      // 최소 펜 속도(deg/ms) — 짧은 노선이 느려지지 않게
const S_MAX = 0.00007;      // 최대 펜 속도(deg/ms) — 극단적 장구간이 너무 빠르지 않게
const HARD_MAX_MS = 13000;  // 초장거리 안전 상한
export const animDurationMs = (line: Line, speed: number): number => {
  const arc = lineArcLength(line);
  if (arc <= 0) return D_BASE / (speed || 1);
  const pen = Math.min(S_MAX, Math.max(S_MIN, arc / D_BASE)); // 이상 펜속도를 클램프
  const dur = Math.min(HARD_MAX_MS, arc / pen);               // 중간=D_BASE, 짧으면↓, 극단이면↑
  return dur / (speed || 1);
};

/**
 * 두 지점 간 거리 계산 (미터)
 */
export const getDistance = (
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number => {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1000; // 미터 단위
};

/**
 * 특정 역을 지나가는 모든 노선 찾기 (이름 또는 거리 기반)
 */
export const findLinesForStation = (
  stationName: string,
  stationLat: number | undefined,
  stationLng: number | undefined,
  lineData: LineData
): string[] => {
  const TRANSFER_DISTANCE_THRESHOLD = 300; // 300m 이내
  const lines: string[] = [];

  Object.values(lineData).flat().forEach(line => {
    const hasStation = line.stations.some(station => {
      // 거리가 임계값 이내 (이름만 같고 멀리 떨어진 동명 역은 제외 — 전국 오연결 방지)
      if (stationLat !== undefined && stationLng !== undefined && station.lat && station.lng) {
        const distance = getDistance(stationLat, stationLng, station.lat, station.lng);
        if (distance <= TRANSFER_DISTANCE_THRESHOLD) return true;
      }
      // 좌표가 없을 때만 이름으로 폴백
      if (stationLat === undefined || stationLng === undefined) {
        return station.name === stationName;
      }
      return false;
    });

    if (hasStation) {
      lines.push(line.id);
    }
  });

  return lines;
};

/** 같은 환승 그룹(groupId)을 지나는 모든 노선 id. 동명 역 오연결 없이 정확히 연결선만 찾는다. */
export const findLinesForGroup = (groupId: number, lineData: LineData): string[] => {
  const ids: string[] = [];
  for (const line of Object.values(lineData).flat()) {
    if (line.stations.some(s => s.groupId === groupId)) ids.push(line.id);
  }
  return ids;
};
