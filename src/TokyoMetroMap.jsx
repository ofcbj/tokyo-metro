import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Train } from 'lucide-react';
import { majorOperators } from './majorOperators';
import { minorOperators } from './minorOperators';

// 노선 데이터 통합
const lineData = {
  ...majorOperators,
  ...minorOperators,
};

const TokyoMetroMap = () => {
  const [selectedLines, setSelectedLines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOperator, setFilterOperator] = useState('all');
  const [apiKey, setApiKey] = useState('');
  const [showApiInput, setShowApiInput] = useState(true);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [autoZoom, setAutoZoom] = useState(true); // 자동 줌 토글 상태
  const [shouldPanOnNextUpdate, setShouldPanOnNextUpdate] = useState(false); // 팬 이동 여부 제어
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const previousSelectedLinesRef = useRef([]); // 이전에 선택된 라인 추적

  // 검색 및 필터링된 노선 데이터
  const filteredLineData = Object.entries(lineData).reduce((acc, [operator, lines]) => {
    if (filterOperator !== 'all' && operator !== filterOperator) return acc;
    
    const filteredLines = lines.filter(line => 
      line.nameKo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      line.nameJp.includes(searchTerm)
    );
    
    if (filteredLines.length > 0) {
      acc[operator] = filteredLines;
    }
    return acc;
  }, {});

  // Google Maps 초기화 함수
  const initMap = useCallback(() => {
    if (!mapRef.current) {
      console.error('Map container not found');
      return;
    }
    
    if (googleMapRef.current) {
      console.log('Map already initialized');
      setIsMapLoaded(true);
      return;
    }

    if (!window.google || !window.google.maps) {
      console.error('Google Maps API not loaded yet');
      return;
    }

    try {
      console.log('Initializing map...');
      googleMapRef.current = new window.google.maps.Map(mapRef.current, {
        center: { lat: 35.6812, lng: 139.7671 },
        zoom: 12,
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: true,
      });
      
      window.google.maps.event.addListenerOnce(googleMapRef.current, 'idle', () => {
        console.log('Map fully loaded');
        setIsMapLoaded(true);
      });
      
    } catch (error) {
      console.error('Map initialization failed:', error);
      alert('地図の初期化に失敗しました: ' + error.message);
      setIsMapLoaded(false);
    }
  }, []);

  // Google Maps 스크립트 로드
  useEffect(() => {
    if (!apiKey || showApiInput) {
      console.log('API key or showApiInput check:', { apiKey, showApiInput });
      return;
    }

    console.log('Starting Google Maps load...');

    // 전역 콜백 함수 설정
    window.initGoogleMap = () => {
      console.log('Google Maps API loaded, initializing map...');
      // 지도 컨테이너가 준비될 때까지 대기
      const checkAndInit = () => {
        if (mapRef.current) {
          initMap();
        } else {
          console.log('Map container not ready, retrying...');
          setTimeout(checkAndInit, 100);
        }
      };
      setTimeout(checkAndInit, 100);
    };

    // 이미 로드되어 있는지 확인
    if (window.google && window.google.maps) {
      console.log('Google Maps already loaded');
      const checkAndInit = () => {
        if (mapRef.current) {
          initMap();
        } else {
          setTimeout(checkAndInit, 100);
        }
      };
      setTimeout(checkAndInit, 100);
      return;
    }

    // 기존 스크립트가 있는지 확인
    const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
    if (existingScript) {
      console.log('Script already exists, waiting for API...');
      // 스크립트가 있지만 아직 로드되지 않았을 수 있음
      const checkLoaded = setInterval(() => {
        if (window.google && window.google.maps) {
          clearInterval(checkLoaded);
          const checkAndInit = () => {
            if (mapRef.current) {
              initMap();
            } else {
              setTimeout(checkAndInit, 100);
            }
          };
          setTimeout(checkAndInit, 100);
        }
      }, 100);
      
      // 10초 후 타임아웃
      setTimeout(() => {
        clearInterval(checkLoaded);
      }, 10000);
      return;
    }

    // 스크립트 로드
    console.log('Loading Google Maps script...');
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initGoogleMap&language=ja&v=weekly`;
    script.async = true;
    script.defer = true;
    
    script.onerror = (error) => {
      console.error('Google Maps loading failed:', error);
      alert('Google Mapsの読み込みに失敗しました。APIキーを確認するか、コンソールを確認してください。');
      setShowApiInput(true);
      setIsMapLoaded(false);
    };

    document.head.appendChild(script);
  }, [apiKey, showApiInput, initMap]);

  // 노선 토글 (사이드바에서 클릭 시)
  const toggleLine = (lineId) => {
    setShouldPanOnNextUpdate(true); // 사이드바 클릭이므로 팬 이동 허용
    setSelectedLines(prev =>
      prev.includes(lineId)
        ? prev.filter(id => id !== lineId)
        : [...prev, lineId]
    );
  };

  // 특정 역을 지나가는 모든 노선 찾기
  const findLinesForStation = (stationName) => {
    const lines = [];
    Object.values(lineData).flat().forEach(line => {
      const hasStation = line.stations.some(station => station.name === stationName);
      if (hasStation) {
        lines.push(line.id);
      }
    });
    return lines;
  };

  // 역을 클릭했을 때 해당 역의 모든 노선 선택 및 애니메이션 재생
  const selectLinesForStation = (stationName) => {
    const lineIds = findLinesForStation(stationName);
    setShouldPanOnNextUpdate(false); // 역 클릭이므로 팬 이동 금지
    setSelectedLines(prev => {
      // 해당 역의 노선들을 먼저 제거
      const withoutStationLines = prev.filter(id => !lineIds.includes(id));
      return withoutStationLines;
    });

    // 짧은 지연 후 다시 추가하여 애니메이션 재생
    setTimeout(() => {
      setShouldPanOnNextUpdate(false); // 역 클릭이므로 팬 이동 금지
      setSelectedLines(prev => {
        // 노선들을 다시 추가 (중복 제거)
        const newLines = [...new Set([...prev, ...lineIds])];
        return newLines;
      });
    }, 50);
  };

  // 역을 우클릭했을 때 해당 역의 모든 노선을 숨김
  const hideLinesForStation = (stationName) => {
    const lineIds = findLinesForStation(stationName);
    setShouldPanOnNextUpdate(false); // 우클릭이므로 팬 이동 금지
    setSelectedLines(prev => {
      // 해당 역의 노선들을 제거
      const withoutStationLines = prev.filter(id => !lineIds.includes(id));
      return withoutStationLines;
    });
  };

  // 지도에 노선 표시
  useEffect(() => {
    if (!googleMapRef.current) return;

    // 이전 선택과 현재 선택 비교
    const previousLines = previousSelectedLinesRef.current;
    const removedLines = previousLines.filter(id => !selectedLines.includes(id));
    const newLines = selectedLines.filter(id => !previousLines.includes(id));

    // 제거된 라인의 마커와 폴리라인만 제거
    markersRef.current = markersRef.current.filter(marker => {
      const shouldKeep = selectedLines.some(lineId =>
        Object.values(lineData).flat().some(line =>
          line.id === lineId &&
          line.stations.some(s =>
            s.lat === marker.getPosition().lat() &&
            s.lng === marker.getPosition().lng()
          )
        )
      );
      if (!shouldKeep) {
        marker.setMap(null);
      }
      return shouldKeep;
    });

    polylinesRef.current = polylinesRef.current.filter(polyline => {
      // polyline에 lineId를 저장해둔 경우
      const shouldKeep = selectedLines.includes(polyline.lineId);
      if (!shouldKeep) {
        polyline.setMap(null);
      }
      return shouldKeep;
    });

    // 새로 선택된 노선만 표시
    let newLineIndex = 0;
    Object.values(lineData).flat().forEach(line => {
      if (!newLines.includes(line.id)) return;

      // 노선 그리기 (애니메이션 효과)
      const path = line.stations.map(station => ({
        lat: station.lat,
        lng: station.lng
      }));

      // 처음에는 빈 경로로 polyline 생성
      const polyline = new window.google.maps.Polyline({
        path: [],
        geodesic: true,
        strokeColor: line.color,
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: googleMapRef.current
      });
      polyline.lineId = line.id; // lineId 저장
      polylinesRef.current.push(polyline);

      // 애니메이션으로 경로 그리기
      const animationDuration = 800; // 800ms
      const steps = path.length;
      const stepDelay = animationDuration / steps;
      const startDelay = newLineIndex * 100; // 새로운 라인마다 100ms 지연

      setTimeout(() => {
        let currentStep = 0;
        const drawInterval = setInterval(() => {
          if (currentStep < steps) {
            const currentPath = path.slice(0, currentStep + 1);
            polyline.setPath(currentPath);
            currentStep++;
          } else {
            clearInterval(drawInterval);
          }
        }, stepDelay);
      }, startDelay);

      newLineIndex++;

      // 역 마커 추가 (애니메이션과 함께)
      line.stations.forEach((station, stationIndex) => {
        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: null, // 처음엔 지도에 표시하지 않음
          title: `${station.name} (${line.nameJp})`,
          icon: {
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: station.transfer ? 8 : 5,
            fillColor: station.transfer ? '#FFFFFF' : line.color,
            fillOpacity: 1,
            strokeColor: line.color,
            strokeWeight: station.transfer ? 3 : 2,
          }
        });

        const infoWindow = new window.google.maps.InfoWindow({
          content: `<div style="padding: 8px;">
            <strong>${station.name}</strong><br/>
            <span style="color: ${line.color}">● ${line.nameJp} / ${line.nameKo}</span>
            ${station.transfer ? '<br/><span style="color: #666;">乗換駅</span>' : ''}
          </div>`
        });

        marker.addListener('click', () => {
          // 해당 역의 모든 노선을 선택하고 애니메이션 재생
          selectLinesForStation(station.name);
        });

        marker.addListener('rightclick', (event) => {
          // 우클릭 시 해당 역의 모든 노선을 숨김
          event.stop(); // 기본 컨텍스트 메뉴 방지
          hideLinesForStation(station.name);
        });

        // 라인 애니메이션과 동기화하여 마커 표시
        const markerDelay = startDelay + (stationIndex * stepDelay);
        setTimeout(() => {
          marker.setMap(googleMapRef.current);
        }, markerDelay);

        markersRef.current.push(marker);
      });
    });

    // 자동 줌이 활성화되어 있고, 팬 이동이 허용되고, 새로 선택된 노선이 있으면 지도 이동 (줌 변경 없이)
    if (autoZoom && shouldPanOnNextUpdate && newLines.length > 0) {
      // 가장 최근에 추가된 노선 가져오기
      const mostRecentLineId = newLines[newLines.length - 1];
      const recentLine = Object.values(lineData).flat().find(line => line.id === mostRecentLineId);

      if (recentLine && recentLine.stations.length > 0) {
        // 노선의 중앙 역 계산
        const centerIndex = Math.floor(recentLine.stations.length / 2);
        const centerStation = recentLine.stations[centerIndex];

        // 줌 없이 중앙으로 이동
        googleMapRef.current.panTo({
          lat: centerStation.lat,
          lng: centerStation.lng
        });
      }
    }

    // 팬 이동 플래그 리셋
    setShouldPanOnNextUpdate(false);

    // 현재 선택을 이전 선택으로 저장
    previousSelectedLinesRef.current = [...selectedLines];
  }, [selectedLines, autoZoom, shouldPanOnNextUpdate]);

  if (showApiInput) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center gap-2 mb-4">
            <Train className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">日本首都圏電鉄地図</h1>
          </div>
          <p className="text-gray-600 mb-4">
            Google Maps APIキーを入力してください。
          </p>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Google Maps API Key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mb-4">
            APIキーは{' '}
            <a 
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Cloud Console
            </a>
            で発行できます。
          </p>
          <button
            onClick={() => {
              if (apiKey.trim()) {
                setShowApiInput(false);
              } else {
                alert('APIキーを入力してください。');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            開始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* 왼쪽 사이드바 */}
      <div className="w-96 bg-white shadow-lg overflow-y-auto">
        <div className="p-4 border-b sticky top-0 bg-white z-10">
          <div className="flex items-center gap-2 mb-4">
            <Train className="w-6 h-6 text-blue-600" />
            <h1 className="text-xl font-bold">日本首都圏電鉄</h1>
          </div>
          
          {/* 검색 */}
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

          {/* 운영사 필터 */}
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
            {Object.keys(lineData).map(operator => (
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
            ))}
          </div>

          {/* 자동 줌 토글 */}
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

          {/* 선택된 노선 수 */}
          {selectedLines.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              {selectedLines.length}路線選択中
              <button
                onClick={() => setSelectedLines([])}
                className="ml-2 text-blue-600 hover:underline"
              >
                全て解除
              </button>
            </div>
          )}
        </div>

        {/* 노선 리스트 */}
        <div className="p-4">
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
      </div>

      {/* 오른쪽 지도 */}
      <div className="flex-1 relative">
        <div ref={mapRef} className="w-full h-full" />
        
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-gray-600">地図を読み込み中...</p>
              <p className="text-sm text-gray-500 mt-2">少々お待ちください</p>
            </div>
          </div>
        )}
        
        {isMapLoaded && selectedLines.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 pointer-events-none">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">左側から路線を選択すると地図に表示されます</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokyoMetroMap;

