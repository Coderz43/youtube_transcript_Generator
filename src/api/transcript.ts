export async function fetchTranscript(videoId: string) {
  try {
    const res = await fetch(`/api/transcript?videoId=${videoId}`);

    // ✅ If the response is not OK (like 500), log and return empty array
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error');
      console.warn(`Transcript API error (status ${res.status}):`, errorText);
      return [];
    }

    const contentType = res.headers.get("content-type") || '';
    if (!contentType.includes("application/json")) {
      const text = await res.text(); // might be HTML or plain text
      console.warn("Transcript API did not return JSON. Raw output:", text);
      return [];
    }

    const data = await res.json();

    if (!data || !Array.isArray(data)) {
      console.warn("Invalid transcript format. Expected array, got:", data);
      return [];
    }

    return data;
  } catch (err) {
    console.error("❌ Failed to fetch transcript:", err);
    return [];
  }
}

export function extractVideoId(url: string): string | null {
  // Supports various YouTube formats like https://www.youtube.com/watch?v=xxxx and https://youtu.be/xxxx
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
