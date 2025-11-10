import React, { useEffect, useState } from 'react';

export const GameStatusDisplay = ({ discoveredLines, totalLines, remainingClicks, toastMessage }) => {
  const [prevDiscovered, setPrevDiscovered] = useState(discoveredLines);
  const [prevClicks, setPrevClicks] = useState(remainingClicks);
  const [showDiscoveredAnim, setShowDiscoveredAnim] = useState(false);
  const [showClicksAnim, setShowClicksAnim] = useState(false);

  useEffect(() => {
    if (discoveredLines > prevDiscovered) {
      setShowDiscoveredAnim(true);
      setTimeout(() => setShowDiscoveredAnim(false), 600);
    }
    setPrevDiscovered(discoveredLines);
  }, [discoveredLines, prevDiscovered]);

  useEffect(() => {
    if (remainingClicks < prevClicks) {
      setShowClicksAnim(true);
      setTimeout(() => setShowClicksAnim(false), 600);
    }
    setPrevClicks(remainingClicks);
  }, [remainingClicks, prevClicks]);

  const progressPercentage = (discoveredLines / totalLines) * 100;

  return (
    <>
      {/* 고정 UI: 발견한 라인 수 & 남은 클릭 수 */}
      <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none" style={{ zoom: 1 }}>
        <div className="flex justify-center items-start gap-4 pt-6 px-4">
          {/* 왼쪽: 발견한 라인 수 */}
          <div className="pointer-events-auto flex-shrink-0">
            <div className={`
              bg-gradient-to-br from-purple-500/60 to-indigo-600/60
              backdrop-blur-md
              rounded-2xl shadow-2xl p-4 w-[200px]
              transform transition-all duration-300
              ${showDiscoveredAnim ? 'scale-110 shadow-purple-500/50' : 'scale-100'}
            `}>
              <div className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-1">
                <span className="text-base">🎯</span>
                発見した路線
              </div>
              <div className="flex items-baseline gap-1">
                <div className={`
                  text-4xl font-bold text-white
                  transition-all duration-300
                  ${showDiscoveredAnim ? 'animate-bounce' : ''}
                `}>
                  {discoveredLines}
                </div>
                <div className="text-xl text-white/60">/ {totalLines}</div>
              </div>

              {/* 프로그레스 바 */}
              <div className="mt-3 bg-white/20 rounded-full h-2 overflow-hidden backdrop-blur-sm">
                <div
                  className="h-full bg-gradient-to-r from-yellow-300 to-yellow-500 transition-all duration-500 ease-out shadow-lg"
                  style={{ width: `${progressPercentage}%` }}
                >
                  {showDiscoveredAnim && (
                    <div className="h-full w-full animate-pulse bg-white/30"></div>
                  )}
                </div>
              </div>

              <div className="text-white/70 text-xs mt-2 font-medium">
                達成率: {Math.round(progressPercentage)}%
              </div>

              {/* 파티클 효과 */}
              {showDiscoveredAnim && (
                <>
                  <div className="absolute -top-2 -right-2 text-2xl animate-ping">✨</div>
                  <div className="absolute -bottom-2 -left-2 text-xl animate-bounce">🎉</div>
                  <div className="absolute top-1/2 -right-3 text-lg animate-spin">⭐</div>
                </>
              )}
            </div>
          </div>

          {/* 중앙: 빈 공간 (토스트 메시지 자리) */}
          <div className="flex-shrink-0 w-[450px]"></div>

          {/* 오른쪽: 남은 클릭 수 */}
          <div className="pointer-events-auto flex-shrink-0">
            <div className={`
              ${remainingClicks <= 10
                ? 'bg-gradient-to-br from-red-500/60 to-pink-600/60'
                : 'bg-gradient-to-br from-blue-500/60 to-cyan-600/60'
              }
              backdrop-blur-md
              rounded-2xl shadow-2xl p-4 w-[200px]
              transform transition-all duration-300
              ${showClicksAnim ? 'scale-110 shadow-blue-500/50' : 'scale-100'}
            `}>
              <div className="text-white/80 text-xs font-semibold mb-2 flex items-center gap-1">
                <span className="text-base">⏱️</span>
                残りクリック
              </div>
              <div className={`
                text-4xl font-bold text-white
                transition-all duration-300
                ${showClicksAnim ? 'animate-pulse' : ''}
                ${remainingClicks <= 10 ? 'animate-bounce' : ''}
              `}>
                {remainingClicks}
              </div>
              <div className="text-white/60 text-sm mt-1">回</div>

              {/* 경고 표시 */}
              {remainingClicks <= 10 && (
                <div className="mt-2 bg-white/20 rounded-lg px-2 py-1 backdrop-blur-sm">
                  <div className="text-white text-xs font-bold flex items-center gap-1 animate-pulse">
                    <span>⚠️</span>
                    急いで！
                  </div>
                </div>
              )}

              {/* 파티클 효과 */}
              {showClicksAnim && remainingClicks > 0 && (
                <>
                  <div className="absolute -top-2 -left-2 text-xl animate-ping">💨</div>
                  <div className="absolute -bottom-2 -right-2 text-lg animate-bounce">⚡</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 토스트 메시지 (별도 레이어) */}
      {toastMessage && (() => {
        // "노선명 (한국어)" 형식을 파싱
        const match = toastMessage.text.match(/^(.+?)\s*\((.+?)\)$/);
        const japName = match ? match[1] : toastMessage.text;
        const korName = match ? match[2] : null;

        return (
          <div className="fixed top-6 left-1/2 -translate-x-1/2 z-40 pointer-events-none" style={{ zoom: 1 }}>
            <div className="pointer-events-auto">
              <div
                className="rounded-2xl shadow-2xl px-6 py-4 border-4 flex items-center gap-4 w-[450px] backdrop-blur-sm animate-bounce-in"
                style={{
                  borderColor: toastMessage.color,
                  background: `linear-gradient(135deg, ${toastMessage.color}15, ${toastMessage.color}25)`
                }}
              >
                <div className="flex items-center gap-3 flex-1">
                  <div
                    className="w-12 h-12 rounded-full animate-pulse shadow-lg flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: toastMessage.color,
                      boxShadow: `0 0 30px ${toastMessage.color}80`
                    }}
                  >
                    <span className="text-2xl">{toastMessage.isError ? '😔' : '✨'}</span>
                  </div>
                  <div className="flex-1 min-w-0 text-center">
                    <div className="text-xs font-bold mb-1" style={{ color: toastMessage.color }}>
                      {toastMessage.isError ? '残念...' : '🎊 新路線発見!'}
                    </div>
                    <div className="text-lg font-bold text-gray-900">{japName}</div>
                    {korName && <div className="text-sm font-semibold text-gray-700">{korName}</div>}
                  </div>
                </div>
                <div className="text-3xl animate-bounce flex-shrink-0">{toastMessage.isError ? '😔' : '🎉'}</div>
              </div>
            </div>
          </div>
        );
      })()}
    </>
  );
};
