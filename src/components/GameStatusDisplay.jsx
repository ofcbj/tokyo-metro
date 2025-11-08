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
    <div className="fixed top-0 left-0 right-0 z-30 pointer-events-none">
      <div className="relative pt-6">
        {/* 왼쪽: 발견한 라인 수 */}
        <div className="absolute left-[614px] top-6 pointer-events-auto">
          <div className={`
            bg-gradient-to-br from-purple-500/60 to-indigo-600/60
            backdrop-blur-md
            rounded-2xl shadow-2xl p-6 min-w-[220px]
            transform transition-all duration-300
            ${showDiscoveredAnim ? 'scale-110 shadow-purple-500/50' : 'scale-100'}
          `}>
            <div className="text-white/80 text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-xl">🎯</span>
              発見した路線
            </div>
            <div className="flex items-baseline gap-2">
              <div className={`
                text-5xl font-bold text-white
                transition-all duration-300
                ${showDiscoveredAnim ? 'animate-bounce' : ''}
              `}>
                {discoveredLines}
              </div>
              <div className="text-2xl text-white/60">/ {totalLines}</div>
            </div>

            {/* 프로그레스 바 */}
            <div className="mt-4 bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
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
                <div className="absolute -top-2 -right-2 text-4xl animate-ping">✨</div>
                <div className="absolute -bottom-2 -left-2 text-3xl animate-bounce">🎉</div>
                <div className="absolute top-1/2 -right-4 text-2xl animate-spin">⭐</div>
              </>
            )}
          </div>
        </div>

        {/* 중앙: 토스트 메시지 */}
        {toastMessage && (
          <div className="absolute left-[calc(50%+100px)] top-6 -translate-x-1/2 pointer-events-auto">
            <div
              className="rounded-3xl shadow-2xl px-10 py-6 border-4 flex items-center gap-6 min-w-[400px] backdrop-blur-sm animate-bounce-in"
              style={{
                borderColor: toastMessage.color,
                background: `linear-gradient(135deg, ${toastMessage.color}15, ${toastMessage.color}25)`
              }}
            >
              <div className="flex items-center gap-4 flex-1">
                <div
                  className="w-16 h-16 rounded-full animate-pulse shadow-lg flex items-center justify-center"
                  style={{
                    backgroundColor: toastMessage.color,
                    boxShadow: `0 0 30px ${toastMessage.color}80`
                  }}
                >
                  <span className="text-3xl">{toastMessage.isError ? '😔' : '✨'}</span>
                </div>
                <div>
                  <div className="text-sm font-bold mb-2" style={{ color: toastMessage.color }}>
                    {toastMessage.isError ? '残念...' : '🎊 新路線発見!'}
                  </div>
                  <div className="text-2xl font-bold text-gray-900">{toastMessage.text}</div>
                </div>
              </div>
              <div className="text-5xl animate-bounce">{toastMessage.isError ? '😔' : '🎉'}</div>
            </div>
          </div>
        )}

        {/* 오른쪽: 남은 클릭 수 */}
        <div className="absolute right-[420px] top-6 pointer-events-auto">
          <div className={`
            ${remainingClicks <= 10
              ? 'bg-gradient-to-br from-red-500/60 to-pink-600/60'
              : 'bg-gradient-to-br from-blue-500/60 to-cyan-600/60'
            }
            backdrop-blur-md
            rounded-2xl shadow-2xl p-6 min-w-[220px]
            transform transition-all duration-300
            ${showClicksAnim ? 'scale-110 shadow-blue-500/50' : 'scale-100'}
          `}>
            <div className="text-white/80 text-sm font-semibold mb-2 flex items-center gap-2">
              <span className="text-xl">⏱️</span>
              残りクリック
            </div>
            <div className={`
              text-5xl font-bold text-white
              transition-all duration-300
              ${showClicksAnim ? 'animate-pulse' : ''}
              ${remainingClicks <= 10 ? 'animate-bounce' : ''}
            `}>
              {remainingClicks}
            </div>
            <div className="text-white/60 text-sm mt-1">回</div>

            {/* 경고 표시 */}
            {remainingClicks <= 10 && (
              <div className="mt-3 bg-white/20 rounded-lg px-3 py-2 backdrop-blur-sm">
                <div className="text-white text-xs font-bold flex items-center gap-1 animate-pulse">
                  <span>⚠️</span>
                  急いで！
                </div>
              </div>
            )}

            {/* 파티클 효과 */}
            {showClicksAnim && remainingClicks > 0 && (
              <>
                <div className="absolute -top-2 -left-2 text-3xl animate-ping">💨</div>
                <div className="absolute -bottom-2 -right-2 text-2xl animate-bounce">⚡</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
