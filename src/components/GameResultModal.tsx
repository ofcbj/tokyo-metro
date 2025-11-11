import {
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  Typography,
  Button,
  Paper,
  LinearProgress,
} from '@mui/material';
import { GameResult } from '../types';

interface GameResultModalProps {
  result: GameResult | null;
  onClose: () => void;
  onRestart: () => void;
}

export const GameResultModal = ({ result, onClose, onRestart }: GameResultModalProps) => {
  if (!result) return null;

  const isWin = result.type === 'win';
  const progressPercentage = (result.discoveredCount / result.totalCount) * 100;

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
          background: isWin
            ? 'linear-gradient(90deg, #10b981, #059669)'
            : 'linear-gradient(90deg, #ef4444, #ec4899)',
          p: 3,
          textAlign: 'center',
          color: 'white',
        }}
      >
        <Typography sx={{ fontSize: 60, mb: 1.5 }}>
          {isWin ? '🎉' : '😢'}
        </Typography>
        <Typography variant="h3" fontWeight="bold" sx={{ mb: 1 }}>
          {isWin ? '完全勝利！' : 'ゲームオーバー'}
        </Typography>
        <Typography
          variant="body2"
          sx={{ color: isWin ? 'rgba(209, 250, 229, 1)' : 'rgba(254, 202, 202, 1)' }}
        >
          {isWin ? 'All Routes Discovered!' : 'Try Again!'}
        </Typography>
      </Box>

      {/* 결과 내용 */}
      <DialogContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* 발견한 노선 */}
          <Paper
            elevation={2}
            sx={{
              background: 'linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(99, 102, 241, 0.1))',
              border: 2,
              borderColor: 'blue.200',
              p: 3,
              borderRadius: 2,
              textAlign: 'center',
            }}
          >
            <Typography variant="body2" fontWeight="semibold" sx={{ color: 'blue.600', mb: 1 }}>
              発見した路線
            </Typography>
            <Typography variant="h2" fontWeight="bold" sx={{ color: 'blue.900', mb: 0.5 }}>
              {result.discoveredCount}
            </Typography>
            <Typography variant="body2" sx={{ color: 'blue.600', mb: 2 }}>
              / {result.totalCount} 路線
            </Typography>
            <Box sx={{ position: 'relative' }}>
              <LinearProgress
                variant="determinate"
                value={progressPercentage}
                sx={{
                  height: 12,
                  borderRadius: 6,
                  backgroundColor: 'white',
                  '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(90deg, #3b82f6, #6366f1)',
                    borderRadius: 6,
                  },
                }}
              />
            </Box>
            <Typography variant="caption" sx={{ color: 'blue.500', display: 'block', mt: 0.5 }}>
              達成率: {Math.round(progressPercentage)}%
            </Typography>
          </Paper>

          {/* 승리 시 남은 클릭 표시 */}
          {isWin && (
            <Paper
              elevation={2}
              sx={{
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))',
                border: 2,
                borderColor: 'green.200',
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" fontWeight="semibold" sx={{ color: 'green.600', mb: 0.5 }}>
                残りクリック数
              </Typography>
              <Typography variant="h4" fontWeight="bold" sx={{ color: 'green.700' }}>
                {result.remainingClicks} 回
              </Typography>
            </Paper>
          )}

          {/* 패배 시 격려 메시지 */}
          {!isWin && (
            <Paper
              elevation={2}
              sx={{
                background: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1), rgba(245, 158, 11, 0.1))',
                border: 2,
                borderColor: 'orange.200',
                p: 2,
                borderRadius: 2,
                textAlign: 'center',
              }}
            >
              <Typography variant="body2" fontWeight="semibold" sx={{ color: 'orange.700', mb: 1 }}>
                もう一度チャレンジ！
              </Typography>
              <Typography variant="caption" sx={{ color: 'orange.600' }}>
                あと {result.totalCount - result.discoveredCount} 路線で完全勝利です
              </Typography>
            </Paper>
          )}

          {/* 메시지 */}
          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary', lineHeight: 1.6 }}>
            {isWin
              ? '素晴らしい！首都圏のすべての路線を発見しました！'
              : 'クリック回数が足りませんでした。戦略を変えてもう一度挑戦してみましょう！'}
          </Typography>
        </Box>
      </DialogContent>

      {/* 버튼 */}
      <DialogActions sx={{ p: 3, pt: 0, gap: 1.5 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          color="inherit"
          fullWidth
          sx={{ py: 1.5, fontWeight: 'bold' }}
        >
          閉じる
        </Button>
        <Button
          onClick={onRestart}
          variant="contained"
          fullWidth
          sx={{
            py: 1.5,
            background: isWin
              ? 'linear-gradient(90deg, #10b981, #059669)'
              : 'linear-gradient(90deg, #ef4444, #ec4899)',
            '&:hover': {
              background: isWin
                ? 'linear-gradient(90deg, #059669, #047857)'
                : 'linear-gradient(90deg, #dc2626, #db2777)',
            },
            fontWeight: 'bold',
          }}
        >
          もう一度 🚀
        </Button>
      </DialogActions>
    </Dialog>
  );
};
