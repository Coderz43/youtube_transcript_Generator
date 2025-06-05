// src/api/transcript.ts

// Extract video ID from YouTube URL
export function extractVideoId(url: string): string | null {
  const match = url.match(/v=([\w-]{11})/);
  return match ? match[1] : null;
}

// Fetch transcript from backend API
export async function fetchTranscript(videoId: string) {
  const response = await fetch(`/api/transcript?videoId=${videoId}`);
  const data = await response.json();
  return Array.isArray(data) ? data : [];
}
