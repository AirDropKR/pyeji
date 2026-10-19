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
  // 폐지달력: 오늘 선 위치를 잡고, 좁은 화면에서는 오늘이 보이도록 가로 스크롤
  document.querySelectorAll<HTMLElement>('[data-timeline]').forEach((el) => {
    const start = Number(el.dataset.rangeStart);
    const end = Number(el.dataset.rangeEnd);
    const line = el.querySelector<HTMLElement>('[data-today-line]');
    if (!line || now < start || now >= end) return;
    const pct = ((now - start) / (end - start)) * 100;
    line.style.setProperty('--l', `${pct.toFixed(3)}%`);
    line.hidden = false;
    const overlay = line.parentElement!;
    const x = overlay.offsetLeft + (overlay.clientWidth * pct) / 100;
    if (x > el.clientWidth * 0.75) el.scrollLeft = x - el.clientWidth * 0.6;
  });
}
update();
