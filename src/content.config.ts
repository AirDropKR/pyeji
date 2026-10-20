import { defineCollection, reference } from 'astro:content';
import { file, glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 모든 시각은 UTC ISO 8601로 저장 (예: 2026-12-11T15:00:00Z). 화면에서 KST로 변환
const isoDateTime = z.string().datetime({ offset: true });
const slug = z.string().regex(/^[a-z0-9-]+$/);

// 공식 유튜브 영상. 첫 번째가 대표 영상. channel은 src/data/channels.json의 id (공식 채널만)
const videos = z.array(z.object({
  youtubeId: z.string().regex(/^[A-Za-z0-9_-]{11}$/),
  title: z.string(),
  channel: z.string(),
  startSeconds: z.number().int().nonnegative().optional(), // 긴 방송은 해당 장면부터
})).optional();

const games = defineCollection({
  loader: file('src/data/games.json'),
  schema: z.object({
    id: slug, // URL에 쓰임: /games/{id}
    order: z.number().int(),
    name: z.string(),
    shortName: z.string(),
    seasonTerm: z.string(), // 리그, 시즌 등
    themeColor: z.string().regex(/^#[0-9a-fA-F]{6}$/),
    officialUrl: z.string().url().optional(),
  }),
});

const seasons = defineCollection({
  loader: file('src/data/seasons.json'),
  schema: z.object({
    id: z.string(),
    gameId: reference('games'), // games.json에 없는 id면 빌드 실패
    name: z.string(), // 한국어 공식 이름 (국내 서비스사 표기 우선). 예: 0.5 고대의 귀환 · 알두르의 룬
    nameEn: z.string().optional(), // 영어 원제. 예: Return of the Ancients · Runes of Aldur
    slug,
    startsAt: isoDateTime,
    endsAt: isoDateTime.optional(),
    timePrecision: z.enum(['exact', 'day']), // exact: 시각까지 확정, day: 날짜만
    status: z.enum(['confirmed', 'estimated']), // 확정/예상 구분만. 진행·종료는 시각으로 판정 (src/lib/seasons.ts phaseOf)
    sourceUrl: z.string().url(),
    note: z.string().optional(),
    videos,
    // 이번 시즌 핵심 (메인 "지금 줍기 좋은 폐지" 칸 등). 공식 발표에서 뽑은 사실을 직접 쓴 짧은 문장, 최대 3개
    highlights: z.array(z.string().max(60)).max(3).optional(),
    // 공식 배포 이미지. 첫 장이 대표(키아트). 파일은 src/assets/seasons/{시즌id}/ 아래, 출처 표기 필수
    images: z.array(z.object({
      file: z.string().regex(/^[a-z0-9-]+\/[a-z0-9-]+\.(jpg|png|webp)$/), // 예: poe1-3-29/key-art.jpg
      alt: z.string(),
      caption: z.string(),
      credit: z.string(),
      creditUrl: z.string().url(),
    })).optional(),
  }),
});

const events = defineCollection({
  loader: file('src/data/events.json'),
  schema: z.object({
    id: z.string(),
    gameId: reference('games'),
    seasonId: reference('seasons').optional(), // 특정 시즌 관련 일정이면 연결 (시즌 상세 페이지에 표시)
    title: z.string(),
    startsAt: isoDateTime,
    endsAt: isoDateTime.optional(),
    timePrecision: z.enum(['exact', 'day']),
    sourceUrl: z.string().url(),
  }),
});

// 패치 목록: 요약 없이 날짜·버전·공식 링크와 직접 쓴 한 줄만
const patches = defineCollection({
  loader: file('src/data/patches.json'),
  schema: z.object({
    id: z.string(),
    gameId: reference('games'),
    version: z.string(),
    releasedAt: isoDateTime,
    sourceUrl: z.string().url(), // 공식 패치노트
    note: z.string().max(80).optional(), // 직접 쓴 한 줄 설명. 원문 번역 금지
  }),
});

// 사이트의 핵심 콘텐츠. 시즌 오픈 전 공개 정보 정리 글: src/content/posts/{게임id}/{slug}.md
const posts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/posts' }),
  schema: ({ image }) => z.object({
    title: z.string(), // 검색어를 앞쪽에: 게임 약칭(POE2, POE 3.30)과 날짜를 넣는다
    description: z.string().max(160).optional(), // 검색 결과 설명. 게임 풀네임을 한 번 넣는다. 없으면 자동 문구
    gameId: reference('games').optional(), // 없으면 여러 게임을 다루는 공통 글 (월간 일정 등). 화면에는 "공통" 태그
    seasonId: reference('seasons').optional(), // 특정 시즌 관련 글이면 연결
    countdownTo: reference('events').optional(), // D-day 도장이 셀 일정. 없으면 연결된 시즌 시작
    cycleTable: reference('games').optional(), // 넣으면 그 게임의 시즌 주기 표를 데이터에서 자동 생성해 본문 앞에 넣는다
    publishedAt: isoDateTime, // 처음 쓴 시각. 마지막 갱신일은 글 아래 '## 업데이트' 첫 항목에서 자동 계산 (src/lib/posts.ts)
    sourceUrls: z.array(z.string().url()).min(1), // 정보 출처, 하나 이상
    videos,
    // 발표 결과 칸 (엑자일콘 등). 비어 있으면 화면에 나오지 않는다. 사실만, 공식 공지 링크 필수
    reveal: z.object({
      heading: z.string().default('엑자일콘 발표 내용'),
      revealedAt: isoDateTime.optional(), // 발표 시각 (화면에 "한국 시간 ... 발표"로 표시)
      items: z.array(z.string()).min(1),
      sourceUrls: z.array(z.string().url()).min(1),
    }).optional(),
    // 대표 이미지. 공식 배포 이미지만, 출처 표기 필수. 없으면 직접 만든 도장 카드로 대신한다
    // 라스트 에폭(약관상 서면 동의 필요)과 토치라이트(이용 조건 미확인)는 넣지 않는다
    cover: z.object({
      src: image(), // src/assets/posts/{게임id}/ 아래 파일
      alt: z.string(),
      credit: z.string(), // 예: Grinding Gear Games
      creditUrl: z.string().url(), // 이미지를 가져온 공식 페이지
    }).optional(),
  }),
});

export const collections = { games, seasons, events, patches, posts };
