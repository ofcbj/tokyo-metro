import { OperatorData, LineData } from '../types';

// 여러 운영사 데이터를 회사 키 기준으로 병합한다.
// 같은 회사가 여러 파일(지역 파일 등)에 나뉘어 있어도 노선 배열을 이어붙여 유실을 막는다.
export function mergeOperators(...sources: OperatorData[]): LineData {
  const out: LineData = {};
  for (const src of sources) {
    for (const [company, lines] of Object.entries(src)) {
      out[company] = out[company] ? [...out[company], ...lines] : [...lines];
    }
  }
  return out;
}

// 개별 필터 칩으로 노출할 "주요 운영사" 판정.
// JR 계열(회사명이 JR로 시작) + 간토 대형 사철/지하철. 그 외는 "私鉄"로 묶는다.
const MAJOR_OPERATORS = new Set([
  '東京メトロ', '東京都交通局', '東急電鉄', '京王電鉄', '小田急電鉄',
  '東武鉄道', '西武鉄道', '京急電鉄', '京成電鉄',
]);

export function isMajorOperator(operator: string): boolean {
  return operator.startsWith('JR') || MAJOR_OPERATORS.has(operator);
}
