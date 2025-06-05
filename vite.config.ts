import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // 🔒 explicitly define frontend port
    proxy: {
      '/api': {
        target: 'http://localhost:3001', // ✅ updated from 5000 → 3001
        changeOrigin: true,
        // Removed the rewrite rule to preserve the /api prefix
      },
    },
  },
});