import { Box, Button, Typography, Paper, Slider } from '@mui/material';
import { Train as TrainIcon } from '@mui/icons-material';

export const SidebarHeader = ({
  isGameMode,
  animationSpeed,
  setAnimationSpeed,
  startGame,
  endGame,
}) => {
  const speedMarks = [
    { value: 0.5, label: '0.5x' },
    { value: 1.0, label: '1.0x' },
    { value: 1.5, label: '1.5x' },
    { value: 2.0, label: '2.0x' },
  ];

  const getSpeedLabel = (value) => {
    if (value === 0.5) return '遅い';
    if (value === 1.0) return '普通';
    if (value === 1.5) return '速い';
    return '超速';
  };

  return (
    <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 10 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <TrainIcon sx={{ color: 'primary.main', fontSize: 28 }} />
        <Typography variant="h5" fontWeight="bold">
          日本首都圏電鉄
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
            value={animationSpeed}
            onChange={(_, value) => setAnimationSpeed(value)}
            min={0.5}
            max={2.0}
            step={0.5}
            marks={speedMarks}
            valueLabelDisplay="auto"
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
