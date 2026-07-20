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
  isMobile: boolean;
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
  isMobile,
}: SidebarProps) => {
  return (
    <Box sx={{ width: '100%', height: '100%', backgroundColor: 'white', boxShadow: 3, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
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
          isMobile={isMobile}
          animationSpeed={animationSpeed}
          setAnimationSpeed={setAnimationSpeed}
        />
      )}
    </Box>
  );
};
