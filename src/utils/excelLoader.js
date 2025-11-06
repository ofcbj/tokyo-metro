import * as XLSX from 'xlsx';

/**
 * Excel 파일을 읽어서 노선 데이터로 변환하는 함수
 * @param {File|string} file - Excel 파일 또는 파일 경로
 * @returns {Promise<Object>} 노선 데이터 객체
 */
export async function loadExcelData(file) {
  let workbook;
  
  if (typeof file === 'string') {
    // URL에서 파일 다운로드
    const response = await fetch(file);
    const arrayBuffer = await response.arrayBuffer();
    workbook = XLSX.read(arrayBuffer, { type: 'array' });
  } else {
    // File 객체에서 읽기
    const arrayBuffer = await file.arrayBuffer();
    workbook = XLSX.read(arrayBuffer, { type: 'array' });
  }

  // 첫 번째 시트 읽기
  const sheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[sheetName];
  
  // JSON으로 변환
  const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
  
  // Excel 데이터를 노선 데이터 형식으로 변환
  return convertExcelToLineData(jsonData);
}

/**
 * Excel 데이터를 노선 데이터 형식으로 변환
 * @param {Array} excelData - Excel에서 읽은 원시 데이터
 * @returns {Object} 노선 데이터 객체
 */
function convertExcelToLineData(excelData) {
  const lineData = {};
  
  // 헤더 행 찾기 (첫 번째 행)
  if (excelData.length === 0) return lineData;
  
  // 헤더 행 확인
  const headerRow = excelData[0] || [];
  console.log('Excel 헤더:', headerRow);
  console.log('Excel 데이터 샘플 (첫 5개 행):', excelData.slice(0, 5));
  
  // 다양한 Excel 구조를 지원하기 위한 유연한 파싱
  // 형식 1: [운영사, 노선ID, 노선명(한글), 노선명(일본어), 색상, 역명, 위도, 경도, 환승여부]
  // 형식 2: [운영사, 노선명(한글), 노선명(일본어), 색상, 역명, 위도, 경도, 환승여부]
  // 형식 3: 다른 구조도 가능
  
  let currentOperator = null;
  let currentLine = null;
  let currentLineId = null;
  
  // 헤더 행을 건너뛰고 데이터 시작
  for (let i = 1; i < excelData.length; i++) {
    const row = excelData[i];
    if (!row || row.length === 0) continue;
    
    // 빈 행 건너뛰기
    const hasData = row.some(cell => cell !== null && cell !== undefined && cell !== '');
    if (!hasData) continue;
    
    // 운영사 컬럼 찾기 (첫 번째 또는 두 번째 컬럼)
    const operator = (row[0] || row[1] || '').toString().trim();
    if (operator && operator !== currentOperator && operator.length > 0) {
      currentOperator = operator;
      if (!lineData[currentOperator]) {
        lineData[currentOperator] = [];
      }
      currentLine = null;
      currentLineId = null;
    }
    
    // 노선 정보 찾기
    // 노선ID가 있는 경우 (두 번째 컬럼)
    const lineId = row[1]?.toString().trim();
    const nameKo = row[2]?.toString().trim() || row[1]?.toString().trim();
    const nameJp = row[3]?.toString().trim() || row[2]?.toString().trim();
    const color = row[4]?.toString().trim() || row[3]?.toString().trim();
    
    // 노선 정보가 있는지 확인
    if (nameKo && nameJp && color && (!currentLine || currentLineId !== lineId)) {
      // 새 노선 시작
      currentLineId = lineId || nameKo.toLowerCase().replace(/\s+/g, '-');
      currentLine = {
        id: currentLineId.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
        nameKo: nameKo,
        nameJp: nameJp,
        color: color.startsWith('#') ? color : '#' + color,
        stations: []
      };
      if (currentOperator) {
        lineData[currentOperator].push(currentLine);
      }
    }
    
    // 역 정보 찾기
    // 역명, 위도, 경도 위치 찾기
    let stationName = null;
    let lat = null;
    let lng = null;
    let transfer = false;
    
    // 다양한 컬럼 위치에서 역 정보 찾기
    for (let col = 4; col < row.length; col++) {
      const cell = row[col];
      if (!cell) continue;
      
      const cellStr = cell.toString().trim();
      
      // 위도/경도 숫자 찾기
      const num = parseFloat(cellStr);
      if (!isNaN(num) && num > 0) {
        if (lat === null) {
          lat = num;
        } else if (lng === null) {
          lng = num;
        }
      }
      
      // 역명 찾기 (한글/일본어가 포함된 셀)
      if (!stationName && cellStr && (cellStr.includes('/') || cellStr.includes('駅') || cellStr.length > 2)) {
        stationName = cellStr;
      }
      
      // 환승 여부 찾기
      if (cellStr.toLowerCase() === 'true' || cellStr.toLowerCase() === 'y' || cellStr.toLowerCase() === 'yes' || cellStr === '환승') {
        transfer = true;
      }
    }
    
    // 역 정보가 완전한 경우에만 추가
    if (stationName && lat !== null && lng !== null && currentLine) {
      currentLine.stations.push({
        name: stationName,
        lat: lat,
        lng: lng,
        transfer: transfer
      });
    }
  }
  
  // 빈 노선 제거
  Object.keys(lineData).forEach(operator => {
    lineData[operator] = lineData[operator].filter(line => line.stations.length > 0);
  });
  
  return lineData;
}

