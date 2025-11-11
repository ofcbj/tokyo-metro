import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    visualizer({
      filename: './dist/stats.html',
      open: false,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  // GitHub Pages용은 '/tokyo-metro/', 로컬 serve는 '/' 사용
  base: '/',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
          'mui': ['@mui/material', '@mui/icons-material'],
        },
      },
    },
  },
})

