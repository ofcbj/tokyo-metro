import { useState, useCallback, useRef, useMemo } from 'react';

export const useGameMode = (lineData, allLineIds) => {
  const [isGameMode, setIsGameMode] = useState(false);
  const [discoveredLines, setDiscoveredLines] = useState(new Set());
  const [gameLog, setGameLog] = useState([]);
  const [remainingClicks, setRemainingClicks] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(1.0);
  const [showGameIntro, setShowGameIntro] = useState(false);
  const [showGameResult, setShowGameResult] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);
  const [clickEffect, setClickEffect] = useState(null);
  const processingClickRef = useRef(false);

  // 게임 시작 함수
  const startGame = useCallback(() => {
    setShowGameIntro(true);
  }, []);

  // 실제 게임 시작 (인트로 확인 후)
  const startGameAfterIntro = useCallback(() => {
    setShowGameIntro(false);

    // 모든 노선 ID 가져오기
    const allLines = Object.values(lineData).flat();

    // 랜덤하게 하나의 노선 선택
    const randomIndex = Math.floor(Math.random() * allLines.length);
    const randomLine = allLines[randomIndex];

    // 게임 모드 활성화
    setIsGameMode(true);
    setDiscoveredLines(new Set([randomLine.id]));
    setRemainingClicks(50);
    setGameLog([{
      timestamp: new Date(),
      message: `ゲーム開始！${randomLine.nameJp}からスタート`,
      lineColor: randomLine.color
    }]);

    return randomLine.id;
  }, [lineData]);

  // 게임 종료 함수
  const endGame = useCallback(() => {
    setIsGameMode(false);
    setDiscoveredLines(new Set());
    setGameLog([]);
    setRemainingClicks(50);
    setShowGameResult(null);
  }, []);

  // 게임 모드에서 노선 발견 처리
  const handleGameDiscovery = useCallback((newLineIds, setSelectedLines) => {
    if (processingClickRef.current) {
      return;
    }
    processingClickRef.current = true;

    setRemainingClicks(prevClicks => {
      if (prevClicks <= 0) {
        processingClickRef.current = false;
        return prevClicks;
      }

      // 새로 발견된 노선 찾기
      const newDiscoveredLineIds = newLineIds.filter(id => !discoveredLines.has(id));
      const newRemainingClicks = prevClicks - 1;

      if (newDiscoveredLineIds.length === 0) {
        // 새로운 노선이 발견되지 않은 경우
        setToastMessage({
          text: '新しい路線が発見されませんでした',
          color: '#666666',
          isError: true
        });

        setTimeout(() => {
          setToastMessage(null);
          processingClickRef.current = false;
        }, 2000);

        // 게임 오버 체크
        if (newRemainingClicks === 0) {
          setTimeout(() => {
            setShowGameResult({
              type: 'lose',
              discoveredCount: discoveredLines.size,
              totalCount: allLineIds.length,
              remainingClicks: 0
            });
          }, 2100);
        }

        return newRemainingClicks;
      }

      // 새로운 노선 정보 가져오기
      const allLines = Object.values(lineData).flat();
      const newLinesInfo = newDiscoveredLineIds.map(id =>
        allLines.find(line => line.id === id)
      ).filter(Boolean);

      // 각 노선을 시차를 두고 추가
      const baseInterval = 2000 / animationSpeed;
      newLinesInfo.forEach((line, index) => {
        setTimeout(() => {
          // 발견된 노선에 추가
          setDiscoveredLines(prev => {
            const newSet = new Set(prev);
            newSet.add(line.id);
            return newSet;
          });

          // 선택된 노선에 추가 (지도에 표시)
          if (setSelectedLines) {
            setSelectedLines(prev => [...new Set([...prev, line.id])]);
          }

          // 토스트 메시지 표시
          setToastMessage({
            text: `${line.nameJp} (${line.nameKo})`,
            color: line.color
          });

          // 로그에 추가
          setGameLog(prev => [{
            timestamp: new Date(),
            message: `新路線発見：${line.nameJp} (${line.nameKo})`,
            lineColor: line.color
          }, ...prev]);
        }, index * baseInterval);
      });

      // 모든 애니메이션이 끝난 후 토스트 제거 및 플래그 리셋
      setTimeout(() => {
        setToastMessage(null);
        processingClickRef.current = false;
      }, newLinesInfo.length * baseInterval);

      // 승리 조건 확인
      setTimeout(() => {
        setDiscoveredLines(currentDiscovered => {
          if (currentDiscovered.size === allLineIds.length) {
            setShowGameResult({
              type: 'win',
              discoveredCount: allLineIds.length,
              totalCount: allLineIds.length,
              remainingClicks: newRemainingClicks
            });
          } else if (newRemainingClicks === 0) {
            setShowGameResult({
              type: 'lose',
              discoveredCount: currentDiscovered.size,
              totalCount: allLineIds.length,
              remainingClicks: 0
            });
          }
          return currentDiscovered;
        });
      }, newLinesInfo.length * baseInterval + 200);

      return newRemainingClicks;
    });

    return newLineIds;
  }, [discoveredLines, allLineIds, lineData, animationSpeed]);

  return {
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
  };
};
