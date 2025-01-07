import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  base: '/bookmark/',
  server: {
    port: 3000,
    proxy: {
      '/bookmarks/api': {
        target: 'http://localhost:5000/bookmark',
        changeOrigin: true,
        rewrite: (path) => path.replace('/bookmarks/api', ''),
      },
    },
  },
  plugins: [react()],
});
