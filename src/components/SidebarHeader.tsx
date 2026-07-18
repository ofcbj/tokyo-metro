import { Box, Button, Typography, Paper, Slider } from '@mui/material';
import { Train as TrainIcon } from '@mui/icons-material';

interface SidebarHeaderProps {
  isGameMode: boolean;
  animationSpeed: number;
  setAnimationSpeed: (speed: number) => void;
  startGame: () => void;
  endGame: () => void;
}

export const SidebarHeader = ({
  isGameMode,
  animationSpeed,
  setAnimationSpeed,
  startGame,
  endGame,
}: SidebarHeaderProps) => {
  const SPEEDS = [0.25, 0.5, 1, 2, 4]; // 중앙 1x가 기본
  const speedMarks = SPEEDS.map((s, i) => ({ value: i, label: `${s}x` }));

  const getSpeedLabel = (value: number): string => {
    if (value <= 0.25) return '最遅';
    if (value < 1) return '遅い';
    if (value === 1) return '普通';
    if (value <= 2) return '速い';
    return '超速';
  };

  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', backgroundColor: 'white', flexShrink: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TrainIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h5" fontWeight="bold">
          日本鉄道
        </Typography>
      </Box>

      {/* 연출 시간 조정 슬라이더 (게임 모드일 때만) */}
      {isGameMode && (
        <Paper variant="outlined" sx={{ p: 2, mb: 2, backgroundColor: 'grey.50' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" fontWeight="medium">
              演出速度
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {getSpeedLabel(animationSpeed)}
            </Typography>
          </Box>
          <Slider
            value={Math.max(0, SPEEDS.indexOf(animationSpeed))}
            onChange={(_, value) => setAnimationSpeed(SPEEDS[value as number])}
            min={0}
            max={SPEEDS.length - 1}
            step={1}
            marks={speedMarks}
            size="small"
          />
        </Paper>
      )}

      {/* 게임 시작/종료 버튼 */}
      <Box>
        {!isGameMode ? (
          <Button
            fullWidth
            variant="contained"
            onClick={startGame}
            sx={{
              background: 'linear-gradient(90deg, #9333ea, #ec4899)',
              '&:hover': {
                background: 'linear-gradient(90deg, #7e22ce, #db2777)',
              },
              fontWeight: 'bold',
            }}
          >
            ゲームスタート
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="inherit"
            onClick={endGame}
            sx={{ fontWeight: 'bold' }}
          >
            ゲーム終了
          </Button>
        )}
      </Box>
    </Box>
  );
};
