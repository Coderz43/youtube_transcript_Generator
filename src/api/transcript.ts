import { getTranscript } from './getTranscript';

export const fetchTranscript = async (videoId: string) => {
  try {
    const data = await getTranscript(videoId);
    return data;
  } catch (err) {
    console.error(err);
    throw err;
  }
};

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