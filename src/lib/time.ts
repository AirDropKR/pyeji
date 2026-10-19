const KST_OFFSET = 9 * 3600_000;
const DAY = 86_400_000;

export type Precision = 'exact' | 'day';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** UTC ISO 문자열을 한국 시간으로 표시. 예: 11월 10일(화) 오전 6시. day면 날짜만.
 *  실행 환경의 로케일 데이터에 따라 결과가 달라지지 않도록 직접 계산한다 */
export function formatKst(iso: string, precision: Precision = 'exact', withYear = false): string {
  const d = new Date(Date.parse(iso) + KST_OFFSET);
  const year = withYear ? `${d.getUTCFullYear()}년 ` : '';
  const date = `${year}${d.getUTCMonth() + 1}월 ${d.getUTCDate()}일(${WEEKDAYS[d.getUTCDay()]})`;
  if (precision === 'day') return date;
  const h = d.getUTCHours();
  const m = d.getUTCMinutes();
  const ampm = h < 12 ? '오전' : '오후';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${date} ${ampm} ${h12}시${m ? ` ${m}분` : ''}`;
}

/** 한국 날짜 기준 일 번호 (D-day 계산용) */
export const kstDay = (ms: number) => Math.floor((ms + KST_OFFSET) / DAY);

/** 대상까지 남은 날 수. 0이면 당일, 음수면 지남 */
export const daysUntil = (iso: string, now = Date.now()) => kstDay(Date.parse(iso)) - kstDay(now);

export function ddayLabel(days: number): string {
  if (days > 0) return `D-${days}`;
  if (days === 0) return 'D-DAY';
  return `D+${-days}`;
}
