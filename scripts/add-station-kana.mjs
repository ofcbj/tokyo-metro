#!/usr/bin/env node
// 모든 src/lines/*.ts 의 역 객체에 nameKana(카나 읽기)를 data/station-kana.csv 기준으로 부여한다.
// TTS가 한자 역명을 오독하는 문제 방지용 (예: 御徒町 → ゴトチョウ(X) / おかちまち(O)).
// 매칭: 역명(표기 정규화) → 동명 역이 여럿이면 좌표 최근접 선택. 이미 nameKana가 있으면 교체. 멱등.
//   사용: npm run add-station-kana
// station-kana.csv 출처: https://github.com/Seo-4d696b75/station_database (원본 카나는 히라가나)
import fs from 'fs';
import path from 'path';

const ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const LINES_DIR = path.join(ROOT, 'src', 'lines');

// 표기 차이 흡수: 전각영숫자/공백 → 반각(NFKC), 공백 제거, ケ → ヶ (앱은 ケ, DB는 ヶ 표기),
// 丁目 앞 한자 숫자 → 아라비아 숫자 (앱 六丁目 vs DB ６丁目)
const NUM = { 一: '1', 二: '2', 三: '3', 四: '4', 五: '5', 六: '6', 七: '7', 八: '8', 九: '9', 十: '10' };
const norm = (s) => s.normalize('NFKC').replace(/[\s　]/g, '').replace(/ケ/g, 'ヶ')
  .replace(/[一二三四五六七八九十](?=丁目)/g, (m) => NUM[m]);
// 괄호 병기부 분리 (예: 鷹ノ巣(鷹巣) → 본명 鷹ノ巣 + 병기명 鷹巣, 押上〈スカイツリー前〉 → 押上)
const PAREN = /（([^）]*)）|\(([^)]*)\)|〈([^〉]*)〉/;
const splitName = (s) => {
  const m = PAREN.exec(s);
  return { main: s.replace(new RegExp(PAREN, 'g'), ''), alt: m ? (m[1] || m[2] || m[3]) : null };
};

// name(정규화) → [{kana, lat, lng, closed}]
const byName = new Map();
const push = (m, k, v) => { if (!m.has(k)) m.set(k, []); m.get(k).push(v); };
const rows = fs.readFileSync(path.join(ROOT, 'data', 'station-kana.csv'), 'utf8').replace(/\r/g, '').split('\n').filter(Boolean);
for (const l of rows.slice(1)) {
  const [name, kana, lat, lng, closed] = l.split(',');
  const n = splitName(name);
  const k = splitName(kana);
  const mk = (kanaStr) => ({ kana: kanaStr, lat: +lat, lng: +lng, closed: closed === '1' });
  push(byName, norm(n.main), mk(k.main));
  // 병기명도 색인 (예: 人吉(人吉温泉) [ひとよしおんせん] → 人吉温泉으로도 찾도록)
  if (n.alt) push(byName, norm(n.alt), mk(k.alt || k.main));
}

// CSV에 없는 역의 읽기 강제 (앱 표기 역명 → 카나). 케이블카·개명 전 명칭 등.
const KANA_OVERRIDE = {
  '公園下': 'こうえんしも',           // 箱根登山ケーブルカー (DB 미수록)
  '公園上': 'こうえんかみ',
  '中強羅': 'なかごうら',
  '上強羅': 'かみごうら',
  '早雲山': 'そううんざん',
  '新線新宿': 'しんせんしんじゅく',   // 京王新線 (DB는 新宿으로 통합)
  'モノレール浜松町': 'ものれーるはままつちょう',
  '郡元南': 'こおりもとみなみ',       // 鹿児島市電 남측 승강장
  '松山市駅前': 'まつやましえきまえ', // 伊予鉄 (현 松山市駅)
  '松山駅前': 'まつやまえきまえ',     // 伊予鉄 (현 JR松山駅前)
};

const distKm = (a, b, lat, lng) => Math.hypot((a - lat) * 111, (b - lng) * 91);

let added = 0, updated = 0, missed = [];
for (const f of fs.readdirSync(LINES_DIR).filter((f) => f.endsWith('.ts'))) {
  const file = path.join(LINES_DIR, f);
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    const ln = lines[i];
    // 역 객체만 name: 을 사용 (노선은 nameKo/nameJp) — 뒤따르는 lat/lng로 재확인
    const mn = /^(\s*)name:\s*"([^"]+)",\s*$/.exec(ln);
    if (!mn) { out.push(ln); continue; }
    let j = i + 1;
    const hasKana = /^\s*nameKana:/.test(lines[j] || '');
    if (hasKana) j++;
    const mLat = /^\s*lat:\s*(-?[\d.]+),?\s*$/.exec(lines[j] || '');
    const mLng = /^\s*lng:\s*(-?[\d.]+),?\s*$/.exec(lines[j + 1] || '');
    if (!mLat || !mLng) { out.push(ln); continue; } // 역 객체가 아님
    out.push(ln);
    if (hasKana) i++; // 기존 nameKana 줄은 아래에서 새로 쓴다

    const name = mn[2];
    let kana = KANA_OVERRIDE[name];
    if (!kana) {
      const cands = byName.get(norm(name)) || byName.get(norm(splitName(name).main));
      if (cands) {
        const lat = +mLat[1], lng = +mLng[1];
        // 동명이역은 좌표 최근접으로 선택. 거리가 같으면 영업 중인 역 우선.
        const best = cands
          .map((c) => ({ ...c, d: distKm(c.lat, c.lng, lat, lng) }))
          .sort((a, b) => a.d - b.d || a.closed - b.closed)[0];
        kana = best.kana;
      }
    }
    if (!kana) { missed.push(`${f} ${name}`); continue; }
    const field = `${mn[1]}nameKana: "${kana}",`;
    if (hasKana) { if (lines[i].trim() !== field.trim()) updated++; }
    else added++;
    out.push(field);
  }
  fs.writeFileSync(file, out.join('\n'));
}
console.log(`역 nameKana 부여 완료 — 추가: ${added}, 갱신: ${updated}`);
if (missed.length) console.log(`카나 못 찾음(유지, ${missed.length}건): ${missed.join(', ')}`);
