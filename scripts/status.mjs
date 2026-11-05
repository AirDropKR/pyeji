// 현재 상태 요약 (/status 명령용). 실행: npm run status  (PYEJI_NOW=ISO 로 기준 시각 바꾸기)
// 마지막 방문자용 갱신(7일 넘으면 경고), 앞으로 2주 일정, 시각 미발표·종료일 미발표·예상 항목, drafts/ 초안, docs/questions.md의 확인 필요 항목을 출력한다
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const now = process.env.PYEJI_NOW ? Date.parse(process.env.PYEJI_NOW) : Date.now();
const DAY = 86_400_000;
const KST = 9 * 3_600_000;
const WD = ['일', '월', '화', '수', '목', '금', '토'];
const kst = (iso, prec = 'exact') => {
  const d = new Date(Date.parse(iso) + KST);
  const date = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}(${WD[d.getUTCDay()]})`;
  return prec === 'day' ? `${date} 시각 미발표` : `${date} ${String(d.getUTCHours()).padStart(2, '0')}:${String(d.getUTCMinutes()).padStart(2, '0')}`;
};
const json = (p) => JSON.parse(readFileSync(p, 'utf-8'));
const games = Object.fromEntries(json('src/data/games.json').map((g) => [g.id, g.shortName]));
const seasons = json('src/data/seasons.json');
const events = json('src/data/events.json');

console.log(`# 상태 요약 (기준 ${kst(new Date(now).toISOString())} 한국 시간)\n`);

// 0. 마지막 방문자용 갱신 (메인 "최근 갱신"·/updates/와 같은 출처: src/lib/updates.ts)
//    글 처음 쓴 날과 "## 업데이트" 기록, 사이트 공개 뒤 패치 링크, src/data/updates.json. 7일을 넘으면 경고
const SITE_START = '2026-10-19';
const kstDay = (ms) => new Date(ms + KST).toISOString().slice(0, 10);
const today = kstDay(now);
const updateDays = [];
const walkMd = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walkMd(p) : p.endsWith('.md') ? [p] : []; });
const postName = (f) => f.split(/[\\/]/).slice(-2).join('/');
for (const f of walkMd('src/content/posts')) {
  const body = readFileSync(f, 'utf-8').replace(/\r\n/g, '\n');
  const pub = body.match(/^publishedAt:\s*["']?([^"'\n]+)/m)?.[1];
  if (!pub) continue;
  const pubDay = kstDay(Date.parse(pub));
  updateDays.push([pubDay, `새 글 ${postName(f)}`]);
  const log = body.split(/^##\s*업데이트\s*$/m)[1] ?? '';
  for (const m of log.matchAll(/^-\s*(\d{1,2})월\s*(\d{1,2})일\s*:?\s*(.*)$/gm)) {
    // 연도는 처음 쓴 해 기준, 갱신 월이 더 앞이면 다음 해 (src/lib/posts.ts와 같은 기준)
    const month = Number(m[1]);
    const year = Number(pubDay.slice(0, 4)) + (month < Number(pubDay.slice(5, 7)) ? 1 : 0);
    const day = `${year}-${String(month).padStart(2, '0')}-${String(m[2]).padStart(2, '0')}`;
    if (m[3].trim() !== '첫 작성') updateDays.push([day < pubDay ? pubDay : day, `글 갱신 ${postName(f)}: ${m[3].trim()}`]);
  }
}
for (const p of json('src/data/patches.json')) {
  const d = kstDay(Date.parse(p.releasedAt));
  if (d >= SITE_START) updateDays.push([d, `패치 링크 ${games[p.gameId]} ${p.version}`]);
}
for (const u of json('src/data/updates.json')) updateDays.push([u.date, u.text]);
const pastUpdates = updateDays.filter(([d]) => d <= today).sort((a, b) => b[0].localeCompare(a[0]));
const last = pastUpdates[0];
console.log('## 마지막 방문자용 갱신');
if (!last) console.log('- 기록 없음');
else {
  const gap = Math.round((Date.parse(today) - Date.parse(last[0])) / DAY);
  const sameDay = pastUpdates.filter(([d]) => d === last[0]).length;
  console.log(`- ${last[0]} (${gap === 0 ? '오늘' : `${gap}일 전`}) ${last[1]}${sameDay > 1 ? ` 외 ${sameDay - 1}건` : ''}`);
  if (gap > 7) console.log(`- 경고: ${gap}일째 방문자용 갱신 없음. 아래 "앞으로 2주"·"종료일 공식 발표를 기다리는 진행 중 시즌"에서 갱신할 거리를 찾는다`);
  const days30 = new Set(pastUpdates.filter(([d]) => Date.parse(today) - Date.parse(d) < 30 * DAY).map(([d]) => d));
  console.log(`- 최근 30일 중 갱신한 날 ${days30.size}일`);
}
console.log('');

// 1. 앞으로 2주
const soon = [];
const inWindow = (iso) => { const t = Date.parse(iso); return t > now && t <= now + 14 * DAY; };
for (const s of seasons) {
  if (inWindow(s.startsAt)) soon.push([s.startsAt, `${games[s.gameId]} ${s.name} 시작`, s.timePrecision, s.status]);
  if (s.endsAt && inWindow(s.endsAt)) soon.push([s.endsAt, `${games[s.gameId]} ${s.name} 종료`, 'exact', s.status]);
}
for (const e of events) if (inWindow(e.startsAt)) soon.push([e.startsAt, `${games[e.gameId]} ${e.title}`, e.timePrecision, 'confirmed']);
soon.sort((a, b) => Date.parse(a[0]) - Date.parse(b[0]));
// 같은 게임·같은 시각의 일정(시즌 종료와 종료 이벤트 등)은 하나로
const seen = new Set();
const uniq = soon.filter(([at, t]) => { const k = `${Date.parse(at)}|${t.split(' ')[0]}`; if (seen.has(k)) return false; seen.add(k); return true; });
console.log('## 앞으로 2주');
console.log(uniq.length ? uniq.map(([at, t, p, st]) => `- ${kst(at, p)} ${t}${st === 'estimated' ? ' (예상)' : ''}`).join('\n') : '- 없음');

// 2. 시각 발표를 기다리는 것, 예상 일정
const future = (iso) => Date.parse(iso) > now;
const dayItems = [
  ...seasons.filter((s) => future(s.startsAt) && s.timePrecision === 'day').map((s) => `- ${games[s.gameId]} ${s.name} 시작 ${kst(s.startsAt, 'day')} (seasons.json ${s.id})`),
  ...events.filter((e) => future(e.startsAt) && e.timePrecision === 'day').map((e) => `- ${games[e.gameId]} ${e.title} ${kst(e.startsAt, 'day')} (events.json ${e.id})`),
];
console.log('\n## 시각 발표를 기다리는 것 (timePrecision: day)');
console.log(dayItems.join('\n') || '- 없음');
// 진행 중인데 종료일이 없는 시즌: 시즌 페이지 제목이 "종료일: 공식 발표 전". 종료 공지를 확인할 거리
const isCurrent = (s) => {
  if (future(s.startsAt)) return false;
  const next = seasons.filter((o) => o.gameId === s.gameId && Date.parse(o.startsAt) > Date.parse(s.startsAt)).sort((a, b) => Date.parse(a.startsAt) - Date.parse(b.startsAt))[0];
  const end = s.endsAt ?? next?.startsAt;
  return !end || future(end);
};
const noEnd = seasons.filter((s) => isCurrent(s) && !s.endsAt && !s.endsWithNext);
console.log('\n## 종료일 공식 발표를 기다리는 진행 중 시즌');
console.log(noEnd.map((s) => `- ${games[s.gameId]} ${s.name} (${kst(s.startsAt, s.timePrecision)} 시작, ${s.id})${s.endNote ? ` · ${s.endNote}` : ''}`).join('\n') || '- 없음');
const est = seasons.filter((s) => s.status === 'estimated' && (future(s.startsAt) || (s.endsAt && future(s.endsAt))));
console.log('\n## 공식 확인이 덜 된 값 (status: estimated)');
console.log(est.map((s) => `- ${games[s.gameId]} ${s.name} ${kst(s.startsAt, s.timePrecision)} (${s.id})`).join('\n') || '- 없음');
const noKo = seasons.filter((s) => future(s.startsAt) && !/[가-힣]/.test(s.name.replace(/^\S+\s*/, '')) && /[A-Za-z]{3,}/.test(s.name));
if (noKo.length) console.log(noKo.map((s) => `- 한국어 이름 확인 필요: ${games[s.gameId]} ${s.name} (${s.id})`).join('\n'));

// 3. drafts/ 초안
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const drafts = existsSync('drafts') ? walk('drafts').map((p) => p.split('\\').join('/')).filter((p) => !p.endsWith('README.md') && !p.includes('/_')) : [];
console.log('\n## drafts/에 남은 초안');
console.log(drafts.map((p) => `- ${p}`).join('\n') || '- 없음');

// 4. questions.md의 확인 필요·제안 항목 (해결 여부는 사람이 판단)
console.log('\n## docs/questions.md의 확인 필요·제안 항목');
const q = existsSync('docs/questions.md') ? readFileSync('docs/questions.md', 'utf-8').split(/\r?\n/) : [];
let section = '';
let mode = false;
const open = [];
for (const line of q) {
  if (line.startsWith('## ')) { section = line.slice(3); mode = false; continue; }
  if (/^(확인 필요|제안|운영자가 정할 것|보류)/.test(line.trim())) { mode = true; continue; }
  if (/^(결정한 것|공개 전에 갱신할 것)/.test(line.trim()) || !line.trim()) { if (!line.trim()) continue; mode = false; continue; }
  // 끝에 "→ 결정됨"을 붙인 항목은 닫힌 것
  if (mode && /^\s*[-\d]/.test(line) && !line.includes('→ 결정됨')) open.push(`- [${section}] ${line.trim().replace(/^[-\d.]+\s*/, '')}`);
}
console.log(open.join('\n') || '- 없음');
