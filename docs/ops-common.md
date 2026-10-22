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
- 블리자드 고객지원, lastepoch.com 패치 노트처럼 자바스크립트로 그려지는 페이지는 엣지로 렌더링해 읽는다: `msedge --headless=new --dump-dom {주소}`
- 라스트 에폭 포럼(Discourse): `https://forum.lastepoch.com/t/{번호}.json`. 패치 노트는 여러 댓글로 나뉘어 있으니 글쓴이(EHG) 댓글 전체를 본다
- 디시인사이드·레딧은 읽지 않는다 (로봇 차단)

## 끝낼 때
1. `npm run build` 통과 확인
2. 커밋: 접두어(feat:/fix:/data:/docs:)와 명령 이름. 예: `data: 3.30 시작 시각 반영 (/new-season)`. push는 하지 않는다 (운영자가 확인 후)
3. 짧은 보고
   - 바뀐 파일
   - 바뀐 값: 이전 → 이후 (한국 시간으로)
   - 운영자가 확인할 점 (반영하지 않은 값, questions.md에 남긴 것)
