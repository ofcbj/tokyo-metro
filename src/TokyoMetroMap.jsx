import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { Search, X, Train } from 'lucide-react';
import { opJR } from './opJR';
import { opMajor1 } from './opMajor1';
import { opMajor2 } from './opMajor2';
import { opMinor } from './opMinor';

// 노선 데이터 통합
const lineData = {
  ...opJR,
  ...opMajor1,
  ...opMajor2,
  ...opMinor,
};

const TokyoMetroMap = () => {
  const [selectedLines, setSelectedLines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterOperator, setFilterOperator] = useState('all');
  const [apiKey, setApiKey] = useState('AIzaSyB3b1UxEAL0JVpMrfolYJipYeMdtHeSOcY');
  const [showApiInput, setShowApiInput] = useState(false);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [autoZoom, setAutoZoom] = useState(true); // 자동 줌 토글 상태
  const [shouldPanOnNextUpdate, setShouldPanOnNextUpdate] = useState(false); // 팬 이동 여부 제어

  // 게임 모드 상태
  const [isGameMode, setIsGameMode] = useState(false);
  const [discoveredLines, setDiscoveredLines] = useState(new Set());
  const [gameLog, setGameLog] = useState([]);
  const [remainingClicks, setRemainingClicks] = useState(50);
  const [animationSpeed, setAnimationSpeed] = useState(1.0); // 1.0 = 기본 속도
  const [showGameIntro, setShowGameIntro] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);
  const [clickEffect, setClickEffect] = useState(null); // 클릭 이펙트 {x, y, success}

  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const previousSelectedLinesRef = useRef([]); // 이전에 선택된 라인 추적
  const selectedLinesRef = useRef(selectedLines);
  const processingClickRef = useRef(false); // 클릭 처리 중 플래그
  const allLineIds = useMemo(() => Object.values(lineData).flat().map(line => line.id), []);

  // 검색 및 필터링된 노선 데이터
  const filteredLineData = Object.entries(lineData).reduce((acc, [operator, lines]) => {
    // 필터링 조건 체크
    let shouldInclude = false;
    if (filterOperator === 'all') {
      shouldInclude = true;
    } else if (filterOperator === 'minor') {
      // "私鉄" 필터: Minor 운영사만 포함
      shouldInclude = Object.keys(opMinor).includes(operator);
    } else {
      // 특정 운영사 필터
      shouldInclude = operator === filterOperator;
    }

    if (!shouldInclude) return acc;

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

  const showAllLines = useCallback(() => {
    setShouldPanOnNextUpdate(false);
    setSelectedLines(allLineIds);
  }, [allLineIds]);

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
    setSelectedLines([randomLine.id]);
    setRemainingClicks(50);
    setGameLog([{
      timestamp: new Date(),
      message: `ゲーム開始！${randomLine.nameJp}からスタート`,
      lineColor: randomLine.color
    }]);
    setShouldPanOnNextUpdate(true);
  }, []);

  // 게임 종료 함수
  const endGame = useCallback(() => {
    setIsGameMode(false);
    setDiscoveredLines(new Set());
    setGameLog([]);
    setRemainingClicks(50);
  }, []);

  // 두 지점 간 거리 계산 (미터)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // 지구 반지름 (km)
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c * 1000; // 미터 단위
  };

  // 특정 역을 지나가는 모든 노선 찾기 (이름 또는 거리 기반)
  const findLinesForStation = (stationName, stationLat, stationLng) => {
    const TRANSFER_DISTANCE_THRESHOLD = 300; // 300m 이내로 증가
    const lines = [];

    Object.values(lineData).flat().forEach(line => {
      const hasStation = line.stations.some(station => {
        // 이름이 같으면 무조건 포함
        if (station.name === stationName) return true;

        // 거리가 임계값 이내
        if (stationLat && stationLng && station.lat && station.lng) {
          const distance = getDistance(stationLat, stationLng, station.lat, station.lng);
          return distance <= TRANSFER_DISTANCE_THRESHOLD;
        }

        return false;
      });

      if (hasStation) {
        lines.push(line.id);
      }
    });

    return lines;
  };

  // 역을 클릭했을 때 해당 역의 모든 노선 선택 및 애니메이션 재생
  const selectLinesForStation = (stationName, stationLat, stationLng, isTransfer) => {
    const lineIds = findLinesForStation(stationName, stationLat, stationLng);

    // 게임 모드인 경우
    if (isGameMode) {
      // 환승역이 아니면 아무것도 하지 않음
      if (!isTransfer) {
        return;
      }

      // 중복 실행 방지
      if (processingClickRef.current) {
        return;
      }
      processingClickRef.current = true;

      // 현재 상태를 기반으로 처리
      setRemainingClicks(prevClicks => {
        if (prevClicks <= 0) {
          processingClickRef.current = false;
          return prevClicks;
        }

        // 새로 발견된 노선 찾기
        const newDiscoveredLineIds = lineIds.filter(id => !discoveredLines.has(id));
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
              alert(`😢 ゲームオーバー!\n\n発見した路線: ${discoveredLines.size} / ${allLineIds.length}\nもう一度チャレンジしてみてください!`);
              endGame();
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

            // 선택된 노선에 추가
            setSelectedLines(prev => [...new Set([...prev, line.id])]);

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
              alert(`🎉 축하합니다! 승리!\n\n모든 ${allLineIds.length}개 노선을 발견했습니다!\n남은 클릭 횟수: ${newRemainingClicks}`);
              endGame();
            } else if (newRemainingClicks === 0) {
              alert(`😢 ゲームオーバー!\n\n発見した路線: ${currentDiscovered.size} / ${allLineIds.length}\nもう一度チャレンジしてみてください!`);
              endGame();
            }
            return currentDiscovered;
          });
        }, newLinesInfo.length * baseInterval + 200);

        return newRemainingClicks;
      });

      setShouldPanOnNextUpdate(false);
      return;
    }

    // 일반 모드인 경우 (기존 로직)
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
  const hideLinesForStation = (stationName, stationLat, stationLng) => {
    const lineIds = findLinesForStation(stationName, stationLat, stationLng);
    setShouldPanOnNextUpdate(false); // 우클릭이므로 팬 이동 금지
    setSelectedLines(prev => {
      // 해당 역의 노선들을 제거
      const withoutStationLines = prev.filter(id => !lineIds.includes(id));
      return withoutStationLines;
    });
  };

  useEffect(() => {
    selectedLinesRef.current = selectedLines;
  }, [selectedLines]);

  // 지도에 노선 표시
  useEffect(() => {
    if (!googleMapRef.current) return;

    // 이전 선택과 현재 선택 비교
    const previousLines = previousSelectedLinesRef.current;
    const removedLines = previousLines.filter(id => !selectedLines.includes(id));
    const newLines = selectedLines.filter(id => !previousLines.includes(id));

    // 제거된 라인의 마커와 폴리라인만 제거
    markersRef.current = markersRef.current.filter(marker => {
      const hasLineBinding = typeof marker.lineId !== 'undefined';
      const shouldKeep = hasLineBinding
        ? selectedLines.includes(marker.lineId)
        : selectedLines.some(lineId =>
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
      const baseDuration = 1500 / (isGameMode ? animationSpeed : 1.0); // 게임 모드에서만 속도 조정
      const steps = path.length;
      const stepDelay = baseDuration / steps;
      const startDelay = newLineIndex * 100; // 새로운 라인마다 100ms 지연

      setTimeout(() => {
        if (!selectedLinesRef.current.includes(line.id)) {
          polyline.setMap(null);
          return;
        }
        let currentStep = 0;
        const drawInterval = setInterval(() => {
          if (!selectedLinesRef.current.includes(line.id)) {
            clearInterval(drawInterval);
            polyline.setMap(null);
            return;
          }
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

        marker.lineId = line.id;
        marker.stationName = station.name;
        marker.stationLat = station.lat;
        marker.stationLng = station.lng;
        marker.isTransfer = station.transfer;

        // InfoWindow는 나중에 동적으로 생성
        let infoWindow = null;

        marker.addListener('click', (event) => {
          // 게임 모드일 때 클릭 이펙트 표시
          if (isGameMode && googleMapRef.current) {
            const scale = Math.pow(2, googleMapRef.current.getZoom());
            const worldCoordinate = googleMapRef.current.getProjection().fromLatLngToPoint(
              new window.google.maps.LatLng(station.lat, station.lng)
            );
            const pixelCoordinate = new window.google.maps.Point(
              worldCoordinate.x * scale,
              worldCoordinate.y * scale
            );
            const topLeft = googleMapRef.current.getProjection().fromLatLngToPoint(
              googleMapRef.current.getBounds().getNorthEast()
            );
            const topLeftPixel = new window.google.maps.Point(
              topLeft.x * scale,
              topLeft.y * scale
            );

            setClickEffect({
              x: event.domEvent.clientX,
              y: event.domEvent.clientY
            });

            setTimeout(() => setClickEffect(null), 1000);
          }

          // 해당 역의 모든 노선을 선택하고 애니메이션 재생
          selectLinesForStation(station.name, station.lat, station.lng, station.transfer);
        });

        marker.addListener('rightclick', (event) => {
          // 우클릭 시 해당 역의 모든 노선을 숨김
          event.stop(); // 기본 컨텍스트 메뉴 방지
          hideLinesForStation(station.name, station.lat, station.lng);
        });

        marker.addListener('mouseover', () => {
          // InfoWindow를 동적으로 생성
          let infoContent;
          if (marker.isTransfer) {
            const stationLineIds = findLinesForStation(marker.stationName, marker.stationLat, marker.stationLng);
            const allLinesArray = Object.values(lineData).flat();
            // 현재 화면에 표시된 라인만 필터링
            const visibleStationLines = stationLineIds
              .filter(id => selectedLinesRef.current.includes(id))
              .map(id => allLinesArray.find(l => l.id === id))
              .filter(l => l); // null 제거

            const linesHtml = visibleStationLines
              .map(l => `<span style="color: ${l.color}; font-size: 18px; line-height: 1.8; font-weight: 500;">● ${l.nameJp} / ${l.nameKo}</span>`)
              .join('<br/>');

            infoContent = `<div style="padding: 0px 4px 2px 4px;">
              <strong style="font-size: 19px;">${marker.stationName}</strong><br/>
              <span style="color: #666; font-size: 13px;">乗換駅</span><br/>
              ${linesHtml}
            </div>`;
          } else {
            infoContent = `<div style="padding: 0px 4px 2px 4px;">
              <strong style="font-size: 19px;">${marker.stationName}</strong><br/>
              <span style="color: ${line.color}; font-size: 18px; line-height: 1.8; font-weight: 500;">● ${line.nameJp} / ${line.nameKo}</span>
            </div>`;
          }

          infoWindow = new window.google.maps.InfoWindow({
            content: infoContent,
            disableAutoPan: true
          });
          infoWindow.open(googleMapRef.current, marker);
        });

        marker.addListener('mouseout', () => {
          if (infoWindow) {
            infoWindow.close();
            infoWindow = null;
          }
        });

        // 라인 애니메이션과 동기화하여 마커 표시
        const markerDelay = startDelay + (stationIndex * stepDelay);
        setTimeout(() => {
          if (!selectedLinesRef.current.includes(line.id)) {
            marker.setMap(null);
            return;
          }
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
    <>
      {/* 게임 인트로 모달 */}
      {showGameIntro && (
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
                  onClick={() => setShowGameIntro(false)}
                  className="flex-1 px-4 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-semibold"
                >
                  キャンセル
                </button>
                <button
                  onClick={startGameAfterIntro}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-bold shadow-lg"
                >
                  スタート! 🚀
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex h-screen bg-gray-100">
      {/* 왼쪽 사이드바 */}
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

          {/* 게임 모드 진행 상태 */}
          {isGameMode && (
            <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
              <div className="text-sm font-semibold text-purple-800 mb-2">ゲームモード</div>
              <div className="flex items-center justify-between gap-4 mb-2">
                <div>
                  <div className="text-2xl font-bold text-purple-900">
                    {discoveredLines.size} / {allLineIds.length}
                  </div>
                  <div className="text-xs text-purple-600">発見した路線</div>
                </div>
                <div className="text-right">
                  <div className={`text-2xl font-bold ${remainingClicks <= 10 ? 'text-red-600' : 'text-blue-900'}`}>
                    {remainingClicks}
                  </div>
                  <div className="text-xs text-purple-600">残りクリック</div>
                </div>
              </div>
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

      {/* 오른쪽 지도 */}
      <div className="flex-1 relative">
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

        {/* 토스트 알림 */}
        {toastMessage && (
          <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-40 animate-bounce-in">
            <div className="bg-white rounded-2xl shadow-2xl px-8 py-4 border-4 flex items-center gap-4 min-w-[300px]"
                 style={{ borderColor: toastMessage.color }}>
              <div className="flex items-center gap-3 flex-1">
                <div className="w-8 h-8 rounded-full animate-pulse"
                     style={{ backgroundColor: toastMessage.color }}></div>
                <div>
                  <div className="text-xs text-gray-500 font-semibold mb-1">
                    {toastMessage.isError ? '残念...' : '新路線発見!'}
                  </div>
                  <div className="text-lg font-bold text-gray-900">{toastMessage.text}</div>
                </div>
              </div>
              <div className="text-3xl">{toastMessage.isError ? '😔' : '🎉'}</div>
            </div>
          </div>
        )}

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
    </>
  );
};

export default TokyoMetroMap;

