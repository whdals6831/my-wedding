# 종민 ♥ 주혜 모바일 청첩장

👉 **https://whdals6831.github.io/my-wedding/**

2027년 1월 2일 토요일 오후 2시 30분 · 루이비스웨딩홀

React + Vite + TypeScript로 만든 모바일 청첩장입니다. GitHub Pages로 배포합니다.

## 내용 수정

| 무엇을 | 어디서 |
| --- | --- |
| 이름·날짜·예식장·연락처·계좌·문구 | `src/config/wedding.ts` |
| 메인 사진, 약도 | `src/assets/photos/` 에 넣고 `wedding.ts` 의 파일명과 맞추기 |
| 갤러리 사진 | `src/assets/gallery/` 에 `01.jpg`, `02.jpg` … 순서로 넣기 (자동 표시) |
| 카카오톡·링크 미리보기 이미지 | `public/og/og-image.jpg` (1200×600) |

- 파일명은 영어로 짓습니다.
- 사진은 긴 변 1600px 정도로 줄여서 넣는 것을 권장합니다.
- 사진 파일이 없으면 그 자리는 빈칸으로 표시됩니다.

## 로컬 실행

```bash
npm install
cp .env.example .env   # 카카오 JavaScript 키 입력 (선택)
npm run dev            # http://localhost:5173/my-wedding/
```

## 배포

`main` 브랜치에 push하면 GitHub Actions가 자동으로 빌드하고 배포합니다.

처음 한 번만 설정합니다.

1. **Settings → Pages → Source** 를 `GitHub Actions` 로 설정
2. **Settings → Secrets and variables → Actions → Variables** 에 `VITE_KAKAO_JS_KEY` 추가
3. [Kakao Developers](https://developers.kakao.com) 설정
   - JavaScript SDK 도메인에 `https://whdals6831.github.io` 등록
   - 웹 도메인 등록
   - 카카오톡 공유, 카카오맵 사용 설정

키를 추가하거나 바꾼 뒤에는 **Actions → Deploy to GitHub Pages → Run workflow** 로 다시 배포합니다.

공유 미리보기가 예전 내용으로 보이면 [카카오 공유 디버거](https://developers.kakao.com/tool/debugger/sharing)에서 캐시를 초기화합니다.
