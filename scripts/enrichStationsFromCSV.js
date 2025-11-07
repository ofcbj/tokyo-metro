import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// CSV 파일 파싱 함수
function parseCSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());
  const headers = lines[0].split(',');
  
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseCSVLine(lines[i]);
    if (values.length === headers.length) {
      const obj = {};
      headers.forEach((header, index) => {
        obj[header.trim()] = values[index]?.trim() || '';
      });
      data.push(obj);
    }
  }
  
  return data;
}

// CSV 라인 파싱 (쉼표 안의 따옴표 처리)
function parseCSVLine(line) {
  const result = [];
  let current = '';
  let inQuotes = false;
  
  for (let i = 0; i < line.length; i++) {
    const char = line[i];
    
    if (char === '"') {
      inQuotes = !inQuotes;
    } else if (char === ',' && !inQuotes) {
      result.push(current);
      current = '';
    } else {
      current += char;
    }
  }
  result.push(current);
  
  return result;
}

// JSX 객체를 문자열로 변환하는 함수
function objectToJSXString(obj, indent = 0) {
  const indentStr = '  '.repeat(indent);
  
  if (obj === null || obj === undefined) {
    return 'null';
  }
  
  if (Array.isArray(obj)) {
    if (obj.length === 0) return '[]';
    const items = obj.map(item => {
      const itemStr = objectToJSXString(item, indent + 1);
      return `${'  '.repeat(indent + 1)}${itemStr}`;
    }).join(',\n');
    return `[\n${items}\n${indentStr}]`;
  }
  
  if (typeof obj === 'object') {
    const keys = Object.keys(obj);
    if (keys.length === 0) return '{}';
    
    const items = keys.map(key => {
      const value = obj[key];
      const valueStr = objectToJSXString(value, indent + 1);
      const keyStr = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : JSON.stringify(key);
      return `${'  '.repeat(indent + 1)}${keyStr}: ${valueStr}`;
    }).join(',\n');
    
    return `{\n${items}\n${indentStr}}`;
  }
  
  if (typeof obj === 'string') {
    return JSON.stringify(obj);
  }
  
  return String(obj);
}

// 역 정보를 CSV에서 가져와서 stations 배열 생성
function getStationsFromCSV(lineCd, stationsByLine) {
  const stations = stationsByLine[lineCd] || [];
  
  // e_sort로 정렬 (이미 정렬되어 있지만 확실히)
  stations.sort((a, b) => {
    const sortA = parseInt(a.e_sort) || 0;
    const sortB = parseInt(b.e_sort) || 0;
    return sortA - sortB;
  });
  
  // e_status=0 (운영중)인 역만 필터링
  const activeStations = stations.filter(station => station.e_status === '0');
  
  // 역 좌표를 Map에 저장 (transfer 판단용)
  const stationMap = new Map();
  
  return activeStations.map(station => {
    const lat = parseFloat(station.lat);
    const lng = parseFloat(station.lon);
    const stationName = station.station_name;
    
    // 좌표 키 생성 (transfer 판단용)
    const coordKey = `${lat.toFixed(4)},${lng.toFixed(4)}`;
    
    const stationObj = {
      name: stationName,
      lat: lat,
      lng: lng
    };
    
    // 같은 좌표에 다른 역이 있는지 확인 (transfer 판단)
    if (stationMap.has(coordKey)) {
      stationObj.transfer = true;
      // 기존 역도 transfer로 표시
      const existingStation = stationMap.get(coordKey);
      if (existingStation) {
        existingStation.transfer = true;
      }
    }
    
    stationMap.set(coordKey, stationObj);
    
    return stationObj;
  });
}

// transfer 정보를 모든 노선에 대해 계산
function calculateTransfers(allOperators) {
  // 모든 역의 좌표를 수집
  const coordMap = new Map(); // "lat,lng" -> [station1, station2, ...]
  
  Object.values(allOperators).forEach(operatorLines => {
    operatorLines.forEach(line => {
      line.stations.forEach(station => {
        const coordKey = `${station.lat.toFixed(4)},${station.lng.toFixed(4)}`;
        if (!coordMap.has(coordKey)) {
          coordMap.set(coordKey, []);
        }
        coordMap.get(coordKey).push(station);
      });
    });
  });
  
  // 같은 좌표에 2개 이상의 역이 있으면 transfer로 표시
  coordMap.forEach((stations, coordKey) => {
    if (stations.length > 1) {
      stations.forEach(station => {
        station.transfer = true;
      });
    }
  });
}

// 파일 읽기 및 쓰기
async function processFiles() {
  console.log('CSV에서 역 정보 가져오기 시작...\n');
  
  // CSV 파일 읽기
  const stationCSVPath = path.join(__dirname, '../data/station.csv');
  console.log('station.csv 읽는 중...');
  const stations = parseCSV(stationCSVPath);
  console.log(`총 ${stations.length}개의 역 데이터 로드됨\n`);
  
  // line_cd별로 그룹화
  const stationsByLine = {};
  stations.forEach(station => {
    const lineCd = station.line_cd;
    if (!stationsByLine[lineCd]) {
      stationsByLine[lineCd] = [];
    }
    stationsByLine[lineCd].push(station);
  });
  
  console.log(`${Object.keys(stationsByLine).length}개의 노선 발견됨\n`);
  
  // JSX 파일 읽기
  const majorOperatorsPath = path.join(__dirname, '../src/majorOperators.jsx');
  const minorOperatorsPath = path.join(__dirname, '../src/minorOperators.jsx');
  
  console.log('JSX 파일 읽는 중...');
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
  
  console.log('역 정보 업데이트 중...\n');
  
  let majorUpdated = 0;
  let minorUpdated = 0;
  
  // majorOperators 업데이트
  Object.keys(majorOperators).forEach(companyName => {
    majorOperators[companyName].forEach(line => {
      const lineCd = line.id;
      const csvStations = getStationsFromCSV(lineCd, stationsByLine);
      
      if (csvStations.length > 0) {
        line.stations = csvStations;
        majorUpdated++;
        console.log(`[${companyName}] ${line.nameJp}: ${csvStations.length}개 역 추가`);
      } else {
        console.log(`[${companyName}] ${line.nameJp}: CSV에서 역을 찾을 수 없음 (line_cd: ${lineCd})`);
      }
    });
  });
  
  console.log('');
  
  // minorOperators 업데이트
  Object.keys(minorOperators).forEach(companyName => {
    minorOperators[companyName].forEach(line => {
      const lineCd = line.id;
      const csvStations = getStationsFromCSV(lineCd, stationsByLine);
      
      if (csvStations.length > 0) {
        line.stations = csvStations;
        minorUpdated++;
        console.log(`[${companyName}] ${line.nameJp}: ${csvStations.length}개 역 추가`);
      } else {
        console.log(`[${companyName}] ${line.nameJp}: CSV에서 역을 찾을 수 없음 (line_cd: ${lineCd})`);
      }
    });
  });
  
  console.log('\n환승역 정보 계산 중...');
  // transfer 정보 계산
  calculateTransfers(majorOperators);
  calculateTransfers(minorOperators);
  
  console.log(`\n총 ${majorUpdated + minorUpdated}개 노선 업데이트됨`);
  console.log(`- majorOperators: ${majorUpdated}개`);
  console.log(`- minorOperators: ${minorUpdated}개\n`);
  
  // 파일 쓰기
  console.log('JSX 파일에 쓰는 중...');
  
  const majorOutput = `// 3개 이상의 노선을 가진 주요 운영회사 데이터
export const majorOperators = ${objectToJSXString(majorOperators)};
`;

  const minorOutput = `// 3개 미만의 노선을 가진 소규모 운영회사 데이터
export const minorOperators = ${objectToJSXString(minorOperators)};
`;

  fs.writeFileSync(majorOperatorsPath, majorOutput, 'utf-8');
  fs.writeFileSync(minorOperatorsPath, minorOutput, 'utf-8');
  
  console.log('완료!');
}

// 실행
processFiles().catch(console.error);

