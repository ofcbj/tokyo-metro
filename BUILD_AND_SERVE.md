# 빌드 및 서빙 가이드

## 🔧 문제 해결 완료

### 발견된 문제

1. **Base Path 불일치**
   - `vite.config.js`에서 `base: '/tokyo-metro/'` 설정
   - `serve -s dist` 명령어는 루트 경로(`/`)에서 서빙
   - 결과: 모든 asset이 `/tokyo-metro/assets/...`를 찾아서 404 에러

2. **Favicon 404 에러**
   - `index.html`에 존재하지 않는 `/vite.svg` 참조

3. **Chrome Extension 에러**
   - `content.js:1 Uncaught (in promise)...`
   - 브라우저 확장 프로그램 관련 (프로젝트와 무관)

### 해결 방법

✅ **1. vite.config.js 수정**
```javascript
base: '/',  // 로컬 서버용
// GitHub Pages 배포 시: base: '/tokyo-metro/',
```

✅ **2. favicon 제거**
```html
<!-- 불필요한 favicon 링크 제거 -->
```

---

## 📦 빌드 및 실행 방법

### 개발 모드 실행
```bash
npm run dev
# 또는
npm start
```
→ http://localhost:5173 에서 실행

### 프로덕션 빌드
```bash
npm run build
```

### 빌드 결과물 로컬 서빙

#### 방법 1: Vite Preview (권장)
```bash
npm run preview
```
→ http://localhost:4173 에서 실행

#### 방법 2: serve 사용
```bash
# serve 전역 설치 (한 번만)
npm install -g serve

# dist 폴더 서빙
serve -s dist
```
→ http://localhost:3000 에서 실행

#### 방법 3: http-server 사용
```bash
# http-server 전역 설치 (한 번만)
npm install -g http-server

# dist 폴더 서빙
cd dist
http-server
```
→ http://localhost:8080 에서 실행

---

## 🚀 GitHub Pages 배포

GitHub Pages로 배포할 때는 **base path를 변경**해야 합니다:

### 1. vite.config.js 수정
```javascript
base: '/tokyo-metro/',  // GitHub 저장소 이름에 맞게 수정
```

### 2. 빌드 및 배포
```bash
npm run build

# dist 폴더를 gh-pages 브랜치에 푸시
git add dist -f
git commit -m "Deploy to GitHub Pages"
git subtree push --prefix dist origin gh-pages
```

### 또는 GitHub Actions 사용 (.github/workflows/deploy.yml)
```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ master ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./dist
```

---

## 🔍 에러 해결 체크리스트

### 404 에러가 계속 나는 경우

1. **Base path 확인**
   ```javascript
   // vite.config.js
   base: '/',  // 로컬 테스트
   base: '/tokyo-metro/',  // GitHub Pages
   ```

2. **빌드 재실행**
   ```bash
   npm run build
   ```

3. **dist/index.html 확인**
   ```html
   <!-- 경로가 올바른지 확인 -->
   <script src="/assets/index-xxx.js"></script>  <!-- 로컬 -->
   <script src="/tokyo-metro/assets/index-xxx.js"></script>  <!-- GitHub -->
   ```

### Chrome Extension 에러 무시하기

브라우저 개발자 도구에서:
1. F12 → Console 탭
2. 필터에 `-extension` 입력
3. 또는 확장 프로그램 비활성화

---

## 📊 현재 빌드 구성

### 번들 크기
- **mui-core**: 390.55 KB (gzip: 119.49 KB) - Material-UI
- **index**: 127.12 KB (gzip: 40.23 KB) - 앱 코드
- **emotion**: 12.63 KB (gzip: 5.50 KB) - CSS-in-JS
- **총합**: ~530 KB (gzip: ~165 KB)

### 청크 분리 (Code Splitting)
```javascript
manualChunks: {
  'mui-core': ['@mui/material', '@mui/icons-material'],
  'emotion': ['@emotion/react', '@emotion/styled'],
  'react-vendor': ['react', 'react-dom'],
}
```
→ 브라우저 캐싱 최적화 및 병렬 다운로드 가능

---

## 💡 추가 팁

### 포트 변경
```bash
# Vite dev server
npm run dev -- --port 3000

# Vite preview
npm run preview -- --port 8080

# serve
serve -s dist -p 5000
```

### 네트워크에서 접근
```bash
npm run dev -- --host
# → http://192.168.x.x:5173 에서 접근 가능
```

### 빌드 분석
빌드 후 `dist/stats.html`을 열어서 번들 크기 분석:
```bash
npm run build
open dist/stats.html  # macOS
start dist/stats.html  # Windows
xdg-open dist/stats.html  # Linux
```

---

## ✅ 정상 작동 확인

빌드 후 다음 명령어로 테스트:
```bash
npm run build
npm run preview
```

브라우저에서:
1. 콘솔 에러 없음 (extension 에러 제외)
2. 지도가 정상 로드됨
3. 모든 기능 작동 확인
