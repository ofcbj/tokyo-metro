import { useState, useCallback, useRef, Dispatch, SetStateAction } from 'react';
import { LineData, GameLogEntry, GameResult, ToastMessage, ClickEffect, Line } from '../types';
import { animDurationMs } from '../utils/mapUtils';

// 일본어 여성 음성을 우선 선택 (귀여운/애니풍에 가깝게 하려고 피치를 높인다).
// 브라우저 기본 TTS라 진짜 성우 목소리는 아니고, OS 제공 음성 중 여성 목소리를 고른다.
let cachedJaVoice: SpeechSynthesisVoice | null = null;
const pickJaVoice = (): SpeechSynthesisVoice | null => {
  if (cachedJaVoice) return cachedJaVoice;
  const voices = window.speechSynthesis.getVoices();
  const ja = voices.filter(v => v.lang.toLowerCase().startsWith('ja'));
  if (!ja.length) return null; // 아직 로드 전 → 다음 호출 때 재시도
  const female = ['kyoko', 'o-ren', 'google', 'nanami', 'haruka', 'ayumi', 'sayaka', 'mizuki', 'sakura', 'female'];
  const male = ['otoya', 'ichiro', 'hattori', 'daichi', 'male'];
  cachedJaVoice =
    ja.find(v => female.some(n => v.name.toLowerCase().includes(n)) && !male.some(n => v.name.toLowerCase().includes(n))) ||
    ja.find(v => !male.some(n => v.name.toLowerCase().includes(n))) ||
    ja[0];
  return cachedJaVoice;
};

// 노선명을 일본어 여성 음성(고피치)으로 읽어준다. 미지원/실패 시 조용히 무시.
const speakJa = (text: string) => {
  if (typeof window === 'undefined' || !('speechSynthesis' in window) || !text) return;
  try {
    window.speechSynthesis.cancel(); // 순차 발음: 이전 발화 중단
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ja-JP';
    const v = pickJaVoice();
    if (v) u.voice = v;
    u.pitch = 1.5;  // 높은 피치 = 귀여운 애니풍 느낌
    u.rate = 1.05;
    window.speechSynthesis.speak(u);
  } catch {
    /* noop */
  }
};

// 음성 목록이 늦게 로드되는 브라우저 대응
if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = () => { cachedJaVoice = null; };
}

export const useGameMode = (lineData: LineData, allLineIds: string[]) => {
  const [isGameMode, setIsGameMode]           = useState<boolean>(false);
  const [discoveredLines, setDiscoveredLines] = useState<Set<string>>(new Set());
  const [gameLog, setGameLog]                 = useState<GameLogEntry[]>([]);
  const [remainingClicks, setRemainingClicks] = useState<number>(365);
  const [animationSpeed, setAnimationSpeed]   = useState<number>(1.0);
  const [showGameIntro, setShowGameIntro]     = useState<boolean>(false);
  const [showGameResult, setShowGameResult]   = useState<GameResult | null>(null);
  const [toastMessage, setToastMessage]       = useState<ToastMessage | null>(null);
  const [clickEffect, setClickEffect]         = useState<ClickEffect | null>(null);
  const processingClickRef                    = useRef<boolean>(false);

  // 게임 시작 함수
  const startGame = useCallback((
  ) => {
    setShowGameIntro(true);
  }, []);

  // 실제 게임 시작 (인트로 확인 후)
  const startGameAfterIntro = useCallback((
  ): string => {
    setShowGameIntro(false);

    // 모든 노선 ID 가져오기
    const allLines = Object.values(lineData).flat();

    // 랜덤하게 하나의 노선 선택
    const randomIndex = Math.floor(Math.random() * allLines.length);
    const randomLine = allLines[randomIndex];

    // 게임 모드 활성화
    setIsGameMode(true);
    setDiscoveredLines(new Set([randomLine.id]));
    setRemainingClicks(365);
    setGameLog([{
      timestamp: new Date(),
      message: `ゲーム開始！${randomLine.nameJp}からスタート`,
      lineColor: randomLine.color
    }]);

    // 시작 노선명 음성 안내 (버튼 클릭 제스처 내라서 iOS 음성도 활성화됨)
    speakJa(randomLine.nameJp);

    return randomLine.id;
  }, [lineData]);

  // 게임 종료 함수
  const endGame = useCallback((
  ) => {
    setIsGameMode(false);
    setDiscoveredLines(new Set());
    setGameLog([]);
    setRemainingClicks(365);
    setShowGameResult(null);
  }, []);

  // 노선 발견 실패 처리
  const handleNoNewLines = useCallback((
    newRemainingClicks: number
  ) => {
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
  }, [discoveredLines, allLineIds]);

  // 새 노선 정보 가져오기
  const getNewLinesInfo = useCallback((
    newDiscoveredLineIds: string[]
  ): Line[] => {
    const allLines = Object.values(lineData).flat();
    return newDiscoveredLineIds
      .map(id => allLines.find(line => line.id === id))
      .filter((line): line is Line => line !== undefined);
  }, [lineData]);

  // 단일 노선 발견 처리
  const discoverSingleLine = useCallback((
    line: Line,
    setSelectedLines?: Dispatch<SetStateAction<string[]>>
  ) => {
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

    // 토스트 메시지 표시 (일/한 별도 필드 — 괄호로 합치면 이름에 괄호 있는 노선에서 깨짐)
    setToastMessage({
      text: line.nameJp,
      subText: line.nameKo,
      color: line.color
    });

    // 노선명 일본어 음성 안내
    speakJa(line.nameJp);

    // 로그에 추가
    setGameLog(prev => [{
      timestamp: new Date(),
      message: `新路線発見：${line.nameJp} (${line.nameKo})`,
      lineColor: line.color
    }, ...prev]);
  }, []);

  // 여러 노선을 순차로 발견: 각 노선의 (길이 비례) 애니메이션이 끝난 뒤 1초 쉬고 다음.
  const discoverLinesWithDelay = useCallback((
    newLinesInfo: Line[],
    setSelectedLines?: Dispatch<SetStateAction<string[]>>
  ): number => {
    let acc = 0;
    newLinesInfo.forEach((line) => {
      const delay = acc;
      setTimeout(() => {
        discoverSingleLine(line, setSelectedLines);
      }, delay);
      acc += animDurationMs(line, animationSpeed) + 1000; // 이 노선 애니메이션 + 1초 간격
    });
    return acc; // 전체 소요 시간(ms)
  }, [animationSpeed, discoverSingleLine]);

  // 게임 종료 조건 확인
  const checkGameEndCondition = useCallback((
    newRemainingClicks: number,
    totalMs: number
  ) => {
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
    }, totalMs + 200);
  }, [allLineIds]);

  // 애니메이션 완료 후 정리
  const cleanupAfterAnimation = useCallback((totalMs: number) => {
    setTimeout(() => {
      setToastMessage(null);
      processingClickRef.current = false;
    }, totalMs);
  }, []);

  // 게임 모드에서 노선 발견 처리
  const handleGameDiscovery = useCallback((
    newLineIds: string[],
    setSelectedLines?: Dispatch<SetStateAction<string[]>>
  ): string[] => {
    if (processingClickRef.current) {
      return newLineIds;
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

      // 새로운 노선이 발견되지 않은 경우
      if (newDiscoveredLineIds.length === 0) {
        handleNoNewLines(newRemainingClicks);
        return newRemainingClicks;
      }

      // 새로운 노선 정보 가져오기
      const newLinesInfo = getNewLinesInfo(newDiscoveredLineIds);

      // 각 노선을 순차로 추가 (전체 소요 시간 반환)
      const totalMs = discoverLinesWithDelay(newLinesInfo, setSelectedLines);

      // 모든 애니메이션이 끝난 후 토스트 제거 및 플래그 리셋
      cleanupAfterAnimation(totalMs);

      // 승리 조건 확인
      checkGameEndCondition(newRemainingClicks, totalMs);

      return newRemainingClicks;
    });

    return newLineIds;
  }, [
    discoveredLines,
    handleNoNewLines,
    getNewLinesInfo,
    discoverLinesWithDelay,
    cleanupAfterAnimation,
    checkGameEndCondition
  ]);

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
