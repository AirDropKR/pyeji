---
description: 공식 링크로 새 글 초안과 사실 확인표를 drafts/에 만듦
argument-hint: <주제> <공식 링크> [추가 공식 링크...]
disable-model-invocation: true
---
새 글 초안을 만든다. 입력(주제와 공식 링크들): $ARGUMENTS

먼저 `docs/ops-common.md`의 공통 절차를 읽고 따른다 (CLAUDE.md 규칙 포함).

1. 입력에서 주제(링크가 아닌 부분)와 링크를 나눈다. 링크가 하나도 없거나 공식 출처가 아닌 링크가 있으면 멈춘다.
2. 링크를 모두 읽는다. 링크에 없는 사실은 쓰지 않는다. 공식 출처로 주제를 채울 수 없으면 쓰지 않고 `docs/questions.md`에 사유를 남긴다.
3. 같은 주제의 글이 `src/content/posts/`에 이미 있으면 새 글 대신 `/update-post`를 권하고 멈춘다.
4. 초안 `drafts/posts/{게임 id}/{slug}.md` (게임 공통이면 `drafts/posts/schedule/` 또는 `drafts/posts/common/`)
   - 제목: 사람들이 찾을 검색어 + 날짜(한국 시간) 포함. 예: "POE 3.31 시작일 3월 6일(금): 한국 시간과 공개된 정보"
   - description 160자 이내
   - 첫 문단: 질문에 대한 답을 한두 문장으로 (날짜·시각은 굵게, 굵게는 괄호 앞에서 닫는다)
   - 소제목은 주제·질문형. 고정 소제목 금지. 맨 아래 "## 업데이트"에 `- {M}월 {D}일: 첫 작성`
   - frontmatter: `gameId`, 관련 시즌이 있으면 `seasonId`, `sourceUrls`, `publishedAt`
   - 내부 링크: 해당 게임 페이지(`/games/{id}/`), 관련 시즌 페이지, 같은 게임의 기존 글 중 관련 있는 것
   - 공식 이미지·영상은 넣지 않는다 (운영자가 고른 뒤 따로)
5. 사실 확인표: 초안을 다 쓴 뒤 `fact-checker` 에이전트(Agent 도구, subagent_type: fact-checker)에게 초안 경로와 출처 링크를 주고 대조를 맡긴다. 결과를 `drafts/fact-check/{게임 id}-{slug}.md`에 저장한다 (기존 확인표와 같은 모양)
6. ✗인 문장은 고치거나 지우고, 고친 문장만 다시 에이전트로 확인한다. 모든 문장이 ✓일 때 보고한다
7. 사이트 반영(`src/content/posts/`로 옮기기)은 운영자 확인 후. 이 명령에서는 하지 않는다
8. 공통 절차의 "끝낼 때"를 따른다. 커밋 예: `docs: D4 16시즌 사전 정보 글 초안 (/new-post)`
