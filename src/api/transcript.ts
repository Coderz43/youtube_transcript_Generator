export const extractVideoId = (url: string): string | null => {
  try {
    const urlObj = new URL(url);
    const hostname = urlObj.hostname;

    if (hostname.includes('youtu.be')) {
      return urlObj.pathname.slice(1);
    }

    if (hostname.includes('youtube.com')) {
      if (urlObj.pathname.startsWith('/watch')) {
        return urlObj.searchParams.get('v');
      } else if (urlObj.pathname.startsWith('/shorts/')) {
        return urlObj.pathname.split('/shorts/')[1];
      }
    }

    return null;
  } catch {
    return null;
  }
};

export const fetchTranscript = async (videoId: string) => {
  try {
    const response = await fetch(`/api/transcript?video_id=${videoId}`);
    if (!response.ok) throw new Error("Failed to fetch transcript");
    return await response.json();
  } catch (err) {
    console.error(err);
    throw err;
  }
};