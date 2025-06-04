import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173, // optional: explicitly set dev port
    host: true, // allows access from external network (required on Bolt)
    proxy: {
      '/api': {
        target: 'http://localhost:5000', // backend server
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'), // optional, ensures path stays same
      },
    },
  },
});
