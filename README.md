# 일본 전철 지도

일본 철도 노선을 Google Maps 위에 표시하는 React 애플리케이션입니다. 현재 간토(수도권)·나가노·나고야·간사이 지역을 포함합니다.

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 (핫리로드)

```bash
npm run dev
```

브라우저에서 `http://localhost:5173/tokyo-metro/` 를 엽니다.

### 로컬에서 빠르게 보기 (프로덕션 빌드 서빙)

```bash
npm run serve   # = vite build && vite preview
```

`http://localhost:4173/tokyo-metro/` 에서 최적화된 번들을 서빙합니다. 개발 서버보다 로딩·렌더링이 훨씬 빠릅니다.

### 빌드

```bash
npm run build
```

## 사용 방법

1. 실행하면 Google Maps API 키 입력 화면이 표시됩니다.
2. [Google Cloud Console](https://developers.google.com/maps/documentation/javascript/get-api-key)에서 API 키를 발급받아 입력하세요.
3. 왼쪽 사이드바에서 노선을 선택하면 지도에 표시됩니다.
4. 검색·필터로 원하는 노선을 찾을 수 있습니다.

## 배포

`master` 브랜치에 푸시하면 GitHub Actions가 GitHub Pages로 자동 배포합니다. 배포 경로가 `/tokyo-metro/` 하위이므로 [vite.config.js](vite.config.js)의 `base`가 `/tokyo-metro/`로 설정되어 있습니다.

## 기술 스택

- React 18 + TypeScript
- Vite
- Material UI (MUI) + Tailwind CSS
- Google Maps JavaScript API (커스텀 Canvas 오버레이로 노선/역 렌더링)

## 데이터 구조

노선·역 데이터는 [data/](data/)의 CSV(ekidata 형식)에서 추출해 [src/lines/](src/lines/) 아래 **지역별 모듈**로 관리합니다.

| 파일 | 내용 |
|---|---|
| `src/lines/kanto.ts` | 간토(수도권) 지역 노선 |
| `src/lines/chubu.ts` | 주부 지역 노선 (나가노·나고야권) |
| `src/lines/kansai.ts` | 간사이 지역 노선 |

각 모듈은 `OperatorData`(회사명 → 노선 배열) 형태이며, [src/utils/operators.ts](src/utils/operators.ts)의 `mergeOperators`로 병합됩니다. 같은 회사가 여러 지역 모듈에 나뉘어 있어도(예: JR·긴테쓰) 노선 배열이 이어붙습니다. 새 지역은 `src/lines/<지역>.ts`를 추가하고 `TokyoMetroMap.tsx`의 `mergeOperators(...)`에 넣으면 됩니다.

환승역 플래그(`transfer`)는 데이터에 저장되며, 지역/노선을 추가한 뒤 `npm run normalize-transfers`로 CSV의 `station_g_cd` 기준(현재 존재하는 노선 2개 이상이 같은 역 그룹 공유) 재계산합니다.

렌더링은 [src/utils/CanvasMetroOverlay.ts](src/utils/CanvasMetroOverlay.ts)의 단일 Canvas 오버레이가 담당하며, 줌 단계별 LOD와 requestAnimationFrame 쓰로틀로 대량 노선에서도 성능을 유지합니다.
