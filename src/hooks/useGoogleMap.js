import { useState, useEffect, useCallback, useRef } from 'react';

export const useGoogleMap = (apiKey, showApiInput) => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);

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
      setIsMapLoaded(false);
    };

    document.head.appendChild(script);
  }, [apiKey, showApiInput, initMap]);

  return {
    mapRef,
    googleMapRef,
    isMapLoaded,
  };
};
