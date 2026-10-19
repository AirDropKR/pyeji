// 시즌 공식 이미지 파일(src/assets/seasons/**)을 seasons.json의 file 값으로 찾는다
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('/src/assets/seasons/**/*.{jpg,png,webp}', { eager: true, import: 'default' });

export function seasonImage(file: string): ImageMetadata {
  const img = files[`/src/assets/seasons/${file}`];
  if (!img) throw new Error(`시즌 이미지 파일이 없음: src/assets/seasons/${file}`);
  return img;
}
