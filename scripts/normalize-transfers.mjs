#!/usr/bin/env node
// 모든 src/lines/*.ts 의 환승역 메타데이터(transfer, groupId)를 data/ CSV의
// station_g_cd 기준으로 재계산한다.
//   규칙: 어떤 역이, 데이터에 실제 존재하는(lines 파일에 들어있는) 노선 2개 이상과
//         같은 station_g_cd(동일 물리 역/환승 그룹)를 공유하면 환승역.
//   - transfer: true  를 부여/제거
//   - groupId: <station_g_cd>  를 부여/제거 (팝업에서 같은 환승역의 노선들을 묶는 데 사용)
// 지역/노선을 추가·삭제한 뒤 이 스크립트를 돌리면 항상 정확해진다.
//   사용: npm run normalize-transfers
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const DATA = path.join(ROOT, 'data');
const LINES_DIR = path.join(ROOT, 'src', 'lines');

function parseCSV(file) {
  const text = fs.readFileSync(path.join(DATA, file), 'utf8').replace(/\r/g, '');
  const rows = text.split('\n').filter(l => l.length);
  const header = rows[0].split(',');
  return rows.slice(1).map(l => {
    const c = l.split(',');
    const o = {}; header.forEach((h, i) => (o[h] = c[i])); return o;
  });
}

// (line_cd, station_name) -> station_g_cd
// 활성 역(e_status 0) 우선. 폐역(2)도 폴백으로 넣는다 — BRT 전환 구간처럼
// CSV상 폐지됐지만 앱에는 살아있는 노선의 환승 판정에 필요 (활성 키는 덮어쓰지 않음).
const key2g = new Map();
const csvRows = parseCSV('station.csv');
for (const s of csvRows) {
  if (s.e_status !== '0') continue;
  key2g.set(`${s.line_cd} ${s.station_name}`, s.station_g_cd);
}
for (const s of csvRows) {
  if (s.e_status !== '2') continue;
  const k = `${s.line_cd} ${s.station_name}`;
  if (!key2g.has(k)) key2g.set(k, s.station_g_cd);
}

// 앱에서 노선을 분할해 만든 커스텀 id → CSV line_cd (CSV에 없는 id는 여기 등록)
const LINE_ALIAS = {
  '113272': '11327', // JR成田線（我孫子支線） → JR成田線
  '112242': '11224', // JR気仙沼線BRT → JR気仙沼線 (쓰나미 폐지 구간의 BRT 전환)
  '112082': '11208', // JR大船渡線BRT → JR大船渡線 (동상)
};
// 노선이 CSV의 노선 구간을 넘어 연장 운행하는 경우의 역 단위 보정: "앱lineId 역명" → "CSV line_cd 역명"
const KEY_ALIAS = { '11311 松本': '11409 松本' }; // 特急あずさ의 松本는 CSV상 篠ノ井線 소속
const lookupG = (lineId, name) =>
  key2g.get(KEY_ALIAS[`${lineId} ${name}`] || `${LINE_ALIAS[lineId] || lineId} ${name}`);

const opFiles = fs.readdirSync(LINES_DIR).filter(f => /\.ts$/.test(f)).map(f => path.join(LINES_DIR, f));

const RE_ID = /\bid:\s*"(\d+)"/;
const RE_NAME = /(?<![\w])name:\s*"([^"]*)"/;

// --- Pass 1: 노선별 역 수집 → g_cd별 존재하는 노선 집합 ---
const stationsPerFile = new Map();
for (const f of opFiles) {
  const rows = [];
  let cur = null;
  for (const ln of fs.readFileSync(f, 'utf8').split('\n')) {
    const mi = RE_ID.exec(ln); if (mi) { cur = mi[1]; continue; }
    const mn = RE_NAME.exec(ln); if (mn && cur) rows.push({ lineId: cur, name: mn[1] });
  }
  stationsPerFile.set(f, rows);
}
const gcdPresent = new Map();
for (const rows of stationsPerFile.values()) {
  for (const { lineId, name } of rows) {
    const g = lookupG(lineId, name);
    if (!g) continue;
    if (!gcdPresent.has(g)) gcdPresent.set(g, new Set());
    gcdPresent.get(g).add(lineId);
  }
}

// 목표 상태: null(판정불가) | {transfer:false} | {transfer:true, groupId}
function desired(lineId, name) {
  const g = lookupG(lineId, name);
  if (!g) return null;
  return (gcdPresent.get(g)?.size || 0) >= 2 ? { transfer: true, groupId: g } : { transfer: false };
}

// 역 객체(block) 안에서 특정 필드를 원하는 값으로 맞춘다(없으면 추가, 있으면 교체, null이면 제거).
function setField(block, indent, fieldRe, desiredLine) {
  const idx = block.findIndex((l, i) => i > 0 && i < block.length - 1 && fieldRe.test(l));
  if (desiredLine === null) {
    if (idx !== -1) block.splice(idx, 1);
    return;
  }
  if (idx !== -1) { block[idx] = desiredLine; return; }
  // 닫는 '}' 앞에 삽입, 직전 필드에 콤마 보장
  const at = block.length - 1;
  const prev = block[at - 1];
  if (prev !== undefined && !/[,{[]\s*$/.test(prev)) block[at - 1] = prev + ',';
  block.splice(at, 0, desiredLine);
}

const RE_CLOSE = /^\s*\},?\s*$/;
const RE_TRANSFER = /^\s*transfer:/;
const RE_GROUP = /^\s*groupId:/;
let addedT = 0, removedT = 0, unmatched = 0, changed = 0;

for (const f of opFiles) {
  const lines = fs.readFileSync(f, 'utf8').split('\n');
  const out = [];
  let cur = null, i = 0;
  while (i < lines.length) {
    const ln = lines[i];
    const mi = RE_ID.exec(ln); if (mi) { cur = mi[1]; out.push(ln); i++; continue; }
    const mn = /^(\s*)name:\s*"([^"]*)"/.exec(ln);
    if (mn && cur) {
      const indent = mn[1], name = mn[2];
      let k = i;
      while (k < lines.length && !RE_CLOSE.test(lines[k])) k++;
      const block = lines.slice(i, k + 1); // name .. '},'
      const d = desired(cur, name);
      if (d === null) { unmatched++; out.push(...block); i = k + 1; continue; }
      const hadT = block.some(RE_TRANSFER.test.bind(RE_TRANSFER));
      const before = block.join('\n');
      setField(block, indent, RE_TRANSFER, d.transfer ? `${indent}transfer: true,` : null);
      setField(block, indent, RE_GROUP, d.transfer ? `${indent}groupId: ${d.groupId},` : null);
      if (block.join('\n') !== before) changed++;
      if (d.transfer && !hadT) addedT++;
      if (!d.transfer && hadT) removedT++;
      out.push(...block); i = k + 1; continue;
    }
    out.push(ln); i++;
  }
  fs.writeFileSync(f, out.join('\n'));
}

console.log('환승역 메타데이터 정규화 완료 (transfer + groupId)');
console.log(`  transfer 추가(+): ${addedT}`);
console.log(`  transfer 제거(-): ${removedT}`);
console.log(`  변경된 역 객체: ${changed}`);
console.log(`  판정불가(이름 미매칭, 유지): ${unmatched}`);
