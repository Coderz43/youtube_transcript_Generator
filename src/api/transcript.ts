// src/api/transcript.ts (frontend-safe)
export const getTranscript = async (videoId: string) => {
  try {
    const response = await fetch(`/api/transcript?videoId=${videoId}`);

    if (!response.ok) {
      throw new Error('Failed to fetch transcript');
    }

    const transcript = await response.json();
    return transcript;
  } catch (error) {
    console.error('Error fetching transcript:', error);
    throw error;
  }
};
