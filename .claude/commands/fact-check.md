---
description: 글의 사실 문장을 공식 출처와 다시 대조해 사실 확인표를 작성·갱신
argument-hint: <글 slug 또는 주소>
disable-model-invocation: true
---
게시글(또는 초안)의 사실 문장을 공식 출처와 대조한다. 입력: $ARGUMENTS

먼저 `docs/ops-common.md`의 공통 절차를 읽고 따른다 (CLAUDE.md 규칙 포함).

1. 글을 찾는다: `src/content/posts/{slug}.md`, 없으면 `drafts/posts/{slug}.md`. 주소(`https://pyeji.kr/posts/…/`)로 받아도 같은 파일. 없으면 멈춘다.
2. 대조는 직접 하지 않고 `fact-checker` 에이전트(Agent 도구, subagent_type: fact-checker)에게 맡긴다. 넘길 것: 글 파일 경로, frontmatter `sourceUrls`, 기존 확인표가 있으면 그 경로. 에이전트는 글을 고치지 않고 표만 돌려준다.
3. 결과를 `drafts/fact-check/{slug의 / 를 - 로}.md`에 저장한다 (예: `poe1/3-30-preview` → `drafts/fact-check/poe1-3-30-preview.md`). 기존 확인표가 있으면 표를 새 결과로 바꾸고, 맨 아래에 `## 재확인 {YYYY-MM-DD}` 한 줄 요약(문장 수, ✓, ✗)을 덧붙인다.
   - 표 열: 글 속 문장 / 출처 URL / 출처 안 위치 / 확인일 / 결과(✓·✗)
   - 맨 위 요약: 문장 수, ✓ 수, ✗ 수
4. ✗인 문장마다 고칠 안을 제시한다 (출처에 맞게 고친 문장, 또는 삭제). 글은 고치지 않는다.
5. 운영자가 "반영해줘"라고 하면 그때 고치고, 고친 문장만 에이전트로 다시 확인한 뒤, 글 맨 아래 업데이트 기록에 `- {M}월 {D}일: 사실 확인 후 문장 수정` 한 줄.
6. 공통 절차의 "끝낼 때"를 따른다 (확인표만 바뀌었으면 커밋 예: `docs: 3.30 사전 정보 글 사실 재확인 (/fact-check)`).
