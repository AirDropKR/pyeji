// 리그 스타트 연차 계산기 (/tools/leave-planner/): 시즌 시작일을 포함해 주말·공휴일과 연차를 이어 가장 길게 쉬는 기간
// 날짜는 모두 한국 날짜 'YYYY-MM-DD'. 브라우저와 빌드 양쪽에서 쓰므로 시간대에 기대지 않고 UTC 날짜로만 계산한다
import data from '../data/holidays.json';

const DATE = /^\d{4}-\d{2}-\d{2}$/;
const DAY = 86_400_000;

// 데이터가 틀리면 빌드에서 멈추게 (content 컬렉션이 아니라 스키마 검사가 없으므로)
for (const d of data.days) {
  if (!DATE.test(d.date) || d.date < data.coverage.from || d.date > data.coverage.to || !d.name) {
    throw new Error(`holidays.json: 잘못된 항목 ${JSON.stringify(d)}`);
  }
}

export const holidays = new Map(data.days.map((d) => [d.date, d.name]));
export const holidayCoverage = data.coverage;
export const holidaySources = data.sources;

export const toNum = (date: string) => Date.parse(`${date}T00:00:00Z`) / DAY;
export const toDate = (n: number) => new Date(n * DAY).toISOString().slice(0, 10);
/** 0 일요일 ~ 6 토요일 */
export const weekday = (date: string) => new Date(toNum(date) * DAY).getUTCDay();
export const isWeekend = (date: string) => [0, 6].includes(weekday(date));
export const isOff = (date: string) => isWeekend(date) || holidays.has(date);

export interface Plan {
  from: string;
  to: string;
  /** 쉬는 날 수 (연차 포함) */
  length: number;
  /** 연차를 써야 하는 날 */
  leave: string[];
}

/** 시작일을 포함하고 연차를 최대 maxLeave일 써서 이어 쉴 수 있는 가장 긴 기간.
 *  길이가 같으면 연차를 덜 쓰는 쪽, 그다음 시작일 이후가 더 긴 쪽(리그 시작부터 쉬는 쪽)을 고른다.
 *  시작일이 평일인데 연차가 0이면 undefined */
export function bestPlan(start: string, maxLeave: number, span = 45): Plan | undefined {
  const s = toNum(start);
  let best: { l: number; r: number; used: number } | undefined;
  for (let l = s; l >= s - span; l--) {
    // l부터 시작일까지 써야 하는 연차
    let used = 0;
    for (let i = l; i <= s; i++) if (!isOff(toDate(i))) used++;
    if (used > maxLeave) break; // 더 앞으로 가면 연차만 늘어난다
    let r = s;
    while (r + 1 <= s + span) {
      const extra = isOff(toDate(r + 1)) ? 0 : 1;
      if (used + extra > maxLeave) break;
      used += extra;
      r++;
    }
    // 끝에 붙은 연차는 길이를 늘린 만큼만 의미가 있으므로 그대로 둔다
    const better =
      !best ||
      r - l > best.r - best.l ||
      (r - l === best.r - best.l && (used < best.used || (used === best.used && l > best.l)));
    if (better) best = { l, r, used };
  }
  if (!best) return undefined;
  const days = Array.from({ length: best.r - best.l + 1 }, (_, i) => toDate(best!.l + i));
  return { from: days[0], to: days.at(-1)!, length: days.length, leave: days.filter((d) => !isOff(d)) };
}

/** 계산 범위 안인지 (공휴일 데이터가 있는 기간, 앞뒤 여유 포함) */
export const inCoverage = (date: string, span = 45) =>
  DATE.test(date) && toDate(toNum(date) - span) >= holidayCoverage.from && toDate(toNum(date) + span) <= holidayCoverage.to;

/** 시즌 상세·글에서 계산기로 가는 주소. 시작 전이고 공휴일 자료 범위 안일 때만 */
export function plannerPath(seasonId: string, startsAt: string, now: number): string | undefined {
  if (Date.parse(startsAt) <= now) return undefined;
  const day = new Date(Date.parse(startsAt) + 9 * 3_600_000).toISOString().slice(0, 10);
  return inCoverage(day) ? `/tools/leave-planner/#s=${seasonId}` : undefined;
}
