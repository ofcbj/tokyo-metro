import { opJR } from './src/opJR.jsx';
import { opMajor1 } from './src/opMajor1.jsx';
import { opMajor2 } from './src/opMajor2.jsx';
import { opMinor } from './src/opMinor.jsx';

const lineData = {
  ...opJR,
  ...opMajor1,
  ...opMajor2,
  ...opMinor,
};

function getDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c * 1000;
}

// 모든 역 수집
const allStations = [];
Object.entries(lineData).forEach(([operator, lines]) => {
  lines.forEach(line => {
    line.stations.forEach(station => {
      allStations.push({
        name: station.name,
        lat: station.lat,
        lng: station.lng,
        line: line.nameJp,
        operator: operator
      });
    });
  });
});

// 이름이 다르지만 200m 이내인 역 찾기
const nearbyDifferentNames = [];
for (let i = 0; i < allStations.length; i++) {
  for (let j = i + 1; j < allStations.length; j++) {
    const s1 = allStations[i];
    const s2 = allStations[j];
    
    if (s1.name !== s2.name) {
      const dist = getDistance(s1.lat, s1.lng, s2.lat, s2.lng);
      if (dist <= 200) {
        nearbyDifferentNames.push({
          station1: s1.name,
          station2: s2.name,
          distance: Math.round(dist),
          line1: s1.line,
          line2: s2.line,
          operator1: s1.operator,
          operator2: s2.operator
        });
      }
    }
  }
}

// 거리순 정렬
nearbyDifferentNames.sort((a, b) => a.distance - b.distance);

console.log('\n=== 이름이 다르지만 200m 이내인 환승역 후보 ===\n');
nearbyDifferentNames.slice(0, 30).forEach(pair => {
  console.log(`${pair.station1} ↔ ${pair.station2}`);
  console.log(`  거리: ${pair.distance}m`);
  console.log(`  ${pair.line1} (${pair.operator1})`);
  console.log(`  ${pair.line2} (${pair.operator2})`);
  console.log('');
});

console.log(`\n총 ${nearbyDifferentNames.length}개의 역 쌍이 발견되었습니다.`);
