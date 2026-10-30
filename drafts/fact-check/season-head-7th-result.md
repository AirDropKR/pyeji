# 사실 확인: 시즌 상세 페이지 제목·검색 설명 (7차, season-head)

확인일 2026-10-31(한국 시간). 대상: `src/lib/season-head.ts`가 만드는 문장과 `src/data/seasons.json`의 `endNote`, `src/data/events.json`의 `label`.

사실 문장 21개, ✓ 20, ✗ 1

| # | 글 속 문장 | 출처 URL | 출처 안 위치(제목·섹션·원문 일부) | 확인일 | 결과 |
|---|---|---|---|---|---|
| 1 | [D2R 래더 15시즌] 종료일 공식 발표 전 | https://news.blizzard.com/ko-kr/api/feed/diablo-2-resurrected?offset=0 (en-us 목록도 확인), https://news.blizzard.com/ko-kr/article/24296140 | 목록 최신 D2R 글이 24296140 "디아블로 II: 레저렉션 래더 15시즌 지금 진행 중". 그 뒤에는 블리즈컨·디아블로 V 공용 글뿐이고 15시즌 종료·16시즌 공지는 없음. 24296140 일정에는 14시즌 종료, 15시즌 패치, 15시즌 시작만 있음 | 2026-10-31 | ✓ |
| 2 | [D2R 래더 15시즌] 한국 시간 2026년 8월 22일(토) 오전 9시 시작 | https://news.blizzard.com/ko-kr/article/24296140 | "래더 15시즌 시작 - 8/22 오전 9시(한국 시간)", "8월 21일 오후 5시(PDT)", "8월 22일 오전 9시(KST)" (PDT 17시 = UTC 다음 날 0시 = KST 9시, 2026-08-22는 토요일) | 2026-10-31 | ✓ |
| 3 | [D2R 래더 15시즌] 블리자드 15시즌 공지: 이번 시즌부터 패치·래더 일정을 조정, 이후 시즌도 비슷한 일정 | https://news.blizzard.com/ko-kr/article/24296140 | "래더 15시즌 일정:" 아래 "이번 시즌부터 패치 및 래더의 전체적인 일정이 다소 조정됩니다. 향후 시즌도 비슷한 일정으로 진행될 예정입니다." | 2026-10-31 | ✓ |
| 4 | [D4 15시즌 지옥의 유산] 종료일 공식 발표 전 | https://news.blizzard.com/ko-kr/api/feed/diablo-4?offset=0 (en-us 목록도 확인), https://news.blizzard.com/ko-kr/article/24302578, https://news.blizzard.com/ko-kr/article/24295395 | 목록 최신 글이 24302578 "3.3.0 공개 테스트 서버: 알아야 할 내용". 이 글과 패치 노트(최신 "3.2.4 빌드 #74043 - 2026년 10월 29일")에 15시즌 종료일·16시즌 시작일 없음 | 2026-10-31 | ✓ |
| 5 | [D4 15시즌] 한국 시간 2026년 9월 16일(수) 시작 | https://news.blizzard.com/ko-kr/article/24295394 | "9월 16일 시즌이 바뀌면 14시즌 캐릭터들의 전쟁 계획 진행 현황은 영원의 영역으로 이전됩니다." (2026-09-16은 수요일) | 2026-10-31 | ✓ |
| 6 | [D4 15시즌] 16시즌 공개 테스트 서버 한국 시간 10월 28일~11월 4일 | https://news.blizzard.com/ko-kr/article/24302578 | "디아블로 IV 16시즌의 3.3.0 공개 테스트 서버(PTR)는 한국 시간 기준으로 10월 28일 오전 2시~11월 4일 오전 2시에 운영되며" | 2026-10-31 | ✓ |
| 7 | [D4 15시즌] 16시즌 시작일은 발표 전 | https://news.blizzard.com/ko-kr/article/24302578, 디아블로 4 소식 목록 | PTR 글은 "다음 시즌이 시작되기 전"이라고만 하고 날짜 없음. 목록에 그 뒤 공지 없음 | 2026-10-31 | ✓ |
| 8 | [라스트 에폭 시즌 5] 종료일 공식 발표 전 | https://forum.lastepoch.com/c/news/64.json, https://forum.lastepoch.com/c/developer-blogs/38.json, https://forum.lastepoch.com/c/patch-notes/39.json, 스팀 공지 app/899770 | 최신 EHG 글: News "Oct. 23 Developer Livestream Questions - Rage of Morditas"(10/22), Patch Notes "Last Epoch 1.5.3 Patch Notes"(10/21), 스팀 "Last Epoch Patch 1.5.3 Notes"(10/21). 어디에도 시즌 5 종료일·시즌 6 일정 없음 | 2026-10-31 | ✓ |
| 9 | [라스트 에폭 시즌 5] 한국 시간 2026년 10월 2일(금) 오전 1시 시작 | https://forum.lastepoch.com/t/countdown-to-season-5-rage-of-the-frostborn-hits-october-1/81745 | "October 1 at 11 AM CDT: Season 5: Rage of the Frostborn launches" (CDT UTC-5 → UTC 16시 → KST 10월 2일 1시, 금요일) | 2026-10-31 | ✓ |
| 10 | [토치라이트 SS14 타르타로스] 종료일 공식 발표 전 | 스팀 공지 app/1974050, https://torchlight.xd.com/en/news/list | 스팀 최신 공지가 "Torchlight: Infinite - "Tartarus" SEASON"(10/16), 공식 사이트 뉴스 최신이 2026/10/15 ""Tartarus" Season Patch Notes". 종료일·SS15 일정 없음 | 2026-10-31 | ✓ |
| 11 | [토치라이트 SS14] 한국 시간 2026년 10월 16일(금) 오전 11시 시작 | https://torchlight.xd.com/ss14pn/?lang=en, https://store.steampowered.com/news/app/1974050/view/1846651706679832 | "The brand-new season "Tartarus" launches globally on October 15 at 7:00 PM PDT" (PDT 19시 = UTC 10/16 2시 = KST 11시), 스팀 "Launches Oct 16!" | 2026-10-31 | ✓ |
| 12 | [POE2 0.5] 종료일은 정식 출시 (1.0) 시작일인 한국 시간 2026년 12월 12일(토) | https://poe.kakaogames.com/forum/view-thread/4000434, https://www.pathofexile.com/forum/view-thread/4000430, https://www.pathofexile.com/forum/view-thread/3999366 | 카카오 "현재 진행 중인 알두르의 룬 리그는 그대로 유지되며 1.0 정식 출시까지 계속 진행됩니다", "금단의 의식은 1.0 정식 출시까지 진행되며, 알두르의 룬과 함께 종료됩니다", "1.0이 정식 출시되는 12월 12일(토)". GGG "running until the 1.0 full release", "launches ... on December 11 (PST)" | 2026-10-31 | ✓ |
| 13 | [POE2 0.5] 종료 시각은 공식 발표 전 | 위 3개, https://www.pathofexile.com/forum/view-forum/2211 | 세 공지 모두 종료 시각 없음. Early Access Announcements 최신 글(10/30 "Path of Exile 2 1.0 Full Reveal - Watch ExileCon 2026 on November 6 PST", "ExileCon 2026 Schedule and Information for Attendees")에도 없음 | 2026-10-31 | ✓ |
| 14 | [POE1 3.29] 종료일 11월 10일(화) 오전 6시(한국 시간) | https://www.pathofexile.com/forum/view-thread/4010618, https://poe.kakaogames.com/forum/view-thread/4010521 | GGG "will end at 1PM November 9th (PST) (Nov 10, 2026 6:00 AM (GMT+9) ...)", 카카오 "2026년 11월 10일(화) 오전 6시(한국 시간)에 종료됩니다" | 2026-10-31 | ✓ |
| 15 | [POE1 3.29] 다음 리그 3.30 11월 14일(토) 시작 | https://poe.kakaogames.com/forum/view-thread/4010521, https://www.pathofexile.com/forum/view-thread/4010618 | 카카오 "3.30 확장팩 출시 일정 2026년 11월 14일(토)(한국 시간)에 출시되며", GGG "released on November 13 (PST)" | 2026-10-31 | ✓ |
| 16 | [POE1 3.30] 시작일 한국 시간 2026년 11월 14일(토) | 위와 같음 | 위와 같음 | 2026-10-31 | ✓ |
| 17 | [POE1 3.30] 시각 발표 전 (리그 이름도 미발표) | https://www.pathofexile.com/forum/view-forum/news, https://poe.kakaogames.com/forum/view-forum/news, X 게시물 | GGG Announcements 최신 글 10/19 할로윈 상품, 카카오 공지 최신 10/23 "주말 보관함 할인". 4010618 뒤로 3.30 시각·이름 공지 없음. X "3.30 Launch - Nov 13 PST"(시각 없음) | 2026-10-31 | ✓ |
| 18 | [POE1 3.30] 11월 7일(토) 오전 5시 엑자일콘 2026 생중계 | https://www.pathofexile.com/forum/view-thread/4009902, https://www.pathofexile.com/forum/view-thread/4011825, https://www.pathofexile.com/forum/view-thread/4012155 | 4009902(10/7)는 "Join the livestream at 12PM on November 6 and 7 PST (Nov 07, 2026 5:00 AM (GMT+9))". 그러나 뒤 공지 4011825 "Two Weeks Until ExileCon 2026!"(한국 시간 10/26 게시)은 "The keynote officially starts at 1:00 PM on November 6th PST (Nov 07, 2026 6:00 AM (GMT+9) ...). We'll go live at 12:30 PM with a pre-show", 4012155(10/30)도 "Tune in to the broadcast at 12:30 PM PST". 12:30 PM PST = 한국 시간 11월 7일 오전 5시 30분 | 2026-10-31 | ✗ |
| 19 | [POE1 3.30] (3.30 공개), 제목 "11월 7일 엑자일콘 공개" | https://x.com/pathofexile/status/2109750375381393508, https://www.pathofexile.com/forum/view-thread/4010618, https://www.pathofexile.com/forum/view-thread/4011825 | X "3.30 Reveal - ExileCon 2026 \| Nov 6 PST", 4010618 "full details to be revealed at ExileCon 2026", 4011825 키노트 "Nov 07, 2026 6:00 AM (GMT+9)" → 한국 11월 7일 | 2026-10-31 | ✓ |
| 20 | [POE2 1.0] 시작일 한국 시간 2026년 12월 12일(토) | https://www.pathofexile.com/forum/view-thread/3999366, https://poe.kakaogames.com/forum/view-thread/4000434 | GGG "launches as a fully free-to-play action RPG on December 11 (PST)", 카카오 "1.0이 정식 출시되는 12월 12일(토)" | 2026-10-31 | ✓ |
| 21 | [POE2 1.0] 시각 발표 전 | https://www.pathofexile.com/forum/view-forum/2211, https://www.pathofexile.com/forum/view-thread/4011278, https://www.pathofexile.com/forum/view-thread/4012155 | 최신 공지 4011278(10/20) "launches as a free-to-play game on December 11th PST", 4012155(10/30)는 11월 6일 PST 공개 방송 안내뿐. 출시 시각 없음 | 2026-10-31 | ✓ |

## ✗ 고칠 안

- 18: "11월 7일(토) 오전 5시 30분 엑자일콘 2026 생중계 (3.30 공개)". `events.json`의 엑자일콘 이벤트 `startsAt`을 `2026-11-06T20:00:00Z` → `2026-11-06T20:30:00Z`로 바꾸고 `sourceUrl`을 https://www.pathofexile.com/forum/view-thread/4011825 로 바꾼다. 키노트를 기준으로 하려면 `2026-11-06T21:00:00Z`(한국 시간 오전 6시, 4011825·4012171 "keynote ... starts at 10am" NZT)로 한다. 제목의 "11월 7일 엑자일콘 공개"는 날짜만 쓰므로 그대로 둔다.

## 참고 (판정에는 넣지 않음)

- 3.30 시작 시각, 3.30 리그 이름, POE2 1.0 출시 시각, D2R·D4·라스트 에폭·토치라이트의 종료일은 2026-10-31 기준 모두 공식 발표되지 않았다.
- POE2 쪽 가장 가까운 공지는 4012155 "Path of Exile 2 1.0 Full Reveal - Watch ExileCon 2026 on November 6 PST"(10/30). 1.0 시각이나 0.5 종료 시각은 엑자일콘(한국 시간 11월 7일) 이후 다시 확인해야 한다.
