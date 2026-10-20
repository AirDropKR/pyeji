// 빌드 현황 표시값
import type { CollectionEntry } from 'astro:content';

export type BuildState = 'buffed' | 'nerfed' | 'unchanged' | 'dead' | 'new';
export const buildStateLabel: Record<BuildState, string> = {
  buffed: '강화',
  nerfed: '약화',
  unchanged: '큰 변화 없음',
  dead: '사실상 불가',
  new: '새로 등장',
};
export const directionLabel = { buff: '상향', nerf: '하향', change: '변경' } as const;

export const buildPath = (b: CollectionEntry<'builds'>) => `/builds/${b.id}/`;
/** 리그별 현황 페이지: 그 리그에서 상태가 바뀐(큰 변화 없음 제외) 빌드 */
export const leagueBuildsPath = (s: CollectionEntry<'seasons'>) => `/builds/${s.data.gameId.id}/leagues/${s.data.slug}/`;
export const changedIn = (b: CollectionEntry<'builds'>, seasonId: string) =>
  b.data.leagues.find((l) => l.seasonId.id === seasonId && l.state !== 'unchanged');
