# 사실 확인표: 7차 작업 3 시즌·게임 소개 문장 (src/data/seasons.json·games.json의 intro)

- 확인일: 2026-10-31 (모든 행 같음)
- 대상: drafts/fact-check/intros-7th.md의 14개 문단. 단, tli-ss14는 seasons.json에 이미 고쳐 반영된 문장("SS11부터 세 번 연속 같은 간격")으로 확인
- 출처: GGG 포럼(pathofexile.com, 엣지 렌더링, 시각은 화면에 GMT+9로 표시됨), 카카오게임즈 포럼(poe.kakaogames.com, pathofexile2.kakaogames.com), 블리자드 소식(news.blizzard.com 한국어·영어, 목록 API), 블리자드 고객지원, 라스트 에폭 포럼 JSON(글쓴이 Yayifications·EHG_DerrickG, EHG Staff 배지 확인), 스팀 공식 공지(app/1974050, 한국어 본문은 이벤트 API), torchlight.xd.com(ss14pn 패치노트 ?lang=en, ?lang=ko)
- 날수: seasons.json startsAt/endsAt(UTC)를 한국 날짜로 바꿔 뺀 값. 요일은 한국 날짜 기준 직접 계산
- 요약: 사실 문장 62개, ✓ 56, ✗ 6

| # | 글 속 문장 | 출처 URL | 출처 안 위치 | 결과 |
|---|---|---|---|---|
| 1 | [poe1-3-29] 7월 17일(금) GGG 라이브 방송에서 공개 | https://www.pathofexile.com/forum/view-thread/3982050 , https://poe.kakaogames.com/forum/view-thread/3955024 | "GGG Live will begin at 1PM on July 16th PDT … learn all about the 3.29 expansion" (=7/17 05:00 KST), 카카오 "GGG 라이브스트리밍은 2026년 7월 17일(금) 오전 5시" | ✓ |
| 2 | 공개 8일 뒤 시작 | https://www.pathofexile.com/forum/view-thread/3987516 | "servers go live … Jul 25, 2026 5:00 AM (GMT+9)" (7/17→7/25) | ✓ |
| 3 | 3.28 허상 136일 | https://www.pathofexile.com/forum/view-thread/3914487 , https://poe.kakaogames.com/forum/view-thread/3955024 | 시작 "Mar 07, 2026 4:00 AM (GMT+9)", 종료 "2026년 7월 21일(화) 오전 7시" (3/7→7/21) | ✓ |
| 4 | 3.29 108일 | 3987516, https://www.pathofexile.com/forum/view-thread/4010618 | 시작 7/25, 종료 "Nov 10, 2026 6:00 AM (GMT+9)" (7/25→11/10) | ✓ |
| 5 | 시작 한국 오전 5시, 종료 오전 6시 | 3987516, 4010618 | 위 두 시각 | ✓ |
| 6 | 둘 다 태평양 오후 1시, 사이에 서머타임 종료로 시차 1시간 증가 | https://www.pathofexile.com/forum/view-thread/3986665 , 4010618 | "1PM July 24 PDT", "1PM November 9th (PST)" (PDT=UTC-7 → 05:00 KST, PST=UTC-8 → 06:00 KST) | ✓ |
| 7 | 종료 뒤 4일 동안 챌린지 리그 없이 스탠다드 리그만 열림 | 4010618 | 날수 4일은 맞음(11/10→11/14). "스탠다드 리그만 열린다"는 출처에 없음 | ✗ |
| 8 | [poe1-3-30] GGG가 3.30을 엑자일콘 첫날(태평양 11월 6일)에 공개한다고 밝힘 | 4010618, https://www.pathofexile.com/forum/view-thread/4009902 | 4010618 "full details to be revealed at ExileCon 2026 this November"만 있음. 첫날 공개라는 말은 없음 (4009902는 행사 일정만) | ✗ |
| 9 | 키노트 한국 11월 7일(토) 오전 6시 | 4009902 | "The keynote begins at 1PM PST (Nov 07, 2026 6:00 AM (GMT+9))" | ✓ |
| 10 | 11월 14일(토)은 공개 7일 뒤, 3.29(8일)보다 하루 짧음 | 4010618, https://poe.kakaogames.com/forum/view-thread/4010521 | 시작일 "2026년 11월 14일(토)(한국 시간)"은 맞음. "공개 7일 뒤"는 8행의 공개일을 전제로 해 근거 없음 | ✗ |
| 11 | 3.29가 11월 10일(화) 오전 6시 종료 | 4010521 | "2026년 11월 10일(화) 오전 6시(한국 시간)에 종료" | ✓ |
| 12 | 리그 사이 공백 4일, 3.28→3.29와 같음 | 4010521, 3955024, 3987516 | 11/10→11/14, 7/21→7/25 | ✓ |
| 13 | [poe2-0-5] 0.4 이후 168일 만의 대형 업데이트 | https://www.pathofexile.com/forum/view-thread/3885148 , https://www.pathofexile.com/forum/view-thread/3933994 | "Dec 13, 2025 4:00 AM (GMT+9)", "May 30, 2026 5:00 AM (GMT+9)" (12/13→5/30) | ✓ |
| 14 | 정식 출시(1.0) 전 마지막 리그 | 3933994, https://www.pathofexile.com/forum/view-thread/4000430 | 출처에 없음. 9월 5일 이벤트 리그 금단의 의식이 0.5 뒤에 열림 | ✗ |
| 15 | 한국 5월 30일(토) 오전 5시 시작 | 3933994 | "servers go live at: May 30, 2026 5:00 AM (GMT+9)" | ✓ |
| 16 | 9월 5일(토) 오전 5시 이벤트 리그 금단의 의식(Forbidden Rites) | 4000430, https://poe.kakaogames.com/forum/view-thread/4000434 | "1PM PDT on September 4th, which is Sep 05, 2026 5:00 AM (GMT+9)", 카카오 "2026년 9월 5일(토) 오전 5시" | ✓ |
| 17 | 두 리그는 1.0 출시 때 함께 종료 | 4000430, 4000434 | "will run until the 1.0 full release and will end alongside Runes of Aldur" | ✓ |
| 18 | [poe2-1-0] 1.0부터 무료 플레이 | https://www.pathofexile.com/forum/view-thread/3999366 | "launches as a fully free-to-play action RPG on December 11 (PST)" | ✓ |
| 19 | 새 직업 듀얼리스트 | 3999366 | "The full release will introduce the Duelist" | ✓ |
| 20 | 아직 나오지 않았던 캠페인 액트 2개 추가 | https://www.pathofexile.com/forum/view-thread/3999509 | "adds the remaining campaign Acts", "The final two acts will launch with the 1.0 Full Release" | ✓ |
| 21 | 출시일은 8월 말 게임스컴 오프닝 나이트 라이브에서 발표 | 3999509 | "debuted in a trailer at gamescom Cologne’s Opening Night Live, where the December 11 release date was also announced" (게시 8월 26일 KST) | ✓ |
| 22 | 0.5 이후 196일 | 3933994, 4000434 | 5/30 → "12월 12일(토)" | ✓ |
| 23 | 얼리 액세스 동안의 대형 업데이트 간격(105~168일)보다 김 | https://www.pathofexile.com/forum/view-thread/3829091 , 3885148, 3933994 | 0.3→0.4 105일(8/30→12/13), 0.4→0.5 168일은 맞음. 0.1·0.2 일정은 사이트 데이터와 출처에 없어 "얼리 액세스 동안" 전체 범위는 확인 불가 | ✗ |
| 24 | 태평양 12월 11일 → 한국 하루 뒤 12월 12일(토) | 3999366, 4000434 | "December 11 (PST)", "1.0이 정식 출시되는 12월 12일(토)" | ✓ |
| 25 | [d4-s15] 블리즈컨(한국 9월 13~14일) 이틀 뒤 시작 | https://news.blizzard.com/ko-kr/article/24293056 , https://news.blizzard.com/ko-kr/article/24295394 | "한국 시간 9월 13~14일", "9월 16일 시즌이 바뀌면" | ✓ |
| 26 | 개발자 업데이트 라이브스트림 공지 없음 | https://news.blizzard.com/ko-kr/api/feed/diablo-4?offset=0 | 목록에서 "다음 개발자 업데이트 라이브스트림을 놓치지 마십시오"는 24280283(14시즌용)이 마지막, 이후 15시즌용 없음 | ✓ |
| 27 | PTR 공지에서 블리즈컨에서 더 공개한다고 밝힘 | https://news.blizzard.com/ko-kr/article/24292852 | "개발팀은 블리즈컨에서 더 많은 소식을 공개할 예정이며, 15시즌의 모든 콘텐츠가 공식 발표에 앞서 공개되는 걸 원치 않았습니다" | ✓ |
| 28 | 이 시즌에 환생 도입 | 24292852, 24295394 | "15시즌 시작 전에 … 캐릭터 환생 … 테스트", "환생으로 전설을 이어 가십시오" | ✓ |
| 29 | 영원 캐릭터를 시즌 영역으로 옮겨 1레벨부터 | 24295394 | "영원 캐릭터를 시즌 상태로 변환하면 … 시즌 영역으로 이동하고 1레벨로 초기화" | ✓ |
| 30 | 시작 시각이 한국어판·영어판 1시간 다름 | https://news.blizzard.com/ko-kr/article/24301509 , https://news.blizzard.com/en-us/article/24301509 | "한국 시간 9월 16일 오전 2:30", "September 15, 9:30 a.m. PT" (PDT → 9/16 01:30 KST) | ✓ |
| 31 | [le-s5] 시즌 4 이후 189일 | https://forum.lastepoch.com/t/last-epoch-shattered-omens-patch-notes/80571 , https://forum.lastepoch.com/t/countdown-to-season-5-rage-of-the-frostborn-hits-october-1/81745 | "launches 2026-03-26T16:00:00Z"(3/27 KST), "October 1 at 11 AM CDT"(10/2 KST) | ✓ |
| 32 | 한국 10월 2일(금) 오전 1시 시작, 이름 Rage of the Frostborn | 81745 | "October 1 at 11 AM CDT: Season 5: Rage of the Frostborn launches" (CDT=UTC-5 → 16:00 UTC → 01:00 KST) | ✓ |
| 33 | 시즌 3·4와 같은 UTC 16시 | https://forum.lastepoch.com/t/last-epoch-beneath-ancient-skies-patch-notes/78635 , 80571 | "Season 3 … launches 2025-08-21T16:00:00Z", "Season 4 … launches 2026-03-26T16:00:00Z" | ✓ |
| 34 | Merchant’s Guild Rank에 따른 구매 제한 폐지 | https://forum.lastepoch.com/t/faction-updates-coming-to-last-epoch-october-1/81759 | "Rank Rework": "the Merchant’s Guild will no longer gate item purchases behind ranks" | ✓ |
| 35 | Circle of Fortune Prophecy 다시 뽑기 폐지 | 81759 | "Prophecies": "we’ve completely removed Prophecy rerolling" | ✓ |
| 36 | [tli-ss14] SS13 애프터라이트 이후 91일 | https://store.steampowered.com/news/app/1974050/view/1838407329258272 , https://store.steampowered.com/news/app/1974050/view/1846651706679832 | 한국어 본문 "신규 시즌 「애프터라이트」 7월 17일 정식 오픈", "신규 시즌 「타르타로스」 10월 16일 정식 오픈" | ✓ |
| 37 | SS11부터 세 번 연속 같은 간격 (seasons.json 수정 문장) | https://store.steampowered.com/news/app/1974050/view/1821922921814686 , https://store.steampowered.com/news/app/1974050/view/1830163047258912 , 1838407329258272, 1846651706679832 | 1월 16일 → 4월 17일 → 7월 17일 → 10월 16일, 각 91일. SS10(10월 11일)→SS11은 97일이라 SS11부터 세 번이 맞음 | ✓ |
| 38 | 한국 10월 16일(금) 오전 11시 = 태평양 전날 오후 7시 | https://torchlight.xd.com/ss14pn/?lang=en | "The brand-new season “Tartarus” launches globally on October 15 at 7:00 PM PDT" (=10/16 02:00 UTC = 11:00 KST) | ✓ |
| 39 | 스팀 공지 제목은 시즌 이름만 | 1846651706679832 | 한국어 제목 "[타르타로스]시즌 업데이트 내용", 영어 "Torchlight: Infinite - “Tartarus” SEASON" | ✓ |
| 40 | SS14 번호는 공식 사이트 시즌 패치노트 주소에서 쓰임 | https://torchlight.xd.com/us/index | “Tartarus” Season Patch Notes 링크가 https://torchlight.xd.com/ss14pn/ (페이지 제목 "SS14 Season Update Log") | ✓ |
| 41 | [d2r-s15] 14시즌 8월 18일(화) 오전 3시 종료, 4일 뒤 시작 | https://news.blizzard.com/ko-kr/article/24296140 | "래더 14시즌 종료 - 8/18 화요일 오전 3시", "래더 15시즌 시작 - 8/22 오전 9시" | ✓ |
| 42 | 시즌 패치 3.3이 그 사이 8월 19일 배포 | 24296140 | "래더 15시즌 패치 배포 시작 - 8/19 수요일", "3.3 패치 노트" | ✓ |
| 43 | 15시즌부터 패치·래더 전체 일정 조정 | 24296140 | "이번 시즌부터 패치 및 래더의 전체적인 일정이 다소 조정됩니다" | ✓ |
| 44 | 앞으로도 비슷한 일정 | 24296140 | "향후 시즌도 비슷한 일정으로 진행될 예정입니다" | ✓ |
| 45 | 한국(아시아) 토요일 오전 9시 = 북미 금요일 오후 5시(PDT) | 24296140 | "래더 15시즌 출시 일정" 북미 "8월 21일 오후 5시(PDT)", 아시아 "8월 22일 오전 9시(KST)" | ✓ |
| 46 | 14시즌 공유 보관함 아이템은 15시즌 기간 안에 꺼내야 | 24296140 | "래더 15시즌 기간 동안 이 탭에서 … 14시즌 아이템을 꺼낼 수 있습니다 … 그 전에 필요한 아이템을 꺼내지 않으면 영영 사라지니" | ✓ |
| 47 | [poe1] 몇 달마다 새 챌린지 리그 | 3914487, 3987516, 4010521 | 3.28 3/7, 3.29 7/25, 3.30 11/14 (약 3~4개월) | ✓ |
| 48 | 리그마다 새 캐릭터로 처음부터 | 3986665 | "Do I need to create a new character …? Yes, if you want to play the Curse of the Allflame League" | ✓ |
| 49 | 리그가 끝나면 캐릭터는 스탠다드 리그로 | 3986665 | "Your existing characters will still be available and playable in Standard leagues", "Remove Only stash tabs in the Standard leagues" | ✓ |
| 50 | [poe2] 얼리 액세스 동안 대형 업데이트마다 새 리그 | https://www.pathofexile.com/forum/view-thread/3826247 , 3829091, 3885148, 3933994 | "Dawn of the Hunt leagues", "start playing in a new League with a fresh economy", "join the Rise of the Abyssal / Fate of the Vaal / Runes of Aldur Leagues" | ✓ |
| 51 | 한국 12월 12일(토) 1.0과 함께 무료 플레이 | 3999366, 4000434 | 18·24행 | ✓ |
| 52 | 얼리 액세스 동안 리그가 끝나면 스탠다드나 하드코어 얼리 액세스 리그로 | 3826247 | "The Dawn of the Hunt leagues will end … All your characters and their items will be migrated to the Standard or Hardcore Early Access league" (0.2 리그 한 번에 대한 공지) | ✗ |
| 53 | [d2r] 래더는 새 래더 캐릭터로 참여하는 선택형 경쟁 모드 | https://news.blizzard.com/ko-kr/article/23762796 | "새로운 래더용 캐릭터로 참여할 수 있는 선택적 경쟁 시스템" | ✓ |
| 54 | 시즌이 끝나면 순위 초기화, 래더 캐릭터 비래더로 | 23762796 | "래더 시즌이 종료되면 순위가 초기화되고, 캐릭터가 비래더 모드로 전환" | ✓ |
| 55 | [d4] 캐릭터 만들 때 시즌·영원의 영역 중 선택 | https://news.blizzard.com/ko-kr/article/24267729 | "캐릭터를 만들 때는, 시즌 영역이나 영원의 영역 중 어디에서 전투를 시작할지 선택" | ✓ |
| 56 | 시즌 종료 시 시즌 캐릭터·아이템이 영원의 영역으로, 계속 사용 | https://support.blizzard.com/ko-kr/article/340698 | "시즌이 종료되어도 아이템을 보관할 수 있나요?" 답변 "캐릭터와 진행 상황은 영원의 영역으로 이전 … 모든 아이템도 함께 … 언제든 성역으로 데려갈 수" | ✓ |
| 57 | [tli] SS 번호가 붙은 시즌을 약 3개월마다 | https://torchlight.xd.com/ss14pn/?lang=ko , 36·37행 출처 | "토치라이트: 인피니트 · SS14 시즌 업데이트 로그", 시즌 간격 91~97일 | ✓ |
| 58 | SS11부터 SS14까지 91일(13주) 간격 | 37행 출처 | 각 91일 | ✓ |
| 59 | 모두 한국 시간 금요일 시작 | 37행 출처 | 1/16, 4/17, 7/17, 10/16 모두 금요일 | ✓ |
| 60 | [le] 시즌(Cycle)마다 모두 새로 시작 | https://forum.lastepoch.com/t/last-epoch-1-0-patch-notes/62536 | "Cycles are Last Epoch’s “Seasons” … a fresh start for everyone" | ✓ |
| 61 | 시즌이 끝나면 캐릭터와 보관함은 Legacy로 | 62536, https://forum.lastepoch.com/t/last-epoch-harbingers-of-ruin-patch-notes/71790 | "All characters and items will transfer over to Legacy", "All 1.0 Cycle characters are now moved to Legacy / Those characters stashes are also now moved to Legacy" | ✓ |
| 62 | 거래 여부는 아이템 세력(MG, CoF) 선택으로 | https://forum.lastepoch.com/t/trade-item-factions/61722 | "different cycles for trade or trade-free … The answer? Item Factions", MG "trade items with other players", CoF "boosts to items you find yourself" | ✓ |

## ✗ 문장 고칠 안

- 7 (poe1-3-29): "종료 뒤 3.30이 열리기까지 4일 동안은 챌린지 리그 없이 스탠다드 리그만 열린다." → "종료 뒤 3.30이 열리기까지는 4일이 빈다."
- 8·10 (poe1-3-30): "GGG는 3.30을 엑자일콘 첫날(태평양 시간 11월 6일)에 공개한다고 밝혔고, 그날 키노트는 한국 시간 11월 7일(토) 오전 6시에 시작한다. 시작일 11월 14일(토)은 공개 7일 뒤로, 공개부터 출시까지 8일이 걸린 3.29보다 하루 짧다." → "GGG는 3.30의 자세한 내용을 11월 엑자일콘에서 공개한다고 밝혔고, 엑자일콘 키노트는 한국 시간 11월 7일(토) 오전 6시에 시작한다. 시작일 11월 14일(토)은 키노트 7일 뒤다."
- 14 (poe2-0-5): "0.5는 0.4 최후의 드루이드 이후 168일 만에 나온 대형 업데이트이자, 정식 출시(1.0) 전 마지막 리그다." → "0.5는 0.4 최후의 드루이드 이후 168일 만에 나온 대형 업데이트다."
- 23 (poe2-1-0): "0.5 이후 196일 만으로, 얼리 액세스 동안의 대형 업데이트 간격(105~168일)보다 길다." → "0.5 이후 196일 만으로, 0.3에서 0.4까지(105일), 0.4에서 0.5까지(168일)의 간격보다 길다."
- 52 (poe2 게임): "얼리 액세스 동안에는 리그가 끝나면 캐릭터가 스탠다드나 하드코어 얼리 액세스 리그로 옮겨졌다." → "GGG는 0.2 리그(Dawn of the Hunt)가 끝날 때 캐릭터와 아이템을 스탠다드나 하드코어 얼리 액세스 리그로 옮긴다고 공지했다."

## 참고
- 시즌 이름(올플레임의 저주, 허상, 고대의 귀환, 최후의 드루이드, 알두르의 룬, 금단의 의식, 지옥의 유산, 애프터라이트, 타르타로스)은 카카오게임즈 공지·블리자드 한국어 공지·스팀 한국어 공지에서 표기 확인
- 7행의 날수 4일 자체는 맞음 (12행과 같은 근거)
