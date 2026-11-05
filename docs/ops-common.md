# 명령 공통 절차 (.claude/commands/ 의 모든 명령이 따른다)

## 규칙
- CLAUDE.md를 따른다.
- 근거는 명령에 받은 공식 링크와, 그 링크에서 직접 확인한 내용만 쓴다. 링크가 아래 공식 출처가 아니면 아무것도 바꾸지 않고 멈춰서 알린다.
- 확실하지 않은 값(시각이 없음, 이름이 한국어로 아직 없음, 출처끼리 다름)은 반영하지 않는다. `docs/questions.md`에 명령 이름과 날짜로 기록하거나 `drafts/`에 초안으로 남긴다.
- 시각은 모두 UTC ISO(`2026-11-13T21:00:00Z`)로 저장하고, 화면·보고에는 한국 시간으로 쓴다. 시각이 발표되지 않았으면 그날 한국 0시(UTC 전날 15:00)에 `timePrecision: "day"`.
- 이미 같은 값이 있으면 바꾸지 않는다. 바뀐 것이 없으면 커밋하지 않고 "바뀔 것 없음"으로 보고한다.

## 공식 출처
| 게임 | 공식 출처 |
|---|---|
| POE1·POE2 | Grinding Gear Games: pathofexile.com(포럼·공지), pathofexile2.com, X @pathofexile·@pathofexile2, 유튜브 @playpathofexile. 카카오게임즈: poe.kakaogames.com, pathofexile2.kakaogames.com, 유튜브 @pathofexileKR |
| 디아블로 2·4 | 블리자드: news.blizzard.com, support.blizzard.com(고객지원), diablo4.blizzard.com, diablo2.blizzard.com, 블리자드 공식 포럼(forums.blizzard.com), X @Diablo, 유튜브 @Diablo·@Diablo_KR |
| 라스트 에폭 | Eleventh Hour Games: lastepoch.com, forum.lastepoch.com의 EHG 직원 글, 스팀 공식 공지(store.steampowered.com/news/app/899770), X @LastEpoch |
| 토치라이트: 인피니트 | XD: 공식 사이트(torchlight.xd.com), 스팀 공식 공지(store.steampowered.com/news/app/1974050), 유튜브 @torchlight-infinite-kr |

기사·위키·커뮤니티(디시인사이드, 레딧, 인벤 등)는 근거로 쓰지 않는다. 공식 출처를 찾는 길잡이로만 쓴다.

## 공식 페이지 읽는 법 (확인된 방법)
- 블리자드 소식 목록: `https://news.blizzard.com/ko-kr/api/feed/diablo-4?offset=0` (디아2는 `diablo-2-resurrected`). 글 본문은 `https://news.blizzard.com/ko-kr/article/{번호}`를 받아 텍스트로. 페이지의 `timestamp`는 게시 시각인지 수정 시각인지 구분되지 않으니 글 날짜로 쓰지 않는다
- pathofexile.com(GGG 포럼)은 curl을 클라우드플레어가 막는다("Attention Required"). 엣지 렌더링으로 읽는다: `msedge --headless=new --dump-dom https://www.pathofexile.com/forum/view-thread/{번호}`
- 블리자드 고객지원, lastepoch.com 패치 노트처럼 자바스크립트로 그려지는 페이지는 엣지로 렌더링해 읽는다: `msedge --headless=new --dump-dom {주소}`
- 라스트 에폭 포럼(Discourse): `https://forum.lastepoch.com/t/{번호}.json`. 패치 노트는 여러 댓글로 나뉘어 있으니 글쓴이(EHG) 댓글 전체를 본다
- 디시인사이드·레딧은 읽지 않는다 (로봇 차단)

## 시즌 페이지 제목은 단계별로 자동 (src/lib/season-head.ts)
- 시작 전: 시작일 중심. 예: "POE1 3.30 일정: 11월 14일(토) 시작, 11월 7일 엑자일콘 공개" (짧은 이름 `label`이 있는 공개 이벤트가 시작 전에 있으면 붙음)
- 막 열림(시작 1~7일째, `src/lib/seasons.ts`의 `FRESH_DAYS`): 시작 중심. 예: "POE1 3.30 {리그 이름}: 11월 14일(토) 시작, 한국 시간". 설명에 n일째와 `highlights`
- 진행 중·막차: 종료일 중심. `endsAt`이 있으면 날짜, `endsWithNext`면 다음 시즌 시작일, 없으면 "종료일: 공식 발표 전" + `endNote`
- 종료: "일정" 정리 제목
- 매일 오전 7시 재빌드 때 단계가 바뀌면 제목도 바뀐다. 손으로 고칠 것은 데이터(`name`, `startsAt`, `endsAt`, `highlights`, `endNote`)뿐
- 예상 날짜는 어느 단계에서도 제목·설명에 쓰지 않는다

## 끝낼 때
1. 일정 데이터(`seasons.json`·`events.json`·`games.json`)를 바꿨으면 `src/data/updates.json` 맨 위에 방문자용 한 줄을 넣는다: `id`(`2026-11-07-poe1-3-30-time`처럼 날짜-영문), `date`(한국 날짜), `gameId`, `text`(명사형 80자 이내, 작업 번호·명령 이름 없이. 예: "3.30 시작 시각 오전 6시로 확정"), `href`(바뀐 시즌 페이지). 메인 "최근 갱신"과 /updates/에 나온다. 글 업데이트 기록과 패치 링크는 자동으로 모이므로 쓰지 않는다
2. `npm run build` 통과 확인
3. 커밋: 접두어(feat:/fix:/data:/docs:)와 명령 이름. 예: `data: 3.30 시작 시각 반영 (/new-season)`. push는 하지 않는다 (운영자가 확인 후)
4. 짧은 보고
   - 바뀐 파일
   - 바뀐 값: 이전 → 이후 (한국 시간으로)
   - 운영자가 확인할 점 (반영하지 않은 값, questions.md에 남긴 것)
