/**
 * Transitland API를 사용하여 도쿄 메트로 역 및 노선 정보를 가져오는 스크립트
 * 
 * 사용법:
 * node scripts/fetchFromTransitland.js
 */

// Transitland API에서 도쿄 지역 대중교통 데이터 가져오기
async function fetchTransitlandData() {
  console.log('Transitland API에서 데이터 가져오는 중...\n');

  try {
    // 1. 도쿄 메트로 운영사 확인
    console.log('1. 운영사 검색 중...');
    const operatorsResponse = await fetch(
      'https://transit.land/api/v2/rest/operators?search=tokyo'
    );
    const operatorsData = await operatorsResponse.json();
    
    console.log('발견된 운영사:');
    operatorsData.operators?.forEach(op => {
      console.log(`  - ${op.name} (${op.onestop_id})`);
    });

    // 2. 도쿄 메트로 역 정보 가져오기
    console.log('\n2. 도쿄 메트로 역 정보 가져오는 중...');
    const tokyoMetroId = 'o-9v9-tokyometro'; // 도쿄 메트로 Onestop ID
    
    const stopsResponse = await fetch(
      `https://transit.land/api/v2/rest/stops?served_by=${tokyoMetroId}&per_page=1000`
    );
    const stopsData = await stopsResponse.json();
    
    console.log(`총 ${stopsData.stops?.length || 0}개 역 발견`);

    // 3. 도쿄 메트로 노선 정보 가져오기
    console.log('\n3. 도쿄 메트로 노선 정보 가져오는 중...');
    const routesResponse = await fetch(
      `https://transit.land/api/v2/rest/routes?served_by=${tokyoMetroId}&per_page=1000`
    );
    const routesData = await routesResponse.json();
    
    console.log(`총 ${routesData.routes?.length || 0}개 노선 발견`);
    routesData.routes?.forEach(route => {
      console.log(`  - ${route.name} (${route.color || '색상 없음'})`);
    });

    // 4. 데이터 변환 (현재 프로젝트 형식으로)
    const convertedData = convertToAppFormat(stopsData.stops, routesData.routes);
    
    console.log('\n4. 변환된 데이터 샘플:');
    console.log(JSON.stringify(convertedData, null, 2).substring(0, 500));

    return convertedData;

  } catch (error) {
    console.error('오류 발생:', error);
    throw error;
  }
}

// Transitland 데이터를 현재 앱 형식으로 변환
function convertToAppFormat(stops, routes) {
  // 노선별로 역 그룹화
  const routesByLine = {};
  
  routes?.forEach(route => {
    const lineName = route.name || route.long_name;
    if (!routesByLine[lineName]) {
      routesByLine[lineName] = {
        id: route.onestop_id || route.id,
        nameKo: lineName,
        nameJp: route.name_ja || lineName,
        color: route.color || '#666666',
        stations: []
      };
    }
  });

  // 역 정보 추가 (실제로는 stop_times를 통해 노선별 역 순서를 확인해야 함)
  stops?.forEach(stop => {
    const station = {
      name: stop.name_ja ? `${stop.name}/${stop.name_ja}` : stop.name,
      lat: stop.geometry?.coordinates?.[1] || stop.lat,
      lng: stop.geometry?.coordinates?.[0] || stop.lon,
      transfer: stop.wheelchair_boarding === 1 // 임시로 사용
    };
    
    // 모든 노선에 역 추가 (실제로는 노선-역 관계를 확인해야 함)
    Object.values(routesByLine).forEach(line => {
      line.stations.push(station);
    });
  });

  return {
    "도쿄 메트로": Object.values(routesByLine)
  };
}

// 메인 실행 (스크립트가 직접 실행될 때만)
// Node.js에서 직접 실행할 때: node scripts/fetchFromTransitland.js
if (import.meta.url.endsWith('fetchFromTransitland.js') || process.argv[1]?.includes('fetchFromTransitland.js')) {
  fetchTransitlandData()
    .then(data => {
      console.log('\n✅ 데이터 가져오기 완료!');
      // 필요시 파일로 저장
      // import fs from 'fs';
      // fs.writeFileSync('tokyo_metro_transitland.json', JSON.stringify(data, null, 2));
    })
    .catch(error => {
      console.error('❌ 실패:', error);
      process.exit(1);
    });
}

export { fetchTransitlandData, convertToAppFormat };

