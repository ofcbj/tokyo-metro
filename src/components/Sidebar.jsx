import { Box } from '@mui/material';
import { SidebarHeader } from './SidebarHeader';
import { NormalModeSidebar } from './NormalModeSidebar';
import { GameModeSidebar } from './GameModeSidebar';

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
}) => {
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
