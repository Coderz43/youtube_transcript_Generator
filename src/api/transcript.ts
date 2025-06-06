export async function fetchTranscript(videoId: string) {
  const res = await fetch(/api/transcript?videoId=${videoId});

  // First check if the response was successful
  if (!res.ok) {
    const errorData = await res.json().catch(() => null);
    const errorMessage = errorData?.message || HTTP error! status: ${res.status};
    throw new Error(errorMessage);
  }

  const contentType = res.headers.get("content-type") || '';
  if (!contentType.includes("application/json")) {
    const text = await res.text(); // capture HTML error
    console.error("Transcript Error Response:", text);
    throw new Error("Transcript API did not return JSON");
  }

  const data = await res.json();

  if (!data || !Array.isArray(data)) {
    console.error("Invalid transcript data received:", data);
    throw new Error("Invalid transcript format - Expected an array of transcript segments");
  }

  return data;
}

export function extractVideoId(url: string): string | null {
  // Supports various YouTube formats like https://www.youtube.com/watch?v=xxxx and https://youtu.be/xxxx
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}" and vite.config.ts code "import { defineConfig } from 'vite';
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