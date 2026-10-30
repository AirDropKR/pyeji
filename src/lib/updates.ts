// 갱신 기록 (/updates/, 메인 "최근 갱신"): 사람이 따로 쓰지 않아도 되게 이미 있는 기록에서 모은다
// - 글: 처음 쓴 날(publishedAt)과 글 아래 "## 업데이트" 기록
// - 패치: 사이트 공개 뒤 게시된 공식 패치노트 링크 (그 전 기록은 한꺼번에 넣은 것이라 src/data/updates.json에 한 줄로)
// - 일정 데이터: src/data/updates.json (seasons·events를 바꾼 작업이 한 줄씩 남긴다)
// 자동 재빌드만 있고 내용이 바뀌지 않은 날은 어디에도 기록이 없으므로 나오지 않는다
import type { CollectionEntry } from 'astro:content';
import { postLog } from './posts';
import { seasonPath } from './seasons';
import { kstIso, buildNow } from './time';

/** 이 날 이전에 게시된 패치는 갱신 기록에 넣지 않는다 (첫 데이터 입력일) */
const SITE_START = '2026-10-19T00:00:00+09:00';

/** 같은 날 안에서 보여 줄 순서: 일정 데이터 → 새 글 → 패치 → 글 갱신 */
export type UpdateKind = 'data' | 'new' | 'patch' | 'edit';
const ORDER: Record<UpdateKind, number> = { data: 0, new: 1, patch: 2, edit: 3 };

export interface UpdateItem {
  kind: UpdateKind;
  /** 한국 날짜 (YYYY-MM-DD) */
  day: string;
  at: number;
  gameId?: string;
  title: string;
  href?: string;
  detail?: string;
}

interface Sources {
  posts: CollectionEntry<'posts'>[];
  patches: CollectionEntry<'patches'>[];
  seasons: CollectionEntry<'seasons'>[];
  games: CollectionEntry<'games'>[];
  updates: CollectionEntry<'updates'>[];
}

export function collectUpdates({ posts, patches, seasons, games, updates }: Sources, now = buildNow()): UpdateItem[] {
  const items: UpdateItem[] = [];
  const day = (iso: string) => kstIso(iso, 'day');

  for (const p of posts) {
    const href = `/posts/${p.id}/`;
    const base = { gameId: p.data.gameId?.id, title: p.data.title, href };
    items.push({ ...base, kind: 'new', day: day(p.data.publishedAt), at: Date.parse(p.data.publishedAt), detail: '새 글' });
    for (const e of postLog(p)) {
      if (e.text === '첫 작성') continue; // publishedAt이 같은 일을 맡는다
      items.push({ ...base, kind: 'edit', day: day(e.at), at: Date.parse(e.at), detail: e.text });
    }
  }

  // 패치: 같은 날 같은 리그는 한 줄로
  const groups = new Map<string, CollectionEntry<'patches'>[]>();
  for (const p of patches) {
    if (Date.parse(p.data.releasedAt) < Date.parse(SITE_START)) continue;
    const key = `${day(p.data.releasedAt)}|${p.data.seasonId?.id ?? p.data.gameId.id}`;
    groups.set(key, [...(groups.get(key) ?? []), p]);
  }
  for (const list of groups.values()) {
    const first = list[0].data;
    const season = seasons.find((s) => s.id === first.seasonId?.id);
    const game = games.find((g) => g.id === first.gameId.id)!;
    items.push({
      kind: 'patch',
      day: day(first.releasedAt),
      at: Math.max(...list.map((p) => Date.parse(p.data.releasedAt))),
      gameId: game.id,
      title: `${game.data.shortName} ${season?.data.name ?? ''} 패치 목록`.replace(/\s+/g, ' '),
      href: season ? seasonPath(season) : `/games/${game.id}/`,
      detail: `${list.map((p) => p.data.version).join(', ')} 공식 패치노트 링크`,
    });
  }

  for (const u of updates) {
    items.push({
      kind: 'data',
      day: u.data.date,
      // 날짜만 있으므로 그날 한국 시간 정오
      at: Date.parse(`${u.data.date}T12:00:00+09:00`),
      gameId: u.data.gameId?.id,
      title: u.data.text,
      href: u.data.href,
    });
  }

  // 글 기록은 시각 없이 날짜만 있으므로 오늘(한국 날짜)까지는 보인다
  const today = day(new Date(now).toISOString());
  return items.filter((i) => i.day <= today).sort((a, b) => b.day.localeCompare(a.day) || ORDER[a.kind] - ORDER[b.kind] || b.at - a.at);
}

/** 한국 날짜별로 묶기 (최신 날짜부터) */
export function byDay(items: UpdateItem[]) {
  const days = new Map<string, UpdateItem[]>();
  for (const i of items) days.set(i.day, [...(days.get(i.day) ?? []), i]);
  return [...days].map(([day, list]) => ({ day, list }));
}

/** 메인처럼 좁은 곳에 쓸 짧은 제목: 글은 제목의 콜론 앞, 일정 데이터는 게임 약칭을 붙인다 */
export function shortTitle(u: UpdateItem, games: CollectionEntry<'games'>[]) {
  if (u.kind === 'new' || u.kind === 'edit') return u.title.split(':')[0].trim();
  const game = games.find((g) => g.id === u.gameId);
  return u.kind === 'data' && game ? `${game.data.shortName} ${u.title}` : u.title;
}
