const API_KEY = 'AIzaSyANRCCflhkR80NTq8Vs_zyxoc35f-dmMo';

export async function getTranscript(videoId: string) {
  const url = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Transcript fetch failed:", error);
    return null;
  }
}
