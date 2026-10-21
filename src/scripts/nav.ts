// 상단 "게임" 펼침 메뉴: 기본 동작은 details/summary(스크립트 없이도 열고 닫힘)
// 여기서는 바깥 클릭, Esc, 메뉴 안 링크 이동 때 닫기만 더한다
const menus = [...document.querySelectorAll<HTMLDetailsElement>('[data-nav-menu]')];
const closeAll = (except?: HTMLDetailsElement) => menus.forEach((m) => m !== except && (m.open = false));

document.addEventListener('click', (e) => {
  const inside = menus.find((m) => m.contains(e.target as Node));
  closeAll(inside);
  if (inside && (e.target as HTMLElement).closest('a')) inside.open = false;
});
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = menus.find((m) => m.open);
  if (!open) return;
  open.open = false;
  open.querySelector('summary')?.focus();
});
// 다른 메뉴로 포커스가 옮겨 가면 닫기 (키보드 이동)
document.addEventListener('focusin', (e) => {
  menus.forEach((m) => m.open && !m.contains(e.target as Node) && (m.open = false));
});
