// 게시글 RSS 2.0 피드 (네이버 서치어드바이저·구글 제출용). 새 의존성 없이 직접 만든다
import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { postModified } from '../lib/posts';

const esc = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const GET: APIRoute = async ({ site }) => {
  const base = site ?? new URL('https://pyeji.kr');
  const games = await getCollection('games');
  const posts = (await getCollection('posts')).sort(
    (a, b) => Date.parse(postModified(b)) - Date.parse(postModified(a)),
  );
  const items = posts.map((p) => {
    const link = new URL(`/posts/${p.id}/`, base).href;
    const game = games.find((g) => g.id === p.data.gameId.id);
    const desc = p.data.description ?? p.data.title;
    return `    <item>
      <title>${esc(p.data.title)}</title>
      <link>${link}</link>
      <guid isPermaLink="true">${link}</guid>
      <pubDate>${new Date(postModified(p)).toUTCString()}</pubDate>
      ${game ? `<category>${esc(game.data.name)}</category>` : ''}
      <description>${esc(desc)}</description>
    </item>`;
  });
  const latest = posts[0] ? new Date(postModified(posts[0])).toUTCString() : new Date().toUTCString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>폐지.com 사전 정보</title>
    <link>${base.href}</link>
    <atom:link href="${new URL('/rss.xml', base).href}" rel="self" type="application/rss+xml" />
    <description>핵앤슬래시 시즌제 게임의 리그·시즌 시작일과 사전 공개 정보를 한국 시간으로 정리.</description>
    <language>ko-KR</language>
    <lastBuildDate>${latest}</lastBuildDate>
${items.join('\n')}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
