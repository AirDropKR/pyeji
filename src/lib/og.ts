// 공유 미리보기 이미지(1200×630) 그리기: satori로 SVG를 만들고 sharp로 PNG로 바꾼다
// 배경은 사이트 종이색 + 크라프트지 테두리 + 주섬이. 공식 이미지·유튜브 썸네일은 쓰지 않는다
// 핵심 정보는 세로 가운데(위아래 90px 안쪽)에 둬서 카카오톡이 2:1이나 더 좁게 잘라도 남게 한다
import satori from 'satori';
import sharp from 'sharp';
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const W = 1200;
const H = 630;
const FONT_DIR = join(process.cwd(), 'src/assets/fonts');
const MASCOT_DIR = join(process.cwd(), 'src/assets/mascot/original');

const C = { kraft: '#c9af86', paper: '#e8e4da', ink: '#26211d', muted: '#6a6056', stamp: '#2c4a9e' };

let fonts: Parameters<typeof satori>[1]['fonts'] | undefined;
let charset: Set<string> | undefined;
const mascots = new Map<string, { uri: string; w: number; h: number }>();

function loadFonts() {
  fonts ??= [
    { name: 'BHS', data: readFileSync(join(FONT_DIR, 'BlackHanSans-Regular-subset.ttf')), weight: 400, style: 'normal' },
    { name: 'Plex', data: readFileSync(join(FONT_DIR, 'IBMPlexSansKR-Regular-subset.ttf')), weight: 400, style: 'normal' },
    { name: 'Plex', data: readFileSync(join(FONT_DIR, 'IBMPlexSansKR-Bold-subset.ttf')), weight: 700, style: 'normal' },
  ];
  return fonts;
}

/** 서브셋에 없는 글자가 들어오면 빌드 로그에 경고 (그 글자는 이미지에서 빠지거나 대체 글꼴로 보임) */
function warnMissing(key: string, texts: string[]) {
  charset ??= new Set([...readFileSync(join(FONT_DIR, 'charset.txt'), 'utf-8')]);
  const missing = new Set([...texts.join('')].filter((c) => c.trim() && !charset!.has(c)));
  if (missing.size) console.warn(`[og] ${key}: 폰트 서브셋에 없는 글자 ${[...missing].join(' ')} (scripts/subset-fonts.py의 SYMBOLS에 추가)`);
}

async function mascot(gameId?: string) {
  const id = gameId && existsSync(join(MASCOT_DIR, `jusumi-${gameId}-full.png`)) ? gameId : 'base';
  if (!mascots.has(id)) {
    const file = join(MASCOT_DIR, `jusumi-${id}-full.png`);
    if (!existsSync(file)) return undefined;
    const buf = await sharp(file).resize({ height: 460 }).png().toBuffer();
    const meta = await sharp(buf).metadata();
    mascots.set(id, { uri: `data:image/png;base64,${buf.toString('base64')}`, w: meta.width!, h: meta.height! });
  }
  return mascots.get(id);
}

type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown, extra: Record<string, unknown> = {}): Node => ({
  type,
  props: { style, children, ...extra },
});

export interface OgContent {
  key: string; // 로그용
  gameId?: string;
  gameColor?: string;
  eyebrow?: string; // 게임 약칭 등 (작게)
  title: string; // 시즌 이름·글 제목 (크게)
  date?: string; // 날짜 (가장 크게)
  dday?: string; // D-day 도장 (보조)
  note?: string; // 도장 옆 짧은 글
}

export async function renderOg(c: OgContent): Promise<Buffer> {
  warnMissing(c.key, [c.eyebrow ?? '', c.title, c.date ?? '', c.dday ?? '', c.note ?? '', '폐지.com']);
  const m = await mascot(c.gameId);
  const titleSize = c.title.length > 26 ? 50 : c.title.length > 14 ? 60 : 72;
  const tree = h('div', { width: W, height: H, display: 'flex', background: C.kraft, padding: 22, fontFamily: 'Plex' }, [
    h('div', { flex: 1, display: 'flex', alignItems: 'center', background: C.paper, borderRadius: 8, padding: '0 56px 0 24px', position: 'relative' }, [
      m
        ? h('img', { width: Math.round((m.w * 440) / m.h), height: 440, marginRight: 28, flexShrink: 0 }, undefined, { src: m.uri, width: Math.round((m.w * 440) / m.h), height: 440 })
        : h('div', { width: 40 }, ''),
      h('div', { display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 10 }, [
        c.eyebrow ? h('div', { display: 'flex', fontSize: 30, fontWeight: 700, color: c.gameColor ?? C.muted, wordBreak: 'keep-all' }, c.eyebrow) : null,
        h('div', { display: 'flex', fontFamily: 'BHS', fontSize: titleSize, lineHeight: 1.15, color: C.ink, maxHeight: titleSize * 1.15 * 3, overflow: 'hidden', wordBreak: 'keep-all' }, c.title),
        c.date ? h('div', { display: 'flex', fontFamily: 'BHS', fontSize: c.date.length > 16 ? 58 : 76, lineHeight: 1.1, color: C.ink, marginTop: 6 }, c.date) : null,
        c.dday || c.note
          ? h('div', { display: 'flex', alignItems: 'center', gap: 18, marginTop: 14 }, [
              c.dday
                ? h('div', { display: 'flex', padding: 4, border: `3px solid ${C.stamp}`, borderRadius: 12, transform: 'rotate(-4deg)' }, [
                    h('div', { display: 'flex', padding: '4px 16px 0', border: `3px solid ${C.stamp}`, borderRadius: 8, fontFamily: 'BHS', fontSize: 44, color: C.stamp }, c.dday),
                  ])
                : null,
              c.note ? h('div', { display: 'flex', fontSize: 28, color: C.muted }, c.note) : null,
            ].filter(Boolean))
          : null,
      ].filter(Boolean)),
      h('div', { position: 'absolute', right: 36, bottom: 26, display: 'flex', fontFamily: 'BHS', fontSize: 32, color: C.stamp }, '폐지.com'),
    ]),
  ]);
  const svg = await satori(tree as never, { width: W, height: H, fonts: loadFonts() });
  return sharp(Buffer.from(svg)).png({ compressionLevel: 9, palette: true, quality: 90 }).toBuffer();
}
