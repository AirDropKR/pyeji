// 정적 페이지라 빌드 시점 숫자가 굳어 있으므로, 브라우저에서 D-day와 진행률을 다시 계산한다
import { daysUntil, ddayLabel } from '../lib/time';

function update() {
  const now = Date.now();
  document.querySelectorAll<HTMLElement>('[data-dday]').forEach((el) => {
    el.textContent = ddayLabel(daysUntil(el.dataset.dday!, now));
  });
  document.querySelectorAll<HTMLElement>('[data-progress-start]').forEach((el) => {
    const start = Date.parse(el.dataset.progressStart!);
    const end = Date.parse(el.dataset.progressEnd!);
    const pct = Math.min(100, Math.max(0, ((now - start) / (end - start)) * 100));
    const bar = el.querySelector<HTMLElement>('i');
    if (bar) bar.style.width = `${pct.toFixed(1)}%`;
  });
  document.querySelectorAll<HTMLElement>('[data-elapsed]').forEach((el) => {
    el.textContent = `${-daysUntil(el.dataset.elapsed!, now) + 1}일째`;
  });
}
update();
