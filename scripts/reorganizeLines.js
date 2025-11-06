import fs from 'fs';

const content = fs.readFileSync('src/TokyoMetroMap.jsx', 'utf8');

// 각 회사별 노선 ID 매핑
const companyMapping = {
  "도큐전철": [
    "toyoko-line",
    "den-en-toshi-line",
    "meguro-line",
    "oimachi-line",
    "ikegami-line",
    "tamagawa-line", // 도큐의 tamagawa (첫 번째)
    "setagaya-line"
  ],
  "케이오전철": [
    "keio-new-line",
    "keio-line",
    "sagamihara-line",
    "takao-line",
    "dobutsuen-line",
    "keibajyo-line",
    "inokashira-line"
  ],
  "오다큐전철": [
    "odawara-line",
    "enoshima-line", // 오다큐의 에노시마선
    "tama-line"
  ],
  "도부철도": [
    "isesaki-lineskytree-line",
    "tobu-urban-park-linenoda",
    "tobu-tojo-line",
    "kameido-line",
    "tobu-daishi-line" // 도부의 다이시선 (추정)
  ],
  "케이큐전철": [
    "keikyu-main-line", // 시나가와부터 시작하는 본선
    "airport-line",
    "keikyu-daishi-line", // 케이큐의 다이시선
    "zushi-line",
    "kurihama-line"
  ],
  "케이세이전철": [
    "keisei-main-line", // 케이세이 본선
    "oshiage-line",
    "higashi-narita-line",
    "narita-sky-access-line"
  ],
  "사철": [
    "sotetsu-main-line", // 요코하마부터 시작하는 본선 (소테쓰)
    "izumino-line",
    "minatomirai-line",
    "blue-line",
    "green-line",
    "rinkai-line",
    "tsukuba-express",
    "haneda-airport-line",
    "tama-monorail-line",
    "enoshima-line-shonan", // 쇼난 모노레일의 에노시마선
    "yurikamome-line",
    "saitama-rapid-railway-line",
    "ina-linenew-shuttle",
    "hokuso-line",
    "toyo-rapid-line"
  ]
};

// "도큐전철" 섹션 찾기
const tokyuStart = content.indexOf('  "도큐전철": [');
const tokyuEnd = content.indexOf('  ],', tokyuStart + 1);
let depth = 0;
let i = tokyuStart + '  "도큐전철": ['.length;
while (i < content.length) {
  if (content[i] === '[') depth++;
  else if (content[i] === ']') {
    depth--;
    if (depth === -1) {
      break;
    }
  }
  i++;
}
const tokyuEndActual = i + 1;

// "도큐전철" 섹션 추출
const tokyuSection = content.substring(tokyuStart, tokyuEndActual);

// 각 노선 객체 추출
const lineObjects = [];
const lineRegex = /\{\s*id:\s*"([^"]+)",[\s\S]*?\},/g;
let match;
while ((match = lineRegex.exec(tokyuSection)) !== null) {
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
    // ID로 매칭되지 않는 경우, 이름으로 매칭 시도
    if (line.id.includes('ikebukuro') && !line.id.includes('seibu')) {
      // 세이부의 이케부쿠로선은 이미 세이부철도 섹션에 있음
      if (!companyLines["세이부철도"]) {
        companyLines["세이부철도"] = [];
      }
      companyLines["세이부철도"].push(line.content);
    } else if (line.id.includes('seibu') || line.id.includes('tamako') || line.id.includes('seikouen') || line.id.includes('toshimaen')) {
      // 세이부 노선들
      if (!companyLines["세이부철도"]) {
        companyLines["세이부철도"] = [];
      }
      companyLines["세이부철도"].push(line.content);
    } else if (line.id === 'main-line') {
      // main-line은 여러 개 있으므로 stations로 구분
      // 요코하마부터 시작하면 소테쓰, 시나가와부터 시작하면 케이큐
      if (line.content.includes('요코하마/横浜') && line.content.includes('에비나')) {
        if (!companyLines["사철"]) {
          companyLines["사철"] = [];
        }
        companyLines["사철"].push(line.content.replace('id: "main-line"', 'id: "sotetsu-main-line"'));
      } else if (line.content.includes('시나가와/品川')) {
        if (!companyLines["케이큐전철"]) {
          companyLines["케이큐전철"] = [];
        }
        companyLines["케이큐전철"].push(line.content.replace('id: "main-line"', 'id: "keikyu-main-line"'));
      } else {
        // 케이세이 본선
        if (!companyLines["케이세이전철"]) {
          companyLines["케이세이전철"] = [];
        }
        companyLines["케이세이전철"].push(line.content.replace('id: "main-line"', 'id: "keisei-main-line"'));
      }
    } else if (line.id === 'daishi-line') {
      // 다이시선도 여러 개 있으므로 stations로 구분
      if (line.content.includes('케이큐가와사키')) {
        if (!companyLines["케이큐전철"]) {
          companyLines["케이큐전철"] = [];
        }
        companyLines["케이큐전철"].push(line.content.replace('id: "daishi-line"', 'id: "keikyu-daishi-line"'));
      } else {
        // 도부의 다이시선
        if (!companyLines["도부철도"]) {
          companyLines["도부철도"] = [];
        }
        companyLines["도부철도"].push(line.content.replace('id: "daishi-line"', 'id: "tobu-daishi-line"'));
      }
    } else if (line.id === 'enoshima-line') {
      // 에노시마선도 여러 개
      if (line.content.includes('신유리가오카') || line.content.includes('가라키다')) {
        // 오다큐의 에노시마선은 이미 오다큐전철에 포함됨
        // 이건 쇼난 모노레일의 에노시마선
        if (!companyLines["사철"]) {
          companyLines["사철"] = [];
        }
        companyLines["사철"].push(line.content.replace('id: "enoshima-line"', 'id: "enoshima-line-shonan"'));
      } else {
        // 오다큐의 에노시마선
        if (!companyLines["오다큐전철"]) {
          companyLines["오다큐전철"] = [];
        }
        companyLines["오다큐전철"].push(line.content);
      }
    } else if (line.id === 'tamagawa-line') {
      // 다마가와선도 여러 개
      // 첫 번째는 도큐, 두 번째는 세이부
      const index = lineObjects.findIndex(l => l.id === 'tamagawa-line');
      if (index === lineObjects.indexOf(line)) {
        // 첫 번째 - 도큐
        if (!companyLines["도큐전철"]) {
          companyLines["도큐전철"] = [];
        }
        companyLines["도큐전철"].push(line.content.replace('id: "tamagawa-line"', 'id: "tamagawa-line-tokyu"'));
      } else {
        // 두 번째 - 세이부 (이미 세이부철도 섹션에 있음)
        // 무시
      }
    } else {
      remainingLines.push(line);
    }
  }
});

console.log('\n회사별 노선 수:');
Object.entries(companyLines).forEach(([company, lines]) => {
  console.log(`  ${company}: ${lines.length}개`);
});
console.log(`  매칭되지 않은 노선: ${remainingLines.length}개`);

// 새로운 섹션 생성
let newSections = '';
const order = ["도큐전철", "케이오전철", "오다큐전철", "도부철도", "케이큐전철", "케이세이전철", "사철"];

order.forEach(company => {
  if (companyLines[company] && companyLines[company].length > 0) {
    newSections += `  "${company}": [\n`;
    companyLines[company].forEach((line, index) => {
      newSections += '    ' + line;
      if (index < companyLines[company].length - 1) {
        newSections += '\n';
      }
    });
    newSections += '\n  ],\n';
  }
});

// 기존 섹션을 새 섹션으로 교체
const newContent = content.substring(0, tokyuStart) + newSections + content.substring(tokyuEndActual + 1);

// 파일 저장
fs.writeFileSync('src/TokyoMetroMap.jsx', newContent, 'utf8');
console.log('\n파일이 성공적으로 재구성되었습니다!');

