# 일본 수도권 전철 지도

도쿄 메트로 및 수도권 전철 노선을 Google Maps에 표시하는 React 애플리케이션입니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열어 확인하세요.

### 빌드

```bash
npm run build
```

## 사용 방법

1. 애플리케이션을 실행하면 Google Maps API 키 입력 화면이 표시됩니다.
2. [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)에서 API 키를 발급받아 입력하세요.
3. 왼쪽 사이드바에서 노선을 선택하면 지도에 표시됩니다.
4. 검색 및 필터 기능을 사용하여 원하는 노선을 찾을 수 있습니다.

## 기술 스택

- React 18
- Vite
- Tailwind CSS
- Google Maps JavaScript API
- Lucide React (아이콘)

## 데이터 소스 옵션

현재 프로젝트는 하드코딩된 노선 및 역 정보를 사용하고 있습니다. 오픈 API를 통해 데이터를 가져오는 방법도 제공됩니다.

### 사용 가능한 API 옵션

1. **Transitland API**: 전 세계 대중교통 데이터를 통합한 오픈 데이터 플랫폼
2. **OpenStreetMap Overpass API**: 커뮤니티 기반 지도 데이터
3. **GTFS 파일**: 표준 대중교통 데이터 형식

자세한 내용은 [docs/API_OPTIONS.md](docs/API_OPTIONS.md)를 참고하세요.

### API 테스트 스크립트

다양한 API 소스를 테스트하고 비교할 수 있습니다:

```bash
# 모든 API 테스트
node scripts/testAPIs.js

# Transitland API만 테스트
node scripts/fetchFromTransitland.js

# OpenStreetMap API만 테스트
node scripts/fetchFromOSM.js
```

### 데이터 마이그레이션

기존 하드코딩된 데이터에서 API 기반 데이터로 전환하려면:

1. `scripts/testAPIs.js`를 실행하여 사용 가능한 API 확인
2. 선택한 API의 데이터를 현재 형식으로 변환
3. `src/majorOperators.jsx` 및 `src/minorOperators.jsx`를 API 데이터로 대체

