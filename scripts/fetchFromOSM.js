/**
 * OpenStreetMap Overpass API를 사용하여 도쿄 메트로 역 및 노선 정보를 가져오는 스크립트
 * 
 * 사용법:
 * node scripts/fetchFromOSM.js
 */

// OpenStreetMap Overpass API에서 도쿄 메트로 데이터 가져오기
async function fetchOSMData() {
  console.log('OpenStreetMap Overpass API에서 데이터 가져오는 중...\n');

  // 도쿄 지역 경계 좌표 (대략적인 범위)
  const bbox = "139.0,35.4,140.0,35.8"; // min_lon, min_lat, max_lon, max_lat

  try {
    // 1. 도쿄 메트로 역 정보 가져오기
    console.log('1. 도쿄 메트로 역 정보 가져오는 중...');
    
    const stationsQuery = `
      [out:json][timeout:25];
      (
        node["operator"="東京メトロ"]["railway"="station"](${bbox});
        node["operator"="都営地下鉄"]["railway"="station"](${bbox});
        node["network"="Tokyo Metro"]["railway"="station"](${bbox});
        node["network"="Toei"]["railway"="station"](${bbox});
      );
      out body;
    `;

    const stationsUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(stationsQuery)}`;
    const stationsResponse = await fetch(stationsUrl);
    const stationsData = await stationsResponse.json();

    console.log(`총 ${stationsData.elements?.length || 0}개 역 발견`);

    // 2. 도쿄 메트로 노선 정보 가져오기
    console.log('\n2. 도쿄 메트로 노선 정보 가져오는 중...');
    
    const routesQuery = `
      [out:json][timeout:25];
      (
        relation["operator"="東京メトロ"]["route"="subway"](${bbox});
        relation["operator"="都営地下鉄"]["route"="subway"](${bbox});
        relation["network"="Tokyo Metro"]["route"="subway"](${bbox});
        relation["network"="Toei"]["route"="subway"](${bbox});
      );
      out body;
    `;

    const routesUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(routesQuery)}`;
    const routesResponse = await fetch(routesUrl);
    const routesData = await routesResponse.json();

    console.log(`총 ${routesData.elements?.length || 0}개 노선 발견`);

    // 3. 데이터 변환
    const convertedData = convertOSMToAppFormat(stationsData.elements, routesData.elements);

    console.log('\n3. 변환된 데이터 샘플:');
    console.log(JSON.stringify(convertedData, null, 2).substring(0, 500));

    return convertedData;

  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
}

// OSM 데이터를 현재 앱 형식으로 변환
function convertOSMToAppFormat(stations, routes) {
  // 역 정보 변환
  const stationsMap = {};
  stations?.forEach(element => {
    if (element.type === 'node' && element.lat && element.lon) {
      const name = element.tags.name || element.tags['name:en'] || '';
      const nameJp = element.tags['name:ja'] || name;
      
      stationsMap[element.id] = {
        name: nameJp ? `${name}/${nameJp}` : name,
        lat: element.lat,
        lng: element.lon,
        transfer: element.tags.transfer === 'yes' || element.tags['public_transport:version'] !== undefined,
        line: element.tags.ref || element.tags.route_ref || element.tags['route:ref']
      };
    }
  });

  // 노선 정보 변환
  const routesByOperator = {};
  
  routes?.forEach(element => {
    if (element.type === 'relation') {
      const operator = element.tags.operator || '기타';
      const lineName = element.tags.name || element.tags.ref || '알 수 없음';
      const lineNameJp = element.tags['name:ja'] || lineName;
      const color = element.tags.colour || element.tags.color || '#666666';
      
      if (!routesByOperator[operator]) {
        routesByOperator[operator] = [];
      }

      // 노선의 멤버(역) 추출
      const routeStations = [];
      if (element.members) {
        element.members.forEach(member => {
          if (member.type === 'node' && stationsMap[member.ref]) {
            routeStations.push(stationsMap[member.ref]);
          }
        });
      }

      routesByOperator[operator].push({
        id: `osm-${element.id}`,
        nameKo: lineName,
        nameJp: lineNameJp,
        color: `#${color.replace('#', '')}`,
        stations: routeStations
      });
    }
  });

  return routesByOperator;
}

// 메인 실행 (스크립트가 직접 실행될 때만)
// Node.js에서 직접 실행할 때: node scripts/fetchFromOSM.js
if (import.meta.url.endsWith('fetchFromOSM.js') || process.argv[1]?.includes('fetchFromOSM.js')) {
  fetchOSMData()
    .then(data => {
      console.log('\n✅ 데이터 가져오기 완료!');
      // 필요시 파일로 저장
      // import fs from 'fs';
      // fs.writeFileSync('tokyo_metro_osm.json', JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.error('❌ 실패:', error);
      process.exit(1);
    });
}

export { fetchOSMData, convertOSMToAppFormat };

