import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 하버사인 공식을 사용하여 두 지점 사이의 거리 계산 (km)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // 지구 반지름 (km)
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 역 이름 생성 (중간 역)
function generateStationName(station1, station2, index) {
  const name1 = station1.name.split('/')[0].trim();
  const name2 = station2.name.split('/')[0].trim();
  return `${name1}-${name2} 중간${index > 1 ? index : ''}/中間駅`;
}

// 객체를 JSX 형식의 문자열로 변환
function objectToJSXString(obj, indent = 0) {
  const spaces = '  '.repeat(indent);
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => 
      `${spaces}  ${objectToJSXString(item, indent + 1)}`
    ).join(',\n');
    return `[\n${items}\n${spaces}]`;
  }
  
  if (typeof obj === 'object' && obj !== null) {
    const entries = Object.entries(obj);
    if (entries.length === 0) return '{}';
    
    const items = entries.map(([key, value]) => {
      const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `"${key}"`;
      const valueStr = objectToJSXString(value, indent + 1);
      return `${spaces}  ${keyStr}: ${valueStr}`;
    }).join(',\n');
    
    return `{\n${items}\n${spaces}}`;
  }
  
  if (typeof obj === 'string') {
    return `"${obj.replace(/"/g, '\\"')}"`;
  }
  
  if (typeof obj === 'number') {
    return obj.toString();
  }
  
  if (typeof obj === 'boolean') {
    return obj.toString();
  }
  
  return 'null';
}

// 노선 데이터에 중간 역 추가
function addIntermediateStations(data, thresholdKm = 5.0) {
  let totalAdded = 0;
  const changes = [];

  Object.keys(data).forEach(operator => {
    data[operator].forEach(line => {
      const newStations = [];

      for (let i = 0; i < line.stations.length - 1; i++) {
        const currentStation = line.stations[i];
        const nextStation = line.stations[i + 1];
        
        newStations.push({ ...currentStation });

        const distance = calculateDistance(
          currentStation.lat,
          currentStation.lng,
          nextStation.lat,
          nextStation.lng
        );

        if (distance > thresholdKm) {
          // 중간 역 추가
          const numIntermediate = Math.floor(distance / thresholdKm);
          
          for (let j = 1; j <= numIntermediate; j++) {
            const ratio = j / (numIntermediate + 1);
            const midLat = currentStation.lat + (nextStation.lat - currentStation.lat) * ratio;
            const midLng = currentStation.lng + (nextStation.lng - currentStation.lng) * ratio;
            
            const intermediateStation = {
              name: generateStationName(currentStation, nextStation, j),
              lat: midLat,
              lng: midLng
            };

            newStations.push(intermediateStation);
            totalAdded++;
          }

          changes.push({
            operator,
            line: line.nameKo,
            from: currentStation.name,
            to: nextStation.name,
            distance: distance.toFixed(2),
            added: numIntermediate
          });
        }
      }

      // 마지막 역 추가
      newStations.push({ ...line.stations[line.stations.length - 1] });
      line.stations = newStations;
    });
  });

  return { totalAdded, changes };
}

// 파일 읽기 및 쓰기
async function processFiles() {
  const majorOperatorsPath = path.join(__dirname, '../src/majorOperators.jsx');
  const minorOperatorsPath = path.join(__dirname, '../src/minorOperators.jsx');

  // 파일 읽기
  const majorContent = fs.readFileSync(majorOperatorsPath, 'utf-8');
  const minorContent = fs.readFileSync(minorOperatorsPath, 'utf-8');

  // export 문 제거하고 데이터 추출
  const majorMatch = majorContent.match(/export const majorOperators = ({[\s\S]*});/);
  const minorMatch = minorContent.match(/export const minorOperators = ({[\s\S]*});/);

  if (!majorMatch || !minorMatch) {
    console.error('파일 형식을 인식할 수 없습니다.');
    return;
  }

  // 안전하게 객체로 변환
  let majorOperators, minorOperators;
  try {
    // Function 생성자를 사용하여 안전하게 평가
    majorOperators = (new Function(`return ${majorMatch[1]}`))();
    minorOperators = (new Function(`return ${minorMatch[1]}`))();
  } catch (error) {
    console.error('데이터 파싱 오류:', error);
    return;
  }

  console.log('중간 역 추가 작업 시작...\n');
  console.log('임계값: 5.0km\n');

  // majorOperators 처리
  const majorResult = addIntermediateStations(majorOperators, 5.0);
  console.log(`[majorOperators] 추가된 역: ${majorResult.totalAdded}개`);
  
  // minorOperators 처리
  const minorResult = addIntermediateStations(minorOperators, 5.0);
  console.log(`[minorOperators] 추가된 역: ${minorResult.totalAdded}개`);

  console.log(`\n총 추가된 역: ${majorResult.totalAdded + minorResult.totalAdded}개\n`);

  // 변경 사항 출력
  if (majorResult.changes.length > 0) {
    console.log('=== majorOperators 변경 사항 ===');
    majorResult.changes.forEach(change => {
      console.log(`[${change.operator}] ${change.line}: ${change.from} → ${change.to} (${change.distance}km, ${change.added}개 역 추가)`);
    });
  }

  if (minorResult.changes.length > 0) {
    console.log('\n=== minorOperators 변경 사항 ===');
    minorResult.changes.forEach(change => {
      console.log(`[${change.operator}] ${change.line}: ${change.from} → ${change.to} (${change.distance}km, ${change.added}개 역 추가)`);
    });
  }

  // 파일 쓰기 - JSX 형식 유지
  const majorOutput = `// 3개 이상의 노선을 가진 주요 운영회사 데이터
export const majorOperators = ${objectToJSXString(majorOperators)};
`;

  const minorOutput = `// 3개 미만의 노선을 가진 소규모 운영회사 데이터
export const minorOperators = ${objectToJSXString(minorOperators)};
`;

  fs.writeFileSync(majorOperatorsPath, majorOutput, 'utf-8');
  fs.writeFileSync(minorOperatorsPath, minorOutput, 'utf-8');

  console.log('\n파일 업데이트 완료!');
}

processFiles().catch(console.error);

