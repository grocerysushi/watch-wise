import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: "::",
    proxy: {
      // Redirect all 404s to index.html for SPA routing
      '*': {
        target: '/',
        bypass: (req) => {
          // Return index.html for all non-asset requests
          if (!req.url.includes('.')) {
            return '/index.html';
          }
        },
      },
    },
  },
  preview: {
    port: 8080,
  },
});