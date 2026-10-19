// @ts-check
import { defineConfig } from 'astro/config';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

// 사이트맵에서 뺄 시즌 상세 페이지: 끝났고 연결된 글이 없는 시즌 (페이지의 noindex와 같은 기준, src/lib/seasons.ts isIndexable)
function thinSeasonPaths() {
  const seasons = JSON.parse(readFileSync('src/data/seasons.json', 'utf-8'));
  const linked = new Set();
  const walk = (dir) => {
    for (const f of readdirSync(dir, { withFileTypes: true })) {
      const p = join(dir, f.name);
      if (f.isDirectory()) walk(p);
      else if (f.name.endsWith('.md')) {
        const m = readFileSync(p, 'utf-8').match(/^seasonId:\s*["']?([a-z0-9-]+)/m);
        if (m) linked.add(m[1]);
      }
    }
  };
  walk('src/content/posts');
  // 종료 판정은 src/lib/seasons.ts phaseOf와 같다: endsAt, 없으면 같은 게임 다음 시즌 시작이 지났으면 종료
  const now = process.env.PYEJI_NOW ? Date.parse(process.env.PYEJI_NOW) : Date.now();
  const start = (s) => Date.parse(s.startsAt);
  const ended = (s) => {
    const next = seasons
      .filter((o) => o.gameId === s.gameId && start(o) > start(s))
      .sort((a, b) => start(a) - start(b))[0];
    const end = s.endsAt ?? next?.startsAt;
    return start(s) <= now && end !== undefined && Date.parse(end) <= now;
  };
  return new Set(
    seasons
      .filter((s) => ended(s) && !linked.has(s.id))
      .map((s) => `https://pyeji.kr/games/${s.gameId}/seasons/${s.slug}/`),
  );
}
const thin = thinSeasonPaths();

// https://astro.build/config
export default defineConfig({
  site: 'https://pyeji.kr',
  // Cloudflare가 /about을 /about/으로 리다이렉트하므로 주소는 항상 슬래시로 끝나게 맞춘다
  trailingSlash: 'always',
  integrations: [react(), sitemap({ filter: (page) => !thin.has(page) })]
});
