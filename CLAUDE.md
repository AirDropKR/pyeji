# 폐지.com (pyeji.kr)

핵앤슬래시 시즌제 게임의 리그·시즌 시작일과 사전 공개 정보를 한국어로 한눈에 보여주는 정적 사이트.
패치노트 번역·요약은 하지 않는다. 패치는 날짜·버전·공식 링크 목록만 제공.
목표: 광고 수익 월 10만 원 이상. 첫 대형 이벤트: 2026-12-12 POE2 정식 출시.

## 대상 게임
poe2, poe1, d4(디아블로 4), le(라스트 에폭), tli(토치라이트: 인피니트)

## 기술
- Astro (정적 출력) + TypeScript strict
- 상호작용 부분만 React 컴포넌트 (`client:load` 등으로 필요한 곳에만)
- 방문자 쪽 데이터베이스 없음. 일정·패치 목록은 `src/data/*.json`, 게시글은 `src/content/posts/**/*.md`, 스키마는 `src/content.config.ts`
- 배포: Cloudflare Workers 프로젝트 (Git 연동, main push 시 자동 배포. 빌드 `npm run build`, 출력 `dist`). 배포 설정은 대시보드에서 관리하므로 건드리지 않는다. wrangler 설정 파일이 생기면 수정 전에 확인받기
- Node: `.nvmrc`는 22 유지 (로컬은 24 사용 중)
- 자동 재빌드: `.github/workflows/daily-rebuild.yml`이 매일 한국 시간 오전 7시에 Cloudflare Deploy Hook(GitHub Secret `CF_DEPLOY_HOOK_URL`)을 호출. Actions 화면에서 수동 실행 가능. 저장소에 60일 동안 활동이 없으면 GitHub가 예약 실행을 멈추므로 메일 알림이 오면 다시 켠다

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
- 시즌 `status`는 `confirmed`(공식 발표) / `estimated`(과거 주기로 계산한 예상) 구분만. 시작 전·진행 중·종료는 시각으로 자동 판정 (`src/lib/seasons.ts`의 `phaseOf`: 종료 시각은 `endsAt`, 없으면 같은 게임 다음 시즌 시작). 끝난 시즌을 손으로 바꿀 필요 없음
- 빌드 기준 시각을 바꿔 상태 전환을 확인하려면 `PYEJI_NOW` 환경변수로 빌드 (예: PowerShell `$env:PYEJI_NOW='2026-11-10T00:00:00Z'; npm run build; Remove-Item Env:PYEJI_NOW`)
- 시즌 상세 페이지(`/games/{id}/seasons/{slug}/`): 종료됐고 연결된 글이 없으면 noindex + 사이트맵 제외. 기준은 `src/lib/seasons.ts`의 `isIndexable`과 `astro.config.mjs`의 사이트맵 필터 두 곳에 있으니 함께 고친다
- 이벤트의 `seasonId`(선택)로 시즌 상세 페이지의 "관련 일정"에 연결
- `sourceUrl`은 필수. 가능하면 공식 출처
- `id`와 `slug`는 소문자 영문, 숫자, 하이픈만
- 시즌 이름: `name`은 국내 서비스사의 한국어 공식 이름, `nameEn`은 영어 원제. 업데이트 이름과 리그 이름이 다르면 `·`로 같이 적는다 (예: `0.5 고대의 귀환 · 알두르의 룬` / `Return of the Ancients · Runes of Aldur`)
- 게임 약칭은 대문자로 `POE1`, `POE2` (PoE 아님)

## 말투
- 화면 문구(빈 상태, 라벨, 안내)는 짧은 명사형: "다음 시즌 미발표", "아직 정리한 글 없음"
- 게시글, 폐지달력·404 등의 본문은 ㄴ다체: "~했다", "~된다", "~이다"
- 소개, 개인정보처리방침, 문의·정정 요청은 합니다체: "~합니다", "~입니다". 짧은 항목은 명사형
- "~해요"체는 어디에도 쓰지 않는다
- 데이터 값(`seasonTerm` 리그/시즌, 시즌 이름 등) 뒤에 조사를 붙일 때는 직접 쓰지 말고 `src/lib/korean.ts`의 `josa()`로 받침에 맞춘다 (리그와 / 시즌과)
- 운영 사정(수익, 개인 운영, 답장 지연 등)은 쓰지 않는다. 개인정보처리방침의 광고 쿠키 고지는 애드센스 정책상 필수라 유지

## 콘텐츠 규칙
- 마크다운 굵은 글씨는 괄호 앞에서 닫는다. `**...(토)**에`처럼 `)**` 바로 뒤에 한글이 오면 굵게 처리되지 않고 별표가 그대로 보인다 (`**...**(토)에` 또는 `**...(토)에 시작**한다`)
- 시즌 주기처럼 데이터로 계산되는 숫자는 글 frontmatter의 `cycleTable: 게임id`로 표를 자동 생성하고, 본문 숫자는 같은 기준으로 계산해 쓴다
- 패치노트를 번역하거나 요약하지 않는다. 패치는 목록과 공식 링크, 직접 쓴 한 줄 설명까지만
- 게시글은 발표에서 사실(날짜, 시각, 이름, 공개된 기능)만 뽑아 직접 쓴 문장으로. 원문 문장을 옮기거나 번역하지 않는다
- 게시글은 시즌 시작 전까지 같은 파일을 계속 갱신하고, 맨 아래 업데이트 기록을 남긴다
- 게시글은 출처를 하나 이상 달고, 확정된 정보와 추측을 구분해서 쓴다
- "아직 모르는 것" 같은 고정 섹션을 두지 않는다. 미발표 정보는 꼭 필요할 때만 관련 문장 안에서 한 번 쓴다 (예: "정확한 오픈 시각은 아직 발표되지 않았다"). 첫 문단이나 화면에 이미 있는 "다음 시즌 미발표"를 목록으로 반복하지 않는다
- 고정 소제목("한눈에 보기", "확정된 것" 같은 틀)을 쓰지 않는다. 소제목은 그 글의 주제나 독자가 궁금해할 질문으로 쓴다 (예: "3.30 일정은 어떻게 정해졌나", "1.0에서 달라지는 것"). 맨 아래 "## 업데이트" 기록만 예외
- 공식 확인이 안 된 이야기(기사·보도자료 인용 등)를 다룰 때는 출처 수준을 문장에 밝힌다
- 예상 일정은 화면에 반드시 "예상"으로 표시

## 빌드 현황
- `src/content/builds/{게임id}/{slug}.md`. 빌드 선정·평가는 운영자, 근거는 공식 패치노트 링크. 제3자 점유율 데이터 금지, "인기 1위" 같은 순위 표현 금지
- 운영자 평가는 화면에 "운영자 평가"로 구분. 패치노트 문장 번역·요약 금지, 수치는 사실만

## 패치 목록
- `src/data/patches.json`: seasonId(리그), kind(patch/hotfix), 공식 링크만. 출처는 GGG 공식 포럼 패치노트 게시판·카카오게임즈 공지만. 날짜는 포럼 게시 시각(한국 시간)

## 이미지
- 사이트 전반은 직접 만든 이미지만: 게임 도장 `GameStamp.astro`(공식 로고 대신), 공식 이미지가 없는 글의 도장 카드(`PostCover.astro`)
- 게시글 대표 이미지(`cover`)는 공식 배포 이미지만, 출처(`credit`, `creditUrl`) 필수. 파일은 `src/assets/posts/{게임id}/`에 1600px JPG로 줄여서 저장
- 공식 이미지 허용: POE1·POE2(GGG 공지·보도자료), 디아블로 4(블리자드 프레스 센터·소식). 라스트 에폭(약관상 서면 동의 필요)과 토치라이트(이용 조건 미확인)는 넣지 않는다
- 대표 이미지가 있는 글은 og:image로도 쓰인다
- 시즌 공식 이미지는 `seasons.json`의 `images`(첫 장이 키아트)에 넣고 파일은 `src/assets/seasons/{시즌id}/`에 1600px JPG로. 시즌 상세 페이지(키아트 + 갤러리), 게임 페이지(다음 시즌, 없으면 진행 중 시즌 키아트), og:image에 쓰인다
- 이미지는 받아서 직접 보고 alt·캡션을 쓴다. 파일 이름만 믿지 않는다 (보도자료 파일명과 내용이 다른 경우가 있음)
- 이미지를 찾을 곳: GGG 보도자료 게시판(pathofexile.com/forum/view-forum/press, poe2-press)의 `web.poecdn.com/public/news/.../PressLive...` 이미지

## 화면
- `src/layouts/Base.astro` 공통 레이아웃(구글 폰트 링크 포함), `src/styles/global.css` 공통 스타일
- 디자인 토큰은 `src/styles/tokens.css`에만 둔다 (색, 서체, 도장 모양, 간격). 페이지에 색·서체·여백을 직접 쓰지 않는다. 예외는 데이터에서 오는 값: 게임 색 `--game-raw`, 폐지달력 막대 위치 `--l`·`--w`
- 폐지달력(`/calendar/`): `src/lib/calendar.ts`가 기간(이번 달 기준 12개월 전 ~ 6개월 뒤)과 막대 위치를 계산. 종료일이 없는 시즌은 다음 시즌 시작까지, 다음 시즌도 없으면 기간 끝까지 흐리게. 오늘 선은 `live.ts`가 브라우저에서 위치를 잡음
- D-day 도장은 `DdayStamp.astro`, 진행률 막대는 `SeasonProgress.astro`로만 그린다. 디자인을 바꿀 때는 tokens.css → 두 컴포넌트 → global.css 순으로 고친다
- 콘셉트: 시안 A "날짜 도장". 재생지(크라프트지) 위에 찍은 날짜 도장. 튀는 요소는 D-day 도장 하나뿐, 나머지는 조용하게. 예상 일정 도장은 점선
- D-day·진행률·카운트다운·오늘 표시·방문자 기기 시간은 빌드 시점 값이 굳지 않도록 `src/scripts/live.ts`가 브라우저에서 계산 (data-dday, data-countdown, data-local 등). 이 정도 상호작용은 React 없이 live.ts로 처리한다
- 시즌 주요 일정은 `seasonMilestones()` + `MilestoneTimeline.astro`로 시즌 상세와 게시글에서 같이 쓴다. 글의 카운트다운 대상은 `countdownTo`(이벤트), 없으면 연결된 시즌 시작
- 시간 표기는 `formatKst`만 사용 (로케일 데이터에 의존하지 않게 직접 계산)

## 작업 원칙
- 반복 작업(시즌·이벤트·패치 반영, 글 갱신, 월간 글, 사실 확인, push 전 점검, 발표 당일)은 `.claude/commands/`의 명령을 우선 사용. 사용법은 [docs/commands.md](docs/commands.md), 공통 절차는 [docs/ops-common.md](docs/ops-common.md)
- 지금 필요한 필드만 둔다. 직업 목록, 수집 출처 같은 구조는 실제로 필요해질 때 추가
- 각 작업이 끝날 때마다 `npm run build`가 통과하는 상태 유지
- 새 기능보다 데이터 정확성이 우선
- 커밋 메시지: `feat:`, `fix:`, `data:`, `docs:` 접두어. 작업 묶음을 받으면 메시지에 작업 번호 포함 (예: "fix: ... (작업 1)")
- 커밋은 작업 단위마다 한다. push는 운영자가 확인한 뒤 직접 한다
- 운영자 확인이 필요한 데이터·글 초안은 `drafts/`(빌드 대상 아님)에 두고, 결정·질문은 `docs/questions.md`에 작업 번호별로 기록
