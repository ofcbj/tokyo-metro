/**
 * 다양한 API 소스를 테스트하고 비교하는 스크립트
 * 
 * 사용법:
 * node scripts/testAPIs.js
 */

import { fetchTransitlandData } from './fetchFromTransitland.js';
import { fetchOSMData } from './fetchFromOSM.js';

async function testAllAPIs() {
  console.log('='.repeat(60));
  console.log('도쿄 메트로 데이터 API 테스트');
  console.log('='.repeat(60));
  console.log('');

  const results = {};

  // 1. Transitland API 테스트
  console.log('📡 Transitland API 테스트');
  console.log('-'.repeat(60));
  try {
    const transitlandData = await fetchTransitlandData();
    results.transitland = {
      success: true,
      stationsCount: transitlandData['도쿄 메트로']?.reduce((sum, line) => sum + line.stations.length, 0) || 0,
      linesCount: transitlandData['도쿄 메트로']?.length || 0
    };
    console.log('✅ Transitland API 성공');
  } catch (error) {
    results.transitland = {
      success: false,
      error: error.message
    };
    console.log('❌ Transitland API 실패:', error.message);
  }
  console.log('');

  // 2. OpenStreetMap API 테스트
  console.log('🗺️  OpenStreetMap Overpass API 테스트');
  console.log('-'.repeat(60));
  try {
    const osmData = await fetchOSMData();
    const totalStations = Object.values(osmData).reduce((sum, lines) => {
      return sum + lines.reduce((lineSum, line) => lineSum + line.stations.length, 0);
    }, 0);
    const totalLines = Object.values(osmData).reduce((sum, lines) => sum + lines.length, 0);
    
    results.osm = {
      success: true,
      stationsCount: totalStations,
      linesCount: totalLines,
      operators: Object.keys(osmData)
    };
    console.log('✅ OpenStreetMap API 성공');
  } catch (error) {
    results.osm = {
      success: false,
      error: error.message
    };
    console.log('❌ OpenStreetMap API 실패:', error.message);
  }
  console.log('');

  // 결과 요약
  console.log('='.repeat(60));
  console.log('테스트 결과 요약');
  console.log('='.repeat(60));
  console.log(JSON.stringify(results, null, 2));
  console.log('');

  // 추천 사항
  console.log('💡 추천 사항:');
  if (results.transitland?.success && results.transitland.stationsCount > 0) {
    console.log('  - Transitland API: 공식 GTFS 데이터 기반으로 가장 정확할 가능성이 높습니다.');
  }
  if (results.osm?.success && results.osm.stationsCount > 0) {
    console.log('  - OpenStreetMap API: 커뮤니티 기반 데이터로 상세한 정보를 제공합니다.');
  }
  
  if (!results.transitland?.success && !results.osm?.success) {
    console.log('  - 두 API 모두 실패했습니다. GTFS 파일을 직접 다운로드하거나');
    console.log('    기존 하드코딩된 데이터를 계속 사용하는 것을 고려해보세요.');
  }
}

// 메인 실행
testAllAPIs().catch(console.error);

