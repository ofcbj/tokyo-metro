#!/usr/bin/env node
// data/line-colors.json(공식 노선색 테이블)을 src/lines/*.ts 의 color 필드에 적용한다.
// 테이블 출처: ekidata line.csv(line_color_c) + Wikipedia 日本の鉄道ラインカラー一覧 (이름+지역 스코프 매칭).
// 테이블에 없는 노선은 기존 색 유지. 東京メトロ는 앱이 이미 현행 공식 웹 팔레트라 테이블에서 제외되어 있다. 멱등.
//   사용: npm run apply-line-colors
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LINES_DIR = path.join(ROOT, 'src', 'lines');
const table = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'line-colors.json'), 'utf8'));

let changed = 0, kept = 0;
for (const f of fs.readdirSync(LINES_DIR).filter(f => f.endsWith('.ts'))) {
  const file = path.join(LINES_DIR, f);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  let cur = null;
  for (let i = 0; i < lines.length; i++) {
    const mi = /\bid:\s*"(\d+)"/.exec(lines[i]);
    if (mi) { cur = mi[1]; continue; }
    const mc = /^(\s*)color:\s*"([^"]*)"(,?)\s*$/.exec(lines[i]);
    if (!mc || !cur) continue;
    const rec = table[cur];
    if (!rec) { kept++; cur = null; continue; }
    if (mc[2].toUpperCase() !== rec.color.toUpperCase()) {
      lines[i] = `${mc[1]}color: "${rec.color}"${mc[3]}`;
      changed++;
    }
    cur = null; // 노선당 color는 1개 — 역 블록 내 오탐 방지
  }
  fs.writeFileSync(file, lines.join('\n'));
}
console.log(`노선색 적용 완료 — 변경: ${changed}, 테이블 미보유(유지): ${kept}`);
