# 엑자일콘 당일 체크리스트 (2026-11-07~08, 한국 시간)

원칙
- 생중계는 메모만 한다. 사이트 반영은 GGG 공식 포럼·X 글(카카오게임즈 공지 포함)이 올라온 뒤 그 링크를 출처로
- 확정된 사실만 쓴다. 추측은 쓰지 않고, 미발표 정보는 관련 문장 안에서 "아직 발표 전"처럼 한 번만
- 커밋은 작게 나눠 바로 push (자동 배포 약 1분). push 후 해당 페이지가 열리는지 확인

일정
- 11월 7일(토) 05:00 1일차 생중계 시작 / 06:00 키노트 (3.30 공개)
- 11월 8일(일) 05:00 2일차 생중계

## 공식 발표 후 30분 안 (3.30 핵심)

1. `src/data/seasons.json`의 `poe1-3-30`
   - `name`: "3.30 {카카오게임즈 한국어 리그 이름}" (카카오 공지가 늦으면 영어로 먼저, 한국어 확인 후 교체)
   - `nameEn`: 영어 리그 이름
   - 시작 시각이 발표되면 `startsAt`을 그 시각(UTC)으로 바꾸고 `timePrecision: "exact"`. 예: 태평양 시간 11월 13일 오후 1시 = `2026-11-13T21:00:00Z` = 한국 11월 14일 06:00
   - `sourceUrl`: 공개 공지 주소
   - `highlights`: 공개된 핵심 3줄 (한 줄 60자 이내, 직접 쓴 문장)
2. `src/content/posts/poe1/3-30-preview.md`
   - frontmatter에 `reveal` 추가 (화면에 "엑자일콘 발표 내용" 칸이 생김)
     ```yaml
     reveal:
       revealedAt: "2026-11-06T21:00:00Z"
       items:
         - "리그 이름은 ○○○(영어)"
         - "시작은 한국 시간 11월 14일(토) 오전 ○시"
       sourceUrls:
         - "https://www.pathofexile.com/forum/view-thread/..."
     ```
   - 첫 문단과 "확정된 것" 갱신. 이제 발표된 내용(오픈 시각 미발표 등)을 말하던 문장은 고친다
   - 맨 아래 업데이트 기록 맨 위에 "- 11월 7일: 엑자일콘 발표 반영 (리그 이름, 시작 시각)" (수정일이 자동으로 바뀜)
   - 제목에 리그 이름 넣기 (예: "POE 3.30 ○○○ 시작일 11월 14일(토): 한국 시간과 공개된 정보")
3. `npm run build` → 커밋 `data: POE1 3.30 리그 이름·시작 시각 반영 (엑자일콘)` → push

## 1~2시간 안

4. 공식 키아트: GGG 보도자료(https://www.pathofexile.com/forum/view-forum/press)에서 받아 `src/assets/seasons/poe1-3-30/key-art.jpg` (1600px JPG), seasons.json `images` 첫 장. 직접 보고 alt·캡션 쓰기
5. 공식 트레일러·콘텐츠 공개 영상: GGG 공지에 들어 있는 유튜브 ID → seasons.json `videos` (트레일러 먼저) → `npm run check:videos`
6. POE2 1.0 발표가 있으면 `poe2-1-0`과 `src/content/posts/poe2/1-0-preview.md`에 같은 방식(시작 시각, reveal, 업데이트 기록). 엑자일콘 생중계 이벤트(`exilecon-2026`)에 POE2 정보 공개를 붙이는 것은 공식 확인 후
7. 커밋·push 후 서치 콘솔 → URL 검사 → 색인 생성 요청
   - https://pyeji.kr/posts/poe1/3-30-preview/
   - https://pyeji.kr/games/poe1/seasons/3-30/
   - https://pyeji.kr/posts/poe1/exilecon-2026/
   - https://pyeji.kr/posts/poe2/1-0-preview/ (발표가 있으면)
   - https://pyeji.kr/ (메인)
   - 네이버 서치어드바이저 → 웹 페이지 수집 요청에 같은 주소

## 11월 8일

8. 2일차 발표(패널 등) 반영
9. 엑자일콘 글을 결과 정리로 바꾸기 (`src/content/posts/poe1/exilecon-2026.md`)
   - 제목: "엑자일콘 2026 발표 정리: POE 3.30 ○○○, (POE2 1.0 ...)" 처럼 결과 중심으로
   - `reveal` 칸에 발표 항목, `countdownTo` 줄 삭제 (키노트가 지나 카운트다운이 필요 없음)
   - "한눈에 보기" 표는 일정 기록으로 남기고, 미발표라고 쓴 문장을 발표 내용으로 고친다
   - 대표 영상을 키노트 다시보기로 바꾸고 해당 장면부터 재생하려면 `startSeconds`
10. 11월 월간 일정 글(`src/content/posts/schedule/2026-11.md`)의 3.30 줄에 리그 이름·시각

## 그다음 날짜
- 11월 10일 06:00 3.29 종료: 자동 판정(매일 07:00 재빌드). 3.29 시즌 페이지는 연결 글(POE1 리그 주기)이 있어 검색 노출 유지
- 11월 14일 3.30 시작: 07:00 재빌드에서 메인 "지금 줍기 좋은 폐지"로 올라옴. 시작 시각이 07:00 이후면 GitHub Actions에서 daily-rebuild 수동 실행
