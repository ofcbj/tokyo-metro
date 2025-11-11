import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Paper,
} from '@mui/material';

export const GameIntroModal = ({ onCancel, onStart }) => {
  return (
    <Dialog
      open={true}
      maxWidth="sm"
      fullWidth
      slotProps={{
        paper: {
          sx: {
            borderRadius: 4,
            overflow: 'hidden',
          },
        },
      }}
    >
      {/* 헤더 */}
      <Box
        sx={{
          background: 'linear-gradient(90deg, #9333ea, #ec4899)',
          p: 3,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography sx={{ fontSize: 48, mb: 1 }}>🚇</Typography>
        <Typography variant="h4" fontWeight="bold" sx={{ mb: 0.5 }}>
          路線発見ゲーム
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(233, 213, 255, 1)' }}>
          Route Discovery Challenge
        </Typography>
      </Box>

      {/* 내용 */}
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Paper
            sx={{
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.1), rgba(147, 51, 234, 0.05))',
              borderLeft: 4,
              borderColor: 'purple.600',
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'purple.900', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: '20px' }}>🎯</span>
              ゲーム目標
            </Typography>
            <Typography variant="body2" sx={{ color: 'purple.800' }}>
              首都圏のすべての路線を発見しよう!
            </Typography>
          </Paper>

          <Paper
            sx={{
              background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(37, 99, 235, 0.05))',
              borderLeft: 4,
              borderColor: 'blue.600',
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'blue.900', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: '20px' }}>🎮</span>
              遊び方
            </Typography>
            <Box component="ul" sx={{ color: 'blue.800', pl: 2, m: 0 }}>
              <Typography variant="body2" component="li">ランダムな路線からスタート</Typography>
              <Typography variant="body2" component="li">環境駅をクリックして路線を拡張</Typography>
              <Typography variant="body2" component="li">新しい路線が次々と発見される!</Typography>
            </Box>
          </Paper>

          <Paper
            sx={{
              background: 'linear-gradient(135deg, rgba(220, 38, 38, 0.1), rgba(220, 38, 38, 0.05))',
              borderLeft: 4,
              borderColor: 'red.600',
              p: 2,
              borderRadius: 2,
            }}
          >
            <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'red.900', mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
              <span style={{ fontSize: '20px' }}>⏱️</span>
              制限時間
            </Typography>
            <Typography variant="body2" sx={{ color: 'red.800' }}>
              <Typography component="strong" sx={{ fontSize: 28, color: 'red.600', fontWeight: 'bold' }}>
                50回
              </Typography>
              のクリックで全路線を発見せよ!
            </Typography>
          </Paper>
        </Box>
      </DialogContent>

      {/* 버튼 */}
      <DialogActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
        <Button
          onClick={onCancel}
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          キャンセル
        </Button>
        <Button
          onClick={onStart}
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            background: 'linear-gradient(90deg, #9333ea, #ec4899)',
            '&:hover': {
              background: 'linear-gradient(90deg, #7e22ce, #db2777)',
            },
            fontWeight: 'bold',
          }}
        >
          スタート! 🚀
        </Button>
      </DialogActions>
    </Dialog>
  );
};
