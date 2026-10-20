// 데이터에 넣은 유튜브 영상이 허용된 공식 채널의 영상인지 확인한다 (유튜브 oEmbed의 author_url 비교)
// 사용: npm run check:videos [추가로 검사할 JSON 파일...]  예: npm run check:videos drafts/videos.json
// 네트워크가 필요해서 빌드에는 넣지 않고, 영상을 추가할 때 직접 실행한다
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const channels = JSON.parse(readFileSync('src/data/channels.json', 'utf-8'));
const found = []; // { where, gameId, video }

for (const s of JSON.parse(readFileSync('src/data/seasons.json', 'utf-8'))) {
  for (const v of s.videos ?? []) found.push({ where: `seasons.json ${s.id}`, gameId: s.gameId, video: v });
}

// 게시글 frontmatter의 videos (youtubeId·channel만 간단히 읽는다)
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((f) => (f.isDirectory() ? walk(join(dir, f.name)) : [join(dir, f.name)]));
for (const file of walk('src/content/posts').filter((f) => f.endsWith('.md'))) {
  const fm = readFileSync(file, 'utf-8').split('---')[1] ?? '';
  const gameId = fm.match(/^gameId:\s*(\S+)/m)?.[1];
  const ids = [...fm.matchAll(/youtubeId:\s*["']?([A-Za-z0-9_-]{11})/g)].map((m) => m[1]);
  const chs = [...fm.matchAll(/channel:\s*["']?([a-z0-9-]+)/g)].map((m) => m[1]);
  ids.forEach((id, i) => found.push({ where: file, gameId, video: { youtubeId: id, channel: chs[i] } }));
}

// 추가 파일 (초안): { "<시즌 또는 글 id>": { "gameId": "...", "videos": [...] } }
for (const extra of process.argv.slice(2)) {
  for (const [key, entry] of Object.entries(JSON.parse(readFileSync(extra, 'utf-8')))) {
    if (key.startsWith('_')) continue;
    for (const v of entry.videos ?? []) found.push({ where: `${extra} ${key}`, gameId: entry.gameId, video: v });
  }
}

let failed = 0;
for (const { where, gameId, video } of found) {
  const ch = channels.find((c) => c.id === video.channel);
  const res = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.youtubeId}&format=json`);
  const data = res.ok ? await res.json() : null;
  const ok = ch && ch.games.includes(gameId) && data && data.author_url?.toLowerCase() === ch.url.toLowerCase();
  if (!ok) failed++;
  console.log(`${ok ? '확인' : '실패'}  ${video.youtubeId}  ${data?.author_name ?? '(영상 없음)'}  ${data?.author_url ?? ''}  ← ${where}`);
}
console.log(found.length ? `${found.length}개 중 ${failed}개 실패` : '검사할 영상 없음');
process.exit(failed ? 1 : 0);
