// 현재 상태 요약 (/status 명령용). 실행: npm run status  (PYEJI_NOW=ISO 로 기준 시각 바꾸기)
// 앞으로 2주 일정, 시각 미발표·예상 항목, drafts/ 초안, docs/questions.md의 확인 필요 항목을 출력한다
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
  if (mode && /^\s*[-\d]/.test(line)) open.push(`- [${section}] ${line.trim().replace(/^[-\d.]+\s*/, '')}`);
}
console.log(open.join('\n') || '- 없음');
