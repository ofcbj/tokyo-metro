import React from 'react';

export const GameResultModal = ({ result, onClose, onRestart }) => {
  if (!result) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in">
        {/* 헤더 */}
        <div className={`p-6 text-white ${
          result.type === 'win'
            ? 'bg-gradient-to-r from-green-500 to-emerald-600'
            : 'bg-gradient-to-r from-red-500 to-pink-600'
        }`}>
          <div className="text-center">
            <div className="text-5xl mb-3">
              {result.type === 'win' ? '🎉' : '😢'}
            </div>
            <h2 className="text-3xl font-bold mb-2">
              {result.type === 'win' ? '完全勝利！' : 'ゲームオーバー'}
            </h2>
            <p className={`text-sm ${
              result.type === 'win' ? 'text-green-100' : 'text-red-100'
            }`}>
              {result.type === 'win'
                ? 'All Routes Discovered!'
                : 'Try Again!'}
            </p>
          </div>
        </div>

        {/* 결과 내용 */}
        <div className="p-6">
          <div className="space-y-4">
            {/* 발견한 노선 */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-5 border-2 border-blue-200">
              <div className="text-center">
                <div className="text-sm text-blue-600 font-semibold mb-2">発見した路線</div>
                <div className="text-5xl font-bold text-blue-900 mb-1">
                  {result.discoveredCount}
                </div>
                <div className="text-sm text-blue-600">
                  / {result.totalCount} 路線
                </div>
                <div className="mt-3 bg-white rounded-full h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 transition-all duration-500"
                    style={{
                      width: `${(result.discoveredCount / result.totalCount * 100)}%`
                    }}
                  />
                </div>
                <div className="text-xs text-blue-500 mt-1">
                  達成率: {Math.round(result.discoveredCount / result.totalCount * 100)}%
                </div>
              </div>
            </div>

            {/* 승리 시 남은 클릭 표시 */}
            {result.type === 'win' && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4 border-2 border-green-200">
                <div className="text-center">
                  <div className="text-sm text-green-600 font-semibold mb-1">残りクリック数</div>
                  <div className="text-3xl font-bold text-green-700">
                    {result.remainingClicks} 回
                  </div>
                </div>
              </div>
            )}

            {/* 패배 시 격려 메시지 */}
            {result.type === 'lose' && (
              <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-lg p-4 border-2 border-orange-200">
                <div className="text-center">
                  <div className="text-sm text-orange-700 font-semibold mb-2">
                    もう一度チャレンジ！
                  </div>
                  <div className="text-xs text-orange-600">
                    あと {result.totalCount - result.discoveredCount} 路線で完全勝利です
                  </div>
                </div>
              </div>
            )}

            {/* 메시지 */}
            <div className="text-center text-gray-600 text-sm leading-relaxed">
              {result.type === 'win'
                ? '素晴らしい！首都圏のすべての路線を発見しました！'
                : 'クリック回数が足りませんでした。戦略を変えてもう一度挑戦してみましょう！'}
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              閉じる
            </button>
            <button
              onClick={onRestart}
              className={`flex-1 px-4 py-3 text-white rounded-lg transition-all font-bold shadow-lg ${
                result.type === 'win'
                  ? 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700'
                  : 'bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700'
              }`}
            >
              もう一度 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
