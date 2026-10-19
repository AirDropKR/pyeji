import { useEffect, useState } from 'react';

type Props = { target: string; label?: string };

function diff(target: number, now: number) {
  const ms = Math.max(0, target - now);
  const d = Math.floor(ms / 86_400_000);
  const h = Math.floor((ms % 86_400_000) / 3_600_000);
  const m = Math.floor((ms % 3_600_000) / 60_000);
  const s = Math.floor((ms % 60_000) / 1000);
  return { ms, d, h, m, s };
}

export default function Countdown({ target, label }: Props) {
  const t = new Date(target).getTime();
  // 서버 렌더 시점 값과 어긋나지 않도록 첫 렌더는 null
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  if (now === null) return <span>{label ?? ''} 계산 중</span>;
  const { ms, d, h, m, s } = diff(t, now);
  if (ms === 0) return <span>{label ?? ''} 시작됨</span>;
  return (
    <span>
      {label ? `${label} ` : ''}
      {d}일 {h}시간 {m}분 {s}초
    </span>
  );
}
