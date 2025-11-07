# 도쿄 메트로 노선 및 역 정보 API 옵션

현재 프로젝트에서 하드코딩된 노선과 역 정보를 오픈 API나 데이터 소스로 대체할 수 있는 방법들을 정리했습니다.

## 1. GTFS (General Transit Feed Specification) 데이터

GTFS는 대중교통 정보를 위한 표준 형식입니다. 도쿄 메트로와 일본의 주요 철도 회사들이 GTFS 데이터를 제공하는지 확인할 수 있습니다.

### GTFS 데이터 소스

#### Transitland API
- **URL**: https://transit.land/
- **설명**: 전 세계 대중교통 데이터를 통합한 오픈 데이터 플랫폼
- **장점**: 
  - REST API 제공
  - 도쿄 메트로, JR 동일본 등 일본 철도 데이터 포함 가능
  - 실시간 데이터 접근 가능
- **사용법**:
  ```javascript
  // 예시: Transitland API를 통한 역 정보 조회
  const response = await fetch('https://transit.land/api/v2/rest/stops?served_by=o-9v9-tokyometro');
  const data = await response.json();
  ```

#### GTFS Static 데이터 다운로드
- **도쿄 메트로 공식**: 도쿄 메트로가 GTFS 데이터를 제공하는지 확인 필요
- **일본 GTFS 데이터**: https://github.com/MobilityData/transitland-latest-export
- **사용법**: GTFS 파일(stops.txt, routes.txt, trips.txt 등)을 파싱하여 사용

## 2. OpenStreetMap (OSM) Overpass API

OpenStreetMap에는 도쿄 메트로의 역과 노선 정보가 상세하게 포함되어 있습니다.

### Overpass API 사용 예시

```javascript
// Overpass API를 사용한 도쿄 메트로 역 정보 조회
const overpassQuery = `
[out:json][timeout:25];
(
  node["operator"="東京メトロ"]["network"="Tokyo Metro"]({{bbox}});
  way["operator"="東京メトロ"]["network"="Tokyo Metro"]({{bbox}});
);
out body;
>;
out skel qt;
`;

// bbox는 도쿄 지역의 경계 좌표
const bbox = "139.0,35.4,140.0,35.8"; // min_lon, min_lat, max_lon, max_lat
const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;
```

### OSM 데이터 구조
- **역 정보**: `node` 태그에 `railway=station`, `name`, `operator` 등
- **노선 정보**: `relation` 태그에 `route=subway`, `ref` (노선 번호), `color` 등
- **좌표**: 각 역의 `lat`, `lon` 속성

## 3. 도쿄 메트로 공식 API (확인 필요)

도쿄 메트로가 직접 제공하는 API가 있는지 확인이 필요합니다.

### 확인 사항
- 도쿄 메트로 개발자 포털: https://www.tokyometro.jp/ (개발자 섹션 확인)
- Open Data 제공 여부 확인
- API 키 발급 필요 여부

## 4. 일본 철도 데이터 오픈소스 프로젝트

### GitHub 오픈소스 데이터
- **일본 철도 역 데이터**: GitHub에서 "japan railway station" 또는 "tokyo metro station" 검색
- **예시**: 
  - https://github.com/search?q=japan+railway+station+json
  - https://github.com/search?q=tokyo+metro+gtfs

## 5. 추천 구현 방법

### 방법 1: Transitland API 사용 (가장 간단)

```javascript
// transitland-api.js
export async function fetchTokyoMetroStations() {
  const operators = [
    'o-9v9-tokyometro', // 도쿄 메트로
    'o-9v9-toei', // 도에이
    'o-9v9-jreast', // JR 동일본
  ];
  
  const stations = [];
  
  for (const operator of operators) {
    const response = await fetch(
      `https://transit.land/api/v2/rest/stops?served_by=${operator}&per_page=1000`
    );
    const data = await response.json();
    stations.push(...data.stops);
  }
  
  return stations;
}

export async function fetchTokyoMetroRoutes() {
  const response = await fetch(
    'https://transit.land/api/v2/rest/routes?served_by=o-9v9-tokyometro'
  );
  const data = await response.json();
  return data.routes;
}
```

### 방법 2: GTFS 파일 파싱

```javascript
// gtfs-parser.js
import { parse } from 'csv-parse/sync';
import fs from 'fs';

export function parseGTFS(gtfsPath) {
  const stops = parse(fs.readFileSync(`${gtfsPath}/stops.txt`), {
    columns: true,
    skip_empty_lines: true
  });
  
  const routes = parse(fs.readFileSync(`${gtfsPath}/routes.txt`), {
    columns: true,
    skip_empty_lines: true
  });
  
  const stopTimes = parse(fs.readFileSync(`${gtfsPath}/stop_times.txt`), {
    columns: true,
    skip_empty_lines: true
  });
  
  // 노선별 역 정렬 및 매핑
  // ...
  
  return { stops, routes, stopTimes };
}
```

### 방법 3: OpenStreetMap Overpass API

```javascript
// osm-api.js
export async function fetchStationsFromOSM() {
  const query = `
    [out:json][timeout:25];
    (
      node["operator"="東京メトロ"]["railway"="station"]({{bbox}});
      node["operator"="都営地下鉄"]["railway"="station"]({{bbox}});
    );
    out body;
  `;
  
  const bbox = "139.0,35.4,140.0,35.8";
  const url = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(query.replace('{{bbox}}', bbox))}`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.elements.map(element => ({
    name: element.tags.name,
    nameJp: element.tags['name:ja'],
    lat: element.lat,
    lng: element.lon,
    line: element.tags.ref || element.tags.route_ref
  }));
}
```

## 6. 데이터 변환 및 통합

현재 프로젝트의 데이터 구조에 맞게 변환하는 함수:

```javascript
// data-converter.js
export function convertToAppFormat(apiData, source) {
  if (source === 'transitland') {
    // Transitland 데이터를 현재 형식으로 변환
    return {
      operators: groupByOperator(apiData.routes),
      stations: apiData.stops.map(stop => ({
        name: `${stop.name}/${stop.name_ja || stop.name}`,
        lat: stop.geometry.coordinates[1],
        lng: stop.geometry.coordinates[0],
        transfer: stop.wheelchair_boarding === 1
      }))
    };
  }
  // 다른 소스에 대한 변환 로직...
}
```

## 7. 다음 단계

1. **Transitland API 테스트**: 실제로 도쿄 메트로 데이터가 있는지 확인
2. **GTFS 데이터 다운로드**: 도쿄 메트로 GTFS 파일 확인 및 다운로드
3. **OpenStreetMap 검증**: OSM 데이터의 완전성 확인
4. **데이터 변환 스크립트 작성**: 선택한 소스의 데이터를 현재 형식으로 변환
5. **점진적 마이그레이션**: 기존 하드코딩 데이터와 병행하여 점진적으로 전환

## 참고 링크

- Transitland API 문서: https://www.transit.land/api/
- GTFS 스펙: https://gtfs.org/
- OpenStreetMap Overpass API: https://wiki.openstreetmap.org/wiki/Overpass_API
- 도쿄 메트로 공식 사이트: https://www.tokyometro.jp/

