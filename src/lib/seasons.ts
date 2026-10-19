import type { CollectionEntry } from 'astro:content';

type Season = CollectionEntry<'seasons'>;

export interface GameTimeline {
  current?: Season;
  next?: Season;
  /** 현재 시즌 진행률 계산용 끝 시각 (종료일이 없으면 다음 시즌 시작) */
  currentEndsAt?: string;
}

export function sortByStart(seasons: Season[]) {
  return [...seasons].sort((a, b) => Date.parse(a.data.startsAt) - Date.parse(b.data.startsAt));
}

/** 시즌 상세 페이지 주소 */
export const seasonPath = (s: Season) => `/games/${s.data.gameId.id}/seasons/${s.data.slug}/`;

/** 검색 노출 여부: 끝났고 연결된 글이 없는 시즌은 내용이 얇아 noindex.
 *  astro.config.mjs의 사이트맵 필터도 같은 기준을 쓴다 */
export const isIndexable = (s: Season, linkedPostCount: number) => s.data.status !== 'ended' || linkedPostCount > 0;

/** 같은 게임 안에서 바로 앞·뒤 시즌 */
export function neighbors(season: Season, seasons: Season[]) {
  const list = sortByStart(seasons.filter((s) => s.data.gameId.id === season.data.gameId.id));
  const i = list.findIndex((s) => s.id === season.id);
  return { prev: list[i - 1] as Season | undefined, next: list[i + 1] as Season | undefined };
}

export interface Milestone {
  at: string;
  precision: 'exact' | 'day';
  label: string;
  href?: string;
  /** 이 시즌 시작 (강조) */
  main?: boolean;
}

/** 시즌 주요 일정: 연결된 이벤트 + 직전 시즌 종료 + 이번 시즌 시작·종료를 날짜순으로 */
export function seasonMilestones(season: Season, prev: Season | undefined, events: CollectionEntry<'events'>[]): Milestone[] {
  const s = season.data;
  return [
    ...events
      .filter((e) => e.data.seasonId?.id === season.id)
      .map((e) => ({ at: e.data.startsAt, precision: e.data.timePrecision, label: e.data.title, href: e.data.sourceUrl })),
    ...(prev?.data.endsAt ? [{ at: prev.data.endsAt, precision: 'exact' as const, label: `${prev.data.name} 종료`, href: seasonPath(prev) }] : []),
    { at: s.startsAt, precision: s.timePrecision, label: `${s.name} 시작`, main: true },
    ...(s.endsAt ? [{ at: s.endsAt, precision: 'exact' as const, label: `${s.name} 종료` }] : []),
  ].sort((a, b) => Date.parse(a.at) - Date.parse(b.at));
}

/** 빌드 시점 기준 현재·다음 시즌. 숫자(D-day, 진행률)는 브라우저에서 다시 계산 */
export function timelineFor(gameId: string, seasons: Season[], now = Date.now()): GameTimeline {
  const list = sortByStart(seasons.filter((s) => s.data.gameId.id === gameId));
  const started = list.filter((s) => Date.parse(s.data.startsAt) <= now);
  const current = started
    .filter((s) => !s.data.endsAt || Date.parse(s.data.endsAt) > now)
    .at(-1);
  const next = list.find((s) => Date.parse(s.data.startsAt) > now);
  return { current, next, currentEndsAt: current?.data.endsAt ?? next?.data.startsAt };
}
