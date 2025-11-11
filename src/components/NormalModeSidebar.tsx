import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Checkbox,
  FormControlLabel,
  Button,
  Typography,
  Paper,
  Stack,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
} from '@mui/icons-material';

export const NormalModeSidebar = ({
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
  filteredLineData,
  toggleLine,
  lineData,
  opMajor1,
  opMajor2,
  opMinor,
}) => {
  return (
    <>
      {/* 상단 컨트롤 영역 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider' }}>
        {/* 검색 */}
        <TextField
          fullWidth
          size="small"
          placeholder="路線検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ mb: 2 }}
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: 'text.secondary' }} />
                </InputAdornment>
              ),
              endAdornment: searchTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setSearchTerm('')}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        {/* 운영사 필터 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          <Chip
            label="全て"
            onClick={() => setFilterOperator('all')}
            color={filterOperator === 'all' ? 'primary' : 'default'}
            sx={{ cursor: 'pointer' }}
          />
          {(() => {
            const operators = Object.keys(lineData);
            const majorOperators = operators.filter(op =>
              op === 'JR東日本' ||
              Object.keys(opMajor1).includes(op) ||
              Object.keys(opMajor2).includes(op)
            );
            const minorOperators = operators.filter(op =>
              Object.keys(opMinor).includes(op)
            );

            const chips = [];

            // Major 운영사들은 개별 표시
            majorOperators.forEach(operator => {
              chips.push(
                <Chip
                  key={operator}
                  label={operator}
                  onClick={() => setFilterOperator(operator)}
                  color={filterOperator === operator ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer' }}
                />
              );
            });

            // Minor 운영사들은 "私鉄"로 통합
            if (minorOperators.length > 0) {
              chips.push(
                <Chip
                  key="minor-operators"
                  label="私鉄"
                  onClick={() => setFilterOperator('minor')}
                  color={filterOperator === 'minor' ? 'primary' : 'default'}
                  sx={{ cursor: 'pointer' }}
                />
              );
            }

            return chips;
          })()}
        </Box>

        {/* 자동 줌 토글 */}
        <FormControlLabel
          control={
            <Checkbox
              checked={autoZoom}
              onChange={(e) => setAutoZoom(e.target.checked)}
              size="small"
            />
          }
          label={<Typography variant="body2">路線選択時自動ズーム</Typography>}
          sx={{ mb: 1 }}
        />

        {/* 선택된 노선 수 */}
        {(selectedLines.length > 0 || allLineIds.length > 0) && (
          <Box sx={{ mb: 0, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
            {selectedLines.length > 0 && (
              <Typography variant="body2" color="text.secondary">
                {selectedLines.length}路線選択中
              </Typography>
            )}
            <Button size="small" onClick={() => setSelectedLines([])}>
              全て解除
            </Button>
            <Button size="small" onClick={showAllLines}>
              全て表示
            </Button>
          </Box>
        )}
      </Box>

      {/* 노선 리스트 */}
      <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
        {Object.entries(filteredLineData).map(([operator, lines]) => (
          <Box key={operator} sx={{ mb: 3 }}>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1.5, color: 'text.primary' }}>
              {operator}
            </Typography>
            <Stack spacing={1}>
              {lines.map(line => (
                <Paper
                  key={line.id}
                  variant="outlined"
                  sx={{
                    border: 2,
                    borderColor: selectedLines.includes(line.id) ? 'primary.main' : 'grey.200',
                    backgroundColor: selectedLines.includes(line.id) ? 'primary.50' : 'white',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: selectedLines.includes(line.id) ? 'primary.main' : 'grey.300',
                    },
                  }}
                  onClick={() => toggleLine(line.id)}
                >
                  <Box sx={{ p: 1.5, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                      sx={{
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        backgroundColor: line.color,
                        flexShrink: 0,
                      }}
                    />
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" fontWeight="medium" color="text.primary">
                        {line.nameJp}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {line.nameKo}
                      </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                      {line.stations.length}駅
                    </Typography>
                  </Box>
                </Paper>
              ))}
            </Stack>
          </Box>
        ))}

        {Object.keys(filteredLineData).length === 0 && (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="body2" color="text.secondary">
              検索結果がありません。
            </Typography>
          </Box>
        )}
      </Box>
    </>
  );
};
