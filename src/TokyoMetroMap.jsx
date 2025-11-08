import React, { useState, useCallback, useMemo } from 'react';
import { opJR } from './opJR';
import { opMajor1 } from './opMajor1';
import { opMajor2 } from './opMajor2';
import { opMinor } from './opMinor';

// Hooks
import { useGoogleMap } from './hooks/useGoogleMap';
import { useGameMode } from './hooks/useGameMode';
import { useMapDisplay } from './hooks/useMapDisplay';

// Components
import { ApiKeyInput } from './components/ApiKeyInput';
import { GameIntroModal } from './components/GameIntroModal';
import { GameResultModal } from './components/GameResultModal';
import { Sidebar } from './components/Sidebar';
import { MapOverlays } from './components/MapOverlays';
import { GameStatusDisplay } from './components/GameStatusDisplay';

// Utils
import { findLinesForStation } from './utils/mapUtils';

// 노선 데이터 통합
const lineData = {
  ...opJR,
  ...opMajor1,
  ...opMajor2,
  ...opMinor,
};

const TokyoMetroMap = () => {
  const [selectedLines, setSelectedLines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOperator, setFilterOperator] = useState('all');
  const [apiKey, setApiKey] = useState('AIzaSyB3b1UxEAL0JVpMrfolYJipYeMdtHeSOcY');
  const [showApiInput, setShowApiInput] = useState(false);
  const [autoZoom, setAutoZoom] = useState(true);
  const [shouldPanOnNextUpdate, setShouldPanOnNextUpdate] = useState(false);

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
    setClickEffect,
    startGame,
    startGameAfterIntro,
    endGame,
    handleGameDiscovery,
  } = useGameMode(lineData, allLineIds);

  // 검색 및 필터링된 노선 데이터
  const filteredLineData = Object.entries(lineData).reduce((acc, [operator, lines]) => {
    let shouldInclude = false;
    if (filterOperator === 'all') {
      shouldInclude = true;
    } else if (filterOperator === 'minor') {
      shouldInclude = Object.keys(opMinor).includes(operator);
    } else {
      shouldInclude = operator === filterOperator;
    }

    if (!shouldInclude) return acc;

    const filteredLines = lines.filter(line =>
      line.nameKo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      line.nameJp.includes(searchTerm)
    );

    if (filteredLines.length > 0) {
      acc[operator] = filteredLines;
    }
    return acc;
  }, {});

  // 노선 토글
  const toggleLine = (lineId) => {
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
  const selectLinesForStation = useCallback((stationName, stationLat, stationLng, isTransfer) => {
    const lineIds = findLinesForStation(stationName, stationLat, stationLng, lineData);

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
  const hideLinesForStation = useCallback((stationName, stationLat, stationLng) => {
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
  }, [startGameAfterIntro]);

  // 지도 디스플레이 훅
  useMapDisplay(
    googleMapRef,
    selectedLines,
    lineData,
    autoZoom,
    shouldPanOnNextUpdate,
    setShouldPanOnNextUpdate,
    isGameMode,
    animationSpeed,
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

      <div className="flex h-screen bg-gray-100">
        {/* 게임 모드 상태 표시 */}
        {isGameMode && (
          <GameStatusDisplay
            discoveredLines={discoveredLines.size}
            totalLines={allLineIds.length}
            remainingClicks={remainingClicks}
            toastMessage={toastMessage}
          />
        )}

        {/* 왼쪽 사이드바 */}
        <Sidebar
          isGameMode={isGameMode}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterOperator={filterOperator}
          setFilterOperator={setFilterOperator}
          autoZoom={autoZoom}
          setAutoZoom={setAutoZoom}
          discoveredLines={discoveredLines}
          allLineIds={allLineIds}
          remainingClicks={remainingClicks}
          selectedLines={selectedLines}
          showAllLines={showAllLines}
          setSelectedLines={setSelectedLines}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
          startGame={startGame}
          endGame={endGame}
          gameLog={gameLog}
          filteredLineData={filteredLineData}
          toggleLine={toggleLine}
          lineData={lineData}
          opMajor1={opMajor1}
          opMajor2={opMajor2}
          opMinor={opMinor}
        />

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
    </>
  );
};

export default TokyoMetroMap;
