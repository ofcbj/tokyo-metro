import * as XLSX from 'xlsx';
import * as fs from 'fs';

// Excel 파일 읽기
const workbook = XLSX.readFile('tokyo_metro.xlsx');
const sheetName = workbook.SheetNames[0];
const worksheet = workbook.Sheets[sheetName];
const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

console.log('Excel 파일 구조:');
console.log('총 행 수:', jsonData.length);
console.log('\n첫 10개 행:');
jsonData.slice(0, 10).forEach((row, index) => {
  console.log(`행 ${index + 1}:`, row);
});

