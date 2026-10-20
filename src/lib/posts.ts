// 게시글 날짜: 처음 쓴 날은 publishedAt, 마지막 갱신일은 글 아래 "## 업데이트" 첫 항목의 날짜에서 자동으로 읽는다
// (업데이트 기록은 갱신할 때마다 남기는 규칙이라 수정일을 따로 고칠 필요가 없다)
import type { CollectionEntry } from 'astro:content';

const KST_OFFSET = 9 * 3600_000;

/** 마지막 갱신 시각(ISO). 업데이트 기록이 없거나 못 읽으면 publishedAt */
export function postModified(post: CollectionEntry<'posts'>): string {
  const published = post.data.publishedAt;
  const body = post.body ?? '';
  const section = body.split(/^##\s*업데이트\s*$/m)[1];
  const m = section?.match(/^-\s*(\d{1,2})월\s*(\d{1,2})일/m);
  if (!m) return published;
  const pub = new Date(Date.parse(published) + KST_OFFSET);
  const month = Number(m[1]) - 1;
  const day = Number(m[2]);
  // 연도는 처음 쓴 해 기준. 갱신 월이 더 앞이면 다음 해로 본다
  const year = pub.getUTCFullYear() + (month < pub.getUTCMonth() ? 1 : 0);
  // 갱신 시각은 알 수 없으므로 그날 한국 시간 정오로 둔다. 처음 쓴 시각보다 앞서면 처음 쓴 시각
  const modified = Date.UTC(year, month, day, 12) - KST_OFFSET;
  return new Date(Math.max(modified, Date.parse(published))).toISOString();
}
