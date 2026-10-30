# 사실 확인표: 7차 작업 4에서 고친 게시글 문장 (drafts/fact-check/posts-7th-input.md)

사실 문장 69개, ✓ 52, ✗ 17

- 확인일: 2026-10-31 (모든 행 같음)
- 출처: 각 글 frontmatter의 sourceUrls. 링크 안내만 하는 문장("…에 있다", "…에서 이어서 볼 수 있다")과 frontmatter 줄은 뺐다
- 날수·요일: src/data/seasons.json의 UTC 시각을 한국 시간(UTC+9)으로 바꿔 한국 날짜끼리 뺐다. 이 값은 계산에 쓴 출처의 날짜와도 맞춰 봤다
- pathofexile.com과 고객지원 페이지는 Edge 헤드리스로 렌더링했고, 포럼 시각은 한국 시간으로 표시된 값이다. X 글은 X 공식 oEmbed·syndication 응답(created_at)으로 확인했다
- 스팀 한국어 공지는 스팀 events API(l=koreana)로 확인했다
- ✗ 17개 가운데 7개(#41, #45, #48, #53, #54, #55, #58)는 내용은 맞지만, 그 글의 sourceUrls에 한국 날짜를 밝힌 공지가 없는 경우다. GGG 공지는 "November 13 (PST)", "December 11 (PST)"처럼 날짜만 있고 시각이 없어서, 한국 날짜를 계산으로 정할 수 없다

| # | 글 속 문장 | 출처 URL | 출처 안 위치(제목·섹션·원문 일부) | 확인일 | 결과 |
|---|---|---|---|---|---|
| 1 | [d2r/ladder-cycle] 13시즌부터 두 번 연속 91일(13주) 간격 | https://news.blizzard.com/ko-kr/article/24246296 , https://news.blizzard.com/ko-kr/article/24261478 , https://news.blizzard.com/ko-kr/article/24296140 | 출시 일정 아시아: "2월 21일, 오전 9시(KST)", "5월 23일 오전 9시(KST)", "8월 22일 오전 9시(KST)". 2/21→5/23→8/22 = 91·91일 | 2026-10-31 | ✓ |
| 2 | [d2r/ladder-cycle] 12시즌에서 13시즌까지 140일 | https://news.blizzard.com/ko-kr/article/24226703 , 24246296 | "10월 4일 오전 9시(KST)" → "2월 21일" = 140일 | 2026-10-31 | ✓ |
| 3 | [d2r/ladder-cycle] 15시즌 공지에서 이번 시즌부터 패치·래더 전체 일정 조정, 앞으로도 비슷한 일정 | https://news.blizzard.com/ko-kr/article/24296140 | "래더 15시즌 일정:" 아래 "이번 시즌부터 패치 및 래더의 전체적인 일정이 다소 조정됩니다. 향후 시즌도 비슷한 일정으로 진행될 예정입니다." | 2026-10-31 | ✓ |
| 4 | [d2r/ladder-cycle] 16시즌 일정 미발표 | https://news.blizzard.com/ko-kr/api/feed/diablo-2-resurrected?offset=0 | 목록 최신 디아2 글이 "래더 15시즌 지금 진행 중"(15시즌 공지), 16시즌 공지 없음 | 2026-10-31 | ✓ |
| 5 | [d2r/ladder-cycle] 12·14시즌은 블리자드가 종료 시각을 공지 | https://news.blizzard.com/ko-kr/article/24246296 , 24296140 | "참고: 12시즌은 한국 시간 2월 12일 오전 2시에 종료됩니다." / "래더 14시즌 종료 - 8/18 화요일 오전 3시(한국 시간)" | 2026-10-31 | ✓ |
| 6 | [d2r/ladder-cycle] 12시즌 2월 12일 오전 2시 종료, 13시즌 2월 21일 시작, 공백 9일 | https://news.blizzard.com/ko-kr/article/24246296 | "래더 12시즌 종료 일정" 아시아 "2월 12일 오전 2:00 (KST)", "래더 13시즌 출시 일정" "2월 21일, 오전 9시(KST)". 2/12→2/21 = 9일 | 2026-10-31 | ✓ |
| 7 | [d2r/ladder-cycle] 14시즌 8월 18일 오전 3시 종료, 15시즌 8월 22일 시작, 공백 4일 | https://news.blizzard.com/ko-kr/article/24296140 | "래더 14시즌 종료 - 8/18 화요일 오전 3시(한국 시간)", "래더 15시즌 시작 - 8/22 오전 9시(한국 시간)". 8/18→8/22 = 4일 | 2026-10-31 | ✓ |
| 8 | [d2r/ladder-cycle] 래더가 끝나면 래더 캐릭터는 비래더 그룹으로 | https://news.blizzard.com/ko-kr/article/24296140 | "래더 14시즌이 끝나면 래더 캐릭터는 모두 해당하는 비래더 그룹으로 이전됩니다." | 2026-10-31 | ✓ |
| 9 | [d2r/ladder-end] 래더 시즌이 끝나면 래더 캐릭터는 비래더 그룹으로 | https://news.blizzard.com/ko-kr/article/24296140 | 같은 문단 | 2026-10-31 | ✓ |
| 10 | [d2r/ladder-end] 캐릭터는 사라지지 않지만 공유 보관함 아이템은 정해진 기간 안에 꺼내야 | https://news.blizzard.com/ko-kr/article/24296140 | 같은 문단 "래더 15시즌 기간 동안 이 탭에서 … 꺼낼 수 있습니다 … 그 전에 필요한 아이템을 꺼내지 않으면 영영 사라지니" | 2026-10-31 | ✓ |
| 11 | [d2r/ladder-end] 아래 기한과 규칙은 래더 15시즌 공지에 나온 것 | https://news.blizzard.com/ko-kr/article/24296140 | 위 문단이 15시즌 공지 본문에 있음 | 2026-10-31 | ✓ |
| 12 | [d2r/ladder-only] 래더는 새 래더용 캐릭터로 참여하는 선택형 경쟁 시스템 | https://news.blizzard.com/ko-kr/article/23762796 | "래더 테스트" 첫 문단 "새로운 래더용 캐릭터로 참여할 수 있는 선택적 경쟁 시스템입니다" | 2026-10-31 | ✓ |
| 13 | [d2r/ladder-only] 모드마다 순위표가 따로 있음 | https://news.blizzard.com/ko-kr/article/23762796 | 같은 문단 "모드마다 고유 순위표가 있으며" | 2026-10-31 | ✓ |
| 14 | [d2r/ladder-only] 15시즌에는 래더에서만 쓸 수 있는 아이템이 따로 정해짐 | https://news.blizzard.com/ko-kr/article/24296140 | "3.3 패치 노트 > 아이템" "아래 나열된 변경된 아이템은 래더에서만 이용할 수 있습니다" | 2026-10-31 | ✓ |
| 15 | [d2r/ladder-only] 래더 규칙 일부는 2021~2023년 공지에만 있음 | https://news.blizzard.com/ko-kr/article/23746135 , 23762796 , 23938388 | 페이지 datePublished 2021-12-15(2.4 미리보기), 2022-02-28(2.4 PTR 래더 테스트), 2023-05-05(래더 4시즌) + 기존 확인표 d2r-ladder-only.md의 본문 날짜 근거 | 2026-10-31 | ✓ |
| 16 | [d4/pre-season-flow] 시즌 시작 28~51일 전 공개 테스트 서버, 6~8일 전 개발자 업데이트 라이브스트림으로 소개해 옴 | https://news.blizzard.com/ko-kr/article/24224180 , 24242857 , 24247516 , 24259077 , 24292852 , 24226700 , 24250347 , 24265936 , 24280283 | PTR 첫날 8/20·10/22·2/4·6/3·8/5 → 시즌 시작 9/24·12/12·3/12·7/1·9/16 = 35·51·36·28·42일. 방송 9/17·12/4·3/6·6/24 → 7·8·6·7일 | 2026-10-31 | ✓ |
| 17 | [d4/pre-season-flow] 16시즌의 공개 테스트 서버와 방송 일정은 아직 발표되지 않았다 | https://news.blizzard.com/ko-kr/article/24302578 (sourceUrls 밖, 블리자드 공식) | "3.3.0 공개 테스트 서버: 알아야 할 내용" 첫 문단 "디아블로 IV 16시즌의 3.3.0 공개 테스트 서버(PTR)는 한국 시간 기준으로 10월 28일 오전 2시~11월 4일 오전 2시에 운영되며" | 2026-10-31 | ✗ (16시즌 PTR은 발표됐고 이미 열림) |
| 18 | [d4/pre-season-flow] 10~15시즌에는 공개 테스트 서버가 열리고 한두 달 뒤에 시즌이 시작됐다 | https://news.blizzard.com/ko-kr/api/feed/diablo-4 (offset 0~24), 24261474 | 2.6.0 PTR(12시즌)과 3.1 PTR(14시즌) 사이에 PTR 공지 없음. 13시즌(결전, 증오의 군주 출시)은 PTR 없이 "사전 출시 라이브스트림을 시청하십시오"(24261474)만 있음. 14시즌 PTR은 28일 전 | 2026-10-31 | ✗ (13시즌은 PTR 없음, 범위가 넓음) |
| 19 | [d4/season-cycle] 시즌 간격 짧게는 47일, 길게는 90일 | https://news.blizzard.com/ko-kr/article/24226702 , 24244465 , 24244648 , 24267729 , 24268702 , 24301509 | 시작일 9/24, 12/12, 3/12, 4/28, 7/1, 9/16 → 79·90·47·64·77일 | 2026-10-31 | ✓ |
| 20 | [d4/season-cycle] 끝난 10~14시즌 다섯 개 평균 71일, 3개월보다 짧음 | 같은 출처 | (79+90+47+64+77)/5 = 71.4일 | 2026-10-31 | ✓ |
| 21 | [d4/season-cycle] 15시즌 지옥의 유산(2026년 9월 16일 시작) 진행 중 | https://news.blizzard.com/ko-kr/article/24301509 , 24295394 | "지옥의 유산 시즌은 한국 시간 9월 16일 오전 2:30에 적용됩니다." | 2026-10-31 | ✓ |
| 22 | [d4/season-cycle] 16시즌 일정 미발표 | https://news.blizzard.com/ko-kr/api/feed/diablo-4?offset=0 , https://news.blizzard.com/ko-kr/article/24302578 | 16시즌 PTR 공지에도 시즌 시작일 없음 | 2026-10-31 | ✓ |
| 23 | [d4/season-cycle] 12·14시즌 한국 시간 오전 2시, 11시즌 오후 1시 30분 시작 | https://news.blizzard.com/ko-kr/article/24244648 , 24268702 , 24244465 | "한국시간 기준 3월 12일 오전 2시 살육의 시즌이 당도", "한국 시간 기준으로 7월 1일 오전 2:00에", "한국 시간 기준 12월 12일 오후 1:30에 시작됩니다" | 2026-10-31 | ✓ |
| 24 | [d4/season-cycle] 15시즌 한국어판 오전 2시 30분, 영어판 태평양 시간 오전 9시 30분(한국 시간 오전 1시 30분) | https://news.blizzard.com/ko-kr/article/24301509 , https://news.blizzard.com/en-us/article/24301509 | "한국 시간 9월 16일 오전 2:30에 적용됩니다" / "begins rolling out on September 15, 9:30 a.m. PT" (PDT UTC-7 → 16:30 UTC → 9월 16일 01:30 KST) | 2026-10-31 | ✓ |
| 25 | [d4/season-cycle] 블리자드는 시즌 종료일을 따로 공지하지 않는 경우가 많다 | 24226702 , 24244465 , 24244648 , 24267729 , 24268702 , 24295394 | 10~15시즌 시작 공지 여섯 건에 시즌 종료 날짜 없음 | 2026-10-31 | ✓ |
| 26 | [d4/season-cycle] 10~15시즌 동안 공개 테스트 서버는 시즌 시작 28~51일 전에 열렸다 | #16·#18과 같음 | 다섯 번(10·11·12·14·15시즌)만 PTR이 있고 13시즌은 없음. 이 글 sourceUrls에는 PTR 공지가 없음 | 2026-10-31 | ✗ (13시즌 PTR 없음, 출처 없음) |
| 27 | [d4/season-end] 시즌 캐릭터·진행 상황·시즌 보관함 포함 아이템은 영원의 영역으로 | https://support.blizzard.com/ko-kr/article/340698 | "디아블로 IV의 시즌이 끝나면 생성한 캐릭터와 진행 상황은 영원의 영역으로 이전됩니다. 시즌 보관함을 포함해 수집한 모든 아이템도 함께 이전됩니다." | 2026-10-31 | ✓ |
| 28 | [d4/season-end] 캐릭터는 계속 쓸 수 있지만 그 시즌 기능은 못 씀 | https://support.blizzard.com/ko-kr/article/340698 | 같은 답변 "이전된 캐릭터는 언제든 성역으로 데려갈 수 있지만, 악의 심장과 같은 시즌 전용 기능은 더 이상 이용할 수 없습니다." | 2026-10-31 | ✓ |
| 29 | [d4/season-end] 공통 규칙은 고객지원 문서, 시즌마다 달라지는 부분은 그 시즌 공지 | 340698 , https://news.blizzard.com/ko-kr/article/24268702 | 시즌 공지 예: 14시즌 공지 "시즌이 끝나면 1인 거래 불가 캐릭터가 영원의 캐릭터로" | 2026-10-31 | ✓ |
| 30 | [d4/season-end] 블리자드는 시즌 종료일을 따로 공지하지 않는 경우가 많다 | #25와 같음 | 같음 | 2026-10-31 | ✓ |
| 31 | [le/cycle-legacy-factions] 시즌마다 처음부터 시작하는 Cycle, 지난 시즌 캐릭터가 모이는 Legacy | https://forum.lastepoch.com/t/last-epoch-1-0-patch-notes/62536 | 2번째 댓글(Yayifications) "Cycles are Last Epoch's "Seasons" which will start with each major game update", "Legacy characters cannot submit new placements …" | 2026-10-31 | ✓ |
| 32 | [le/cycle-legacy-factions] 거래하는 Merchant's Guild와 직접 줍는 아이템에 보너스를 받는 Circle of Fortune 중 선택 | https://forum.lastepoch.com/t/trade-item-factions/61722 | "Circle of Fortune - grants boosts to items you find yourself", "join either The Merchant's Guild or Circle of Fortune" | 2026-10-31 | ✓ |
| 33 | [le/cycle-legacy-factions] 규칙이 1.0(2024년 2월)부터 시즌 5(2026년 9월)까지 여러 EHG 공지에 나뉘어 나옴 | 61722 , 62525 , 62536 , 81759 , https://forum.lastepoch.com/t/countdown-to-season-5-rage-of-the-frostborn-hits-october-1/81745 | 가장 이른 공지 61722 "Trade & Item Factions" created_at 2024-01-11T16:59Z(한국 1월 12일). 1.0 패치 노트 62536은 2024-02-19, 시즌 5 세력 공지 81759는 2026-09-22. 시즌 5 출시는 "October 1 at 11 AM CDT"(한국 10월 2일) | 2026-10-31 | ✗ (시작이 2024년 1월 공지, "시즌 5(2026년 9월)"은 시즌 5 출시월로 읽힘) |
| 34 | [le/season-cycle] 약 6~7개월 간격. 시즌 3(2025년 8월 22일)→시즌 4(2026년 3월 27일) 217일, 시즌 4→시즌 5(10월 2일) 189일 | https://forum.lastepoch.com/t/last-epoch-beneath-ancient-skies-patch-notes/78635 , .../80571 , .../81745 | "Season 3 … launches 2025-08-21T16:00:00Z", "Season 4 … launches 2026-03-26T16:00:00Z", "October 1 at 11 AM CDT"(=16:00 UTC). 한국 8/22·3/27·10/2 01:00 → 217·189일 | 2026-10-31 | ✓ |
| 35 | [le/season-cycle] 시즌 5 진행 중, 시즌 6 일정 미발표 | https://forum.lastepoch.com/search.json (최신 글) | 최신 EHG 공지는 9/22 세력 공지, 9/25 시즌 5 패치 노트. 시즌 6 공지 없음 | 2026-10-31 | ✓ |
| 36 | [poe1/3-30-preview] 3.30은 한국 시간 2026년 11월 14일(토)에 시작 | https://poe.kakaogames.com/forum/view-thread/4010521 | "3.30 확장팩 출시 일정" "2026년 11월 14일(토)(한국 시간)에 출시되며" | 2026-10-31 | ✓ |
| 37 | [poe1/3-30-preview] GGG가 10월 13일(한국 시간) 포럼과 X로 확정해 알림, 오픈 시각 미발표 | https://www.pathofexile.com/forum/view-thread/4010618 , https://x.com/pathofexile/status/2109750375381393508 | 포럼 "Posted by Kelly_GGG on Oct 13, 2026, 5:57:30 AM"(한국 시간 표시), "released on November 13 (PST)". X created_at 2026-10-12T20:57:41Z(한국 10월 13일 05:57) "3.30 Launch - Nov 13 PST". 둘 다 시각 없음 | 2026-10-31 | ✓ |
| 38 | [poe1/3-30-preview] 리그 이름과 새 메커니즘은 11월 7일(토) 오전 6시 엑자일콘 키노트에서 공개 | 4010618 , X 2109750375381393508 , https://www.pathofexile.com/forum/view-thread/4009902 | "full details to be revealed at ExileCon 2026", X "3.30 Reveal - ExileCon 2026, Nov 6 PST", 4009902 "The keynote begins at 1PM PST (Nov 07, 2026 6:00 AM (GMT+9))". 키노트에서 공개한다는 말과 "리그 이름·메커니즘"이라는 범위는 없음 | 2026-10-31 | ✗ (출처보다 단정적) |
| 39 | [poe1/3-30-preview] 엑자일콘은 뉴질랜드 오클랜드에서 현지 시간 11월 7~8일 이틀 | 4009902 | "on November 7 and 8 NZT, we'll be hosting ExileCon 2026". 오클랜드는 이 글의 sourceUrls에 없음(GGG 3911368 "held on November 7th and 8th (NZT) this year in Auckland, New Zealand"에 있음) | 2026-10-31 | ✗ (장소의 출처가 sourceUrls에 없음) |
| 40 | [poe1/3-30-preview] 트위치와 유튜브로 무료 생중계 | 4009902 | "we'll be livestreaming the entire event for free on Twitch and YouTube" | 2026-10-31 | ✓ |
| 41 | [poe1/league-cycle] 3.30은 3.29 시작 112일 뒤인 한국 시간 11월 14일(토)에 열린다 | 4010618 , 3987516 | 3.29 "servers go live … Jul 25, 2026 5:00 AM (GMT+9)", 3.30은 "November 13 (PST)"만 있음. 이 글 sourceUrls에 한국 날짜 공지(카카오 4010521) 없음 | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 42 | [poe1/league-cycle] 최근 1년 리그 간격 112~140일, 이번이 가장 짧음 | 3870689 , 3914487 , 3987516 , (카카오 4010521) | 11/1 → 3/7 → 7/25 → 11/14 = 126·140·112일 | 2026-10-31 | ✓ |
| 43 | [poe1/league-cycle] 3.29는 나흘 앞선 11월 10일(화) 오전 6시에 끝남 | https://www.pathofexile.com/forum/view-thread/4010618 | "end at 1PM November 9th (PST) (Nov 10, 2026 6:00 AM (GMT+9))" | 2026-10-31 | ✓ |
| 44 | [poe1/league-cycle] 3.28→3.29 140일, 3.28 7월 21일 오전 7시 종료, 3.29 7월 25일 오전 5시 시작 | https://poe.kakaogames.com/forum/view-thread/3955024 , 3987516 , 3914487 | "허상 챌린지 리그는 2026년 7월 21일(화) 오전 7시(한국 시간)에 종료", "Jul 25, 2026 5:00 AM (GMT+9)", 3.28 "Mar 07, 2026 4:00 AM (GMT+9)" → 140일 | 2026-10-31 | ✓ |
| 45 | [poe1/league-cycle] 3.29→3.30 112일, 3.29 11월 10일 오전 6시 종료, 3.30 11월 14일 시작 | 4010618 | 종료 시각은 있음. 3.30 한국 날짜는 sourceUrls에 없음(#41과 같음) | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 46 | [poe1/league-cycle] GGG가 리그 주기를 정해 발표한 적 없음, 112~140일은 실제 간격 | sourceUrls 6건 | 확인한 공지에 주기 발표 없음(GGG 전체 공지를 다 본 것은 아님) | 2026-10-31 | ✓ |
| 47 | [poe1/league-cycle] 리그 사이 며칠은 챌린지 리그 없이 스탠다드 리그만 열린다 | sourceUrls 6건 | 리그 종료 시각만 있고 "Standard/스탠다드" 언급 없음 | 2026-10-31 | ✗ (출처에 없음) |
| 48 | [poe1/league-cycle] 3.28→3.29, 3.29→3.30 모두 공백 4일 | 3955024 , 3987516 , 4010618 | 7/21 → 7/25 = 4일 확인. 11/10 → 11/14는 3.30 한국 날짜가 sourceUrls에 없음 | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 49 | [poe1/league-cycle] 3.29는 7월 17일 GGG 라이브에서 공개되고 8일 뒤, 3.30은 11월 7일 엑자일콘에서 공개되고 7일 뒤 시작 | 3955024 , 4010618 (참고: 3982050, X 2109750375381393508) | 카카오 "GGG 라이브스트리밍은 2026년 7월 17일(금) 오전 5시(한국 시간)", 4010618 "the 3.29 livestream" → 7/17→7/25 = 8일 맞음. 3.30 공개일(X "3.30 Reveal - ExileCon 2026, Nov 6 PST" = 한국 11월 7일)과 3.30 한국 날짜는 이 글 sourceUrls에 없음 | 2026-10-31 | ✗ (3.30 부분 출처 없음) |
| 50 | [poe2/1-0-preview] 한국 시간 2026년 12월 12일(토) 정식 출시(1.0), 이날부터 무료 플레이 | https://www.pathofexile.com/forum/view-thread/3999366 , https://poe.kakaogames.com/forum/view-thread/4000434 | "launches as a fully free-to-play action RPG on December 11 (PST)", 카카오 "1.0이 정식 출시되는 12월 12일(토)" | 2026-10-31 | ✓ |
| 51 | [poe2/1-0-preview] GGG가 8월 말 게임스컴에서 발표, 카카오도 한국 시간 12월 12일로 안내 | https://www.pathofexile.com/forum/view-thread/3999509 , 3999366 , 카카오 4000434 | "at gamescom Cologne's Opening Night Live, where the December 11 release date was also announced", 게시 Aug 26, 2026(한국 시간 표시). 카카오 "듀얼리스트는 … 1.0이 정식 출시되는 12월 12일(토)에 추가됩니다" | 2026-10-31 | ✓ |
| 52 | [poe2/1-0-preview] 오픈 시각은 아직 나오지 않음 | 3999366 , 3999509 , 카카오 4000434 | 날짜만 있고 시각 없음 | 2026-10-31 | ✓ |
| 53 | [poe2/league-cycle] 얼리 액세스 동안 105일, 168일, 196일로 점점 길어짐 | 3829091 , 3885148 , 3933994 , 3999366 | "Aug 30, 2025 5:00 AM (GMT+9)", "Dec 13, 2025 4:00 AM (GMT+9)", "May 30, 2026 5:00 AM (GMT+9)" → 105·168일 맞음. 1.0은 "December 11 (PST)"만 있어 196일의 한국 날짜 근거가 sourceUrls에 없음 | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 54 | [poe2/league-cycle] 마지막 196일은 0.5(2026년 5월 30일)에서 1.0까지 | 3933994 , 3999366 | #53과 같음 | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 55 | [poe2/league-cycle] 1.0은 한국 시간 12월 12일(토), 이후 리그 간격 미발표 | 3999366 , 4000430 | "December 11 (PST)", 4000430 "December 11th". 한국 날짜 공지(카카오 4000434)가 sourceUrls에 없음. 리그 간격 발표는 없음 | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 56 | [poe2/league-cycle] 0.3 세 번째 칙령(2025년 8월 30일) → 0.4(12월 13일): 105일 | 3829091 , 3885148 | "servers go live at: Aug 30, 2025 5:00 AM (GMT+9)", "Dec 13, 2025 4:00 AM (GMT+9)" | 2026-10-31 | ✓ |
| 57 | [poe2/league-cycle] 0.4 → 0.5(2026년 5월 30일): 168일 | 3885148 , 3933994 | "May 30, 2026 5:00 AM (GMT+9)" | 2026-10-31 | ✓ |
| 58 | [poe2/league-cycle] 0.5 → 1.0(12월 12일): 196일, 얼리 액세스 중 가장 긴 간격 | 3933994 , 3999366 | #53과 같음 | 2026-10-31 | ✗ (내용은 맞음, 출처 없음) |
| 59 | [poe2/league-cycle] 한국 시간 9월 5일 오전 5시 0.5.5 이벤트 리그 금단의 의식, 1.0 출시 때 알두르의 룬과 함께 종료 | https://www.pathofexile.com/forum/view-thread/4000430 | "Forbidden Rites begins at 1PM PDT on September 4th, which is Sep 05, 2026 5:00 AM (GMT+9)", "will run until the 1.0 full release and will end alongside Runes of Aldur" | 2026-10-31 | ✓ |
| 60 | [schedule/2026-11] 11월 10일(화) 오전 6시부터 14일(토) 3.30 시작까지 4일 동안 챌린지 리그 없이 스탠다드 리그만 | 4010618 , X 2109750375381393508 | 종료 "Nov 10, 2026 6:00 AM (GMT+9)", 시작 "Nov 13 PST"(한국 날짜 공지 없음). "스탠다드" 언급 없음 | 2026-10-31 | ✗ (스탠다드 부분 출처 없음, 14일 한국 날짜 출처 없음) |
| 61 | [schedule/2026-11] 3.29 도전 과제는 10일 오전 6시 전에 끝내야 | 4010618 | "so there are still several weeks left to complete any remaining challenges" + 종료 시각 | 2026-10-31 | ✓ |
| 62 | [schedule/2026-11] 카카오 상점은 올플레임의 저주 서포터 팩을 3.30 출시 때까지만 판다고 안내 | https://poe.kakaogames.com/purchase | 올플레임의 저주 서포터 팩 소개 "이 팩들은 패스 오브 엑자일 3.30 확장팩이 출시될 때까지 구매하실 수 있습니다." | 2026-10-31 | ✓ |
| 63 | [tli/season-cycle] 여섯 게임 중 시즌 간격이 가장 고르다 | src/data/seasons.json (각 게임 출처 날짜) | 간격 폭: tli 91~97(6일), d2r 91~140(49), poe1 112~140(28), le 189~217(28), d4 47~90(43), poe2 105~196(91) | 2026-10-31 | ✓ |
| 64 | [tli/season-cycle] SS11~SS14 세 번 연속 91일, SS10→SS11 97일 | 스팀 한국어 공지(app/1974050) "[이면세계]·[블러드 러스트]·[루나리아]·[애프터라이트]·[타르타로스]시즌 업데이트 내용" | "10월11일 정식 오픈", "1월 16일 정식 오픈", "4월 17일 정식 오픈", "7월 17일 정식 오픈", "10월 16일 정식 오픈" → 97·91·91·91일 | 2026-10-31 | ✓ |
| 65 | [tli/season-cycle] SS14 타르타로스(2026년 10월 16일 시작) 진행 중, SS15 미발표 | 스팀 "[타르타로스]시즌 업데이트 내용", 스팀 이벤트 목록 | "신규 시즌 「타르타로스」 10월 16일 정식 오픈!", 목록 최신 시즌 공지가 타르타로스 | 2026-10-31 | ✓ |
| 66 | [tli/season-cycle] 91일은 13주, SS11~SS14 네 시즌 모두 금요일(한국 시간) 시작 | #64와 같음 | 2026-01-16·04-17·07-17·10-16 모두 금요일 | 2026-10-31 | ✓ |
| 67 | [tli/season-cycle] XD가 시즌 주기를 정해 발표한 적 없음, 91일은 최근 1년 기록 | 스팀 한국어·영어 공지 목록 | 주기 발표 공지 없음(제목 기준 확인) | 2026-10-31 | ✓ |
| 68 | [tli/season-cycle] 스팀 공지 제목은 시즌 이름만 씀, 번호는 공식 사이트 패치노트 주소(SS14)와 국내 기사에서 SS13, SS14처럼 쓰임 | 스팀 공지, https://torchlight.xd.com/us/index | 제목 "[타르타로스]시즌 업데이트 내용" 등 번호 없음(맞음). 공식 사이트 링크 "torchlight.xd.com/ss13pn", "torchlight.xd.com/ss14pn/"(맞음). "국내 기사"는 공식 출처가 아님 | 2026-10-31 | ✗ (국내 기사 부분은 근거 아님) |
| 69 | [tli/season-cycle] SS11은 한국어 블러드 러스트, 영어 Vorax | 스팀 한국어 "[블러드 러스트]시즌 업데이트 내용", 영어 "Torchlight: Infinite - "Vorax" SEASON" | 두 제목 | 2026-10-31 | ✓ |

## ✗ 문장별 고칠 안

- #17 (d4/pre-season-flow) "16시즌의 공개 테스트 서버와 방송 일정은 아직 발표되지 않았다."
  → "16시즌 공개 테스트 서버(3.3.0)는 한국 시간 10월 28일 오전 2시부터 11월 4일 오전 2시까지 열린다. 16시즌 시작일과 개발자 업데이트 라이브스트림 일정은 아직 발표되지 않았다." sourceUrls에 https://news.blizzard.com/ko-kr/article/24302578 추가. 16시즌 PTR이 시즌 시작 며칠 전인지는 시작일이 나와야 계산할 수 있음
- #18 (d4/pre-season-flow) "10~15시즌에는 공개 테스트 서버가 열리고 한두 달 뒤에 시즌이 시작됐다."
  → "13시즌을 뺀 10~15시즌 다섯 번은 공개 테스트 서버가 열리고 28~51일 뒤에 시즌이 시작됐다. 증오의 군주와 함께 시작한 13시즌은 공개 테스트 서버 없이 사전 출시 라이브스트림만 있었다." (13시즌 부분은 sourceUrls의 24261474로 확인됨)
- #26 (d4/season-cycle) "10~15시즌 동안 공개 테스트 서버는 시즌 시작 28~51일 전에 열렸다."
  → "10~15시즌 중 공개 테스트 서버가 있었던 다섯 시즌(13시즌 제외)은 시즌 시작 28~51일 전에 열렸다." 그리고 PTR 공지(24224180, 24242857, 24247516, 24259077, 24292852)를 sourceUrls에 추가
- #33 (le/cycle-legacy-factions) "규칙이 1.0(2024년 2월)부터 시즌 5(2026년 9월)까지 여러 … 공지에 나뉘어 나와서"
  → "규칙이 2024년 1월(1.0 출시 전 세력 소개)부터 2026년 9월(시즌 5 세력 개편 공지)까지 여러 Eleventh Hour Games(EHG) 공지에 나뉘어 나와서, 문장마다 공지 날짜를 붙였다."
- #38 (poe1/3-30-preview) "리그 이름과 새 메커니즘은 11월 7일(토) 오전 6시 엑자일콘 키노트에서 공개된다."
  → "자세한 내용은 엑자일콘 첫날인 한국 시간 11월 7일(토)에 공개된다. 이날 키노트는 오전 6시에 시작한다."
- #39 (poe1/3-30-preview) "엑자일콘은 뉴질랜드 오클랜드에서 현지 시간 11월 7~8일 이틀 동안 열리고"
  → 문장은 그대로 두고 sourceUrls에 https://www.pathofexile.com/forum/view-thread/3911368 추가("held on November 7th and 8th (NZT) this year in Auckland, New Zealand"). 추가하지 않으면 "뉴질랜드 오클랜드에서" 삭제
- #41, #45, #48 (poe1/league-cycle) 3.30 한국 날짜 11월 14일과 그 날로 계산한 112일·4일
  → 문장은 그대로 두고 sourceUrls에 https://poe.kakaogames.com/forum/view-thread/4010521 추가("2026년 11월 14일(토)(한국 시간)에 출시")
- #47 (poe1/league-cycle) "이 기간에는 챌린지 리그 없이 스탠다드 리그만 열린다."
  → "이 기간에는 챌린지 리그가 없다." (스탠다드 리그를 쓰려면 그 내용이 있는 GGG·카카오 공지를 sourceUrls에 추가)
- #49 (poe1/league-cycle) "3.30은 11월 7일 엑자일콘에서 공개되고 7일 뒤에 시작한다."
  → 문장은 그대로 두고 sourceUrls에 https://x.com/pathofexile/status/2109750375381393508 ("3.30 Reveal - ExileCon 2026, Nov 6 PST")와 카카오 4010521 추가
- #53, #54, #55, #58 (poe2/league-cycle) 1.0 한국 날짜 12월 12일과 196일
  → 문장은 그대로 두고 sourceUrls에 https://poe.kakaogames.com/forum/view-thread/4000434 추가("1.0이 정식 출시되는 12월 12일(토)")
- #60 (schedule/2026-11) "4일 동안은 POE1에 챌린지 리그가 없고 스탠다드 리그만 열린다."
  → "11월 10일(화) 오전 6시부터 14일(토) 3.30 시작까지 4일 동안은 POE1에 챌린지 리그가 없다." 그리고 sourceUrls에 카카오 4010521 추가
- #68 (tli/season-cycle) "번호는 공식 사이트의 시즌 패치노트 주소(SS14)와 국내 기사에서 SS13, SS14처럼 쓰인다."
  → "번호는 공식 사이트의 시즌 패치노트 주소(ss13pn, ss14pn)에 쓰인다."
