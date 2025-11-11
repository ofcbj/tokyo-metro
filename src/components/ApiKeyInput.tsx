import {
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Link,
} from '@mui/material';
import { Train as TrainIcon } from '@mui/icons-material';

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (key: string) => void;
  setShowApiInput: (show: boolean) => void;
}

export const ApiKeyInput = ({ apiKey, setApiKey, setShowApiInput }: ApiKeyInputProps) => {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        backgroundColor: 'grey.50',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 2,
          maxWidth: 500,
          width: '100%',
          mx: 2,
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <TrainIcon sx={{ fontSize: 32, color: 'primary.main' }} />
          <Typography variant="h5" fontWeight="bold">
            日本首都圏電鉄地図
          </Typography>
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Google Maps APIキーを入力してください。
        </Typography>
        <TextField
          fullWidth
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          placeholder="Google Maps API Key"
          sx={{ mb: 2 }}
        />
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          APIキーは{' '}
          <Link
            href="https://developers.google.com/maps/documentation/javascript/get-api-key"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud Console
          </Link>
          で発行できます。
        </Typography>
        <Button
          fullWidth
          variant="contained"
          onClick={() => {
            if (apiKey.trim()) {
              setShowApiInput(false);
            } else {
              alert('APIキーを入力してください。');
            }
          }}
        >
          開始
        </Button>
      </Paper>
    </Box>
  );
};
