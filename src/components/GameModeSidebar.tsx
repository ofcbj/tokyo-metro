import { Box, Typography, Paper, Stack } from '@mui/material';

export const GameModeSidebar = ({ gameLog }) => {
  return (
    <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
      <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, color: 'text.primary' }}>
        ゲームログ
      </Typography>
      <Stack spacing={1}>
        {gameLog.map((log, index) => (
          <Paper
            key={index}
            variant="outlined"
            sx={{ p: 1.5, backgroundColor: 'grey.50' }}
          >
            <Box sx={{ display: 'flex', alignItems: 'start', gap: 1 }}>
              <Box
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  backgroundColor: log.lineColor,
                  flexShrink: 0,
                  mt: 0.5,
                }}
              />
              <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography variant="body2" color="text.primary">
                  {log.message}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                  {log.timestamp.toLocaleTimeString('ja-JP')}
                </Typography>
              </Box>
            </Box>
          </Paper>
        ))}
      </Stack>
      {gameLog.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="body2" color="text.secondary">
            乗換駅をクリックして路線を発見しましょう！
          </Typography>
        </Box>
      )}
    </Box>
  );
};
