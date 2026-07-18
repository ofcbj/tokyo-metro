import { useState, useMemo } from 'react';
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
  Collapse,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { LineData, Line } from '../types';

interface NormalModeSidebarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  autoZoom: boolean;
  setAutoZoom: (zoom: boolean) => void;
  allLineIds: string[];
  selectedLines: string[];
  showAllLines: () => void;
  setSelectedLines: (lines: string[]) => void;
  toggleLine: (lineId: string) => void;
  // 지역명 → 운영사 데이터(회사 → 노선 배열)
  regions: Record<string, LineData>;
}

export const NormalModeSidebar = ({
  searchTerm,
  setSearchTerm,
  autoZoom,
  setAutoZoom,
  allLineIds,
  selectedLines,
  showAllLines,
  setSelectedLines,
  toggleLine,
  regions,
}: NormalModeSidebarProps) => {
  const regionCount = (r: string) => Object.values(regions[r]).reduce((s, l) => s + l.length, 0);
  // 지역별 표시(선택)된 노선 수 — 게임 모드에선 발견 노선이 곧 표시 노선이라 발견 진행도가 된다
  const selectedSet = useMemo(() => new Set(selectedLines), [selectedLines]);
  const regionSelected = (r: string) =>
    Object.values(regions[r]).reduce((s, lines) => s + lines.filter(l => selectedSet.has(l.id)).length, 0);
  // 노선수 내림차순 정렬
  const regionNames = Object.keys(regions).sort((a, b) => regionCount(b) - regionCount(a));
  const [selectedRegion, setSelectedRegion] = useState<string>(regionNames[0] || '');
  const [expandedCompanies, setExpandedCompanies] = useState<Set<string>>(new Set());

  const OTHER = 'その他'; // 노선 2개 이하 회사들을 묶는 그룹
  const raw = searchTerm.trim();
  const q = raw.toLowerCase();
  const searching = raw.length > 0;

  // 전 지역 병합 (전지역 검색용)
  const allMerged = useMemo(() => {
    const out: LineData = {};
    for (const region of Object.values(regions)) {
      for (const [company, lines] of Object.entries(region)) {
        out[company] = out[company] ? [...out[company], ...lines] : [...lines];
      }
    }
    return out;
  }, [regions]);

  const matched = (l: Line) => l.nameJp.includes(raw) || l.nameKo.toLowerCase().includes(q);

  // 데이터 소스: 검색 중이면 전 지역, 아니면 선택 지역
  const source = searching ? allMerged : (regions[selectedRegion] || {});
  const entries = Object.entries(source)
    .map(([name, all]) => ({ name, total: all.length, lines: searching ? all.filter(matched) : all }))
    .filter(e => e.lines.length > 0);

  // 노선 3개 이상 회사는 개별 표시(노선수 내림차순), 2개 이하는 'その他'로 통합
  const big = entries.filter(e => e.total > 2).sort((a, b) => b.total - a.total);
  // その他 안의 노선은 역 수 내림차순으로 정렬
  const otherLines = entries
    .filter(e => e.total <= 2)
    .flatMap(e => e.lines)
    .sort((a, b) => b.stations.length - a.stations.length);
  const byStations = (a: Line, b: Line) => b.stations.length - a.stations.length;
  const companies = [
    ...big.map(e => ({ name: e.name, lines: [...e.lines].sort(byStations) })),
    ...(otherLines.length > 0 ? [{ name: OTHER, lines: otherLines }] : []),
  ];

  // 검색 중에는 매칭된 회사를 자동 펼침
  const isExpanded = (name: string) => (searching ? true : expandedCompanies.has(name));

  const toggleCompany = (name: string) => {
    setExpandedCompanies(prev => {
      const next = new Set(prev);
      next.has(name) ? next.delete(name) : next.add(name);
      return next;
    });
  };

  const selectRegion = (region: string) => {
    setSelectedRegion(region);
    setExpandedCompanies(new Set());
  };

  return (
    <>
      {/* 상단 컨트롤 영역 */}
      <Box sx={{ p: 2, borderBottom: 1, borderColor: 'divider', flexShrink: 0 }}>
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

        {/* 지역 필터 */}
        <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
          {regionNames.map(region => {
            const total = regionCount(region);
            const sel = regionSelected(region);
            return (
              <Chip
                key={region}
                label={sel > 0 ? `${region} (${sel}/${total})` : `${region} (${total})`}
                onClick={() => selectRegion(region)}
                color={selectedRegion === region ? 'primary' : 'default'}
                sx={{ cursor: 'pointer' }}
              />
            );
          })}
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

      {/* 회사(노선수) 드롭다운 → 노선 리스트 */}
      <Box sx={{ p: 2, flex: 1, minHeight: 0, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
        <Stack spacing={1}>
          {companies.map(({ name, lines }) => {
            const expanded = isExpanded(name);
            return (
              <Box key={name}>
                {/* 회사 행 */}
                <Box
                  onClick={() => toggleCompany(name)}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    px: 1,
                    py: 1,
                    borderRadius: 1,
                    cursor: 'pointer',
                    backgroundColor: expanded ? 'grey.100' : 'transparent',
                    '&:hover': { backgroundColor: 'grey.100' },
                  }}
                >
                  {expanded ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                  <Typography variant="subtitle2" fontWeight="bold" sx={{ flex: 1, minWidth: 0 }}>
                    {name}
                  </Typography>
                  <Typography variant="caption" color="text.secondary" sx={{ flexShrink: 0 }}>
                    {lines.length}路線
                  </Typography>
                </Box>

                {/* 노선 리스트 */}
                <Collapse in={expanded} unmountOnExit>
                  <Stack spacing={1} sx={{ pl: 2, pt: 1 }}>
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
                </Collapse>
              </Box>
            );
          })}

          {companies.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Typography variant="body2" color="text.secondary">
                検索結果がありません。
              </Typography>
            </Box>
          )}
        </Stack>
      </Box>
    </>
  );
};
