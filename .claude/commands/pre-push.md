---
description: push 전 점검 (빌드, 깨진 링크, 사이트맵·noindex, 데이터 형식, 390px 넘침). 문제 목록만 보고
disable-model-invocation: true
---
push 전에 사이트를 점검한다. 파일을 고치지 않고 문제 목록만 보고한다.

1. `npm run build`: 실패하면 오류 첫 부분을 보고하고 멈춘다. 데이터 형식(seasons·events·patches·글 frontmatter)은 빌드가 검사하므로, 형식 오류는 여기서 드러난다.
2. 빌드 로그에 `[og]`로 시작하는 경고(공유 이미지 폰트에 없는 글자)가 있으면 목록에 넣는다.
3. `npm run check:site`: 깨진 내부 링크, 사이트맵 ↔ noindex 일치, 본문이 짧은 검색 노출 페이지, 390px 가로 넘침.
4. `git status`로 커밋 안 된 변경이 있으면 목록에 넣는다. `git log origin/main..HEAD --oneline`으로 push될 커밋 목록을 보여 준다.
5. 보고
   - 문제 없음이면 "push 가능"과 push될 커밋 목록
   - 문제가 있으면 문제마다 한 줄 (어느 페이지, 무엇이). 고치는 것은 운영자가 정한다
