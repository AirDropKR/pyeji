// 정적 페이지라 빌드 시점 숫자가 굳어 있으므로, 브라우저에서 D-day와 진행률을 다시 계산한다
import { daysUntil, ddayLabel, formatKst } from '../lib/time';
import { pickNext, type MonthItem } from '../lib/month';

const KST_OFFSET_MIN = -540; // getTimezoneOffset 기준 한국 시간
const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

/** 방문자 기기 시간대로 표시. formatKst와 같은 모양 */
function formatLocal(ms: number): string {
  const d = new Date(ms);
  const h = d.getHours();
  const m = d.getMinutes();
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return `${d.getMonth() + 1}월 ${d.getDate()}일(${WEEKDAYS[d.getDay()]}) ${h < 12 ? '오전' : '오후'} ${h12}시${m ? ` ${m}분` : ''}`;
}

const pad = (n: number) => String(n).padStart(2, '0');

function tickCountdowns(now: number) {
  document.querySelectorAll<HTMLElement>('[data-countdown]').forEach((el) => {
    const target = Date.parse(el.dataset.countdown!);
    if (el.dataset.precision === 'day') {
      const days = daysUntil(el.dataset.countdown!, now);
      el.textContent = days > 0 ? `${days}일` : '오늘';
      return;
    }
    const ms = target - now;
    if (ms <= 0) {
      el.textContent = '시작됨';
      return;
    }
    const d = Math.floor(ms / 86_400_000);
    const h = Math.floor((ms % 86_400_000) / 3_600_000);
    const m = Math.floor((ms % 3_600_000) / 60_000);
    const s = Math.floor((ms % 60_000) / 1000);
    el.textContent = `${d}일 ${pad(h)}시간 ${pad(m)}분 ${pad(s)}초`;
  });
}

/** 게시글 표를 가로 스크롤 감싸개로 옮기고 칸마다 머리글 이름표를 붙인다.
 *  좁은 화면에서 칸 3개 이하는 세로로(.stack), 4개 이상은 행마다 카드로(.cards) 쌓는다. 한 번만 실행 */
function enhanceTables() {
  document.querySelectorAll<HTMLTableElement>('.prose table').forEach((table) => {
    if (table.parentElement?.classList.contains('tbl')) return;
    const labels = [...table.querySelectorAll('thead th')].map((th) => th.textContent?.trim() ?? '');
    table.querySelectorAll('tbody tr').forEach((tr) => {
      tr.querySelectorAll('td').forEach((td, i) => {
        if (labels[i]) td.dataset.label = labels[i];
      });
    });
    const wrap = document.createElement('div');
    // 칸 3개 이하는 .stack(560px 이하에서 세로), 4개 이상은 .cards(480px 이하에서 행마다 카드)
    wrap.className = labels.length && labels.length <= 3 ? 'tbl stack' : labels.length >= 4 ? 'tbl cards' : 'tbl';
    table.replaceWith(wrap);
    wrap.append(table);
  });
}
enhanceTables();

/** 유튜브: 썸네일 버튼을 누르면 그때 youtube-nocookie 플레이어를 불러와 바로 재생 */
document.addEventListener('click', (e) => {
  const btn = (e.target as HTMLElement).closest('.yt-play');
  const frame = btn?.closest<HTMLElement>('[data-yt]');
  if (!frame) return;
  const id = frame.dataset.yt!;
  const start = Number(frame.dataset.ytStart) || 0;
  const iframe = document.createElement('iframe');
  iframe.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0${start ? `&start=${start}` : ''}`;
  iframe.title = frame.dataset.ytTitle ?? 'YouTube';
  iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
  iframe.allowFullscreen = true;
  frame.replaceChildren(iframe);
});

/** 월간 일정 글: 빌드 뒤 시간이 지나 일정이 지났으면 그 달의 다음 일정으로 카운트다운을 옮기고, 다 지났으면 숨긴다 */
function retargetMonth(now: number) {
  document.querySelectorAll<HTMLElement>('[data-month-candidates]').forEach((el) => {
    const next = pickNext(JSON.parse(el.dataset.monthCandidates!) as MonthItem[], now);
    const cd = el.querySelector<HTMLElement>('[data-countdown]');
    const stamp = el.querySelector<HTMLElement>('.stamp[data-dday]');
    const box = el.querySelector<HTMLElement>('.countdown');
    const nextLink = el.querySelector<HTMLElement>('.month-next');
    if (!next) {
      if (box) box.hidden = true;
      if (stamp) stamp.hidden = true;
      if (nextLink) nextLink.hidden = false;
      return;
    }
    if (cd && cd.dataset.countdown !== next.at) {
      cd.dataset.countdown = next.at;
      cd.dataset.precision = next.precision;
      const label = el.querySelector('.cd-label');
      if (label) label.textContent = `${next.label}까지`;
      const note = el.querySelector<HTMLElement>('.cd-note');
      if (note) note.hidden = next.precision !== 'day';
    }
    if (stamp) stamp.dataset.dday = next.at;
  });
}

function update() {
  const now = Date.now();
  retargetMonth(now);
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
  document.querySelectorAll<HTMLElement>('[data-today]').forEach((el) => {
    el.textContent = formatKst(new Date(now).toISOString(), 'day');
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
  // 주요 일정 띠: 오늘 위치 (띠 범위 안일 때만)
  document.querySelectorAll<HTMLElement>('[data-mt]').forEach((el) => {
    const start = Number(el.dataset.rangeStart);
    const end = Number(el.dataset.rangeEnd);
    const mark = el.querySelector<HTMLElement>('[data-mt-today]');
    if (!mark || now < start || now > end) return;
    mark.style.setProperty('--l', `${(((now - start) / (end - start)) * 100).toFixed(2)}%`);
    mark.hidden = false;
  });
  // 한국 밖에서 보는 방문자에게는 기기 시간도 함께
  if (new Date().getTimezoneOffset() !== KST_OFFSET_MIN) {
    document.querySelectorAll<HTMLElement>('[data-local]').forEach((el) => {
      el.textContent = `내 기기 시간 ${formatLocal(Date.parse(el.dataset.local!))}`;
    });
  }
  tickCountdowns(now);
  if (document.querySelector('[data-countdown][data-precision="exact"]')) {
    setInterval(() => tickCountdowns(Date.now()), 1000);
  }
}
update();
