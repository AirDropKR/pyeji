const TZ = 'Asia/Seoul';

/** UTC ISO 문자열을 한국 시간으로 표시한다. precision이 day면 날짜만. */
export function formatKst(iso: string, precision: 'exact' | 'day' = 'exact'): string {
  const d = new Date(iso);
  const opts: Intl.DateTimeFormatOptions =
    precision === 'day'
      ? { timeZone: TZ, year: 'numeric', month: 'long', day: 'numeric', weekday: 'short' }
      : { timeZone: TZ, year: 'numeric', month: 'long', day: 'numeric', weekday: 'short', hour: '2-digit', minute: '2-digit' };
  return new Intl.DateTimeFormat('ko-KR', opts).format(d);
}
