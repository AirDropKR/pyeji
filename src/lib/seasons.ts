import type { CollectionEntry } from 'astro:content';
import { buildNow } from './time';

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

export type Phase = 'upcoming' | 'current' | 'ended';
export const phaseLabel: Record<Phase, string> = { upcoming: '시작 전', current: '진행 중', ended: '종료' };
export const certaintyLabel = { confirmed: '확정', estimated: '예상' } as const;

/** 시즌이 끝나는 시각: endsAt, 없으면 같은 게임 다음 시즌 시작, 둘 다 없으면 미정 */
export function seasonEnd(season: Season, seasons: Season[]): string | undefined {
  return season.data.endsAt ?? neighbors(season, seasons).next?.data.startsAt;
}

/** 진행 상태는 데이터가 아니라 시각으로 판정한다 (status는 확정/예상 구분만) */
export function phaseOf(season: Season, seasons: Season[], now = buildNow()): Phase {
  if (Date.parse(season.data.startsAt) > now) return 'upcoming';
  const end = seasonEnd(season, seasons);
  return end && Date.parse(end) <= now ? 'ended' : 'current';
}

/** 시즌 단계 기준 일수. 여기만 바꾸면 메인·게임 페이지·시즌 상세·폐지달력이 같이 바뀐다 */
export const FRESH_DAYS = 14; // 시작 후 이 기간 안이면 "막 열림"
export const ENDING_DAYS = 14; // 종료까지 이 기간 안이면 "막차" (종료 시각이 정해진 경우만)
const DAY_MS = 86_400_000;

export type Stage = 'upcoming' | 'fresh' | 'current' | 'ending' | 'ended';
export const stageLabel: Record<Stage, string> = {
  upcoming: '시작 전',
  fresh: '막 열림',
  current: '진행 중',
  ending: '막차',
  ended: '종료',
};

/** 진행 상태(phaseOf)를 더 잘게 나눈 단계. 종료가 가까우면 막 열림보다 막차를 먼저 본다
 *  종료 시각은 endsAt, 없으면 다음 시즌 시작. 다음 시즌이 미발표면 막차가 되지 않는다 */
export function stageOf(season: Season, seasons: Season[], now = buildNow()): Stage {
  const phase = phaseOf(season, seasons, now);
  if (phase !== 'current') return phase;
  const end = seasonEnd(season, seasons);
  if (end && Date.parse(end) - now <= ENDING_DAYS * DAY_MS) return 'ending';
  if (now - Date.parse(season.data.startsAt) < FRESH_DAYS * DAY_MS) return 'fresh';
  return 'current';
}

/** 검색 노출 여부: 끝났고 연결된 글이 없는 시즌은 내용이 얇아 noindex.
 *  astro.config.mjs의 사이트맵 필터도 같은 기준을 쓴다 */
export const isIndexable = (s: Season, seasons: Season[], linkedPostCount: number, now = buildNow()) =>
  phaseOf(s, seasons, now) !== 'ended' || linkedPostCount > 0;

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
export function timelineFor(gameId: string, seasons: Season[], now = buildNow()): GameTimeline {
  const list = sortByStart(seasons.filter((s) => s.data.gameId.id === gameId));
  const current = list.filter((s) => phaseOf(s, seasons, now) === 'current').at(-1);
  const next = list.find((s) => phaseOf(s, seasons, now) === 'upcoming');
  return { current, next, currentEndsAt: current?.data.endsAt ?? next?.data.startsAt };
}
