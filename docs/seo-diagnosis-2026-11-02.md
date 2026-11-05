# 검색 노출 중단 원인 진단 (2026-11-02 요청, 2026-11-05 확인)

증상: 서치 콘솔에서 10월 28일 무렵부터 노출 0, 며칠째 회복 안 됨.
확인 방법: git 기록, 빌드 결과(dist) 전수 검사, 실서버에 curl(일반 브라우저와 Googlebot User-Agent 두 가지). 확인 시각 2026-11-05 20:40(한국 시간). 배포돼 있던 버전은 `93adc7f`(10월 31일 08:43 push). 8차 커밋 6개(11월 5일)는 아직 push 전이라 실서버와 무관.

## 요약

| 구분 | 내용 |
|---|---|
| 배제됨 | 코드 변경: 10월 22일 23:40 push(`3759268`) 뒤 10월 31일 08:43 push 전까지 배포된 코드는 바뀌지 않았다. 10월 28일 무렵의 하락 시점에 새로 배포된 코드가 없다 |
| 배제됨 | noindex 실수: 빌드 결과 59개, 실서버 사이트맵 주소 37개 전부 확인. 검색에 나와야 할 페이지에 noindex 없음. 공통 레이아웃은 `noindex` 값을 받은 페이지에만 붙임 |
| 배제됨 | robots.txt 차단: Googlebot과 `*`는 `Allow: /`. Cloudflare가 붙인 차단은 AI 학습 봇(Google-Extended, GPTBot 등)뿐 |
| 배제됨 | X-Robots-Tag, 5xx·4xx, 리다이렉트 반복: 없음. Googlebot User-Agent로도 같은 200과 같은 내용 |
| 배제됨 | 사이트맵 오류: 200, 올바른 XML, 주소 37개 모두 https://pyeji.kr |
| 배제됨 | 서치 콘솔 속성 문제: 운영자 확인(11월 5일) 결과 보고 있는 속성은 도메인 속성 `pyeji.kr`. www·http를 모두 포함하므로 리다이렉트로 노출이 다른 속성으로 옮겨 간 것은 아님 |
| 확실 (11월 5일) | 대표 주소 전환 중 공백: 서치 콘솔 "내 콘텐츠"의 클릭 페이지가 모두 www 주소 → 구글은 www 버전만 색인해 왔다. URL 검사에서 www 주소와 https://pyeji.kr 주소 둘 다 "URL이 Google에 등록되어 있지 않음" → www에 301이 걸리면서 www 주소는 색인에서 빠졌고, https://pyeji.kr 주소는 아직 색인 전. 색인된 주소가 없는 공백 기간이라 노출 0. 코드의 canonical은 10월 19일부터 https://pyeji.kr이었고 저장소에 www가 들어간 적은 없어, 구글이 www를 고른 이유는 저장소 밖(처음 공유·제출한 주소 등)으로 보이며 확인 불가 |
| 확인 못 함 | 실제 구글 IP에서 온 Googlebot을 Cloudflare가 막는지: 이쪽에서는 구글 IP로 요청할 수 없다. 가짜 Googlebot 이름(일반 IP)으로는 200이 나옴. Cloudflare 보안 이벤트와 서치 콘솔 크롤링 통계로 확인 필요 |
| 확인 못 함 | www·http 리다이렉트가 정확히 언제 생겼는지: 10월 31일 처음 확인했을 때 이미 301. 시작 날짜는 Cloudflare 규칙 기록에서 확인 필요 |

조치: 코드 쪽 원인이 없어 고친 코드 없음. 운영자 확인 순서는 맨 아래.

## 1. 10월 25일 이후 바뀐 것

배포(push) 기록: 10월 22일 23:40 `3759268` → 10월 31일 08:43 `93adc7f` → (11월 5일 8차 커밋 6개는 push 전). 그 사이에는 매일 오전 7시 자동 재빌드만 있었고, 이 기간에 새로 끝난 시즌이 없어 재빌드로 noindex가 바뀐 페이지도 없다.

| 커밋 | 날짜(한국) | 배포 | 바뀐 내용 | 검색 노출 영향 |
|---|---|---|---|---|
| `eb2ead4` | 10-31 00:43 | 10-31 08:43 | /posts/ noindex + 사이트맵 제외 (`posts/index.astro`, `astro.config.mjs`) | 의도한 1개. 다른 페이지 영향 없음. 하락(10월 28일 무렵)보다 뒤 |
| `bab529a` | 10-31 00:59 | 10-31 08:43 | 시즌·게임 소개 문단 (`[slug].astro`, `[id].astro`) | 없음 (본문 추가) |
| `7ec529e` | 10-31 01:05 | 10-31 08:43 | /updates/ 새 페이지 noindex + 사이트맵 제외 | 새 페이지만. 하락보다 뒤 |
| `9ee0ae6` | 10-31 01:06 | 10-31 08:43 | /tools/leave-planner/ 새 페이지, 시즌·글에 링크 | 없음 (색인 대상 추가) |
| `9f4560c` | 10-31 01:11 | 10-31 08:43 | check:site에 대표 주소 검사 (스크립트만) | 없음 |
| `195fd94` | 10-31 08:39 | 10-31 08:43 | 진행 중 시즌 제목·설명 변경 (`season-head.ts`) | 제목만. noindex·canonical 그대로 |
| `d5accab` | 10-31 08:39 | 10-31 08:43 | 3.30 시즌 제목, 사전 정보 글 제목 | 제목만 |
| `7169504` | 11-05 20:30 | push 전 | 상단 메뉴 "도구", /tools/ | 아직 배포 안 됨 |
| (Cloudflare) | 확인 필요 | 대시보드 | www·http → https://pyeji.kr 301 | 주소별 노출이 옮겨 감. 아래 "가능성 높음" |

바뀌지 않은 것 (10월 25일 이후 커밋 없음): `public/robots.txt`, `public/_headers`, `wrangler.jsonc`, `astro.config.mjs`의 `site`·`trailingSlash`, `Base.astro`의 robots·canonical 줄, `src/lib/seasons.ts`의 `isIndexable`

## 2. 빌드 결과 (8차 포함 로컬 빌드, 59개)

- noindex 21개: 404, 끝났고 연결 글이 없는 시즌 18개, /posts/, /updates/. 모두 의도한 것
- 검색에 나와야 할 페이지(메인, 게임 6, 진행 중·다음 시즌 8, 글 16, /now/, /calendar/, 도구, 안내 3)에 noindex 없음
- canonical: noindex가 아닌 페이지 전부 `https://pyeji.kr{자기 주소}`이고 실제 파일이 있음
- 사이트맵 38개(로컬, /tools/ 포함) = noindex가 아닌 페이지 전부. 사이트맵에 noindex 페이지 없음

전체 표:

| 주소 | noindex | canonical | canonical=자기 주소·존재 | 사이트맵 |
|---|---|---|---|---|
| / | - | https://pyeji.kr/ | 맞음 | 있음 |
| /404.html | 예 | (없음) | - | - |
| /about/ | - | https://pyeji.kr/about/ | 맞음 | 있음 |
| /calendar/ | - | https://pyeji.kr/calendar/ | 맞음 | 있음 |
| /contact/ | - | https://pyeji.kr/contact/ | 맞음 | 있음 |
| /games/d2r/ | - | https://pyeji.kr/games/d2r/ | 맞음 | 있음 |
| /games/d2r/seasons/season-12/ | 예 | (없음) | - | - |
| /games/d2r/seasons/season-13/ | 예 | (없음) | - | - |
| /games/d2r/seasons/season-14/ | 예 | (없음) | - | - |
| /games/d2r/seasons/season-15/ | - | https://pyeji.kr/games/d2r/seasons/season-15/ | 맞음 | 있음 |
| /games/d4/ | - | https://pyeji.kr/games/d4/ | 맞음 | 있음 |
| /games/d4/seasons/season-10/ | 예 | (없음) | - | - |
| /games/d4/seasons/season-11/ | 예 | (없음) | - | - |
| /games/d4/seasons/season-12/ | 예 | (없음) | - | - |
| /games/d4/seasons/season-13/ | 예 | (없음) | - | - |
| /games/d4/seasons/season-14/ | 예 | (없음) | - | - |
| /games/d4/seasons/season-15/ | - | https://pyeji.kr/games/d4/seasons/season-15/ | 맞음 | 있음 |
| /games/le/ | - | https://pyeji.kr/games/le/ | 맞음 | 있음 |
| /games/le/seasons/season-3/ | 예 | (없음) | - | - |
| /games/le/seasons/season-4/ | 예 | (없음) | - | - |
| /games/le/seasons/season-5/ | - | https://pyeji.kr/games/le/seasons/season-5/ | 맞음 | 있음 |
| /games/poe1/ | - | https://pyeji.kr/games/poe1/ | 맞음 | 있음 |
| /games/poe1/seasons/3-27/ | 예 | (없음) | - | - |
| /games/poe1/seasons/3-28/ | 예 | (없음) | - | - |
| /games/poe1/seasons/3-29/ | - | https://pyeji.kr/games/poe1/seasons/3-29/ | 맞음 | 있음 |
| /games/poe1/seasons/3-30/ | - | https://pyeji.kr/games/poe1/seasons/3-30/ | 맞음 | 있음 |
| /games/poe2/ | - | https://pyeji.kr/games/poe2/ | 맞음 | 있음 |
| /games/poe2/seasons/0-3/ | 예 | (없음) | - | - |
| /games/poe2/seasons/0-4/ | 예 | (없음) | - | - |
| /games/poe2/seasons/0-5/ | - | https://pyeji.kr/games/poe2/seasons/0-5/ | 맞음 | 있음 |
| /games/poe2/seasons/1-0/ | - | https://pyeji.kr/games/poe2/seasons/1-0/ | 맞음 | 있음 |
| /games/tli/ | - | https://pyeji.kr/games/tli/ | 맞음 | 있음 |
| /games/tli/seasons/ss10/ | 예 | (없음) | - | - |
| /games/tli/seasons/ss11/ | 예 | (없음) | - | - |
| /games/tli/seasons/ss12/ | 예 | (없음) | - | - |
| /games/tli/seasons/ss13/ | 예 | (없음) | - | - |
| /games/tli/seasons/ss14/ | - | https://pyeji.kr/games/tli/seasons/ss14/ | 맞음 | 있음 |
| /now/ | - | https://pyeji.kr/now/ | 맞음 | 있음 |
| /posts/ | 예 | (없음) | - | - |
| /posts/d2r/ladder-cycle/ | - | https://pyeji.kr/posts/d2r/ladder-cycle/ | 맞음 | 있음 |
| /posts/d2r/ladder-end/ | - | https://pyeji.kr/posts/d2r/ladder-end/ | 맞음 | 있음 |
| /posts/d2r/ladder-only/ | - | https://pyeji.kr/posts/d2r/ladder-only/ | 맞음 | 있음 |
| /posts/d4/pre-season-flow/ | - | https://pyeji.kr/posts/d4/pre-season-flow/ | 맞음 | 있음 |
| /posts/d4/season-cycle/ | - | https://pyeji.kr/posts/d4/season-cycle/ | 맞음 | 있음 |
| /posts/d4/season-end/ | - | https://pyeji.kr/posts/d4/season-end/ | 맞음 | 있음 |
| /posts/le/cycle-legacy-factions/ | - | https://pyeji.kr/posts/le/cycle-legacy-factions/ | 맞음 | 있음 |
| /posts/le/season-cycle/ | - | https://pyeji.kr/posts/le/season-cycle/ | 맞음 | 있음 |
| /posts/poe1/3-30-preview/ | - | https://pyeji.kr/posts/poe1/3-30-preview/ | 맞음 | 있음 |
| /posts/poe1/exilecon-2026/ | - | https://pyeji.kr/posts/poe1/exilecon-2026/ | 맞음 | 있음 |
| /posts/poe1/league-cycle/ | - | https://pyeji.kr/posts/poe1/league-cycle/ | 맞음 | 있음 |
| /posts/poe2/1-0-preview/ | - | https://pyeji.kr/posts/poe2/1-0-preview/ | 맞음 | 있음 |
| /posts/poe2/league-cycle/ | - | https://pyeji.kr/posts/poe2/league-cycle/ | 맞음 | 있음 |
| /posts/poe2/what-is-league/ | - | https://pyeji.kr/posts/poe2/what-is-league/ | 맞음 | 있음 |
| /posts/schedule/2026-11/ | - | https://pyeji.kr/posts/schedule/2026-11/ | 맞음 | 있음 |
| /posts/tli/season-cycle/ | - | https://pyeji.kr/posts/tli/season-cycle/ | 맞음 | 있음 |
| /privacy/ | - | https://pyeji.kr/privacy/ | 맞음 | 있음 |
| /tools/ | - | https://pyeji.kr/tools/ | 맞음 | 있음 |
| /tools/leave-planner/ | - | https://pyeji.kr/tools/leave-planner/ | 맞음 | 있음 |
| /updates/ | 예 | (없음) | - | - |

## 3. 실서버 응답 (2026-11-05 20:40, 배포 버전 93adc7f)

BR = 일반 브라우저 User-Agent, GB = Googlebot User-Agent (일반 IP에서 보낸 것이라 실제 구글 IP 검증과는 다름)

| 요청 주소 | UA | 첫 응답 | Location | 리다이렉트 수 | 최종 코드 | 최종 주소 | X-Robots-Tag | robots 메타 |
|---|---|---|---|---|---|---|---|---|
| https://pyeji.kr/ | BR | 200 |  | 0 | 200 | https://pyeji.kr/ | - | - |
| https://pyeji.kr/ | GB | 200 |  | 0 | 200 | https://pyeji.kr/ | - | - |
| https://www.pyeji.kr/ | BR | 301 | https://pyeji.kr/ | 1 | 200 | https://pyeji.kr/ | - | - |
| https://www.pyeji.kr/ | GB | 301 | https://pyeji.kr/ | 1 | 200 | https://pyeji.kr/ | - | - |
| http://pyeji.kr/ | BR | 301 | https://pyeji.kr/ | 1 | 200 | https://pyeji.kr/ | - | - |
| http://pyeji.kr/ | GB | 301 | https://pyeji.kr/ | 1 | 200 | https://pyeji.kr/ | - | - |
| http://www.pyeji.kr/ | BR | 301 | https://www.pyeji.kr/ | 2 | 200 | https://pyeji.kr/ | - | - |
| http://www.pyeji.kr/ | GB | 301 | https://www.pyeji.kr/ | 2 | 200 | https://pyeji.kr/ | - | - |
| https://pyeji.kr/games/poe1/ | BR | 200 |  | 0 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| https://pyeji.kr/games/poe1/ | GB | 200 |  | 0 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| https://www.pyeji.kr/games/poe1/ | BR | 301 | https://pyeji.kr/games/poe1/ | 1 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| https://www.pyeji.kr/games/poe1/ | GB | 301 | https://pyeji.kr/games/poe1/ | 1 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| http://pyeji.kr/games/poe1/ | BR | 301 | https://pyeji.kr/games/poe1/ | 1 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| http://pyeji.kr/games/poe1/ | GB | 301 | https://pyeji.kr/games/poe1/ | 1 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| http://www.pyeji.kr/games/poe1/ | BR | 301 | https://www.pyeji.kr/games/poe1/ | 2 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| http://www.pyeji.kr/games/poe1/ | GB | 301 | https://www.pyeji.kr/games/poe1/ | 2 | 200 | https://pyeji.kr/games/poe1/ | - | - |
| https://pyeji.kr/games/poe1/seasons/3-30/ | BR | 200 |  | 0 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| https://pyeji.kr/games/poe1/seasons/3-30/ | GB | 200 |  | 0 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| https://www.pyeji.kr/games/poe1/seasons/3-30/ | BR | 301 | https://pyeji.kr/games/poe1/seasons/3-30/ | 1 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| https://www.pyeji.kr/games/poe1/seasons/3-30/ | GB | 301 | https://pyeji.kr/games/poe1/seasons/3-30/ | 1 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| http://pyeji.kr/games/poe1/seasons/3-30/ | BR | 301 | https://pyeji.kr/games/poe1/seasons/3-30/ | 1 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| http://pyeji.kr/games/poe1/seasons/3-30/ | GB | 301 | https://pyeji.kr/games/poe1/seasons/3-30/ | 1 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| http://www.pyeji.kr/games/poe1/seasons/3-30/ | BR | 301 | https://www.pyeji.kr/games/poe1/seasons/3-30/ | 2 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| http://www.pyeji.kr/games/poe1/seasons/3-30/ | GB | 301 | https://www.pyeji.kr/games/poe1/seasons/3-30/ | 2 | 200 | https://pyeji.kr/games/poe1/seasons/3-30/ | - | - |
| https://pyeji.kr/posts/poe1/league-cycle/ | BR | 200 |  | 0 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| https://pyeji.kr/posts/poe1/league-cycle/ | GB | 200 |  | 0 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| https://www.pyeji.kr/posts/poe1/league-cycle/ | BR | 301 | https://pyeji.kr/posts/poe1/league-cycle/ | 1 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| https://www.pyeji.kr/posts/poe1/league-cycle/ | GB | 301 | https://pyeji.kr/posts/poe1/league-cycle/ | 1 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| http://pyeji.kr/posts/poe1/league-cycle/ | BR | 301 | https://pyeji.kr/posts/poe1/league-cycle/ | 1 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| http://pyeji.kr/posts/poe1/league-cycle/ | GB | 301 | https://pyeji.kr/posts/poe1/league-cycle/ | 1 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| http://www.pyeji.kr/posts/poe1/league-cycle/ | BR | 301 | https://www.pyeji.kr/posts/poe1/league-cycle/ | 2 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |
| http://www.pyeji.kr/posts/poe1/league-cycle/ | GB | 301 | https://www.pyeji.kr/posts/poe1/league-cycle/ | 2 | 200 | https://pyeji.kr/posts/poe1/league-cycle/ | - | - |

- pyeji.kr은 200, www·http는 301 한 번으로 https://pyeji.kr/… 도착. `http://www.pyeji.kr/…`만 `https://www.pyeji.kr/…`를 거쳐 두 번(301 → 301 → 200). 반복·4xx·5xx 없음
- X-Robots-Tag 헤더 없음. 배포된 HTML의 robots 메타도 없음(색인 허용)
- Googlebot User-Agent로도 같은 코드·같은 제목("POE1 다음 리그(시즌) 언제? …"). 보안 확인 페이지 없음
- 실서버 사이트맵 37개 주소를 Googlebot User-Agent로 전부 요청: 모두 200, noindex 없음, canonical이 자기 주소. noindex는 /posts/, /updates/, 끝난 시즌에만 (빌드 결과와 같음)

### robots.txt (실서버, Googlebot User-Agent, 200 text/plain)
- 앞부분은 Cloudflare 관리형 내용: Content-Signal 설명, `User-agent: *` / `Content-Signal: search=yes,ai-train=no,use=reference` / `Allow: /`, 그다음 AI 학습 봇 차단(Amazonbot, Applebot-Extended, Bytespider, CCBot, ClaudeBot, Google-Extended, GPTBot, GoogleOther, Baiduspider 등 `Disallow: /`)
- 뒷부분은 `public/robots.txt`: `Mediapartners-Google Allow: /`, `* Allow: /`, `Sitemap: https://pyeji.kr/sitemap-index.xml`
- Googlebot과 `*`에 `Disallow: /` 없음. Google-Extended(AI 학습용)와 GoogleOther 차단은 구글 검색 색인과 관계없음
- 참고: Baiduspider도 막혀 있음(한국 검색엔 영향 적음). 네이버(Yeti)는 막혀 있지 않음

### 사이트맵
- https://pyeji.kr/sitemap-index.xml: 200 application/xml, 하위 https://pyeji.kr/sitemap-0.xml 하나
- sitemap-0.xml: 200 application/xml, XML 파싱 정상, 주소 37개 모두 https://pyeji.kr/로 시작

## 4. 운영자가 확인할 것 (순서대로)

1. **서치 콘솔 속성 종류** (가장 먼저)
   - 왼쪽 위 속성 선택 → 지금 보고 있는 속성이 `pyeji.kr`(도메인 속성)인지, `https://www.pyeji.kr/`·`https://pyeji.kr/`·`http://…`(URL 접두어 속성)인지 확인
   - URL 접두어 `https://www.pyeji.kr/`을 보고 있다면: `https://pyeji.kr/` 속성을 추가하거나(소유권 확인 필요), 도메인 속성 `pyeji.kr`을 만들어(DNS TXT 확인) 그쪽 실적을 본다. 노출이 그쪽으로 옮겨 가 있으면 원인 확정
   - 도메인 속성이면 실적 → 필터 "페이지"에서 `https://pyeji.kr/`과 `https://www.pyeji.kr/`을 나눠 날짜별로 비교
2. **URL 검사 → 실제 URL 테스트** (대표 주소 4개)
   - https://pyeji.kr/ , https://pyeji.kr/games/poe1/ , https://pyeji.kr/games/poe1/seasons/3-30/ , https://pyeji.kr/posts/poe1/league-cycle/
   - 볼 것: "페이지 가져오기: 성공", "크롤링 허용: 예", "색인 생성 허용: 예", "Google이 선택한 표준 URL"
   - www 주소(https://www.pyeji.kr/games/poe1/)도 한 번: "리디렉션이 포함된 페이지"로 나오면 정상
3. **페이지(색인 생성) 보고서**: 10월 말에 늘어난 항목이 있는지
   - "noindex 태그에 의해 제외됨": 위 21개 범위면 정상
   - "리디렉션이 포함된 페이지": www·http 주소가 늘어나는 것은 정상(리다이렉트 결과)
   - "서버 오류(5xx)", "robots.txt에 의해 차단됨", "액세스 금지됨(403)": 늘었으면 Cloudflare 쪽 원인
4. **설정 → 크롤링 통계**: 10월 말 이후 크롤링 요청 수가 급감했는지, 응답 코드 분포(200 / 301 / 403 / 5xx), 호스트별(pyeji.kr, www.pyeji.kr) 상태
5. **보안 및 직접 조치**: "문제가 감지되지 않음"인지
6. **Cloudflare 대시보드**
   - 보안 → 이벤트(Security Events): 필터 "사용자 에이전트 contains Googlebot" 또는 "확인된 봇". 10월 25일 이후 차단·챌린지(Managed Challenge, JS Challenge, Block)가 있었는지
   - 보안 → 봇: Bot Fight Mode, "AI 크롤러 차단", Super Bot Fight Mode 설정이 최근 바뀌었는지. "확인된 봇 허용"이 켜져 있는지
   - 규칙 → 리다이렉트 규칙(또는 페이지 규칙): www·http 규칙이 언제 만들어졌는지, 내용. `http://www.pyeji.kr/*`도 한 번에 `https://pyeji.kr/$1`로 가게 하면 두 번 이동이 없어짐
   - SSL/TLS → 엣지 인증서 → "항상 HTTPS 사용"과 리다이렉트 규칙이 겹치는지 (지금 http://www가 https://www를 거치는 원인으로 보임)

## 5. 결론과 조치

- 코드·서버 응답·robots.txt·사이트맵에서 노출을 막는 원인은 찾지 못했다(확인한 범위에서 배제). 그래서 고친 코드는 없다
- 하락 시점(10월 28일 무렵)에는 새로 배포된 코드가 없었다. 같은 무렵 바뀐 것은 Cloudflare의 www·http 리다이렉트뿐(운영자 작업)이라, 원인 후보는 서치 콘솔 속성과 대표 주소 전환 쪽
- 다음에 할 것
  1. (11월 5일 확인) 속성은 도메인 속성 `pyeji.kr`이라 속성 문제는 배제. URL 검사로 https://pyeji.kr 주소의 색인 여부와 www 주소의 "Google이 선택한 표준 URL"을 확인하고, 색인 전이면 대표 페이지(메인, 게임 6, 3.30, 진행 중 시즌)부터 색인 생성 요청
  2. 4-2 URL 검사 결과를 알려 주면, "색인 생성 허용: 아니요"나 가져오기 실패가 있을 때 바로 원인을 좁힐 수 있음
  3. 4-4 크롤링 통계에서 403·5xx가 보이면 Cloudflare 보안 이벤트(4-6) 확인
  4. 리다이렉트를 한 번으로 정리(http://www → https://pyeji.kr)
  5. 2주 동안 도메인 속성 기준으로 노출 추이를 보고 docs/seo-weekly에 기록

## 6. 원인 확정 뒤 할 일 (11월 5일)

- 리다이렉트는 되돌리지 않는다. 지금은 canonical, 사이트맵, 301이 모두 https://pyeji.kr로 같아 구글이 새 주소로 옮겨 갈 조건이 갖춰져 있다. 되돌리면 전환을 다시 처음부터 겪는다
- 운영자 (11월 5일): 3.30 시즌 페이지 www·https://pyeji.kr 두 주소 실제 URL 테스트와 색인 생성 요청 완료, 사이트맵 재제출 완료(10월 31일)
- 색인 생성 요청 우선순위 (하루 요청 수 제한이 있어 며칠에 나눠서. 모두 https://pyeji.kr 주소로)
  1. https://pyeji.kr/
  2. https://pyeji.kr/posts/poe1/league-cycle/ (클릭 가장 많던 페이지)
  3. https://pyeji.kr/games/poe1/
  4. https://pyeji.kr/games/d2r/
  5. https://pyeji.kr/posts/d4/season-end/
  6. https://pyeji.kr/posts/tli/season-cycle/
  7. https://pyeji.kr/games/d2r/seasons/season-15/ (종료일 검색어)
  8. https://pyeji.kr/games/d4/seasons/season-15/ (종료일 검색어)
  9. https://pyeji.kr/posts/poe1/3-30-preview/
  10. https://pyeji.kr/posts/poe1/exilecon-2026/ (엑자일콘 직전)
  - 그다음: 나머지 게임 페이지, /now/, /calendar/, /tools/leave-planner/, 나머지 글
- Cloudflare에서 `http://www.pyeji.kr/*` → `https://pyeji.kr/$1` 한 번에 (지금 두 번 이동)
- 확인: 2~3일마다 URL 검사로 https://pyeji.kr/ 과 https://pyeji.kr/games/poe1/seasons/3-30/ 이 "URL이 Google에 등록됨"으로 바뀌는지. 보통 며칠~2주. 2주가 지나도 등록되지 않으면 페이지 보고서의 "발견됨 - 현재 색인이 생성되지 않음"/"크롤링됨 - 현재 색인이 생성되지 않음" 항목을 확인
- 검색 실적 비교(docs/seo-weekly)는 https://pyeji.kr 주소로 노출이 돌아온 뒤 다시 기준을 잡는다. 10월 28일 기준 수치는 www 주소의 것
