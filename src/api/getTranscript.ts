export async function getTranscript(videoId: string) {
  try {
    const response = await fetch(`/api/transcript?videoId=${videoId}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transcript');
    }
    return await response.json();
  } catch (error) {
    console.error("Transcript fetch error:", error);
    throw error;
  }
}