import { LineData } from '../types';

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
      // 이름이 같으면 무조건 포함
      if (station.name === stationName) return true;

      // 거리가 임계값 이내
      if (stationLat !== undefined && stationLng !== undefined && station.lat && station.lng) {
        const distance = getDistance(stationLat, stationLng, station.lat, station.lng);
        return distance <= TRANSFER_DISTANCE_THRESHOLD;
      }

      return false;
    });

    if (hasStation) {
      lines.push(line.id);
    }
  });

  return lines;
};
