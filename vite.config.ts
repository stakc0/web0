import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    headers: {},
    proxy: { '/api': 'http://127.0.0.1:3000' },
  },
  // Ensure .MOV files are served with correct MIME type
  assetsInclude: ['**/*.MOV'],
});
