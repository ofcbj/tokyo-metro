import { useState, useCallback, useMemo } from 'react';
import { Box, Typography, useMediaQuery } from '@mui/material';
import { ScreenRotation as ScreenRotationIcon } from '@mui/icons-material';
import { kanto } from './lines/kanto';
import { chubu } from './lines/chubu';
import { kansai } from './lines/kansai';
import { hokkaido } from './lines/hokkaido';
import { tohoku } from './lines/tohoku';
import { chugoku } from './lines/chugoku';
import { shikoku } from './lines/shikoku';
import { kyushu } from './lines/kyushu';

// Hooks
import { useGoogleMap } from './hooks/useGoogleMap';
import { useGameMode } from './hooks/useGameMode';
import { useCanvasMapDisplay } from './hooks/useCanvasMapDisplay';

// Components
import { ApiKeyInput } from './components/ApiKeyInput';
import { GameIntroModal } from './components/GameIntroModal';
import { GameResultModal } from './components/GameResultModal';
import { Sidebar } from './components/Sidebar';
import { MapOverlays } from './components/MapOverlays';
import { GameStatusDisplay } from './components/GameStatusDisplay';

// Utils
import { findLinesForStation, findLinesForGroup } from './utils/mapUtils';
import { mergeOperators } from './utils/operators';

// Types
import { LineData } from './types';

// 지역별 노선 데이터 (사이드바: 지역 → 회사 → 노선 드릴다운용)
const regions: Record<string, LineData> = {
  北海道: hokkaido, 東北: tohoku, 関東: kanto, 中部: chubu,
  関西: kansai, 中国: chugoku, 四国: shikoku, 九州: kyushu,
};
// 지도 렌더링/게임/검색용 통합 데이터 (회사 키가 지역 간 겹쳐도 노선 배열을 이어붙임)
const lineData = mergeOperators(hokkaido, tohoku, kanto, chubu, kansai, chugoku, shikoku, kyushu);

const TokyoMetroMap = () => {
  const [selectedLines, setSelectedLines] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [apiKey, setApiKey] = useState<string>('AIzaSyB2blRrpkyyxJ-Jvxgvv0nSHCDeVWABMhI');
  const [showApiInput, setShowApiInput] = useState<boolean>(false);
  const [autoZoom, setAutoZoom] = useState<boolean>(true);
  const [shouldPanOnNextUpdate, setShouldPanOnNextUpdate] = useState<boolean>(false);

  // 모바일 판정: 터치 기기이면서 좁은 폭(세로 폰) 또는 낮은 높이(가로 폰).
  // pointer:coarse 조건으로 데스크톱에서 창을 좁혀도 오탐하지 않게 한다.
  const isMobile = useMediaQuery(
    '(pointer: coarse) and (max-width:768px), (pointer: coarse) and (max-height:500px)'
  );
  const isLandscape = useMediaQuery('(orientation: landscape)');

  const allLineIds = useMemo(() => Object.values(lineData).flat().map(line => line.id), []);

  // Google Map 훅
  const { mapRef, googleMapRef, isMapLoaded } = useGoogleMap(apiKey, showApiInput);

  // 게임 모드 훅
  const {
    isGameMode,
    discoveredLines,
    gameLog,
    remainingClicks,
    animationSpeed,
    showGameIntro,
    showGameResult,
    toastMessage,
    clickEffect,
    setAnimationSpeed,
    setShowGameIntro,
    startGame,
    startGameAfterIntro,
    endGame,
    handleGameDiscovery,
  } = useGameMode(lineData, allLineIds);

  // 노선 토글
  const toggleLine = (lineId: string) => {
    setShouldPanOnNextUpdate(true);
    setSelectedLines(prev =>
      prev.includes(lineId)
        ? prev.filter(id => id !== lineId)
        : [...prev, lineId]
    );
  };

  const showAllLines = useCallback(() => {
    setShouldPanOnNextUpdate(false);
    setSelectedLines(allLineIds);
  }, [allLineIds]);

  // 역을 클릭했을 때 해당 역의 모든 노선 선택
  const selectLinesForStation = useCallback((stationName: string, stationLat: number, stationLng: number, isTransfer?: boolean, groupId?: number) => {
    // 환승 그룹(groupId)이 있으면 그걸로 정확히 연결선만 찾는다(동명 역 전국 오연결 방지).
    const lineIds = groupId != null
      ? findLinesForGroup(groupId, lineData)
      : findLinesForStation(stationName, stationLat, stationLng, lineData);

    // 게임 모드인 경우
    if (isGameMode) {
      if (!isTransfer) return;

      handleGameDiscovery(lineIds, setSelectedLines);
      setShouldPanOnNextUpdate(false);
      return;
    }

    // 일반 모드인 경우
    setShouldPanOnNextUpdate(false);
    setSelectedLines(prev => {
      const withoutStationLines = prev.filter(id => !lineIds.includes(id));
      return withoutStationLines;
    });

    setTimeout(() => {
      setShouldPanOnNextUpdate(false);
      setSelectedLines(prev => {
        const newLines = [...new Set([...prev, ...lineIds])];
        return newLines;
      });
    }, 50);
  }, [isGameMode, handleGameDiscovery]);

  // 역을 우클릭했을 때 해당 역의 모든 노선을 숨김
  const hideLinesForStation = useCallback((stationName: string, stationLat: number, stationLng: number) => {
    const lineIds = findLinesForStation(stationName, stationLat, stationLng, lineData);
    setShouldPanOnNextUpdate(false);
    setSelectedLines(prev => {
      const withoutStationLines = prev.filter(id => !lineIds.includes(id));
      return withoutStationLines;
    });
  }, []);

  // 게임 시작 (인트로 후)
  const handleGameStart = useCallback(() => {
    const startLineId = startGameAfterIntro();
    setSelectedLines([startLineId]);
    setShouldPanOnNextUpdate(true);

    // 시작 노선이 화면에 들어오도록 지도 이동 (autoZoom 여부와 무관)
    const startLine = Object.values(lineData).flat().find(l => l.id === startLineId);
    if (startLine && startLine.stations.length > 0 && googleMapRef.current && window.google) {
      const bounds = new window.google.maps.LatLngBounds();
      startLine.stations.forEach(s => bounds.extend({ lat: s.lat, lng: s.lng }));
      googleMapRef.current.fitBounds(bounds);
    }
  }, [startGameAfterIntro]);

  // 지도 디스플레이 훅 (캔버스 오버레이 방식 — 네이티브 마커 대비 대량 노선에서 성능 우수)
  useCanvasMapDisplay(
    googleMapRef,
    selectedLines,
    lineData,
    autoZoom,
    shouldPanOnNextUpdate,
    isGameMode,
    animationSpeed,
    setShouldPanOnNextUpdate,
    selectLinesForStation,
    hideLinesForStation
  );

  if (showApiInput) {
    return (
      <ApiKeyInput
        apiKey={apiKey}
        setApiKey={setApiKey}
        setShowApiInput={setShowApiInput}
      />
    );
  }

  const sidebarEl = (
    <Sidebar
      isGameMode={isGameMode}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
      autoZoom={autoZoom}
      setAutoZoom={setAutoZoom}
      allLineIds={allLineIds}
      selectedLines={selectedLines}
      showAllLines={showAllLines}
      setSelectedLines={setSelectedLines}
      animationSpeed={animationSpeed}
      setAnimationSpeed={setAnimationSpeed}
      startGame={isMobile ? handleGameStart : startGame}
      endGame={endGame}
      gameLog={gameLog}
      toggleLine={toggleLine}
      regions={regions}
      isMobile={isMobile}
    />
  );

  return (
    <>
      {/* 게임 인트로 모달 */}
      {showGameIntro && (
        <GameIntroModal
          onCancel={() => setShowGameIntro(false)}
          onStart={handleGameStart}
        />
      )}

      {/* 게임 결과 모달 */}
      <GameResultModal
        result={showGameResult}
        onClose={endGame}
        onRestart={() => {
          endGame();
          setTimeout(() => startGame(), 100);
        }}
      />

      <div className="flex h-full bg-gray-100">
        {/* 게임 모드 상태 표시 */}
        {isGameMode && (
          <GameStatusDisplay
            discoveredLines={discoveredLines.size}
            totalLines={allLineIds.length}
            remainingClicks={remainingClicks}
            toastMessage={toastMessage}
          />
        )}

        {/* 사이드바: 데스크톱 384px 고정 / 모바일 가로 ~20% 패널 (세로는 오버레이로 대체) */}
        {(!isMobile || isLandscape) && (
          <Box sx={{ width: !isMobile ? 384 : 'clamp(200px, 20vw, 320px)', flexShrink: 0, height: '125%', zoom: 0.8 }}>
            {sidebarEl}
          </Box>
        )}

        {/* 오른쪽 지도 */}
        <div className="flex-1 relative">
          <MapOverlays
            clickEffect={clickEffect}
            toastMessage={isGameMode ? null : toastMessage}
            isMapLoaded={isMapLoaded}
            selectedLines={selectedLines}
          />
          <div ref={mapRef} className="w-full h-full" />
        </div>
      </div>

      {/* 모바일 세로모드: 가로 전환 안내 오버레이 */}
      {isMobile && !isLandscape && (
        <Box
          sx={{
            position: 'fixed', inset: 0, zIndex: 2000,
            backgroundColor: 'rgba(17, 24, 39, 0.96)', color: '#fff',
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 2, p: 4, textAlign: 'center',
          }}
        >
          <ScreenRotationIcon sx={{ fontSize: 58 }} />
          <Typography variant="h6" fontWeight="bold">画面を横向きにしてください</Typography>
          <Typography variant="body2" sx={{ opacity: 0.75 }}>
            このアプリは横向き表示に最適化されています
          </Typography>
        </Box>
      )}
    </>
  );
};

export default TokyoMetroMap;
