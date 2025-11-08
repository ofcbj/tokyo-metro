import { useEffect, useRef } from 'react';
import { findLinesForStation } from '../utils/mapUtils';

export const useMapDisplay = (
  googleMapRef,
  selectedLines,
  lineData,
  autoZoom,
  shouldPanOnNextUpdate,
  setShouldPanOnNextUpdate,
  isGameMode,
  animationSpeed,
  selectLinesForStation,
  hideLinesForStation
) => {
  const markersRef = useRef([]);
  const polylinesRef = useRef([]);
  const previousSelectedLinesRef = useRef([]);
  const selectedLinesRef = useRef(selectedLines);

  useEffect(() => {
    selectedLinesRef.current = selectedLines;
  }, [selectedLines]);

  // 지도에 노선 표시
  useEffect(() => {
    if (!googleMapRef.current) return;

    // 이전 선택과 현재 선택 비교
    const previousLines = previousSelectedLinesRef.current;
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
      polyline.lineId = line.id;
      polylinesRef.current.push(polyline);

      // 애니메이션으로 경로 그리기
      const baseDuration = 1500 / (isGameMode ? animationSpeed : 1.0);
      const steps = path.length;
      const stepDelay = baseDuration / steps;
      const startDelay = newLineIndex * 100;

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

      // 역 마커 추가
      line.stations.forEach((station, stationIndex) => {
        const marker = new window.google.maps.Marker({
          position: { lat: station.lat, lng: station.lng },
          map: null,
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

        let infoWindow = null;

        marker.addListener('click', (event) => {
          selectLinesForStation(station.name, station.lat, station.lng, station.transfer);
        });

        marker.addListener('rightclick', (event) => {
          event.stop();
          hideLinesForStation(station.name, station.lat, station.lng);
        });

        marker.addListener('mouseover', () => {
          let infoContent;
          if (marker.isTransfer) {
            const stationLineIds = findLinesForStation(marker.stationName, marker.stationLat, marker.stationLng, lineData);
            const allLinesArray = Object.values(lineData).flat();
            const visibleStationLines = stationLineIds
              .filter(id => selectedLinesRef.current.includes(id))
              .map(id => allLinesArray.find(l => l.id === id))
              .filter(l => l);

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

    // 자동 줌이 활성화되어 있고, 팬 이동이 허용되고, 새로 선택된 노선이 있으면 지도 이동
    if (autoZoom && shouldPanOnNextUpdate && newLines.length > 0) {
      const mostRecentLineId = newLines[newLines.length - 1];
      const recentLine = Object.values(lineData).flat().find(line => line.id === mostRecentLineId);

      if (recentLine && recentLine.stations.length > 0) {
        const centerIndex = Math.floor(recentLine.stations.length / 2);
        const centerStation = recentLine.stations[centerIndex];

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
  }, [
    selectedLines,
    autoZoom,
    shouldPanOnNextUpdate,
    isGameMode,
    animationSpeed,
    lineData,
    googleMapRef,
    setShouldPanOnNextUpdate,
    selectLinesForStation,
    hideLinesForStation
  ]);

  return {
    markersRef,
    polylinesRef,
  };
};
