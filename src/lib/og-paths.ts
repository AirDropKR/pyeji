// 공유 미리보기 이미지 주소. 파일 이름에 빌드 날짜(한국)를 붙여 새로 공유하는 링크가 최신 이미지를 받게 한다
// 매일 자동 재빌드 때 새 날짜로 다시 만들어지고, 지난 날짜 파일은 빌드 결과에 남지 않는다
import { buildNow } from './time';

export function ogDate(now = buildNow()): string {
  const d = new Date(now + 9 * 3_600_000);
  const p = (n: number) => String(n).padStart(2, '0');
  return `${d.getUTCFullYear()}${p(d.getUTCMonth() + 1)}${p(d.getUTCDate())}`;
}

/** kind: default | game | season | post. id는 게임 id, 시즌 id, 게시글 id(슬래시 포함 가능) */
export function ogKey(kind: 'default' | 'game' | 'season' | 'post', id = ''): string {
  return kind === 'default' ? 'default' : `${kind}-${id.replace(/\//g, '-')}`;
}

export const ogPath = (kind: 'default' | 'game' | 'season' | 'post', id = '') => `/og/${ogKey(kind, id)}-${ogDate()}.png`;
