// 게시글 날짜: 처음 쓴 날은 publishedAt, 마지막 갱신일은 글 아래 "## 업데이트" 첫 항목의 날짜에서 자동으로 읽는다
// (업데이트 기록은 갱신할 때마다 남기는 규칙이라 수정일을 따로 고칠 필요가 없다)
import type { CollectionEntry } from 'astro:content';

const KST_OFFSET = 9 * 3600_000;

/** 게임 없는 공통 글의 표시값 (태그, 도장, 색) */
export const COMMON_TAG = { code: '공통', label: '공통', name: '핵앤슬래시 공통', color: '#6A6056' } as const;

/** 글 아래 "## 업데이트" 기록 (위가 최신). 시각은 알 수 없으므로 그날 한국 시간 정오, 처음 쓴 시각보다 앞서면 처음 쓴 시각 */
export function postLog(post: CollectionEntry<'posts'>): { at: string; text: string }[] {
  const published = post.data.publishedAt;
  const section = (post.body ?? '').split(/^##\s*업데이트\s*$/m)[1] ?? '';
  const pub = new Date(Date.parse(published) + KST_OFFSET);
  return [...section.matchAll(/^-\s*(\d{1,2})월\s*(\d{1,2})일\s*:?\s*(.*)$/gm)].map((m) => {
    const month = Number(m[1]) - 1;
    // 연도는 처음 쓴 해 기준. 갱신 월이 더 앞이면 다음 해로 본다
    const year = pub.getUTCFullYear() + (month < pub.getUTCMonth() ? 1 : 0);
    const at = Date.UTC(year, month, Number(m[2]), 12) - KST_OFFSET;
    return { at: new Date(Math.max(at, Date.parse(published))).toISOString(), text: m[3].trim() };
  });
}

/** 마지막 갱신 시각(ISO). 업데이트 기록이 없거나 못 읽으면 publishedAt */
export function postModified(post: CollectionEntry<'posts'>): string {
  return postLog(post)[0]?.at ?? post.data.publishedAt;
}
