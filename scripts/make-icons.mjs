// 홈 화면 앱 아이콘 만들기: 주섬이 아이콘(jusumi-base-icon)을 종이색 바탕에 올린다
// 실행: node scripts/make-icons.mjs  → public/icons/ (사이트용), drafts/icons/ (교체 후보)
import sharp from 'sharp';
import { mkdirSync } from 'node:fs';

const SRC = 'src/assets/mascot/original/jusumi-base-icon.png';
const PAPER = '#e8e4da';

async function make(out, size, scale) {
  const inner = Math.round(size * scale);
  const icon = await sharp(SRC).resize(inner, inner, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } }).toBuffer();
  await sharp({ create: { width: size, height: size, channels: 4, background: PAPER } })
    .composite([{ input: icon, gravity: 'center' }])
    .png({ compressionLevel: 9 })
    .toFile(out);
  console.log(out);
}

mkdirSync('public/icons', { recursive: true });
mkdirSync('drafts/icons', { recursive: true });
await make('public/icons/icon-192.png', 192, 0.86);
await make('public/icons/icon-512.png', 512, 0.86);
// 마스커블: 런처가 원·둥근 사각형으로 잘라도 남도록 가운데 64% 안에
await make('public/icons/icon-maskable-512.png', 512, 0.64);
// apple-touch-icon 교체 후보 (지금 쓰는 public/apple-touch-icon.png는 그대로)
await make('drafts/icons/apple-touch-icon-jusumi.png', 180, 0.86);
