// src/api/transcript.ts

export function extractVideoId(url: string): string | null {
  const match = url.match(/v=([\w-]{11})/);
  return match ? match[1] : null;
}

export async function fetchTranscript(videoId: string) {
  const response = await fetch(`/api/transcript?videoId=${videoId}`);
  const data = await response.json();
  return data.items || [];
}
