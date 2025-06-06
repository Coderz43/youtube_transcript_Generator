export async function fetchTranscript(videoId: string) {
  try {
    const res = await fetch(`/api/transcript?videoId=${videoId}`);

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'Unknown error');
      console.warn(`Transcript API error (status ${res.status}):`, errorText);
      return [];
    }

    const contentType = res.headers.get("content-type") || '';
    if (!contentType.includes("application/json")) {
      const raw = await res.text();
      console.warn("Transcript API did not return JSON. Raw output:", raw);
      return [];
    }

    const data = await res.json();

    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === 'object' && data.predictions) {
      // Handle Gladia format
      const transcriptText = data.predictions[0]?.transcription;
      const lines = transcriptText?.split('\n').filter(Boolean).map((text, index) => {
        const timestamp = `${Math.floor(index / 60)}:${String(index % 60).padStart(2, '0')}`;
        return `${timestamp} → ${text}`;
      });
      return lines || [];
    }

    console.warn("Invalid transcript structure:", data);
    return [];
  } catch (err) {
    console.error("❌ Failed to fetch transcript:", err);
    return [];
  }
}

export function extractVideoId(url: string): string | null {
  const regex = /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([0-9A-Za-z_-]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
}
