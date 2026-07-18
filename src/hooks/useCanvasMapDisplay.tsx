import { useEffect, useRef, MutableRefObject } from 'react';
import { LineData } from '../types';
import { CanvasMetroOverlay } from '../utils/CanvasMetroOverlay';

export const useCanvasMapDisplay = (
  googleMapRef            : MutableRefObject<any>,
  selectedLines           : string[],
  lineData                : LineData,
  autoZoom                : boolean,
  shouldPanOnNextUpdate   : boolean,
  isGameMode              : boolean,
  animationSpeed          : number,
  setShouldPanOnNextUpdate: (value: boolean) => void,
  selectLinesForStation   : (name: string, lat: number, lng: number, isTransfer?: boolean) => void,
  hideLinesForStation     : (name: string, lat: number, lng: number) => void
) => {
  const overlayRef = useRef<CanvasMetroOverlay | null>(null);
  const previousSelectedLinesRef = useRef<string[]>([]);

  // Canvas Overlay 초기화
  useEffect(() => {
    if (!googleMapRef.current) return;

    // Overlay 생성
    const overlay = new CanvasMetroOverlay({
      lineData,
      selectedLines,
      animationSpeed,
      isGameMode,
      onStationClick: selectLinesForStation,
      onStationRightClick: hideLinesForStation
    });

    overlay.setMap(googleMapRef.current);
    overlayRef.current = overlay;

    // 클린업
    return () => {
      if (overlayRef.current) {
        overlayRef.current.setMap(null);
        overlayRef.current = null;
      }
    };
  }, [googleMapRef.current]); // 지도가 변경될 때만 재생성

  // 선택된 노선 업데이트
  useEffect(() => {
    if (!overlayRef.current) return;

    const previousLines = previousSelectedLinesRef.current;
    const newLines = selectedLines.filter(id => !previousLines.includes(id));

    // Overlay 옵션 업데이트
    // 콜백도 함께 갱신해야 한다. 오버레이는 생성 시점의 클로저를 잡으므로,
    // isGameMode 등이 바뀐 최신 selectLinesForStation/hideLinesForStation로 교체하지 않으면
    // 게임 모드 클릭이 stale(일반모드) 경로로 처리되는 버그가 생긴다.
    overlayRef.current.updateOptions({
      selectedLines,
      animationSpeed,
      isGameMode,
      onStationClick: selectLinesForStation,
      onStationRightClick: hideLinesForStation
    });

    // 자동 줌이 활성화되어 있고, 팬 이동이 허용되고, 새로 선택된 노선이 있으면 지도 이동
    if (autoZoom && shouldPanOnNextUpdate && newLines.length > 0) {
      const mostRecentLineId = newLines[newLines.length - 1];
      const allLines = Object.values(lineData).flat();
      const recentLine = allLines.find(line => line.id === mostRecentLineId);

      if (recentLine && recentLine.stations.length > 0) {
        const centerIndex = Math.floor(recentLine.stations.length / 2);
        const centerStation = recentLine.stations[centerIndex];

        googleMapRef.current.panTo({
          lat: centerStation.lat,
          lng: centerStation.lng
        });
      }
    }

    // 팬 이동 플래그 리셋
    setShouldPanOnNextUpdate(false);

    // 현재 선택을 이전 선택으로 저장
    previousSelectedLinesRef.current = [...selectedLines];
  }, [
    selectedLines,
    autoZoom,
    shouldPanOnNextUpdate,
    isGameMode,
    animationSpeed,
    lineData,
    googleMapRef,
    setShouldPanOnNextUpdate,
    selectLinesForStation,
    hideLinesForStation
  ]);

  return {
    overlayRef
  };
};
