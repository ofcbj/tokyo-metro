import { Box } from '@mui/material';
import { SidebarHeader } from './SidebarHeader';
import { NormalModeSidebar } from './NormalModeSidebar';
import { GameModeSidebar } from './GameModeSidebar';
import { GameLogEntry, LineData, OperatorData, FilterOperator } from '../types';

interface SidebarProps {
  isGameMode: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  filterOperator: FilterOperator;
  setFilterOperator: (operator: FilterOperator) => void;
  autoZoom: boolean;
  setAutoZoom: (zoom: boolean) => void;
  allLineIds: string[];
  selectedLines: string[];
  showAllLines: () => void;
  setSelectedLines: (lines: string[]) => void;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  startGame: () => void;
  endGame: () => void;
  gameLog: GameLogEntry[];
  filteredLineData: LineData;
  toggleLine: (lineId: string) => void;
  lineData: LineData;
  opMajor1: OperatorData;
  opMajor2: OperatorData;
  opMinor: OperatorData;
}

export const Sidebar = ({
  isGameMode,
  searchTerm,
  setSearchTerm,
  filterOperator,
  setFilterOperator,
  autoZoom,
  setAutoZoom,
  allLineIds,
  selectedLines,
  showAllLines,
  setSelectedLines,
  animationSpeed,
  setAnimationSpeed,
  startGame,
  endGame,
  gameLog,
  filteredLineData,
  toggleLine,
  lineData,
  opMajor1,
  opMajor2,
  opMinor,
}: SidebarProps) => {
  return (
    <Box sx={{ width: 384, backgroundColor: 'white', boxShadow: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SidebarHeader
        isGameMode={isGameMode}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        startGame={startGame}
        endGame={endGame}
      />

      {isGameMode ? (
        <GameModeSidebar gameLog={gameLog} />
      ) : (
        <NormalModeSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterOperator={filterOperator}
          setFilterOperator={setFilterOperator}
          autoZoom={autoZoom}
          setAutoZoom={setAutoZoom}
          allLineIds={allLineIds}
          selectedLines={selectedLines}
          showAllLines={showAllLines}
          setSelectedLines={setSelectedLines}
          filteredLineData={filteredLineData}
          toggleLine={toggleLine}
          lineData={lineData}
          opMajor1={opMajor1}
          opMajor2={opMajor2}
          opMinor={opMinor}
        />
      )}
    </Box>
  );
};
