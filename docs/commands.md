# 운영 명령 사용 안내

Claude Code 입력창에 `/명령 입력값` 형태로 씁니다. 명령 파일은 `.claude/commands/`에 있고, 모든 명령은 `docs/ops-common.md`의 공통 절차(공식 출처만, 확실하지 않은 값은 반영하지 않음, 빌드 확인 후 커밋, push는 하지 않음)를 따릅니다.

공통으로 알아 둘 점
- 링크는 공식 출처만 넣습니다 (GGG·카카오게임즈·블리자드·Eleventh Hour Games·XD). 기사나 커뮤니티 링크를 넣으면 명령이 멈춥니다.
- 명령은 커밋까지만 합니다. 결과를 확인한 뒤 push는 직접 하시거나 "push해줘"라고 말씀하시면 됩니다. push 전에는 `/pre-push`를 권합니다.
- 명령이 반영하지 않은 값은 보고 마지막에 "확인할 점"으로 나오고, `docs/questions.md`에 남습니다.

## 데이터

### /new-season
- 언제: 새 시즌·리그·래더 일정이 공식 발표됐을 때, 이미 있는 시즌의 시각이나 이름이 새로 나왔을 때
- 입력 예: `/new-season https://www.pathofexile.com/forum/view-thread/4010618`
- 결과: `src/data/seasons.json`에 시즌 추가 또는 바뀐 값만 수정. 연결된 글에 업데이트 기록 한 줄
- 주의: 한국어 공식 이름이 아직 없으면 영어로 들어가고 확인 요청이 남습니다. 시각 없이 날짜만 발표되면 "시각 미발표"로 표시됩니다.

### /new-event
- 언제: 공개 방송, 공개 테스트 서버, 사전 다운로드, 이벤트 리그처럼 시즌 전후 일정이 발표됐을 때
- 입력 예: `/new-event https://news.blizzard.com/ko-kr/article/24292852 d4-s16`
- 결과: `src/data/events.json`에 일정 추가. 시즌 페이지 주요 일정, 메인·/now/, 월간 글 카운트다운에 자동으로 나옵니다.
- 주의: 같은 행사는 하나로 넣습니다 (생중계와 키노트를 나누지 않음).

### /add-patch
- 언제: 패치노트가 새로 올라왔을 때
- 입력 예: `/add-patch https://www.pathofexile.com/forum/view-thread/4012345 https://poe.kakaogames.com/forum/view-thread/4012346`
- 결과: `src/data/patches.json`에 링크·버전·날짜 추가. 시즌 페이지 "리그별 패치"에 나옵니다.
- 주의: 패치 내용은 옮기거나 요약하지 않습니다. 카카오게임즈 링크는 있으면 두 번째로 넣습니다.

## 글

### /update-post
- 언제: 기존 글 주제에 새 공식 정보가 나왔을 때
- 입력 예: `/update-post poe1/3-30-preview https://www.pathofexile.com/forum/view-thread/4020000`
- 결과: 글 본문의 맞는 소제목 안에 반영, 틀리게 된 문장 수정, 맨 아래 업데이트 기록 한 줄. 갱신일이 자동으로 바뀝니다.
- 주의: 새 사실 문장이 3개 이상이면 `/fact-check`를 권합니다.

### /monthly-post
- 언제: 매달 중순, 다음 달 일정 글을 준비할 때
- 입력 예: `/monthly-post 2027-01`
- 결과: `drafts/posts/schedule/2027-01.md` 초안과 공개 전에 갱신할 목록
- 주의: 사이트 데이터만으로 만듭니다. 공개는 초안을 확인하신 뒤 `src/content/posts/schedule/`로 옮기면 되고, 그러면 지난달 글의 "다음 달 글" 링크가 자동으로 생깁니다.

### /new-post
- 언제: 새 주제의 글을 쓰고 싶을 때
- 입력 예: `/new-post 디아4 16시즌 사전 정보 https://news.blizzard.com/ko-kr/article/… https://news.blizzard.com/ko-kr/article/…`
- 결과: `drafts/posts/`에 초안, `drafts/fact-check/`에 사실 확인표 (모든 문장 ✓일 때만 보고)
- 주의: 같은 주제의 글이 이미 있으면 `/update-post`를 권하고 멈춥니다. 공식 이미지·영상은 넣지 않습니다.

## 확인

### /fact-check
- 언제: 글을 공개하기 전, 큰 수정 뒤, 오래된 글을 다시 볼 때
- 입력 예: `/fact-check d4/season-end`
- 결과: `drafts/fact-check/d4-season-end.md` 표 갱신 (문장 / 출처 / 출처 안 위치 / 확인일 / ✓·✗), ✗ 문장의 고칠 안
- 주의: 글은 고치지 않습니다. "반영해줘"라고 하시면 그때 고칩니다.

### /status
- 언제: 작업을 시작할 때, 무엇부터 할지 볼 때
- 입력 예: `/status` 또는 `/status 2026-11-10`(그 날짜 기준으로 보기)
- 결과: 앞으로 2주 일정, 시각 발표를 기다리는 것, 공식 확인이 덜 된 값, 남은 초안, 열린 질문, 다음에 쓸 명령
- 주의: 파일을 바꾸지 않습니다.

### /pre-push
- 언제: push하기 전
- 입력 예: `/pre-push`
- 결과: 빌드, 깨진 내부 링크, 사이트맵과 검색 제외(noindex) 일치, 390px 화면 넘침, 커밋 안 된 변경. 문제가 없으면 "push 가능"과 push될 커밋 목록
- 주의: 문제는 목록만 보여 주고 고치지 않습니다. 터미널에서 직접 하려면 `npm run build` 후 `npm run check:site`.

## 검색 점검

### /weekly-seo
- 언제: 매주 한 번
- 입력 예: `/weekly-seo C:\Users\user\Downloads\pyeji.kr-Performance-on-Search-2026-10-22.zip`
- 준비: 서치 콘솔 → 실적 → 기간 "지난 28일" → 오른쪽 위 "내보내기" → "CSV 다운로드"
- 결과: 순위 8~20위 검색어와 해당 페이지, 페이지별 제목·첫 문단·소제목 개선안 → `docs/seo-weekly/{날짜}.md`
- 주의: 페이지는 고치지 않습니다. 파일 맨 아래 "운영자 선택"에 번호를 적고 반영을 요청하시면 됩니다. 기본 내보내기에는 검색어별 페이지가 없어 페이지 연결은 "추정"으로 표시됩니다.

## 발표 당일

### /event-day
- 언제: 공개 방송·신규 시즌 발표·정식 출시 발표 당일, 공식 공지가 올라온 뒤
- 입력 예: `/event-day https://www.pathofexile.com/forum/view-thread/… https://poe.kakaogames.com/forum/view-thread/…`
- 결과: 1순위 이름·시각(커밋 따로) → 2순위 글 → 3순위 공식 영상·키아트 → 4순위 색인 요청 주소 목록과 커뮤니티 공유 초안
- 주의: 1순위 커밋이 끝나면 "push 가능"이 먼저 나옵니다. 그때 바로 push하시면 가장 중요한 정보가 먼저 사이트에 올라갑니다. 생중계 화면만 보고는 반영하지 않습니다.

## 사실 확인 담당 에이전트
- `.claude/agents/fact-checker.md`. `/fact-check`와 `/new-post`가 자동으로 부릅니다. 글을 쓰거나 고치지 않고, 공식 출처와 대조한 ✓/✗ 표만 돌려줍니다.
