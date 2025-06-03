import { YoutubeTranscript } from 'youtube-transcript';

export default async function handler(req, res) {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    return res.status(200).json(transcript);
  } catch (error) {
    return res.status(500).json({ error: 'Failed to fetch transcript' });
  }
}