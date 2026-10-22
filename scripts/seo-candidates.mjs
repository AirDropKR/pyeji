// 서치 콘솔 실적 내보내기에서 개선 후보 검색어 뽑기 (/weekly-seo 명령용)
// 실행: node scripts/seo-candidates.mjs <내보내기 폴더 또는 CSV> [최소 순위=8] [최대 순위=20]
// 서치 콘솔 "내보내기 → CSV 다운로드"의 zip을 푼 폴더(검색어.csv / Queries.csv 포함) 또는 검색어 CSV 하나를 받는다
// 검색어+페이지가 함께 있는 CSV(열에 페이지·Page가 있는 경우)면 페이지도 같이 출력한다
import { readFileSync, existsSync, statSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const [input, minArg, maxArg] = process.argv.slice(2);
const MIN = Number(minArg ?? 8);
const MAX = Number(maxArg ?? 20);
if (!input || !existsSync(input)) {
  console.error('사용: node scripts/seo-candidates.mjs <내보내기 폴더 또는 CSV>');
  process.exit(1);
}

let file = input;
if (statSync(input).isDirectory()) {
  const found = readdirSync(input).find((f) => /^(검색어|쿼리|Queries)\.csv$/i.test(f));
  if (!found) {
    console.error(`검색어 CSV를 찾지 못함. 폴더 안 파일: ${readdirSync(input).join(', ')}`);
    process.exit(1);
  }
  file = join(input, found);
}

// 따옴표 안 쉼표를 처리하는 간단한 CSV 읽기
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let q = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (q) {
      if (c === '"' && text[i + 1] === '"') { cell += '"'; i++; }
      else if (c === '"') q = false;
      else cell += c;
    } else if (c === '"') q = true;
    else if (c === ',') { row.push(cell); cell = ''; }
    else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(cell); rows.push(row); row = []; cell = '';
    } else cell += c;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter((r) => r.some((x) => x.trim()));
}

const rows = parseCsv(readFileSync(file, 'utf-8').replace(/^﻿/, ''));
const head = rows[0].map((h) => h.trim());
const col = (...names) => head.findIndex((h) => names.some((n) => h.toLowerCase().includes(n.toLowerCase())));
const iQuery = col('검색어', '쿼리', 'query');
const iPage = col('페이지', 'page');
const iClicks = col('클릭', 'click');
const iImpr = col('노출', 'impression');
const iPos = col('게재순위', '순위', 'position');
if ([iQuery, iImpr, iPos].some((i) => i < 0)) {
  console.error(`열을 찾지 못함. 머리줄: ${head.join(' | ')}`);
  process.exit(1);
}
const num = (s) => Number(String(s ?? '').replace(/[%\s]/g, '').replace(',', '.')) || 0;

const picked = rows.slice(1)
  .map((r) => ({ query: r[iQuery], page: iPage >= 0 ? r[iPage] : '', clicks: num(r[iClicks]), impr: num(r[iImpr]), pos: num(r[iPos]) }))
  .filter((r) => r.impr > 0 && r.pos >= MIN && r.pos <= MAX)
  .sort((a, b) => b.impr - a.impr);

console.log(`# 개선 후보: 순위 ${MIN}~${MAX}위, 노출 있음 (${file}, ${picked.length}개)\n`);
console.log(`| 검색어 |${iPage >= 0 ? ' 페이지 |' : ''} 노출 | 클릭 | 평균 순위 |`);
console.log(`|---|${iPage >= 0 ? '---|' : ''}---|---|---|`);
for (const r of picked) console.log(`| ${r.query} |${iPage >= 0 ? ` ${r.page} |` : ''} ${r.impr} | ${r.clicks} | ${r.pos.toFixed(1)} |`);
if (iPage < 0) console.log('\n(이 CSV에는 페이지 열이 없음. 검색어마다 해당 페이지는 사이트 글·시즌 페이지와 대조해 정한다)');
