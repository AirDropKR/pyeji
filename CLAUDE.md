# 폐지.com (pyeji.kr)

핵앤슬래시 시즌제 게임의 리그·시즌 시작일과 사전 공개 정보를 한국어로 한눈에 보여주는 정적 사이트.
패치노트 번역·요약은 하지 않는다. 패치는 날짜·버전·공식 링크 목록만 제공.
목표: 광고 수익 월 10만 원 이상. 첫 대형 이벤트: 2026-12-12 PoE2 정식 출시.

## 대상 게임
poe2, poe1, d4(디아블로 4), le(라스트 에폭), tli(토치라이트: 인피니트)

## 기술
- Astro (정적 출력) + TypeScript strict
- 상호작용 부분만 React 컴포넌트 (`client:load` 등으로 필요한 곳에만)
- 방문자 쪽 데이터베이스 없음. 일정·패치 목록은 `src/data/*.json`, 게시글은 `src/content/posts/**/*.md`, 스키마는 `src/content.config.ts`
- 배포: Cloudflare Workers 프로젝트 (Git 연동, main push 시 자동 배포. 빌드 `npm run build`, 출력 `dist`). 배포 설정은 대시보드에서 관리하므로 건드리지 않는다. wrangler 설정 파일이 생기면 수정 전에 확인받기
- Node: `.nvmrc`는 22 유지 (로컬은 24 사용 중)

## 폴더
- `src/data/` JSON 데이터 (games, seasons, events, patches)
  - events: 공개 방송, 사전 다운로드 시작 등 시즌 전후 일정
  - patches: 패치 목록. 요약 본문 없음
- `src/content/posts/{게임id}/{slug}.md` 사전 공개 정보 게시글. 사이트의 핵심 콘텐츠. 형식은 `_template.md.example` 참고
- `src/content.config.ts` 컬렉션 스키마. 데이터가 스키마와 다르거나 없는 gameId를 참조하면 빌드 실패가 정상
- `src/components/` React·Astro 컴포넌트
- `src/lib/` 공용 함수 (시간 변환 등)
- `src/pages/` 라우트

## 데이터 규칙
- 모든 시각은 UTC ISO 8601로 저장 (`2026-12-11T15:00:00Z`). 화면에서만 KST로 변환 (`src/lib/time.ts`)
- 시각이 확정되지 않았으면 `timePrecision: "day"`, 확정되면 `"exact"`
- 시즌 상태: `confirmed`(공식 발표) / `estimated`(과거 주기로 계산한 예상) / `ended`
- `sourceUrl`은 필수. 가능하면 공식 출처
- `id`와 `slug`는 소문자 영문, 숫자, 하이픈만

## 콘텐츠 규칙
- 패치노트를 번역하거나 요약하지 않는다. 패치는 목록과 공식 링크, 직접 쓴 한 줄 설명까지만
- 게시글은 발표에서 사실(날짜, 시각, 이름, 공개된 기능)만 뽑아 직접 쓴 문장으로. 원문 문장을 옮기거나 번역하지 않는다
- 게시글은 시즌 시작 전까지 같은 파일을 계속 갱신하고, 맨 아래 업데이트 기록을 남긴다
- 게시글은 출처를 하나 이상 달고, 확정된 정보와 추측을 구분해서 쓴다
- 예상 일정은 화면에 반드시 "예상"으로 표시

## 화면
- `src/layouts/Base.astro` 공통 레이아웃, `src/styles/global.css` 디자인 토큰
- 콘셉트: 재생지(크라프트지) 위에 찍은 날짜 도장. 튀는 요소는 D-day 도장 하나뿐, 나머지는 조용하게
- D-day·진행률은 빌드 시점 값이 굳지 않도록 `src/scripts/live.ts`가 브라우저에서 다시 계산
- 시간 표기는 `formatKst`만 사용 (로케일 데이터에 의존하지 않게 직접 계산)

## 작업 원칙
- 지금 필요한 필드만 둔다. 직업 목록, 수집 출처 같은 구조는 실제로 필요해질 때 추가
- 각 작업이 끝날 때마다 `npm run build`가 통과하는 상태 유지
- 새 기능보다 데이터 정확성이 우선
- 커밋 메시지: `feat:`, `fix:`, `data:`, `docs:` 접두어
