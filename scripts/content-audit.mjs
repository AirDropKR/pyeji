// 콘텐츠 점검표용 측정 (docs/content-audit.md). 먼저 npm run build 후 실행: node scripts/content-audit.mjs
// 검색 노출 페이지(사이트맵)마다 직접 쓴 본문 분량과 다른 페이지와 겹치는 정도를 마크다운 표로 출력한다
// - 직접 쓴 본문(공백 제외 글자 수)
//   - 게시글: 마크다운 원문에서 표·제목·이미지·HTML·"## 업데이트" 이후·링크만 있는 줄을 뺀 문장
//   - 안내 페이지(소개·개인정보·문의): 제목을 뺀 <main> 전체
//   - 그 밖의 페이지: 화면의 <main>에서 표·목록·정의 목록·제목·링크·도장·스크립트를 뺀 문단(<p>)
// - 겹침: <main>의 문단·목록·표 칸 글(10자 이상) 중 다른 페이지에도 똑같이 있는 글의 비율
import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const DIST = 'dist';
const SITE = 'https://pyeji.kr';
if (!existsSync(DIST)) {
  console.error('dist/가 없음. 먼저 npm run build');
  process.exit(1);
}
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmlOf = (path) => readFileSync(join(DIST, path, 'index.html'), 'utf-8');
const mainOf = (html) => (html.match(/<main[\s\S]*?<\/main>/) ?? [''])[0].replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>|<svg[\s\S]*?<\/svg>/g, '');
const text = (h) => h.replace(/<[^>]+>/g, ' ').replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&#39;|&quot;/g, "'").replace(/\s+/g, ' ').trim();
const count = (s) => s.replace(/\s/g, '').length;

const sitemap = walk(DIST).find((p) => /sitemap-0\.xml$/.test(p));
const pages = [...readFileSync(sitemap, 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].replace(SITE, ''));
const allPages = walk(DIST).filter((p) => p.endsWith('index.html')).map((f) => '/' + f.slice(DIST.length + 1).split('\\').join('/').replace(/index\.html$/, ''));

const kindOf = (p) =>
  p.startsWith('/posts/') && p !== '/posts/' ? '글'
  : /^\/games\/[^/]+\/seasons\//.test(p) ? '시즌'
  : /^\/games\/[^/]+\/$/.test(p) ? '게임'
  : ['/now/', '/calendar/', '/'].includes(p) || p.startsWith('/tools/') ? '도구'
  : ['/about/', '/privacy/', '/contact/'].includes(p) ? '안내'
  : '목록';

// 게시글: 마크다운 원문에서 직접 쓴 문장만
function postWritten(p) {
  const file = join('src/content/posts', p.replace(/^\/posts\//, '').replace(/\/$/, '') + '.md');
  if (!existsSync(file)) return undefined;
  const body = readFileSync(file, 'utf-8').replace(/\r\n/g, '\n').replace(/^---[\s\S]*?\n---\n/, '').split(/^##\s*업데이트\s*$/m)[0];
  const lines = body.split('\n').filter((l) => {
    const t = l.trim();
    if (!t || t.startsWith('|') || t.startsWith('#') || t.startsWith('<') || t.startsWith('![')) return false;
    // 링크 하나만 있는 목록 줄 ("- [제목](/주소/)")
    if (/^[-*]\s*\[[^\]]+\]\([^)]+\)\s*$/.test(t)) return false;
    return true;
  });
  return count(lines.join(' ').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1').replace(/[*_`>-]/g, ''));
}

// 그 밖의 페이지: 표·목록·제목·링크를 뺀 문단
function pageWritten(main) {
  const stripped = main
    .replace(/<table[\s\S]*?<\/table>|<ul[\s\S]*?<\/ul>|<ol[\s\S]*?<\/ol>|<dl[\s\S]*?<\/dl>|<nav[\s\S]*?<\/nav>/g, ' ')
    .replace(/<h[1-6][\s\S]*?<\/h[1-6]>|<a\b[\s\S]*?<\/a>|<figcaption[\s\S]*?<\/figcaption>/g, ' ');
  return [...stripped.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/g)].reduce((n, m) => n + count(text(m[1])), 0);
}

// 겹침 계산용: 페이지별 글 조각(문단·목록·표 칸)
const segOf = (main) => [...main.matchAll(/<(p|li|td|dd|h[1-6]|figcaption)\b[^>]*>([\s\S]*?)<\/\1>/g)]
  .map((m) => text(m[2])).filter((s) => count(s) >= 10);
const segs = new Map(allPages.map((p) => [p, segOf(mainOf(htmlOf(p)))]));
const seen = new Map();
for (const [p, list] of segs) for (const s of new Set(list)) seen.set(s, (seen.get(s) ?? 0) + 1);

const rows = pages.map((p) => {
  const main = mainOf(htmlOf(p));
  const kind = kindOf(p);
  // 안내 페이지는 목록까지 전부 직접 쓴 글
  const written = kind === '글' ? postWritten(p) ?? pageWritten(main)
    : kind === '안내' ? count(text(main.replace(/<h[1-6][\s\S]*?<\/h[1-6]>/g, ' ')))
    : pageWritten(main);
  const list = segs.get(p) ?? [];
  const total = list.reduce((n, s) => n + count(s), 0);
  const dup = list.filter((s) => seen.get(s) > 1).reduce((n, s) => n + count(s), 0);
  return { p, kind, written, total: count(text(main)), overlap: total ? Math.round((dup / total) * 100) : 0 };
});

console.log('| 주소 | 종류 | 직접 쓴 본문 | 화면 전체 | 겹침 |');
console.log('|---|---|---:|---:|---:|');
for (const r of rows) console.log(`| ${r.p} | ${r.kind} | ${r.written} | ${r.total} | ${r.overlap}% |`);
console.log(`\n검색 노출 ${rows.length}개 / 전체 ${allPages.length}개`);
