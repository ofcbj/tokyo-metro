import { Box } from '@mui/material';
import { SidebarHeader } from './SidebarHeader';
import { NormalModeSidebar } from './NormalModeSidebar';
import { GameModeSidebar } from './GameModeSidebar';
import { GameLogEntry, LineData } from '../types';

interface SidebarProps {
  isGameMode: boolean;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
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
  toggleLine: (lineId: string) => void;
  regions: Record<string, LineData>;
}

export const Sidebar = ({
  isGameMode,
  searchTerm,
  setSearchTerm,
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
  toggleLine,
  regions,
}: SidebarProps) => {
  return (
    <Box sx={{ width: { xs: '100%', md: 384 }, flexShrink: 0, backgroundColor: 'white', boxShadow: 3, overflowY: 'auto', display: 'flex', flexDirection: 'column', height: '100%' }}>
      <SidebarHeader
        isGameMode={isGameMode}
        animationSpeed={animationSpeed}
        setAnimationSpeed={setAnimationSpeed}
        startGame={startGame}
        endGame={endGame}
      />

      {isGameMode ? (
        <GameModeSidebar gameLog={gameLog} regions={regions} selectedLines={selectedLines} />
      ) : (
        <NormalModeSidebar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          autoZoom={autoZoom}
          setAutoZoom={setAutoZoom}
          allLineIds={allLineIds}
          selectedLines={selectedLines}
          showAllLines={showAllLines}
          setSelectedLines={setSelectedLines}
          toggleLine={toggleLine}
          regions={regions}
        />
      )}
    </Box>
  );
};
