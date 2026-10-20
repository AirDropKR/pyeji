// 주섬이 이미지 찾기: jusumi-{게임}-{형태}[-{포즈}].png, 없으면 base로 대체. 3D 버전(-3d)은 쓰지 않는다
import type { ImageMetadata } from 'astro';

const files = import.meta.glob<ImageMetadata>('/src/assets/mascot/original/jusumi-*.png', { eager: true, import: 'default' });

export type MascotForm = 'full' | 'icon';

export function mascotFor(gameId: string | undefined, form: MascotForm, pose?: string): ImageMetadata | undefined {
  const key = (game: string) => `/src/assets/mascot/original/jusumi-${game}-${form}${pose ? `-${pose}` : ''}.png`;
  // 아이콘은 게임별로 만들지 않고 base 하나
  const candidates = form === 'icon' ? ['base'] : [gameId, 'base'].filter(Boolean) as string[];
  for (const g of candidates) {
    const img = files[key(g)] ?? (pose ? files[key(g).replace(`-${pose}.png`, '.png')] : undefined);
    if (img) return img;
  }
  return undefined;
}

/** 크기별 내보내기 폭 (긴 변 기준) */
export const MASCOT_WIDTHS: Record<MascotForm, number[]> = { full: [256, 512, 1024], icon: [48, 96, 192] };
