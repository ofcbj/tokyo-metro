import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Search, X, Train } from 'lucide-react';

// 노선 데이터
const lineData = {
  "도쿄메트로": [
    {
      id: "ginza",
      nameKo: "긴자선",
      nameJp: "銀座線",
      color: "#FF9500",
      stations: [
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "오모테산도/表参道", lat: 35.6654, lng: 139.7126, transfer: true },
        { name: "아오야마잇초메/青山一丁目", lat: 35.6726, lng: 139.7242, transfer: true },
        { name: "아카사카미츠케/赤坂見附", lat: 35.6792, lng: 139.7364, transfer: true },
        { name: "타메이케산노/溜池山王", lat: 35.6732, lng: 139.7421, transfer: true },
        { name: "토라노몬/虎ノ門", lat: 35.6694, lng: 139.7498 },
        { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true },
        { name: "니혼바시/日本橋", lat: 35.6830, lng: 139.7743, transfer: true },
        { name: "우에노/上野", lat: 35.7118, lng: 139.7770, transfer: true },
        { name: "아사쿠사/浅草", lat: 35.7114, lng: 139.7967, transfer: true }
      ]
    },
    {
      id: "marunouchi",
      nameKo: "마루노우치선",
      nameJp: "丸ノ内線",
      color: "#F62E36",
      stations: [
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true },
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true }
      ]
    },
    {
      id: "hibiya",
      nameKo: "히비야선",
      nameJp: "日比谷線",
      color: "#B5B5AC",
      stations: [
        { name: "나카메구로/中目黒", lat: 35.6433, lng: 139.6978 },
        { name: "에비스/恵比寿", lat: 35.6468, lng: 139.7100, transfer: true },
        { name: "롯폰기/六本木", lat: 35.6633, lng: 139.7292, transfer: true },
        { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true },
        { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "우에노/上野", lat: 35.7118, lng: 139.7770, transfer: true }
      ]
    },
    {
      id: "tozai",
      nameKo: "도자이선",
      nameJp: "東西線",
      color: "#009BBF",
      stations: [
        { name: "나카노/中野", lat: 35.7056, lng: 139.6657 },
        { name: "타카다노바바/高田馬場", lat: 35.7128, lng: 139.7038, transfer: true },
        { name: "이다바시/飯田橋", lat: 35.7026, lng: 139.7458, transfer: true },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "니혼바시/日本橋", lat: 35.6830, lng: 139.7743, transfer: true }
      ]
    },
    {
      id: "chiyoda",
      nameKo: "치요다선",
      nameJp: "千代田線",
      color: "#00BB85",
      stations: [
        { name: "요요기우에하라/代々木上原", lat: 35.6695, lng: 139.6832 },
        { name: "오모테산도/表参道", lat: 35.6654, lng: 139.7126, transfer: true },
        { name: "아카사카/赤坂", lat: 35.6743, lng: 139.7364 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "니시니혼바시/西日暮里", lat: 35.7320, lng: 139.7668, transfer: true }
      ]
    },
    {
      id: "yurakucho",
      nameKo: "유라쿠초선",
      nameJp: "有楽町線",
      color: "#C1A470",
      stations: [
        { name: "와코시/和光市", lat: 35.7808, lng: 139.6058 },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "이치가야/市ヶ谷", lat: 35.6916, lng: 139.7429, transfer: true },
        { name: "유라쿠초/有楽町", lat: 35.6751, lng: 139.7634, transfer: true },
        { name: "긴자잇초메/銀座一丁目", lat: 35.6747, lng: 139.7664 }
      ]
    },
    {
      id: "hanzomon",
      nameKo: "한조몬선",
      nameJp: "半蔵門線",
      color: "#8F76D6",
      stations: [
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "오모테산도/表参道", lat: 35.6654, lng: 139.7126, transfer: true },
        { name: "한조몬/半蔵門", lat: 35.6870, lng: 139.7507 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
        { name: "미츠코시마에/三越前", lat: 35.6879, lng: 139.7740 }
      ]
    },
    {
      id: "namboku",
      nameKo: "난보쿠선",
      nameJp: "南北線",
      color: "#00AC9B",
      stations: [
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "시로카네다카나와/白金高輪", lat: 35.6387, lng: 139.7334, transfer: true },
        { name: "아자부주반/麻布十番", lat: 35.6549, lng: 139.7368, transfer: true },
        { name: "롯폰기잇초메/六本木一丁目", lat: 35.6657, lng: 139.7391 },
        { name: "나가타초/永田町", lat: 35.6792, lng: 139.7404, transfer: true },
        { name: "이치가야/市ヶ谷", lat: 35.6916, lng: 139.7429, transfer: true }
      ]
    },
    {
      id: "fukutoshin",
      nameKo: "후쿠토신선",
      nameJp: "副都心線",
      color: "#9C5E31",
      stations: [
        { name: "와코시/和光市", lat: 35.7808, lng: 139.6058 },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "신주쿠산초메/新宿三丁目", lat: 35.6895, lng: 139.7063, transfer: true },
        { name: "메이지진구마에/明治神宮前", lat: 35.6703, lng: 139.7026, transfer: true },
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true }
      ]
    }
  ],
  "도에이": [
    {
      id: "asakusa",
      nameKo: "아사쿠사선",
      nameJp: "浅草線",
      color: "#E85298",
      stations: [
        { name: "니시마가와/西馬込", lat: 35.5980, lng: 139.7210 },
        { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
        { name: "다카와바시/高輪橋", lat: 35.6385, lng: 139.7393 },
        { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true },
        { name: "히가시긴자/東銀座", lat: 35.6699, lng: 139.7668 },
        { name: "아사쿠사/浅草", lat: 35.7114, lng: 139.7967, transfer: true }
      ]
    },
    {
      id: "mita",
      nameKo: "미타선",
      nameJp: "三田線",
      color: "#0079C2",
      stations: [
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "시로카네다카나와/白金高輪", lat: 35.6387, lng: 139.7334, transfer: true },
        { name: "미타/三田", lat: 35.6485, lng: 139.7454, transfer: true },
        { name: "우치사이와이초/内幸町", lat: 35.6687, lng: 139.7550 },
        { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true }
      ]
    },
    {
      id: "shinjuku",
      nameKo: "신주쿠선",
      nameJp: "新宿線",
      color: "#6CBB5A",
      stations: [
        { name: "신선/新線新宿", lat: 35.6938, lng: 139.7017 },
        { name: "신주쿠산초메/新宿三丁目", lat: 35.6895, lng: 139.7063, transfer: true },
        { name: "이와모토초/岩本町", lat: 35.6935, lng: 139.7772, transfer: true },
        { name: "하마초/浜町", lat: 35.6893, lng: 139.7885 },
        { name: "모토야와타/本八幡", lat: 35.7218, lng: 139.9294 }
      ]
    },
    {
      id: "oedo",
      nameKo: "오에도선",
      nameJp: "大江戸線",
      color: "#B6007A",
      stations: [
        { name: "도초마에/都庁前", lat: 35.6896, lng: 139.6918 },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "롯폰기/六本木", lat: 35.6633, lng: 139.7292, transfer: true },
        { name: "아자부주반/麻布十番", lat: 35.6549, lng: 139.7368, transfer: true },
        { name: "다이몬/大門", lat: 35.6557, lng: 139.7517, transfer: true },
        { name: "츠키지시조/築地市場", lat: 35.6654, lng: 139.7710 }
      ]
    }
  ],
  "JR 동일본": [
    {
      id: "yamanote",
      nameKo: "야마노테선",
      nameJp: "山手線",
      color: "#9ACD32",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "칸다/神田", lat: 35.6916, lng: 139.7708 },
        { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "우에노/上野", lat: 35.7118, lng: 139.7770, transfer: true },
        { name: "닛포리/日暮里", lat: 35.7276, lng: 139.7707, transfer: true },
        { name: "타바타/田端", lat: 35.7376, lng: 139.7609 },
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "에비스/恵比寿", lat: 35.6468, lng: 139.7100, transfer: true },
        { name: "메구로/目黒", lat: 35.6338, lng: 139.7157, transfer: true },
        { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
        { name: "시나가와/品川", lat: 35.6284, lng: 139.7387, transfer: true },
        { name: "하마마츠초/浜松町", lat: 35.6555, lng: 139.7576, transfer: true },
        { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true },
        { name: "유라쿠초/有楽町", lat: 35.6751, lng: 139.7634, transfer: true }
      ]
    },
    {
      id: "chuo-rapid",
      nameKo: "주오선(쾌속)",
      nameJp: "中央線(快速)",
      color: "#F15A22",
      stations: [
        { name: "도쿄/東京", lat: 35.6812, lng: 139.7671, transfer: true },
        { name: "칸다/神田", lat: 35.6916, lng: 139.7708 },
        { name: "오차노미즈/御茶ノ水", lat: 35.6995, lng: 139.7656, transfer: true },
        { name: "요쓰야/四ツ谷", lat: 35.6868, lng: 139.7299, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "나카노/中野", lat: 35.7056, lng: 139.6657, transfer: true }
      ]
    },
    {
      id: "sobu",
      nameKo: "소부선",
      nameJp: "総武線",
      color: "#FFD400",
      stations: [
        { name: "지바/千葉", lat: 35.6115, lng: 140.1121 },
        { name: "긴시초/錦糸町", lat: 35.6967, lng: 139.8143, transfer: true },
        { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true }
      ]
    }
  ],
  "사철": [
    {
      id: "keio",
      nameKo: "게이오선",
      nameJp: "京王線",
      color: "#E85298",
      stations: [
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
        { name: "시모키타자와/下北沢", lat: 35.6613, lng: 139.6681, transfer: true },
        { name: "초후/調布", lat: 35.6516, lng: 139.5407 }
      ]
    },
    {
      id: "odakyu",
      nameKo: "오다큐선",
      nameJp: "小田急線",
      color: "#2E3B96",
      stations: [
        { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
        { name: "시모키타자와/下北沢", lat: 35.6613, lng: 139.6681, transfer: true },
        { name: "세이조가쿠엔마에/成城学園前", lat: 35.6401, lng: 139.6014 },
        { name: "신유리가오카/新百合ヶ丘", lat: 35.5999, lng: 139.5092 }
      ]
    },
    {
      id: "tobu-tojo",
      nameKo: "도부 도조선",
      nameJp: "東武東上線",
      color: "#004098",
      stations: [
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "기타이케부쿠로/北池袋", lat: 35.7394, lng: 139.7051 },
        { name: "이타바시/下板橋", lat: 35.7505, lng: 139.6958 },
        { name: "와코시/和光市", lat: 35.7808, lng: 139.6058, transfer: true }
      ]
    },
    {
      id: "seibu-ikebukuro",
      nameKo: "세이부 이케부쿠로선",
      nameJp: "西武池袋線",
      color: "#1C8AC8",
      stations: [
        { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
        { name: "네리마/練馬", lat: 35.7395, lng: 139.6532, transfer: true },
        { name: "샤쿠지코엔/石神井公園", lat: 35.7407, lng: 139.6014 },
        { name: "히바리가오카/ひばりヶ丘", lat: 35.7606, lng: 139.5390 }
      ]
    }
  ]
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

