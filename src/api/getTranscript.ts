export async function getTranscript(videoId: string) {
  try {
    const response = await fetch(`/api/transcript?videoId=${videoId}`);
    if (!response.ok) {
      throw new Error('Failed to fetch transcript');
    }
    return await response.json();
  } catch (error) {
    console.error("Transcript fetch error:", error);
    return { error: error.message };
  }
}