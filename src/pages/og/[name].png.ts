// 공유 미리보기 이미지 엔드포인트: 빌드할 때 페이지마다 /og/{종류}-{id}-{날짜}.png 를 만든다
import type { APIRoute } from 'astro';
import { getCollection, type CollectionEntry } from 'astro:content';
import { renderOg, type OgContent } from '../../lib/og';
import { ogKey, ogDate } from '../../lib/og-paths';
import { phaseOf, seasonEnd, stageOf, stageLabel, timelineFor } from '../../lib/seasons';
import { formatKst, daysUntil, ddayLabel, buildNow } from '../../lib/time';

type Season = CollectionEntry<'seasons'>;

/** 시즌 날짜 줄과 D-day: 시작 전은 "11월 14일(토) 오픈", 진행 중은 "… 시작", 끝나면 기간 */
function seasonLine(s: Season, seasons: Season[], now: number) {
  const d = s.data;
  const phase = phaseOf(s, seasons, now);
  const start = formatKst(d.startsAt, 'day');
  if (phase === 'upcoming') {
    return { date: `${start} 오픈`, dday: ddayLabel(daysUntil(d.startsAt, now)), note: d.timePrecision === 'day' ? '시각 미발표' : formatKst(d.startsAt, 'exact').replace(/^.*\) /, '') };
  }
  if (phase === 'current') {
    return { date: `${start} 시작`, dday: ddayLabel(daysUntil(d.startsAt, now)), note: stageLabel[stageOf(s, seasons, now)] };
  }
  const end = seasonEnd(s, seasons);
  return { date: end ? `${start} ~ ${formatKst(end, 'day')}` : `${start} 시작`, note: '종료' };
}

export async function getStaticPaths() {
  const now = buildNow();
  const date = ogDate(now);
  const games = await getCollection('games');
  const seasons = await getCollection('seasons');
  const posts = await getCollection('posts');
  const gameOf = (id: string) => games.find((g) => g.id === id)!;
  const items: OgContent[] = [];

  items.push({ key: ogKey('default'), eyebrow: 'POE · 디아블로 · 토치라이트 · 라스트 에폭', title: '핵앤슬래시 시즌 일정, 한국 시간으로' });

  items.push({ key: ogKey('page', 'now'), eyebrow: '지금 · 모든 게임 한 화면', title: '지금 할 만한 핵앤슬래시 시즌 한눈에' });

  for (const g of games) {
    const { current, next } = timelineFor(g.id, seasons, now);
    const base = { key: ogKey('game', g.id), gameId: g.id, gameColor: g.data.themeColor, title: g.data.name };
    if (next) items.push({ ...base, eyebrow: `다음 ${g.data.seasonTerm} · ${next.data.name}`, ...seasonLine(next, seasons, now) });
    else if (current) items.push({ ...base, eyebrow: `진행 중 ${g.data.seasonTerm} · ${current.data.name}`, ...seasonLine(current, seasons, now) });
    else items.push({ ...base, eyebrow: g.data.shortName });
  }

  for (const s of seasons) {
    const g = gameOf(s.data.gameId.id);
    items.push({ key: ogKey('season', s.id), gameId: g.id, gameColor: g.data.themeColor, eyebrow: g.data.shortName, title: s.data.name, ...seasonLine(s, seasons, now) });
  }

  for (const p of posts) {
    const g = p.data.gameId ? gameOf(p.data.gameId.id) : undefined;
    const s = p.data.seasonId ? seasons.find((x) => x.id === p.data.seasonId!.id) : undefined;
    // 공통 글은 제목만 (연결 시즌이 있어도 한 게임 날짜를 내세우지 않는다)
    const line = g && s ? seasonLine(s, seasons, now) : {};
    items.push({ key: ogKey('post', p.id), gameId: g?.id, gameColor: g?.data.themeColor, eyebrow: g ? `${g.data.shortName}${s ? ` · ${s.data.name}` : ''}` : '핵앤슬래시 공통', title: p.data.title, ...line });
  }

  return items.map((c) => ({ params: { name: `${c.key}-${date}` }, props: { content: c } }));
}

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOg((props as { content: OgContent }).content);
  return new Response(new Uint8Array(png), { headers: { 'Content-Type': 'image/png' } });
};
