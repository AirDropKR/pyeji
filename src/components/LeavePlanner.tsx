// 리그 스타트 연차 계산기: 시즌(또는 날짜)과 연차 일수를 고르면 시작일을 포함해 가장 길게 쉬는 기간을 달력으로 보여 준다
// 서버 없이 브라우저에서만 계산. 선택은 주소 해시(#s=시즌id&n=2 또는 #d=2026-12-12&n=2)로 공유
import { useEffect, useMemo, useState } from 'react';
import { bestPlan, holidays, inCoverage, isWeekend, toDate, toNum, weekday, holidayCoverage, type Plan } from '../lib/leave';

export interface PlannerSeason {
  id: string;
  label: string;
  /** 한국 날짜 */
  start: string;
  estimated: boolean;
}

const WD = ['일', '월', '화', '수', '목', '금', '토'];
const MAX_LEAVE = 10;
const fmt = (d: string) => `${Number(d.slice(5, 7))}월 ${Number(d.slice(8))}일(${WD[weekday(d)]})`;
const span = (p: Plan) => (p.from === p.to ? fmt(p.from) : `${fmt(p.from)} ~ ${fmt(p.to)}`);
const todayKst = () => new Date(Date.now() + 9 * 3_600_000).toISOString().slice(0, 10);

function readHash() {
  const h = new URLSearchParams(location.hash.slice(1));
  const n = Number(h.get('n'));
  return { s: h.get('s') ?? undefined, d: h.get('d') ?? undefined, n: Number.isInteger(n) && n >= 0 && n <= MAX_LEAVE ? n : undefined };
}

export default function LeavePlanner({ seasons }: { seasons: PlannerSeason[] }) {
  const upcoming = useMemo(() => seasons.filter((s) => s.start >= todayKst() && inCoverage(s.start)), [seasons]);
  const [seasonId, setSeasonId] = useState<string>(upcoming[0]?.id ?? 'date');
  const [date, setDate] = useState<string>(upcoming[0]?.start ?? todayKst());
  const [leave, setLeave] = useState(2);
  const [copied, setCopied] = useState(false);

  // 공유 주소에서 시작
  useEffect(() => {
    const apply = () => {
      const { s, d, n } = readHash();
      const found = s && seasons.find((x) => x.id === s);
      if (found) { setSeasonId(found.id); setDate(found.start); }
      else if (d && inCoverage(d)) { setSeasonId('date'); setDate(d); }
      if (n !== undefined) setLeave(n);
    };
    apply();
    addEventListener('hashchange', apply);
    return () => removeEventListener('hashchange', apply);
  }, [seasons]);

  const season = seasons.find((s) => s.id === seasonId);
  const start = season?.start ?? date;
  const valid = inCoverage(start);
  const hash = season ? `s=${season.id}&n=${leave}` : `d=${start}&n=${leave}`;
  useEffect(() => { if (valid) history.replaceState(null, '', `#${hash}`); }, [hash, valid]);

  const plans = useMemo(() => (valid ? Array.from({ length: leave + 1 }, (_, k) => bestPlan(start, k)) : []), [start, leave, valid]);
  const plan = plans.at(-1);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch { /* 복사가 막힌 브라우저는 주소창을 쓰면 된다 */ }
  };

  return (
    <div className="lp">
      <div className="lp-form">
        <label>
          <span className="lp-label">시즌</span>
          <select value={seasonId} onChange={(e) => { setSeasonId(e.target.value); const s = seasons.find((x) => x.id === e.target.value); if (s) setDate(s.start); }}>
            {upcoming.map((s) => <option key={s.id} value={s.id}>{s.label} · {fmt(s.start)}{s.estimated ? ' 예상' : ''}</option>)}
            {season && !upcoming.includes(season) && <option value={season.id}>{season.label} · {fmt(season.start)}</option>}
            <option value="date">날짜 직접 고르기</option>
          </select>
        </label>
        {seasonId === 'date' && (
          <label>
            <span className="lp-label">시작일</span>
            <input type="date" value={date} min={toDate(toNum(holidayCoverage.from) + 45)} max={toDate(toNum(holidayCoverage.to) - 45)} onChange={(e) => setDate(e.target.value)} />
          </label>
        )}
        <label>
          <span className="lp-label">쓸 수 있는 연차</span>
          <select value={leave} onChange={(e) => setLeave(Number(e.target.value))}>
            {Array.from({ length: MAX_LEAVE + 1 }, (_, i) => <option key={i} value={i}>{i}일</option>)}
          </select>
        </label>
      </div>

      {!valid ? (
        <p className="muted">공휴일 자료가 있는 기간({fmt(holidayCoverage.from)} ~ {fmt(holidayCoverage.to)}, 앞뒤 45일 제외) 밖의 날짜</p>
      ) : (
        <>
          <Result plan={plan} start={start} leave={leave} estimated={season?.estimated} />
          <Calendar plan={plan} start={start} />
          {leave > 0 && (
            <div className="tbl">
              <table className="lp-table">
                <thead><tr><th>연차</th><th>쉬는 기간</th></tr></thead>
                <tbody>
                  {plans.map((p, k) => (
                    <tr key={k} className={k === leave ? 'lp-now' : undefined}>
                      <td>{k}일</td>
                      <td>{p ? <>{span(p)} <span className="muted">· {p.length}일</span></> : '시작일이 평일이라 쉬는 날 없음'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <p className="lp-share"><button type="button" className="button" onClick={copy}>{copied ? '주소 복사됨' : '결과 주소 복사'}</button></p>
        </>
      )}
    </div>
  );
}

function Result({ plan, start, leave, estimated }: { plan?: Plan; start: string; leave: number; estimated?: boolean }) {
  if (!plan) return <p className="lp-result">시작일 {fmt(start)}이 평일이라 연차 없이는 쉬는 날 없음</p>;
  const unused = leave - plan.leave.length;
  return (
    <div className="lp-result">
      <p className="lp-span"><b>{span(plan)}</b> <span className="lp-len">{plan.length}일 연속</span></p>
      <p className="small flush">
        {plan.leave.length ? <>연차 {plan.leave.length}일: {plan.leave.map(fmt).join(', ')}</> : '연차 없이 쉬는 기간'}
        {unused > 0 && <span className="muted"> · 남는 연차 {unused}일 (더 써도 연속 기간이 늘지 않음)</span>}
      </p>
      {estimated && <p className="small muted flush">시즌 시작일이 예상 일정</p>}
    </div>
  );
}

function Calendar({ plan, start }: { plan?: Plan; start: string }) {
  const from = plan?.from ?? start;
  const to = plan?.to ?? start;
  // 기간이 걸친 달을 모두 (보통 1~2개월)
  const months: string[] = [];
  for (let m = from.slice(0, 7); m <= to.slice(0, 7); ) {
    months.push(m);
    const [y, mo] = m.split('-').map(Number);
    m = mo === 12 ? `${y + 1}-01` : `${y}-${String(mo + 1).padStart(2, '0')}`;
  }
  const leaveSet = new Set(plan?.leave);
  return (
    <div className="lp-cals">
      {months.map((m) => {
        const first = `${m}-01`;
        const [y, mo] = m.split('-').map(Number);
        const days = new Date(Date.UTC(y, mo, 0)).getUTCDate();
        return (
          <section className="lp-cal" key={m} aria-label={`${y}년 ${mo}월`}>
            <h3 className="lp-month">{y}년 {mo}월</h3>
            <ol className="lp-grid">
              {WD.map((w) => <li key={w} className="lp-wd" aria-hidden="true">{w}</li>)}
              {Array.from({ length: weekday(first) }, (_, i) => <li key={`e${i}`} className="lp-empty" aria-hidden="true" />)}
              {Array.from({ length: days }, (_, i) => {
                const d = `${m}-${String(i + 1).padStart(2, '0')}`;
                const name = holidays.get(d);
                const inPlan = plan && d >= plan.from && d <= plan.to;
                const cls = ['lp-day', inPlan && 'in', leaveSet.has(d) && 'leave', (name || isWeekend(d)) && 'off', name && 'holiday', d === start && 'start'].filter(Boolean).join(' ');
                const what = [d === start && '시즌 시작', leaveSet.has(d) && '연차', name, !name && isWeekend(d) && '주말'].filter(Boolean).join(', ');
                return (
                  <li key={d} className={cls} title={what || undefined}>
                    <span>{i + 1}</span>
                    {what && <span className="sr-only">{what}</span>}
                  </li>
                );
              })}
            </ol>
          </section>
        );
      })}
      <p className="lp-legend small muted">
        <span className="lp-key start" /> 시즌 시작 <span className="lp-key leave" /> 연차 <span className="lp-key in" /> 쉬는 기간 <span className="lp-key holiday" /> 공휴일
      </p>
    </div>
  );
}
