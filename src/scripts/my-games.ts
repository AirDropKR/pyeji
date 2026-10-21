// 내 게임 고정: 고른 게임을 [data-my-list] 목록의 위로 올리고, [data-my-fold] 목록은 나머지를 접는다
// 선택은 localStorage에 저장해 메인과 /now/가 같이 쓴다. 저장이 막힌 환경에서는 이 화면에서만 유지
const KEY = 'pyeji:my-games';
let memory: string[] = [];

function load(): string[] {
  try {
    const v = JSON.parse(localStorage.getItem(KEY) ?? '[]');
    return Array.isArray(v) ? v.filter((x) => typeof x === 'string') : [];
  } catch {
    return memory;
  }
}
function save(ids: string[]) {
  memory = ids;
  try {
    if (ids.length) localStorage.setItem(KEY, JSON.stringify(ids));
    else localStorage.removeItem(KEY);
  } catch {
    /* 저장이 막혀도 화면은 그대로 동작 */
  }
}

function apply(ids: string[]) {
  const picked = new Set(ids);
  document.querySelectorAll<HTMLElement>('[data-my-chip]').forEach((chip) => {
    chip.setAttribute('aria-pressed', String(picked.has(chip.dataset.myChip!)));
  });
  document.querySelectorAll<HTMLElement>('[data-my-reset]').forEach((b) => (b.hidden = !picked.size));

  document.querySelectorAll<HTMLElement>('[data-my-list]').forEach((list) => {
    const items = [...list.children].filter((el): el is HTMLElement => el instanceof HTMLElement && 'game' in el.dataset);
    items.forEach((el, i) => (el.dataset.myOrder ??= String(i)));
    const byOrder = (a: HTMLElement, b: HTMLElement) => Number(a.dataset.myOrder) - Number(b.dataset.myOrder);
    const mine = items.filter((el) => picked.has(el.dataset.game!)).sort(byOrder);
    const rest = items.filter((el) => !picked.has(el.dataset.game!)).sort(byOrder);
    [...mine, ...rest].forEach((el) => list.append(el));

    if (!('myFold' in list.dataset)) return;
    items.forEach((el) => el.classList.toggle('my-other', mine.length > 0 && !picked.has(el.dataset.game!)));
    let more = list.nextElementSibling as HTMLButtonElement | null;
    if (!more?.matches('[data-my-more]')) {
      more = document.createElement('button');
      more.type = 'button';
      more.className = 'my-more small';
      more.dataset.myMore = '';
      more.addEventListener('click', () => {
        const open = list.classList.toggle('my-open');
        more!.setAttribute('aria-expanded', String(open));
        more!.textContent = open ? '다른 게임 접기' : `다른 게임 ${list.querySelectorAll('.my-other').length}개`;
      });
      list.after(more);
    }
    list.classList.remove('my-open');
    more.hidden = !(mine.length && rest.length);
    more.setAttribute('aria-expanded', 'false');
    more.textContent = `다른 게임 ${rest.length}개`;
  });
}

const bars = document.querySelectorAll<HTMLElement>('[data-my-games]');
if (bars.length) {
  let ids = load();
  apply(ids);
  bars.forEach((bar) => {
    bar.hidden = false;
    bar.addEventListener('click', (e) => {
      const t = e.target as HTMLElement;
      const chip = t.closest<HTMLElement>('[data-my-chip]');
      if (chip) {
        const id = chip.dataset.myChip!;
        ids = ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id];
      } else if (t.closest('[data-my-reset]')) {
        ids = [];
      } else return;
      save(ids);
      apply(ids);
    });
  });
}
