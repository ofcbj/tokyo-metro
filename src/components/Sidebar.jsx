import React from 'react';
import { Search, X, Train } from 'lucide-react';

export const Sidebar = ({
  isGameMode,
  searchTerm,
  setSearchTerm,
  filterOperator,
  setFilterOperator,
  autoZoom,
  setAutoZoom,
  discoveredLines,
  allLineIds,
  remainingClicks,
  selectedLines,
  showAllLines,
  setSelectedLines,
  animationSpeed,
  setAnimationSpeed,
  startGame,
  endGame,
  gameLog,
  filteredLineData,
  toggleLine,
  lineData,
  opMajor1,
  opMajor2,
  opMinor,
}) => {
  return (
    <div className="w-96 bg-white shadow-lg overflow-y-auto">
      <div className="p-4 border-b sticky top-0 bg-white z-10">
        <div className="flex items-center gap-2 mb-4">
          <Train className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-bold">日本首都圏電鉄</h1>
        </div>

        {/* 검색 */}
        {!isGameMode && (
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="路線検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-2.5"
              >
                <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
              </button>
            )}
          </div>
        )}

        {/* 운영사 필터 */}
        {!isGameMode && (
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setFilterOperator('all')}
              className={`px-3 py-1 rounded-full text-sm ${
                filterOperator === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              全て
            </button>
            {(() => {
              const operators = Object.keys(lineData);
              const majorOperators = operators.filter(op =>
                op === 'JR東日本' ||
                Object.keys(opMajor1).includes(op) ||
                Object.keys(opMajor2).includes(op)
              );
              const minorOperators = operators.filter(op =>
                Object.keys(opMinor).includes(op)
              );

              const buttons = [];

              // Major 운영사들은 개별 표시
              majorOperators.forEach(operator => {
                buttons.push(
                  <button
                    key={operator}
                    onClick={() => setFilterOperator(operator)}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterOperator === operator
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {operator}
                  </button>
                );
              });

              // Minor 운영사들은 "私鉄"로 통합
              if (minorOperators.length > 0) {
                buttons.push(
                  <button
                    key="minor-operators"
                    onClick={() => setFilterOperator('minor')}
                    className={`px-3 py-1 rounded-full text-sm ${
                      filterOperator === 'minor'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    私鉄
                  </button>
                );
              }

              return buttons;
            })()}
          </div>
        )}

        {/* 자동 줌 토글 */}
        {!isGameMode && (
          <div className="mt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoZoom}
                onChange={(e) => setAutoZoom(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">路線選択時自動ズーム</span>
            </label>
          </div>
        )}

        {/* 선택된 노선 수 / 게임 버튼 */}
        {!isGameMode && (selectedLines.length > 0 || allLineIds.length > 0) && (
          <div className="mt-4 text-sm text-gray-600 flex items-center gap-2 flex-wrap">
            {selectedLines.length > 0 && (
              <span>{selectedLines.length}路線選択中</span>
            )}
            <button
              onClick={() => setSelectedLines([])}
              className="text-blue-600 hover:underline"
            >
              全て解除
            </button>
            <button
              onClick={showAllLines}
              className="text-blue-600 hover:underline"
            >
              全て表示
            </button>
          </div>
        )}

        {/* 연출 시간 조정 슬라이더 (게임 모드일 때만) */}
        {isGameMode && (
          <div className="mt-4 p-3 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">演出速度</span>
              <span className="text-xs text-gray-500">
                {animationSpeed === 0.5 ? '遅い' : animationSpeed === 1.0 ? '普通' : animationSpeed === 1.5 ? '速い' : '超速'}
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.5"
              value={animationSpeed}
              onChange={(e) => setAnimationSpeed(parseFloat(e.target.value))}
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
            />
            <div className="flex justify-between text-xs text-gray-400 mt-1">
              <span>0.5x</span>
              <span>1.0x</span>
              <span>1.5x</span>
              <span>2.0x</span>
            </div>
          </div>
        )}

        {/* 게임 시작/종료 버튼 */}
        <div className="mt-4">
          {!isGameMode ? (
            <button
              onClick={startGame}
              className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-2 rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-md"
            >
              ゲームスタート
            </button>
          ) : (
            <button
              onClick={endGame}
              className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition-colors font-semibold"
            >
              ゲーム終了
            </button>
          )}
        </div>
      </div>

      {/* 게임 모드 로그 또는 노선 리스트 */}
      <div className="p-4">
        {isGameMode ? (
          <div>
            <h2 className="text-lg font-bold mb-3 text-gray-800">ゲームログ</h2>
            <div className="space-y-2">
              {gameLog.map((log, index) => (
                <div
                  key={index}
                  className="p-3 bg-gray-50 rounded-lg border border-gray-200"
                >
                  <div className="flex items-start gap-2">
                    <div
                      className="w-3 h-3 rounded-full flex-shrink-0 mt-1"
                      style={{ backgroundColor: log.lineColor }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-gray-900">{log.message}</div>
                      <div className="text-xs text-gray-500 mt-1">
                        {log.timestamp.toLocaleTimeString('ja-JP')}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {gameLog.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                乗換駅をクリックして路線を発見しましょう！
              </div>
            )}
          </div>
        ) : (
          <div>
            {Object.entries(filteredLineData).map(([operator, lines]) => (
              <div key={operator} className="mb-6">
                <h2 className="text-lg font-bold mb-3 text-gray-800">{operator}</h2>
                <div className="space-y-2">
                  {lines.map(line => (
                    <button
                      key={line.id}
                      onClick={() => toggleLine(line.id)}
                      className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                        selectedLines.includes(line.id)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className="w-4 h-4 rounded-full flex-shrink-0"
                          style={{ backgroundColor: line.color }}
                        />
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900">{line.nameJp}</div>
                          <div className="text-sm text-gray-600">{line.nameKo}</div>
                        </div>
                        <div className="text-xs text-gray-500 flex-shrink-0">
                          {line.stations.length}駅
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            ))}

            {Object.keys(filteredLineData).length === 0 && (
              <div className="text-center py-8 text-gray-500">
                検索結果がありません。
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
