#!/usr/bin/env node
// 모든 src/lines/*.ts 의 노선 객체에 nameKana(카나 읽기)를 data/line.csv 기준으로 부여한다.
// TTS가 한자 노선명을 오독하는 문제 방지용 (예: 山手線 → ヤマテセン(X) / ヤマノテセン(O)).
// 이미 nameKana가 있으면 교체, CSV에 없는 노선은 건드리지 않는다. 멱등.
//   사용: npm run add-line-kana
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LINES_DIR = path.join(ROOT, 'src', 'lines');

// line_cd -> line_name_k (카나)
const kana = new Map();
const rows = fs.readFileSync(path.join(ROOT, 'data', 'line.csv'), 'utf8').replace(/\r/g, '').split('\n').filter(Boolean);
const header = rows[0].split(',');
const iCd = header.indexOf('line_cd');
const iK = header.indexOf('line_name_k');
for (const l of rows.slice(1)) {
  const c = l.split(',');
  if (c[iK]) kana.set(c[iCd], c[iK]);
}

// 앱에서 노선을 분할해 만든 커스텀 id → CSV line_cd (normalize-transfers.mjs와 동일하게 유지)
const LINE_ALIAS = { '113272': '11327' };
// 앱 표시명이 CSV 노선명과 다른 경우의 읽기 강제 (CSV 카나 대신 사용)
const KANA_OVERRIDE = { '11311': 'トッキュウアズサ' }; // 特急あずさ (CSV는 中央本線)

let added = 0, updated = 0, missed = [];
for (const f of fs.readdirSync(LINES_DIR).filter(f => f.endsWith('.ts'))) {
  const file = path.join(LINES_DIR, f);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const out = [];
  let cur = null;
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    const mi = /\bid:\s*"(\d+)"/.exec(ln);
    if (mi) cur = mi[1];
    const mj = /^(\s*)nameJp:\s*"[^"]*",?\s*$/.exec(ln);
    if (!mj || !cur) { out.push(ln); continue; }
    out.push(ln);
    const k = KANA_OVERRIDE[cur] || kana.get(LINE_ALIAS[cur] || cur);
    const hasKana = /^\s*nameKana:/.test(lines[i + 1] || '');
    if (!k) { if (!hasKana) missed.push(`${f} ${cur}`); continue; }
    const field = `${mj[1]}nameKana: "${k}",`;
    if (hasKana) { i++; if (lines[i].trim() !== field.trim()) updated++; }
    else added++;
    out.push(field);
  }
  fs.writeFileSync(file, out.join('\n'));
}
console.log(`nameKana 부여 완료 — 추가: ${added}, 갱신: ${updated}`);
if (missed.length) console.log(`CSV에 카나 없음(유지): ${missed.join(', ')}`);
