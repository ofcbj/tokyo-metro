import fs from 'fs';

const content = fs.readFileSync('src/TokyoMetroMap.jsx', 'utf8');
const lineDataMatch = content.match(/const lineData = \{([\s\S]*?)\};/);

if (!lineDataMatch) {
  console.error('lineData를 찾을 수 없습니다.');
  process.exit(1);
}

const dataStr = lineDataMatch[1];
const operators = {};

// 운영회사별로 노선 수 세기
const operatorRegex = /"([^"]+)":\s*\[/g;
let match;
let lastIndex = 0;

while ((match = operatorRegex.exec(dataStr)) !== null) {
  const operator = match[1];
  const startIndex = match.index;
  
  // 다음 운영회사나 객체 끝까지 찾기
  let depth = 0;
  let inString = false;
  let escapeNext = false;
  let i = startIndex + match[0].length;
  
  while (i < dataStr.length) {
    const char = dataStr[i];
    
    if (escapeNext) {
      escapeNext = false;
      i++;
      continue;
    }
    
    if (char === '\\') {
      escapeNext = true;
      i++;
      continue;
    }
    
    if (char === '"') {
      inString = !inString;
      i++;
      continue;
    }
    
    if (inString) {
      i++;
      continue;
    }
    
    if (char === '[') {
      depth++;
    } else if (char === ']') {
      depth--;
      if (depth === -1) {
        // 이 운영회사의 배열이 끝남
        const section = dataStr.substring(startIndex, i + 1);
        const lineCount = (section.match(/\{\s*id:/g) || []).length;
        
        if (!operators[operator]) {
          operators[operator] = 0;
        }
        operators[operator] += lineCount;
        break;
      }
    }
    i++;
  }
}

console.log('운영회사별 노선 수:');
Object.entries(operators).forEach(([op, count]) => {
  console.log(`  ${op}: ${count}개 ${count >= 3 ? '(별도 유지)' : '(사철로 통합)'}`);
});

