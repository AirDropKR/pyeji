// push 전 점검 (/pre-push 명령용). 먼저 npm run build 후 실행: npm run check:site
// 깨진 내부 링크, 사이트맵 ↔ noindex 일치, 본문이 짧은 검색 노출 페이지, 390px 가로 넘침을 확인한다
// 문제가 있으면 목록을 출력하고 종료 코드 1
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, extname } from 'node:path';
import { createServer } from 'node:http';
import { spawn } from 'node:child_process';

const DIST = 'dist';
const SITE = 'https://pyeji.kr';
const problems = [];
const warnings = [];

if (!existsSync(DIST)) {
  console.error('dist/가 없음. 먼저 npm run build');
  process.exit(1);
}
const walk = (d) => readdirSync(d).flatMap((f) => { const p = join(d, f); return statSync(p).isDirectory() ? walk(p) : [p]; });
const htmlFiles = walk(DIST).filter((p) => p.endsWith('.html'));
const toUrlPath = (file) => '/' + file.slice(DIST.length + 1).split('\\').join('/').replace(/index\.html$/, '');
const exists = (urlPath) => {
  const p = join(DIST, decodeURIComponent(urlPath));
  return existsSync(p) && (statSync(p).isFile() || existsSync(join(p, 'index.html')));
};

// 1. 깨진 내부 링크 (href, src, srcset, og:image 등 사이트 안 주소)
const broken = new Map();
const noindex = new Set();
const thin = [];
for (const f of htmlFiles) {
  const html = readFileSync(f, 'utf-8');
  const page = toUrlPath(f);
  if (/<meta name="robots" content="noindex/.test(html)) noindex.add(page);
  for (const m of html.matchAll(/(?:href|src|srcset|content)="([^"]+)"/g)) {
    for (let u of m[1].split(',').map((x) => x.trim().split(' ')[0])) {
      if (u.startsWith(SITE)) u = u.slice(SITE.length) || '/';
      if (!u.startsWith('/') || u.startsWith('//')) continue;
      u = u.split('#')[0].split('?')[0];
      if (!exists(u)) broken.set(u, [...(broken.get(u) ?? []), page]);
    }
  }
  const main = (html.match(/<main[\s\S]*?<\/main>/) ?? [''])[0]
    .replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
  if (main.length < 300 && !noindex.has(page) && !page.startsWith('/404')) thin.push(`${page} (${main.length}자)`);
}
for (const [u, from] of broken) problems.push(`깨진 내부 링크 ${u} ← ${from.slice(0, 3).join(', ')}${from.length > 3 ? ` 외 ${from.length - 3}곳` : ''}`);
for (const t of thin) warnings.push(`본문이 짧은 검색 노출 페이지 ${t}`);

// 2. 사이트맵 ↔ noindex
const smFile = walk(DIST).find((p) => /sitemap-0\.xml$/.test(p));
const inSitemap = new Set();
if (!smFile) problems.push('사이트맵(sitemap-0.xml)이 없음');
else {
  for (const m of readFileSync(smFile, 'utf-8').matchAll(/<loc>([^<]+)<\/loc>/g)) inSitemap.add(m[1].replace(SITE, ''));
  for (const u of inSitemap) {
    if (!exists(u)) problems.push(`사이트맵에 있는데 페이지가 없음 ${u}`);
    if (noindex.has(u)) problems.push(`사이트맵에 있는데 noindex ${u}`);
  }
  const pages = htmlFiles.map(toUrlPath).filter((p) => !p.startsWith('/404') && !noindex.has(p));
  for (const p of pages) if (!inSitemap.has(p)) warnings.push(`검색 노출 페이지인데 사이트맵에 없음 ${p}`);
}

// 3. 390px 가로 넘침 (엣지 헤드리스. 없으면 건너뜀)
const EDGE = process.env.EDGE_PATH ?? ['C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', 'C:/Program Files/Microsoft/Edge/Application/msedge.exe'].find(existsSync);
const pageList = htmlFiles.map(toUrlPath);
let overflowChecked = false;
if (EDGE) {
  const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.xml': 'application/xml', '.webmanifest': 'application/manifest+json' };
  const harness = (w) => `<html><body><pre id=out>start</pre><script>
try { localStorage.setItem('pyeji:install-dismissed', String(Date.now())); } catch {}
const pages=${JSON.stringify(pageList)};const bad=[];let n=0;
pages.forEach(p=>{const f=document.createElement('iframe');f.style.cssText='width:${w}px;height:600px;border:0';f.src=p;
f.onload=()=>{const d=f.contentDocument.documentElement;if(d.scrollWidth>d.clientWidth)bad.push(p+' '+d.scrollWidth+'/'+d.clientWidth);n++;
document.getElementById('out').textContent='RESULT '+n+'/'+pages.length+' '+JSON.stringify(bad);};document.body.appendChild(f);});
</script></body></html>`;
  const server = createServer((req, res) => {
    const url = new URL(req.url, 'http://x');
    if (url.pathname.startsWith('/__check')) { res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' }); return res.end(harness(url.searchParams.get('w') ?? '390')); }
    let p = join(DIST, decodeURIComponent(url.pathname));
    if (existsSync(p) && statSync(p).isDirectory()) p = join(p, 'index.html');
    if (!existsSync(p)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { 'Content-Type': TYPES[extname(p)] ?? 'application/octet-stream' });
    res.end(readFileSync(p));
  });
  await new Promise((r) => server.listen(0, '127.0.0.1', r));
  const port = server.address().port;
  for (const w of [390]) {
    const out = await new Promise((resolve) => {
      let buf = '';
      const edge = spawn(EDGE, ['--headless=new', '--disable-gpu', '--virtual-time-budget=40000', '--dump-dom', `http://127.0.0.1:${port}/__check?w=${w}`]);
      edge.stdout.on('data', (d) => (buf += d));
      edge.on('close', () => resolve(buf));
      setTimeout(() => edge.kill(), 120_000);
    });
    const m = out.match(/RESULT (\d+)\/(\d+) (\[.*?\])/);
    if (!m) warnings.push(`${w}px 가로 넘침 검사 결과를 읽지 못함`);
    else {
      overflowChecked = true;
      if (m[1] !== m[2]) warnings.push(`${w}px 검사: ${m[2]}개 중 ${m[1]}개만 열림`);
      for (const b of JSON.parse(m[3])) problems.push(`${w}px 가로 넘침 ${b}`);
    }
  }
  server.close();
} else warnings.push('엣지를 찾지 못해 390px 가로 넘침 검사를 건너뜀 (EDGE_PATH로 지정 가능)');

console.log(`# push 전 점검: 페이지 ${htmlFiles.length}개, 사이트맵 ${inSitemap.size}개, noindex ${noindex.size}개${overflowChecked ? ', 390px 검사 완료' : ''}`);
console.log(problems.length ? `\n## 문제 ${problems.length}개\n` + problems.map((p) => `- ${p}`).join('\n') : '\n## 문제 없음');
if (warnings.length) console.log(`\n## 참고 ${warnings.length}개\n` + warnings.map((w) => `- ${w}`).join('\n'));
process.exit(problems.length ? 1 : 0);
