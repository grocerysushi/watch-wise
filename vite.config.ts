import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from 'path';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8080,
    host: "::",
    historyApiFallback: {
      disableDotRule: true,
      rewrites: [
        { from: /^\/movie\/.*$/, to: '/index.html' },
        { from: /^\/tv\/.*$/, to: '/index.html' },
        { from: /./, to: '/index.html' }
      ]
    }
  },
  preview: {
    port: 8080,
  },
}));