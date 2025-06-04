const baseUrl = "/api";

export const fetchTranscript = async (videoId: string) => {
  try {
    const response = await fetch(`${baseUrl}/transcript?video_id=${videoId}`);
    if (!response.ok) throw new Error("Failed to fetch transcript");
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};
