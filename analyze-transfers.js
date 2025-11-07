import { majorOperators } from './src/majorOperators.jsx';
import { minorOperators } from './src/minorOperators.jsx';

const stationCounts = {};
const stationLines = {};

// Collect from major operators
Object.entries(majorOperators).forEach(([operator, lines]) => {
  lines.forEach(line => {
    line.stations.forEach(station => {
      const name = station.name;
      stationCounts[name] = (stationCounts[name] || 0) + 1;
      if (!stationLines[name]) stationLines[name] = [];
      stationLines[name].push({ operator, lineName: line.nameJp, hasTransfer: station.transfer === true });
    });
  });
});

// Collect from minor operators
Object.entries(minorOperators).forEach(([operator, lines]) => {
  lines.forEach(line => {
    line.stations.forEach(station => {
      const name = station.name;
      stationCounts[name] = (stationCounts[name] || 0) + 1;
      if (!stationLines[name]) stationLines[name] = [];
      stationLines[name].push({ operator, lineName: line.nameJp, hasTransfer: station.transfer === true });
    });
  });
});

// Find transfer stations (appear on 2+ lines)
const transferStations = Object.entries(stationCounts)
  .filter(([name, count]) => count >= 2)
  .sort((a, b) => b[1] - a[1]);

console.log('=== TRANSFER STATIONS (appearing on 2+ lines) ===\n');
transferStations.forEach(([name, count]) => {
  const lines = stationLines[name];
  const hasAnyTransferFlag = lines.some(l => l.hasTransfer);
  console.log(`${name} (appears ${count} times) - Has transfer flag: ${hasAnyTransferFlag}`);
  lines.forEach(l => {
    console.log(`  - ${l.operator}: ${l.lineName} [transfer=${l.hasTransfer}]`);
  });
  console.log('');
});

console.log(`\n\nTOTAL TRANSFER STATIONS: ${transferStations.length}`);
