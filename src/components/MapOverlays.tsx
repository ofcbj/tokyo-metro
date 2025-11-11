import {
  Box,
  Snackbar,
  Alert,
  Backdrop,
  CircularProgress,
  Paper,
  Typography,
  Fade,
  Grow,
  Avatar,
} from '@mui/material';
import { keyframes } from '@emotion/react';
import { ClickEffect, ToastMessage } from '../types';

// 클릭 이펙트 애니메이션
const rippleAnimation = keyframes`
  0% {
    transform: scale(0);
    opacity: 0.8;
  }
  100% {
    transform: scale(4);
    opacity: 0;
  }
`;

const pulseAnimation = keyframes`
  0%, 100% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
`;

interface MapOverlaysProps {
  clickEffect: ClickEffect | null;
  toastMessage: ToastMessage | null;
  isMapLoaded: boolean;
  selectedLines: string[];
}

export const MapOverlays = ({ clickEffect, toastMessage, isMapLoaded, selectedLines }: MapOverlaysProps) => {
  return (
    <>
      {/* 클릭 이펙트 */}
      {clickEffect && (
        <Box
          sx={{
            position: 'fixed',
            left: clickEffect.x,
            top: clickEffect.y,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            zIndex: 50,
          }}
        >
          <Box sx={{ position: 'relative' }}>
            {/* 파동 효과 */}
            <Box
              sx={{
                position: 'absolute',
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgb(96, 165, 250)',
                animation: `${rippleAnimation} 0.6s ease-out`,
              }}
            />
            {/* 중심 원 */}
            <Box
              sx={{
                width: 64,
                height: 64,
                borderRadius: '50%',
                backgroundColor: 'rgb(59, 130, 246)',
                opacity: 0.5,
                animation: `${pulseAnimation} 1s ease-in-out infinite`,
              }}
            />
          </Box>
        </Box>
      )}

      {/* 토스트 알림 - 중앙 상단 */}
      <Snackbar
        open={!!toastMessage}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ top: '96px !important' }}
        slots={{ transition: Grow }}
      >
        <Alert
          severity={toastMessage?.isError ? 'error' : 'success'}
          icon={false}
          sx={{
            minWidth: 400,
            borderRadius: 6,
            border: 4,
            borderColor: toastMessage?.color,
            background: `linear-gradient(135deg, ${toastMessage?.color}15, ${toastMessage?.color}25)`,
            backdropFilter: 'blur(8px)',
            padding: '16px 32px',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            '& .MuiAlert-message': {
              width: '100%',
              padding: 0,
            },
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <Avatar
              sx={{
                width: 64,
                height: 64,
                backgroundColor: toastMessage?.color,
                boxShadow: `0 0 30px ${toastMessage?.color}80`,
                animation: `${pulseAnimation} 1.5s ease-in-out infinite`,
                fontSize: 32,
              }}
            >
              {toastMessage?.isError ? '😔' : '✨'}
            </Avatar>
            <Box sx={{ flex: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  fontWeight: 'bold',
                  color: toastMessage?.color,
                  display: 'block',
                  mb: 1,
                }}
              >
                {toastMessage?.isError ? '残念...' : '🎊 新路線発見!'}
              </Typography>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: 'rgb(17, 24, 39)',
                }}
              >
                {toastMessage?.text}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: 48 }}>
              {toastMessage?.isError ? '😔' : '🎉'}
            </Typography>
          </Box>
        </Alert>
      </Snackbar>

      {/* 로딩 표시 */}
      <Backdrop
        open={!isMapLoaded}
        sx={{
          position: 'absolute',
          backgroundColor: 'rgb(243, 244, 246)',
          zIndex: 40,
        }}
      >
        <Paper
          elevation={3}
          sx={{
            padding: 3,
            textAlign: 'center',
            borderRadius: 2,
          }}
        >
          <CircularProgress
            size={48}
            sx={{ mb: 2 }}
          />
          <Typography variant="body1" color="text.secondary">
            地図を読み込み中...
          </Typography>
          <Typography variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
            少々お待ちください
          </Typography>
        </Paper>
      </Backdrop>

      {/* 노선 선택 안내 */}
      {isMapLoaded && selectedLines.length === 0 && (
        <Fade in>
          <Box
            sx={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              pointerEvents: 'none',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" color="text.secondary">
                左側から路線を選択すると地図に表示されます
              </Typography>
            </Paper>
          </Box>
        </Fade>
      )}
    </>
  );
};
