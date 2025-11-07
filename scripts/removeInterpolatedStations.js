import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 보간된 중간 역 제거 (이름에 "중간" 또는 "中間"이 포함된 역)
function removeInterpolatedStations(data) {
  let totalRemoved = 0;
  const removedStations = [];

  Object.keys(data).forEach(operator => {
    data[operator].forEach(line => {
      const originalLength = line.stations.length;
      line.stations = line.stations.filter(station => {
        const isInterpolated = station.name.includes('중간') || station.name.includes('中間');
        if (isInterpolated) {
          removedStations.push({
            operator,
            line: line.nameKo,
            station: station.name
          });
          totalRemoved++;
        }
        return !isInterpolated;
      });
    });
  });

  return { totalRemoved, removedStations };
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
    majorOperators = (new Function(`return ${majorMatch[1]}`))();
    minorOperators = (new Function(`return ${minorMatch[1]}`))();
  } catch (error) {
    console.error('데이터 파싱 오류:', error);
    return;
  }

  console.log('보간된 중간 역 제거 작업 시작...\n');

  // majorOperators 처리
  const majorResult = removeInterpolatedStations(majorOperators);
  console.log(`[majorOperators] 제거된 역: ${majorResult.totalRemoved}개`);
  
  // minorOperators 처리
  const minorResult = removeInterpolatedStations(minorOperators);
  console.log(`[minorOperators] 제거된 역: ${minorResult.totalRemoved}개`);

  console.log(`\n총 제거된 역: ${majorResult.totalRemoved + minorResult.totalRemoved}개\n`);

  // 파일 쓰기 - JSX 형식 유지
  const majorOutput = `// 3개 이상의 노선을 가진 주요 운영회사 데이터
export const majorOperators = ${objectToJSXString(majorOperators)};
`;

  const minorOutput = `// 3개 미만의 노선을 가진 소규모 운영회사 데이터
export const minorOperators = ${objectToJSXString(minorOperators)};
`;

  fs.writeFileSync(majorOperatorsPath, majorOutput, 'utf-8');
  fs.writeFileSync(minorOperatorsPath, minorOutput, 'utf-8');

  console.log('파일 업데이트 완료!');
  console.log('\n참고: 실제 역 정보를 추가하려면 각 노선의 공식 역 목록을 참고하여 수동으로 추가해야 합니다.');
}

processFiles().catch(console.error);

