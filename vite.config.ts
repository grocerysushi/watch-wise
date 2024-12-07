import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    port: 8080,
    host: "::",
    proxy: {
      // Redirect all non-asset requests to index.html for SPA routing
      '^(?!.*\\.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf|eot)).*$': {
        target: '/',
        bypass: (req) => {
          if (req.url) {
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