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
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);

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
      alert('지도 초기화에 실패했습니다: ' + error.message);
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
      alert('Google Maps를 불러오는데 실패했습니다. API 키를 확인하거나 콘솔을 확인해주세요.');
      setShowApiInput(true);
      setIsMapLoaded(false);
    };

    document.head.appendChild(script);
  }, [apiKey, showApiInput, initMap]);

  // 노선 토글
  const toggleLine = (lineId) => {
    setSelectedLines(prev => 
      prev.includes(lineId) 
        ? prev.filter(id => id !== lineId)
        : [...prev, lineId]
    );
  };

  // 지도에 노선 표시
  useEffect(() => {
    if (!googleMapRef.current) return;

    // 기존 마커와 폴리라인 제거
    markersRef.current.forEach(marker => marker.setMap(null));
    polylinesRef.current.forEach(polyline => polyline.setMap(null));
    markersRef.current = [];
    polylinesRef.current = [];

    // 선택된 노선만 표시
    Object.values(lineData).flat().forEach(line => {
      if (!selectedLines.includes(line.id)) return;

      // 노선 그리기
      const path = line.stations.map(station => ({
        lat: station.lat,
        lng: station.lng
      }));

      const polyline = new window.google.maps.Polyline({
        path: path,
        geodesic: true,
        strokeColor: line.color,
        strokeOpacity: 0.8,
        strokeWeight: 4,
        map: googleMapRef.current
      });
      polylinesRef.current.push(polyline);

      // 역 마커 추가
      line.stations.forEach(station => {
        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: googleMapRef.current,
          title: station.name,
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
            <span style="color: ${line.color}">● ${line.nameKo} / ${line.nameJp}</span>
            ${station.transfer ? '<br/><span style="color: #666;">환승역</span>' : ''}
          </div>`
        });

        marker.addListener('click', () => {
          infoWindow.open(googleMapRef.current, marker);
        });

        markersRef.current.push(marker);
      });
    });

    // 선택된 노선이 있으면 맵 범위 조정
    if (selectedLines.length > 0) {
      const bounds = new window.google.maps.LatLngBounds();
      Object.values(lineData).flat().forEach(line => {
        if (selectedLines.includes(line.id)) {
          line.stations.forEach(station => {
            bounds.extend({ lat: station.lat, lng: station.lng });
          });
        }
      });
      googleMapRef.current.fitBounds(bounds);
    }
  }, [selectedLines]);

  if (showApiInput) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <div className="flex items-center gap-2 mb-4">
            <Train className="w-8 h-8 text-blue-600" />
            <h1 className="text-2xl font-bold">일본 수도권 전철 지도</h1>
          </div>
          <p className="text-gray-600 mb-4">
            Google Maps API 키를 입력해주세요.
          </p>
          <input
            type="text"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Google Maps API Key"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <p className="text-sm text-gray-500 mb-4">
            API 키는{' '}
            <a 
              href="https://developers.google.com/maps/documentation/javascript/get-api-key"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline"
            >
              Google Cloud Console
            </a>
            에서 발급받을 수 있습니다.
          </p>
          <button
            onClick={() => {
              if (apiKey.trim()) {
                setShowApiInput(false);
              } else {
                alert('API 키를 입력해주세요.');
              }
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            시작하기
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
            <h1 className="text-xl font-bold">일본 수도권 전철</h1>
          </div>
          
          {/* 검색 */}
          <div className="relative mb-4">
            <Search className="absolute left-3 top-2.5 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="노선 검색..."
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
              전체
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

          {/* 선택된 노선 수 */}
          {selectedLines.length > 0 && (
            <div className="mt-4 text-sm text-gray-600">
              {selectedLines.length}개 노선 선택됨
              <button
                onClick={() => setSelectedLines([])}
                className="ml-2 text-blue-600 hover:underline"
              >
                모두 해제
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
                        <div className="font-medium text-gray-900">{line.nameKo}</div>
                        <div className="text-sm text-gray-600">{line.nameJp}</div>
                      </div>
                      <div className="text-xs text-gray-500 flex-shrink-0">
                        {line.stations.length}개역
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}

          {Object.keys(filteredLineData).length === 0 && (
            <div className="text-center py-8 text-gray-500">
              검색 결과가 없습니다.
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
              <p className="text-gray-600">지도를 불러오는 중...</p>
              <p className="text-sm text-gray-500 mt-2">잠시만 기다려주세요</p>
            </div>
          </div>
        )}
        
        {isMapLoaded && selectedLines.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-5 pointer-events-none">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <p className="text-gray-600">왼쪽에서 노선을 선택하면 지도에 표시됩니다</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokyoMetroMap;

