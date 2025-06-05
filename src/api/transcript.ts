export function extractVideoId(url: string): string {
  // Handle various YouTube URL formats
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&?\n/]+)/,
    /youtube\.com\/shorts\/([^&?\n/]+)/
  ];

  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      return match[1];
    }
  }

  throw new Error('Invalid YouTube URL format');
}

export async function fetchTranscript(videoId: string) {
  const res = await fetch(`/api/transcript?videoId=${videoId}`);

  const contentType = res.headers.get("content-type");
  if (!contentType || !contentType.includes("application/json")) {
    throw new Error("Transcript API did not return JSON");
  }

  const data = await res.json();
  if (!data || !Array.isArray(data)) {
    throw new Error("Invalid transcript format received");
  }

  return data;
}