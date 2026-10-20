# 주섬이 (폐지.com 마스코트)

원본은 `original/`에 둔다. 파일명 규칙: `jusumi-{게임}-{형태}[-{포즈}][-3d].png`

- 게임: `base`(공통 기본형) 또는 games.json의 id (poe1, poe2, d2r, d4, tli, le)
- 형태: `full`(전신), `icon`(머리와 어깨)
- 포즈: 기본이면 생략. 추가 시 `-empty`(빈 자루), `-run`(달려가는 중) 등
- 3D 버전은 끝에 `-3d` (지금은 보관만, 화면에 쓰지 않음)
- 예: jusumi-base-full.png, jusumi-base-icon.png, jusumi-base-full-3d.png, jusumi-tli-full.png

규칙
- 게임별 전신이 없으면 base로 대체. 아이콘은 base 하나만
- 투명 배경 PNG. 배경이 있으면 로컬 도구(rembg 등)로 제거하고 외부 업로드 서비스는 쓰지 않는다. 가장자리 회색 테두리 확인
- 투명 여백은 잘라내고(trim) 캐릭터 둘레에 일정한 여백만 남긴다
- 크기별 WebP는 빌드할 때 자동 생성 (전신 1024·512·256, 아이콘 192·96·48). 원본 한 장만 넣으면 된다
- 대체 텍스트: "폐지.com 마스코트 주섬이"
- 코드: `src/lib/mascot.ts`의 `mascotFor(gameId, form, pose)`, 컴포넌트 `src/components/Mascot.astro`
