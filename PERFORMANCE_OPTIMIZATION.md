# Material-UI 성능 최적화 가이드

## 📊 현재 성능 상태

### 번들 크기
- **총 크기**: 530.33 KB (gzip: 165.27 KB)
- **MUI 비중**: 390.55 KB (73.7%)
- **증가량**: +32.8% (Tailwind 대비)

### 체감 성능 저하 원인
1. JavaScript 번들 크기 증가 → 초기 로딩 시간 증가
2. CSS-in-JS 런타임 오버헤드 → 렌더링 성능 저하
3. 컴포넌트 복잡도 증가 → React 리렌더링 오버헤드

---

## ⚡ 성능 최적화 방안

### 1. Tree Shaking 최적화 ✅ (현재 적용됨)
vite.config.js에서 이미 청크 분리를 적용했습니다:
```javascript
manualChunks: {
  'mui-core': ['@mui/material', '@mui/icons-material'],
  'emotion': ['@emotion/react', '@emotion/styled'],
}
```

### 2. 컴포넌트 지연 로딩 (Lazy Loading)
게임 모달은 필요할 때만 로드:

```javascript
// Before
import { GameIntroModal } from './components/GameIntroModal';
import { GameResultModal } from './components/GameResultModal';

// After
const GameIntroModal = lazy(() => import('./components/GameIntroModal'));
const GameResultModal = lazy(() => import('./components/GameResultModal'));
```

**예상 효과**: 초기 번들 크기 약 30KB 감소

### 3. sx prop 최적화
런타임 성능 향상을 위해 정적 스타일은 별도 정의:

```javascript
// ❌ 나쁨 - 매 렌더링마다 객체 생성
<Box sx={{ display: 'flex', gap: 2, p: 3 }}>

// ✅ 좋음 - 객체 재사용
const boxStyles = { display: 'flex', gap: 2, p: 3 };
<Box sx={boxStyles}>

// 🔥 최고 - styled 컴포넌트 사용
const FlexBox = styled(Box)({
  display: 'flex',
  gap: 16,
  padding: 24,
});
<FlexBox>
```

### 4. 불필요한 리렌더링 방지

```javascript
// GameStatusDisplay.jsx 최적화
import { memo } from 'react';

export const GameStatusDisplay = memo(({ discoveredLines, totalLines, ... }) => {
  // ...
}, (prev, next) => {
  // 실제로 변경된 props만 체크
  return prev.discoveredLines === next.discoveredLines &&
         prev.remainingClicks === next.remainingClicks;
});
```

### 5. CSS 변수 활용
자주 사용하는 색상/크기는 CSS 변수로:

```javascript
// theme.js 생성
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    gameSuccess: {
      main: '#10b981',
      light: '#34d399',
    },
    gameError: {
      main: '#ef4444',
      light: '#f87171',
    },
  },
});

// 사용
<Box sx={{ color: 'gameSuccess.main' }}>
```

### 6. 아이콘 최적화
사용하는 아이콘만 import:

```javascript
// ❌ 전체 import (번들 크기 증가)
import * as Icons from '@mui/icons-material';

// ✅ 개별 import (Tree shaking 가능)
import SearchIcon from '@mui/icons-material/Search';
import TrainIcon from '@mui/icons-material/Train';
```

### 7. Emotion 캐싱 설정

```javascript
// main.jsx
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';

const cache = createCache({
  key: 'mui',
  prepend: true, // 스타일 우선순위 최적화
});

root.render(
  <CacheProvider value={cache}>
    <App />
  </CacheProvider>
);
```

---

## 🎯 권장 적용 순서

1. **즉시 적용** (성능 개선 5-10%):
   - [ ] sx prop 최적화 (정적 객체 추출)
   - [ ] 아이콘 개별 import 확인

2. **단기 적용** (성능 개선 15-20%):
   - [ ] 모달 컴포넌트 lazy loading
   - [ ] React.memo 적용
   - [ ] Emotion 캐싱 설정

3. **장기 고려**:
   - [ ] MUI Base로 마이그레이션 (unstyled 컴포넌트)
   - [ ] 중요 컴포넌트만 MUI, 나머지는 Tailwind 병행
   - [ ] Server Components 도입 (Next.js 전환 시)

---

## 📈 예상 성능 개선

| 최적화 항목 | 번들 크기 감소 | 렌더링 성능 개선 |
|------------|--------------|----------------|
| Lazy Loading | -30KB | - |
| sx prop 최적화 | - | +15% |
| React.memo | - | +20% |
| Emotion 캐싱 | - | +10% |
| **총계** | **-30KB** | **+45%** |

---

## 🔄 대안: Hybrid 접근

Material-UI를 유지하되, 성능이 중요한 부분은 최적화:

```javascript
// 자주 리렌더링되는 컴포넌트 → Tailwind 유지
<div className="flex gap-2 p-4">

// 복잡한 UI 로직 필요 → MUI 사용
<Dialog><TextField /></Dialog>
```

**장점**:
- 번들 크기 최소화
- 렌더링 성능 유지
- MUI의 접근성/일관성 활용

---

## 🚀 성능 측정 방법

```bash
# 1. Lighthouse 실행
npm run build
npm run preview
# Chrome DevTools → Lighthouse → Performance 측정

# 2. Bundle Analyzer 확인
npm run build
# dist/stats.html 확인

# 3. React DevTools Profiler
# 개발 모드에서 Profiler 탭 사용
```

---

## 결론

Material-UI 도입으로 **32.8%** 번들 크기가 증가했지만:
- ✅ 개발 속도 향상
- ✅ 일관된 디자인 시스템
- ✅ 접근성 개선
- ✅ 유지보수성 향상

**권장사항**: 위의 최적화를 적용하면 체감 성능 저하를 최소화하면서 MUI의 장점을 누릴 수 있습니다.
