# 엑자일콘 당일 운영자 순서 (2026-11-07~08, 한국 시간)

원칙: 생중계 화면·채팅·기사는 근거가 아니다. 공식 공지 링크가 올라온 뒤 그 링크로 `/event-day`를 부른다. 1순위 커밋이 나오면 바로 push.

## 시간표

| 한국 시간 | 일 | 운영자 |
|---|---|---|
| 11월 7일(토) 05:30 | 1일차 생중계 시작 (사전 방송) | 메모만 |
| 06:00 | 키노트, 3.30 공개 | 리그 이름(영어), 시작 시각, 핵심 3가지 메모 |
| 키노트 끝난 직후 | 공식 공지 올라옴 | 아래 "링크 찾기" → `/event-day` |
| 07:00 | 매일 자동 재빌드 | 1순위를 이 전에 push하면 자동 재빌드도 새 값으로 |
| 1순위 커밋 직후 | | push → 1분 뒤 시즌 페이지 확인 |
| 오전 중 | 2·3순위 | 커밋마다 push, 색인 요청 |
| 11월 8일(일) 05:00 | 2일차 생중계 | 패널 발표가 공지로 나오면 같은 방법 |

## 링크 찾기 (이 순서로)

1. GGG 포럼 Announcements: https://www.pathofexile.com/forum/view-forum/news (3.30 발표 글)
2. GGG X: https://x.com/pathofexile (발표 글 주소)
3. 카카오게임즈 공지사항: https://poe.kakaogames.com/forum/view-forum/notice (한국어 리그 이름, 한국 시간 시작 시각). 뉴스 게시판 https://poe.kakaogames.com/forum/view-forum/news 도 확인
4. 보도자료(키아트·트레일러, 3순위용): https://www.pathofexile.com/forum/view-forum/press
5. POE2 1.0 발표가 있으면: GGG 얼리 액세스 공지 https://www.pathofexile.com/forum/view-forum/2211 와 카카오 얼리 액세스 뉴스 https://poe.kakaogames.com/forum/view-forum/news2

카카오 공지가 늦으면 GGG 링크만으로 먼저 실행한다. 한국어 이름은 나중에 `/new-season 카카오 링크`로 교체.

## `/event-day`에 넣는 것

```
/event-day https://www.pathofexile.com/forum/view-thread/{GGG 발표 글 번호} https://poe.kakaogames.com/forum/view-thread/{카카오 공지 번호}
```

명령이 하는 일 (리허설로 확인함, 11월 5일)
- 1순위: `seasons.json`의 `poe1-3-30`에 이름(`name` "3.30 {한국어 이름}", `nameEn`), 시작 시각(`timePrecision: "exact"`), `sourceUrl`, `highlights` + `updates.json` 한 줄 → 커밋 하나. "1순위 커밋 완료, push 가능"이 먼저 보고된다
  - 이것만으로 바뀌는 곳: 3.30 시즌 페이지 제목("POE1 3.30 {이름} 일정: 11월 14일(토) 시작"), 설명의 시작 시각, 게임 페이지, 메인 "다음 오픈", /now/, 폐지달력, 연차 계산기 목록, 메인 "최근 갱신"
  - 시즌 제목의 "11월 7일 엑자일콘 공개"는 키노트가 지난 뒤 빌드부터 자동으로 빠진다
- 2순위: 3.30 사전 정보 글(`reveal` 칸, 첫 문단, 제목 "POE 3.30 {이름} 공개 정보: …"), 시즌 `intro`의 "공개한다고 밝혔다" 문장, 엑자일콘 글(결과 정리, `countdownTo` 삭제), 11월 월간 글의 3.30 줄
- 3순위: 공식 트레일러(`videos`), 보도자료 키아트(`images`)
- 4순위: 색인 요청 주소 목록, 커뮤니티 공유 초안

## push 후 확인
- https://pyeji.kr/games/poe1/seasons/3-30/ 제목·시작 시각
- https://pyeji.kr/ 다음 오픈 칸
- 07:00 자동 재빌드 전에 push를 못 했으면 GitHub Actions → daily-rebuild → Run workflow

## 색인 요청 (서치 콘솔 URL 검사, 네이버 웹 페이지 수집)
- https://pyeji.kr/games/poe1/seasons/3-30/
- https://pyeji.kr/posts/poe1/3-30-preview/
- https://pyeji.kr/posts/poe1/exilecon-2026/
- https://pyeji.kr/posts/poe2/1-0-preview/ (POE2 발표가 있으면)
- https://pyeji.kr/

## 그다음
- 11월 10일(화) 06:00 3.29 종료: 자동. 07:00 재빌드 뒤 3.29 페이지는 "일정" 제목으로 돌아가고 검색 노출은 유지(연결 글 있음)
- 11월 14일(토) 3.30 시작: 시작 시각이 07:00 이후면 daily-rebuild 수동 실행
