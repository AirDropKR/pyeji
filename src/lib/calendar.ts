// 폐지달력(/calendar/) 계산: 기간, 월 눈금, 시즌 막대 위치
import type { CollectionEntry } from 'astro:content';
import { sortByStart } from './seasons';
import { buildNow } from './time';

type Season = CollectionEntry<'seasons'>;

const KST_OFFSET = 9 * 3600_000;

export interface Range { start: number; end: number }

export interface Span {
  season: Season;
  start: number;
  end: number;
  /** 종료일이 발표된 시즌인지. 아니면 다음 시즌 시작이나 기간 끝까지 그린다 */
  endKnown: boolean;
  /** 다음 시즌도 종료일도 없어 오른쪽 끝까지 흐리게 이어지는 막대 */
  open: boolean;
}

/** 한국 시간 기준 y년 m월 1일 0시 (m은 0부터, 범위를 넘으면 연도로 넘어감) */
const kstMonthStart = (y: number, m: number) => Date.UTC(y, m, 1) - KST_OFFSET;

/** 이번 달 기준 before개월 전 1일부터 after개월 뒤 말일까지 (기본: 12개월 전 ~ 6개월 뒤) */
export function timelineRange(now = buildNow(), before = 12, after = 6): Range {
  const d = new Date(now + KST_OFFSET);
  const y = d.getUTCFullYear();
  const m = d.getUTCMonth();
  return { start: kstMonthStart(y, m - before), end: kstMonthStart(y, m + after + 1) };
}

/** 기간 안의 위치를 0~100(%)으로. 기간 밖은 양 끝으로 붙인다 */
export function pct(t: number, range: Range): number {
  const clamped = Math.min(Math.max(t, range.start), range.end);
  return ((clamped - range.start) / (range.end - range.start)) * 100;
}

/** 월 눈금. 1월과 첫 눈금에는 연도를 붙인다 */
export function monthTicks(range: Range) {
  const ticks: { at: number; month: number; year?: number }[] = [];
  const d = new Date(range.start + KST_OFFSET);
  for (let i = 0; ; i++) {
    const at = kstMonthStart(d.getUTCFullYear(), d.getUTCMonth() + i);
    if (at >= range.end) break;
    const k = new Date(at + KST_OFFSET);
    const month = k.getUTCMonth() + 1;
    ticks.push({ at, month, year: i === 0 || month === 1 ? k.getUTCFullYear() : undefined });
  }
  return ticks;
}

/** 게임 하나의 시즌 막대. 기간과 겹치는 시즌만 */
export function seasonSpans(gameId: string, seasons: Season[], range: Range): Span[] {
  const list = sortByStart(seasons.filter((s) => s.data.gameId.id === gameId));
  return list
    .map((s, i) => {
      const next = list[i + 1];
      const start = Date.parse(s.data.startsAt);
      const end = s.data.endsAt
        ? Date.parse(s.data.endsAt)
        : next ? Date.parse(next.data.startsAt) : range.end;
      return { season: s, start, end, endKnown: Boolean(s.data.endsAt), open: !s.data.endsAt && !next };
    })
    .filter((sp) => sp.end > range.start && sp.start < range.end);
}
