import React from 'react';

export const MapOverlays = ({ clickEffect, toastMessage, isMapLoaded, selectedLines }) => {
  return (
    <>
      {/* 클릭 이펙트 */}
      {clickEffect && (
        <div
          className="fixed pointer-events-none z-50"
          style={{
            left: clickEffect.x,
            top: clickEffect.y,
            transform: 'translate(-50%, -50%)'
          }}
        >
          <div className="relative">
            {/* 파동 효과 */}
            <div className="absolute inset-0 animate-ping">
              <div className="w-16 h-16 rounded-full bg-blue-400 opacity-75"></div>
            </div>
            {/* 중심 원 */}
            <div className="relative w-16 h-16 rounded-full bg-blue-500 opacity-50 animate-pulse"></div>
          </div>
        </div>
      )}

      {/* 토스트 알림 - 중앙 상단 */}
      {toastMessage && (
        <div className="fixed top-24 left-1/2 transform -translate-x-1/2 z-40 animate-bounce-in">
          <div
            className="rounded-3xl shadow-2xl px-10 py-6 border-4 flex items-center gap-6 min-w-[400px] backdrop-blur-sm"
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

      {/* 로딩 표시 */}
      {!isMapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-gray-600">地図を読み込み中...</p>
            <p className="text-sm text-gray-500 mt-2">少々お待ちください</p>
          </div>
        </div>
      )}

      {/* 노선 선택 안내 */}
      {isMapLoaded && selectedLines.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 pointer-events-none">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600">左側から路線を選択すると地図に表示されます</p>
          </div>
        </div>
      )}
    </>
  );
};
