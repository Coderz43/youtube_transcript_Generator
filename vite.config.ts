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
        target: 'http://backend:3001', // ✅ use Bolt backend service name instead of localhost
        changeOrigin: true,
        // No rewrite needed; /api will be forwarded directly
      },
    },
  },
});
