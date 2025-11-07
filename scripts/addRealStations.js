import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 실제 역 정보 매핑 (주요 노선의 실제 역 정보)
// 형식: { 노선ID: { fromStation: "시작역", toStation: "종점역", stations: [{ name: "역명/일본어", lat: 위도, lng: 경도 }] } }
const realStationsMap = {
  // 미타선: 스에히로초 → 니시타카시마다이라 구간의 실제 역들
  "mita-line": {
    "스에히로초-니시타카시마다이라": [
      { name: "스에히로초/末広町", lat: 35.7017, lng: 139.7731 },
      { name: "아키하바라/秋葉原", lat: 35.6984, lng: 139.7731, transfer: true },
      { name: "아사쿠사바시/浅草橋", lat: 35.6972, lng: 139.7844 },
      { name: "히가시닛포리/東日暮里", lat: 35.7276, lng: 139.7844 },
      { name: "니시닛포리/西日暮里", lat: 35.7321, lng: 139.7744 },
      { name: "마치야/町屋", lat: 35.7425, lng: 139.7814 },
      { name: "기사이치/喜多見", lat: 35.7525, lng: 139.7714 },
      { name: "니시타카시마다이라/西高島平", lat: 35.7894, lng: 139.6728, transfer: true }
    ]
  },
  
  // 마루노우치선: 시부야 → 긴자 구간의 실제 역들
  "marunouchi-line-main": {
    "시부야-긴자": [
      { name: "시부야/渋谷", lat: 35.6580, lng: 139.7016, transfer: true },
      { name: "요요기/代々木", lat: 35.6831, lng: 139.7022, transfer: true },
      { name: "신주쿠/新宿", lat: 35.6896, lng: 139.7006, transfer: true },
      { name: "신주쿠산초메/新宿三丁目", lat: 35.6895, lng: 139.7063, transfer: true },
      { name: "요쓰야/四ツ谷", lat: 35.6868, lng: 139.7299, transfer: true },
      { name: "아카사카미츠케/赤坂見附", lat: 35.6792, lng: 139.7364, transfer: true },
      { name: "코쿠카이기지도마에/国会議事堂前", lat: 35.6781, lng: 139.7450 },
      { name: "카스미가세키/霞ヶ関", lat: 35.6756, lng: 139.7517, transfer: true },
      { name: "긴자/銀座", lat: 35.6720, lng: 139.7645, transfer: true }
    ],
    "오테마치-이케부쿠로": [
      { name: "오테마치/大手町", lat: 35.6867, lng: 139.7662, transfer: true },
      { name: "아와지초/淡路町", lat: 35.6947, lng: 139.7708 },
      { name: "오가와마치/小川町", lat: 35.6947, lng: 139.7758 },
      { name: "신오차노미즈/新御茶ノ水", lat: 35.6956, lng: 139.7656 },
      { name: "오차노미즈/御茶ノ水", lat: 35.6995, lng: 139.7656, transfer: true },
      { name: "혼고산초메/本郷三丁目", lat: 35.7078, lng: 139.7603 },
      { name: "고라쿠엔/後楽園", lat: 35.7078, lng: 139.7517 },
      { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true }
    ]
  },
  
  // 히비야선: 긴시초 → 쓰키지 구간
  "hibiya-line": {
    "긴시초-쓰키지": [
      { name: "긴시초/錦糸町", lat: 35.6967, lng: 139.8143, transfer: true },
      { name: "히키후네/曳舟", lat: 35.7181, lng: 139.8167 },
      { name: "키요스미시라카와/清澄白河", lat: 35.6825, lng: 139.7986 },
      { name: "모리시타/森下", lat: 35.6881, lng: 139.7917 },
      { name: "쓰키지/築地", lat: 35.6678, lng: 139.7717 }
    ]
  },
  
  // 도자이선: 모노리스나카 → 니시후나바시 구간
  "tozai-line": {
    "모노리스나카-니시후나바시": [
      { name: "모노리스나카/門前仲町", lat: 35.6703, lng: 139.7925 },
      { name: "키바/木場", lat: 35.6703, lng: 139.8058 },
      { name: "도요초/東陽町", lat: 35.6703, lng: 139.8175 },
      { name: "미나미스나마치/南砂町", lat: 35.6703, lng: 139.8292 },
      { name: "니시후나바시/西船橋", lat: 35.7073, lng: 139.9585, transfer: true }
    ]
  },
  
  // 치요다선: 신오차노미즈 → 기타아야세 구간
  "chiyoda-line": {
    "신오차노미즈-기타아야세": [
      { name: "신오차노미즈/新御茶ノ水", lat: 35.6956, lng: 139.7656 },
      { name: "야나카/谷中", lat: 35.7256, lng: 139.7707 },
      { name: "센다기/千駄木", lat: 35.7256, lng: 139.7631 },
      { name: "니시닛포리/西日暮里", lat: 35.7321, lng: 139.7744 },
      { name: "마치야/町屋", lat: 35.7425, lng: 139.7814 },
      { name: "기사이치/喜多見", lat: 35.7525, lng: 139.7714 },
      { name: "아야세/綾瀬", lat: 35.7611, lng: 139.8253 },
      { name: "기타아야세/北綾瀬", lat: 35.7756, lng: 139.8328, transfer: true }
    ]
  },
  
  // 유라쿠초선: 이케부쿠로 → 고탄다 구간
  "yurakucho-line": {
    "이케부쿠로-고탄다": [
      { name: "이케부쿠로/池袋", lat: 35.7295, lng: 139.7109, transfer: true },
      { name: "고쿠분지/国分寺", lat: 35.7031, lng: 139.4797 },
      { name: "세타가야/世田谷", lat: 35.6431, lng: 139.6681 },
      { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true }
    ],
    "고탄다-신바시": [
      { name: "고탄다/五反田", lat: 35.6257, lng: 139.7238, transfer: true },
      { name: "다카나와/高輪", lat: 35.6331, lng: 139.7331 },
      { name: "신바시/新橋", lat: 35.6664, lng: 139.7583, transfer: true }
    ]
  }
};

// 하버사인 공식을 사용하여 두 지점 사이의 거리 계산 (km)
function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// 실제 역 정보로 교체
function replaceWithRealStations(data) {
  let totalReplaced = 0;

  Object.keys(data).forEach(operator => {
    data[operator].forEach(line => {
      const lineId = line.id;
      if (!realStationsMap[lineId]) return;

      const replacements = realStationsMap[lineId];
      const newStations = [];
      let i = 0;

      while (i < line.stations.length) {
        const currentStation = line.stations[i];
        newStations.push({ ...currentStation });

        // 다음 역과의 구간 확인
        if (i < line.stations.length - 1) {
          const nextStation = line.stations[i + 1];
          const fromName = currentStation.name.split('/')[0].trim();
          const toName = nextStation.name.split('/')[0].trim();
          const key = `${fromName}-${toName}`;

          // 실제 역 정보가 있는지 확인
          if (replacements[key]) {
            // 중간 역들 추가 (시작역과 종점역 제외)
            const intermediateStations = replacements[key].slice(1, -1);
            intermediateStations.forEach(station => {
              newStations.push({ ...station });
              totalReplaced++;
            });
          }
        }

        i++;
      }

      line.stations = newStations;
    });
  });

  return totalReplaced;
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

  console.log('실제 역 정보 추가 작업 시작...\n');

  // majorOperators 처리
  const majorResult = replaceWithRealStations(majorOperators);
  console.log(`[majorOperators] 추가된 실제 역: ${majorResult}개`);
  
  // minorOperators 처리
  const minorResult = replaceWithRealStations(minorOperators);
  console.log(`[minorOperators] 추가된 실제 역: ${minorResult}개`);

  console.log(`\n총 추가된 실제 역: ${majorResult + minorResult}개\n`);

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
  console.log('\n참고: 일부 노선에만 실제 역 정보가 추가되었습니다.');
  console.log('더 많은 노선의 실제 역 정보를 추가하려면 realStationsMap에 데이터를 추가하세요.');
}

processFiles().catch(console.error);

