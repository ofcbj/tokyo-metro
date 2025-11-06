import XLSX from 'xlsx';
import fs from 'fs';

// Excel 파일 읽기
const workbook = XLSX.readFile('public/tokyo_metro.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

// 운영사별 노선 정리
const companies = {};
const rows = jsonData.slice(1);

rows.forEach((row) => {
  const lineName = row[0];
  const company = row[1];
  const startStation = row[2];
  const endStation = row[3];
  
  if (!lineName || !company) return;
  
  if (!companies[company]) {
    companies[company] = [];
  }
  
  companies[company].push({
    lineName,
    startStation,
    endStation
  });
});

console.log('운영사별 노선 수:');
Object.keys(companies).forEach(company => {
  console.log(`\n${company}: ${companies[company].length}개 노선`);
  companies[company].forEach((line, index) => {
    console.log(`  ${index + 1}. ${line.lineName}`);
  });
});

// JSON 파일로 저장
fs.writeFileSync('companies_data.json', JSON.stringify(companies, null, 2));
console.log('\n\n운영사별 데이터가 companies_data.json 파일로 저장되었습니다.');

