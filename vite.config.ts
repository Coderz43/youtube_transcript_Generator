import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    port: 5173,
    host: true,
    proxy: {
      '/api': {
        target: 'http://3001-zp1v56uxy8rdx5ypatb0ockcb9tr6a-oci3--5173--6ba59070.local-credentialless.webcontainer-api.io',
        changeOrigin: true,
        secure: false,
        // 🔁 preserve the `/api` prefix to match your backend routes
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
