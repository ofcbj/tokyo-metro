import React from 'react';

export const GameIntroModal = ({ onCancel, onStart }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden animate-fade-in">
        {/* 헤더 */}
        <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 text-white">
          <div className="text-center">
            <div className="text-4xl mb-2">🚇</div>
            <h2 className="text-2xl font-bold mb-1">路線発見ゲーム</h2>
            <p className="text-purple-100 text-sm">Route Discovery Challenge</p>
          </div>
        </div>

        {/* 내용 */}
        <div className="p-6">
          <div className="space-y-4">
            <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
              <h3 className="font-bold text-purple-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🎯</span>
                ゲーム目標
              </h3>
              <p className="text-sm text-purple-800">
                首都圏のすべての路線を発見しよう!
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-600">
              <h3 className="font-bold text-blue-900 mb-2 flex items-center gap-2">
                <span className="text-xl">🎮</span>
                遊び方
              </h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• ランダムな路線からスタート</li>
                <li>• 環境駅をクリックして路線を拡張</li>
                <li>• 新しい路線が次々と発見される!</li>
              </ul>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border-l-4 border-red-600">
              <h3 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                <span className="text-xl">⏱️</span>
                制限時間
              </h3>
              <p className="text-sm text-red-800">
                <strong className="text-2xl text-red-600">50回</strong>のクリックで全路線を発見せよ!
              </p>
            </div>
          </div>

          {/* 버튼 */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onCancel}
              className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
            >
              キャンセル
            </button>
            <button
              onClick={onStart}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold shadow-lg"
            >
              スタート! 🚀
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
