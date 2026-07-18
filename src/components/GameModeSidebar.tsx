import { Box, Typography, Paper, Stack, LinearProgress } from '@mui/material';
import { GameLogEntry, LineData } from '../types';

interface GameModeSidebarProps {
  gameLog: GameLogEntry[];
  regions: Record<string, LineData>;
  selectedLines: string[];
}

export const GameModeSidebar = ({ gameLog, regions, selectedLines }: GameModeSidebarProps) => {
  const sel = new Set(selectedLines);
  const rows = Object.entries(regions)
    .map(([name, ops]) => {
      let total = 0, found = 0;
      for (const lines of Object.values(ops)) {
        for (const l of lines) { total++; if (sel.has(l.id)) found++; }
      }
      return { name, total, found };
    })
    .sort((a, b) => b.total - a.total);
  const totalAll = rows.reduce((s, r) => s + r.total, 0);
  const foundAll = rows.reduce((s, r) => s + r.found, 0);

  return (
    <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
      {/* 지역별 발견 진행도 */}
      <Box sx={{ mb: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', mb: 1 }}>
          <Typography variant="subtitle2" fontWeight="bold" color="text.primary">発見状況</Typography>
          <Typography variant="caption" color="text.secondary">{foundAll}/{totalAll}</Typography>
        </Box>
        <Stack spacing={0.75}>
          {rows.map(r => (
            <Box key={r.name} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Typography variant="caption" sx={{ width: 52, flexShrink: 0, whiteSpace: 'nowrap' }}>{r.name}</Typography>
              <LinearProgress
                variant="determinate"
                value={r.total ? (r.found / r.total) * 100 : 0}
                sx={{ flex: 1, height: 7, borderRadius: 4 }}
              />
              <Typography
                variant="caption"
                sx={{ width: 56, flexShrink: 0, textAlign: 'right', fontWeight: r.found === r.total && r.total > 0 ? 'bold' : 'normal', color: r.found === r.total && r.total > 0 ? 'success.main' : 'text.secondary' }}
              >
                {r.found}/{r.total}
              </Typography>
            </Box>
          ))}
        </Stack>
      </Box>

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
