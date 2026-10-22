---
description: 그 달 ARPG 시즌 일정 글 초안을 drafts/에 만듦 (데이터에서 일정 자동)
argument-hint: <YYYY-MM>
disable-model-invocation: true
---
월간 일정 글 초안을 만든다. 입력 달: $ARGUMENTS

먼저 `docs/ops-common.md`의 공통 절차를 읽고 따른다 (CLAUDE.md 규칙 포함).

1. 입력이 `YYYY-MM`이 아니면 멈춘다. 이미 `src/content/posts/schedule/{YYYY-MM}.md`나 `drafts/posts/schedule/{YYYY-MM}.md`가 있으면 새로 만들지 말고 그 파일을 데이터 기준으로 갱신한다.
2. 틀은 `drafts/posts/schedule/_monthly-template.md`, 문장 모양은 가장 최근 월간 글(`src/content/posts/schedule/`)을 따른다.
3. 내용은 사이트 데이터에서만 가져온다 (새 사실을 지어내지 않는다)
   - 그 달(한국 시간 1일 0시~말일 24시)의 시즌 시작·종료(`seasons.json`), 이벤트(`events.json`)를 날짜순 표로
   - 그 달에 진행 중인 시즌 목록 (게임별)
   - 다음 달에 확정된 일정이 있으면 "{M+1}월 예고". 없으면 그 칸을 만들지 않는다
   - 시각이 없는 일정(`timePrecision: day`)은 "(시각 미발표)", 예상(`estimated`)은 "(예상)"
   - 미발표 시즌은 고정 칸을 만들지 않고, 관련 문장 안에서 한 번만 쓴다
4. frontmatter: `month: "{YYYY-MM}"`(카운트다운이 그 달의 가장 가까운 일정을 자동으로 고름), `seasonId`는 그 달 가장 큰 일정의 시즌, `sourceUrls`는 표에 쓴 일정의 공식 출처(`sourceUrl`), `publishedAt`은 비워 두지 말고 공개 예정일로 적고 보고에 "공개일 확인" 표시
5. 첫 문단: 그 달의 가장 큰 일정 1~2개를 날짜와 함께 한 문장으로
6. 초안은 `drafts/posts/schedule/{YYYY-MM}.md`에만 저장한다. 사이트(`src/content/`)로 옮기는 것은 운영자 확인 후
7. 시험: 초안을 잠깐 `src/content/posts/schedule/`에 복사해 빌드가 되는지 확인하고 바로 지운다
8. `docs/questions.md`에 "{YYYY-MM} 월간 글: 공개 전에 갱신할 것" 목록(시각 미발표 항목, 예상 일정)을 남긴다
9. 공통 절차의 "끝낼 때"를 따른다. 커밋 예: `docs: 2027-01 월간 일정 글 초안 (/monthly-post)`
