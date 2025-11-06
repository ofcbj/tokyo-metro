import fs from 'fs';

const content = fs.readFileSync('src/TokyoMetroMap.jsx', 'utf8');

// 각 회사별 노선 ID 매핑
const companyMapping = {
  "세이부철도": [
    "seibu-ikebukuro",
    "ikebukuro-line",
    "seibu-chichibu-line",
    "haijima-line",
    "tamagawa-line", // 세이부의 tamagawa (두 개 중 하나)
    "tamako-line",
    "seikouen-line",
    "toshimaen-line"
  ],
  "도큐전철": [
    "toyoko-line",
    "den-en-toshi-line",
    "meguro-line",
    "oimachi-line",
    "ikegami-line",
    "setagaya-line"
  ],
  "케이오전철": [
    "keio",
    "keio-new-line",
    "keio-line",
    "sagamihara-line",
    "takao-line",
    "dobutsuen-line",
    "keibajyo-line",
    "inokashira-line"
  ],
  "케이큐전철": [
    "main-line", // 케이큐 본선 (시나가와부터 시작)
    "airport-line",
    "daishi-line", // 케이큐 다이시선
    "zushi-line",
    "kurihama-line"
  ],
  "도부철도": [
    "tobu-tojo",
    "tobu-tojo-line",
    "tobu-urban-park-linenoda",
    "isesaki-lineskytree-line",
    "kameido-line"
  ],
  "케이세이전철": [
    "oshiage-line",
    "higashi-narita-line",
    "narita-sky-access-line",
    "main-line" // 케이세이 본선 (요코하마부터 시작하는 것)
  ],
  "오다큐전철": [
    "odakyu",
    "odawara-line",
    "enoshima-line",
    "tama-line"
  ]
};

// "사철" 섹션 찾기
const 사철Start = content.indexOf('  "사철": [');
const 사철End = content.indexOf('  ],\n};', 사철Start);

if (사철Start === -1 || 사철End === -1) {
  console.error('사철 섹션을 찾을 수 없습니다.');
  process.exit(1);
}

const 사철Section = content.substring(사철Start, 사철End + 5);

// 각 노선 객체 추출
const lineObjects = [];
const lineRegex = /\{\s*id:\s*"([^"]+)",[\s\S]*?\},/g;
let match;
while ((match = lineRegex.exec(사철Section)) !== null) {
  const lineId = match[1];
  const lineContent = match[0];
  lineObjects.push({ id: lineId, content: lineContent });
}

console.log(`총 ${lineObjects.length}개 노선 발견`);

// 각 회사별로 노선 분류
const companyLines = {};
const remainingLines = [];

lineObjects.forEach(line => {
  let found = false;
  for (const [company, lineIds] of Object.entries(companyMapping)) {
    if (lineIds.includes(line.id)) {
      if (!companyLines[company]) {
        companyLines[company] = [];
      }
      companyLines[company].push(line.content);
      found = true;
      break;
    }
  }
  if (!found) {
    remainingLines.push(line.content);
  }
});

console.log('\n회사별 노선 수:');
Object.entries(companyLines).forEach(([company, lines]) => {
  console.log(`  ${company}: ${lines.length}개`);
});
console.log(`  기타 (사철로 유지): ${remainingLines.length}개`);
