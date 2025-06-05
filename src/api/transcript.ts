export async function fetchTranscript(videoId: string) {
  const res = await fetch(`/api/transcript?videoId=${videoId}`);

  const contentType = res.headers.get("content-type") || '';
  if (!contentType.includes("application/json")) {
    const text = await res.text(); // capture HTML error
    console.error("Transcript Error Response:", text);
    throw new Error("Transcript API did not return JSON");
  }

  const data = await res.json();

  if (!data || !Array.isArray(data)) {
    throw new Error("Invalid transcript format");
  }

  return data;
}

export function extractVideoId(url: string): string | null {
  // Supports various YouTube formats like https://www.youtube.com/watch?v=xxxx and https://youtu.be/xxxx
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
