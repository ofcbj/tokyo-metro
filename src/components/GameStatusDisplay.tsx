import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  LinearProgress,
  Chip,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { ToastMessage } from '../types';

const bounceAnimation = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

const pingAnimation = keyframes`
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
`;

interface GameStatusDisplayProps {
  discoveredLines: number;
  totalLines: number;
  remainingClicks: number;
  toastMessage: ToastMessage | null;
}

export const GameStatusDisplay = ({ discoveredLines, totalLines, remainingClicks, toastMessage }: GameStatusDisplayProps) => {
  const [prevDiscovered, setPrevDiscovered] = useState(discoveredLines);
  const [prevClicks, setPrevClicks] = useState(remainingClicks);
  const [showDiscoveredAnim, setShowDiscoveredAnim] = useState(false);
  const [showClicksAnim, setShowClicksAnim] = useState(false);

  useEffect(() => {
    if (discoveredLines > prevDiscovered) {
      setShowDiscoveredAnim(true);
      setTimeout(() => setShowDiscoveredAnim(false), 600);
    }
    setPrevDiscovered(discoveredLines);
  }, [discoveredLines, prevDiscovered]);

  useEffect(() => {
    if (remainingClicks < prevClicks) {
      setShowClicksAnim(true);
      setTimeout(() => setShowClicksAnim(false), 600);
    }
    setPrevClicks(remainingClicks);
  }, [remainingClicks, prevClicks]);

  const progressPercentage = (discoveredLines / totalLines) * 100;

  return (
    <>
      {/* 고정 UI: 발견한 라인 수 & 남은 클릭 수 */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 30,
          pointerEvents: 'none',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'start', gap: 2, pt: 3, px: 2 }}>
          {/* 왼쪽: 발견한 라인 수 */}
          <Box sx={{ pointerEvents: 'auto', flexShrink: 0 }}>
            <Paper
              elevation={8}
              sx={{
                background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.6), rgba(79, 70, 229, 0.6))',
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: 2,
                width: { xs: 150, sm: 200 },
                transform: showDiscoveredAnim ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s',
                boxShadow: showDiscoveredAnim ? '0 0 30px rgba(147, 51, 234, 0.5)' : undefined,
                position: 'relative',
              }}
            >
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <span style={{ fontSize: '16px' }}>🎯</span>
                発見した路線
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography
                  variant="h3"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    animation: showDiscoveredAnim ? `${bounceAnimation} 0.6s ease-in-out` : undefined,
                  }}
                >
                  {discoveredLines}
                </Typography>
                <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  / {totalLines}
                </Typography>
              </Box>

              {/* 프로그레스 바 */}
              <Box sx={{ mt: 1.5, position: 'relative' }}>
                <LinearProgress
                  variant="determinate"
                  value={progressPercentage}
                  sx={{
                    height: 8,
                    borderRadius: 4,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    '& .MuiLinearProgress-bar': {
                      background: 'linear-gradient(90deg, #fcd34d, #fbbf24)',
                      borderRadius: 4,
                    },
                  }}
                />
              </Box>

              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)', display: 'block', mt: 1, fontWeight: 500 }}>
                達成率: {Math.round(progressPercentage)}%
              </Typography>

              {/* 파티클 효과 */}
              {showDiscoveredAnim && (
                <>
                  <Box sx={{ position: 'absolute', top: -8, right: -8, fontSize: 24, animation: `${pingAnimation} 0.6s ease-out` }}>✨</Box>
                  <Box sx={{ position: 'absolute', bottom: -8, left: -8, fontSize: 20, animation: `${bounceAnimation} 0.6s ease-in-out` }}>🎉</Box>
                  <Box sx={{ position: 'absolute', top: '50%', right: -12, fontSize: 18, animation: `${pingAnimation} 0.8s ease-out` }}>⭐</Box>
                </>
              )}
            </Paper>
          </Box>

          {/* 중앙: 빈 공간 (토스트 메시지 자리) */}
          <Box sx={{ flexShrink: 0, width: { xs: 0, sm: 450 } }}></Box>

          {/* 오른쪽: 남은 클릭 수 */}
          <Box sx={{ pointerEvents: 'auto', flexShrink: 0 }}>
            <Paper
              elevation={8}
              sx={{
                background: remainingClicks <= 10
                  ? 'linear-gradient(135deg, rgba(239, 68, 68, 0.6), rgba(236, 72, 153, 0.6))'
                  : 'linear-gradient(135deg, rgba(59, 130, 246, 0.6), rgba(6, 182, 212, 0.6))',
                backdropFilter: 'blur(12px)',
                borderRadius: 4,
                p: 2,
                width: { xs: 150, sm: 200 },
                transform: showClicksAnim ? 'scale(1.1)' : 'scale(1)',
                transition: 'all 0.3s',
                boxShadow: showClicksAnim ? '0 0 30px rgba(59, 130, 246, 0.5)' : undefined,
                position: 'relative',
              }}
            >
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.8)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
                <span style={{ fontSize: '16px' }}>⏱️</span>
                残りクリック
              </Typography>
              <Typography
                variant="h3"
                sx={{
                  color: 'white',
                  fontWeight: 'bold',
                  animation: showClicksAnim || remainingClicks <= 10 ? `${pulseAnimation} 1s ease-in-out infinite` : undefined,
                }}
              >
                {remainingClicks}
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(255, 255, 255, 0.6)', mt: 0.5 }}>
                回
              </Typography>

              {/* 경고 표시 */}
              {remainingClicks <= 10 && (
                <Chip
                  label={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <span>⚠️</span>
                      急いで！
                    </Box>
                  }
                  size="small"
                  sx={{
                    mt: 1,
                    backgroundColor: 'rgba(255, 255, 255, 0.2)',
                    color: 'white',
                    fontWeight: 'bold',
                    animation: `${pulseAnimation} 1s ease-in-out infinite`,
                  }}
                />
              )}

              {/* 파티클 효과 */}
              {showClicksAnim && remainingClicks > 0 && (
                <>
                  <Box sx={{ position: 'absolute', top: -8, left: -8, fontSize: 20, animation: `${pingAnimation} 0.6s ease-out` }}>💨</Box>
                  <Box sx={{ position: 'absolute', bottom: -8, right: -8, fontSize: 18, animation: `${bounceAnimation} 0.6s ease-in-out` }}>⚡</Box>
                </>
              )}
            </Paper>
          </Box>
        </Box>
      </Box>

      {/* 토스트 메시지 (별도 레이어) */}
      {toastMessage && (() => {
        const japName = toastMessage.text;
        const korName = toastMessage.subText ?? null;

        return (
          <Box
            sx={{
              position: 'fixed',
              top: 24,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 40,
              pointerEvents: 'none',
            }}
          >
            <Paper
              elevation={8}
              sx={{
                pointerEvents: 'auto',
                borderRadius: 4,
                p: 2,
                border: 4,
                borderColor: toastMessage.color,
                background: `linear-gradient(135deg, ${toastMessage.color}15, ${toastMessage.color}25)`,
                backdropFilter: 'blur(8px)',
                width: { xs: '90vw', sm: 450 },
                maxWidth: 450,
                display: 'flex',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flex: 1 }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    backgroundColor: toastMessage.color,
                    boxShadow: `0 0 30px ${toastMessage.color}80`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
                    fontSize: 24,
                  }}
                >
                  {toastMessage.isError ? '😔' : '✨'}
                </Box>
                <Box sx={{ flex: 1, minWidth: 0, textAlign: 'center' }}>
                  <Typography
                    variant="caption"
                    sx={{
                      fontWeight: 'bold',
                      color: toastMessage.color,
                      display: 'block',
                      mb: 0.5,
                    }}
                  >
                    {toastMessage.isError ? '残念...' : '🎊 新路線発見!'}
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'rgb(17, 24, 39)' }}>
                    {japName}
                  </Typography>
                  {korName && (
                    <Typography variant="body2" sx={{ fontWeight: 600, color: 'rgb(55, 65, 81)' }}>
                      {korName}
                    </Typography>
                  )}
                </Box>
              </Box>
              <Typography sx={{ fontSize: 32, flexShrink: 0, animation: `${bounceAnimation} 1s ease-in-out infinite` }}>
                {toastMessage.isError ? '😔' : '🎉'}
              </Typography>
            </Paper>
          </Box>
        );
      })()}
    </>
  );
};
