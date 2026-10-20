// 월간 일정 글의 카운트다운: 그 달 안의 일정 중 지금 기준 가장 가까운 다음 일정을 고른다
// 빌드(서버)와 브라우저(live.ts)가 같은 함수를 써서 결과가 어긋나지 않게 한다

export interface MonthItem {
  at: string;
  label: string;
  precision: 'exact' | 'day';
}

const KST = 9 * 3_600_000;

/** "2026-11" → 한국 시간 그 달 1일 0시 ~ 다음 달 1일 0시 (UTC ms) */
export function monthRange(month: string): [number, number] {
  const [y, m] = month.split('-').map(Number);
  return [Date.UTC(y, m - 1, 1) - KST, Date.UTC(y, m, 1) - KST];
}

/** 다음 달 "YYYY-MM" */
export function nextMonth(month: string): string {
  const [y, m] = month.split('-').map(Number);
  return m === 12 ? `${y + 1}-01` : `${y}-${String(m + 1).padStart(2, '0')}`;
}

/** 지금보다 뒤인 첫 일정. 목록은 시각순으로 정렬돼 있어야 한다 */
export function pickNext(items: MonthItem[], now: number): MonthItem | undefined {
  return items.find((i) => Date.parse(i.at) > now);
}
