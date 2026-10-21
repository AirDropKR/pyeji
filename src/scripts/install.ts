// 홈 화면 추가 버튼: 모바일에서만, 이미 홈 화면 앱으로 실행 중이면 숨김, 닫으면 30일 동안 안 보임
const DISMISS_KEY = 'pyeji:install-dismissed';
const DISMISS_MS = 30 * 86_400_000;

type InstallPrompt = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: string }> };
let deferred: InstallPrompt | undefined;

const box = document.querySelector<HTMLElement>('[data-install]');
const guide = document.querySelector<HTMLDialogElement>('[data-install-guide]');

const isMobile = () => matchMedia('(hover: none) and (pointer: coarse)').matches;
const isStandalone = () =>
  matchMedia('(display-mode: standalone)').matches || (navigator as Navigator & { standalone?: boolean }).standalone === true;
const isIos = () => /iPhone|iPad|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);

function dismissedRecently(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return Boolean(at) && Date.now() - at < DISMISS_MS;
  } catch {
    return false;
  }
}

function hide() {
  if (box) box.hidden = true;
  document.documentElement.classList.remove('has-install');
}

function show() {
  if (!box || isStandalone() || !isMobile() || dismissedRecently()) return;
  box.hidden = false;
  document.documentElement.classList.add('has-install');
}

// 크롬 등: 설치 창을 나중에 버튼으로 띄우기 위해 붙잡아 둔다
addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferred = e as InstallPrompt;
});
addEventListener('appinstalled', hide);

box?.querySelector('[data-install-open]')?.addEventListener('click', async () => {
  if (deferred) {
    await deferred.prompt();
    const { outcome } = await deferred.userChoice;
    deferred = undefined;
    if (outcome === 'accepted') hide();
    return;
  }
  if (!guide) return;
  guide.querySelectorAll<HTMLElement>('[data-guide]').forEach((el) => {
    el.hidden = el.dataset.guide !== (isIos() ? 'ios' : 'other');
  });
  guide.showModal();
});

box?.querySelector('[data-install-close]')?.addEventListener('click', () => {
  try {
    localStorage.setItem(DISMISS_KEY, String(Date.now()));
  } catch {
    /* 저장이 막히면 이번 화면에서만 숨김 */
  }
  hide();
});

show();
