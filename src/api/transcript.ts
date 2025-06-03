import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  try {
    const { videoId } = req.query;
    
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId as string);
    res.json(transcript);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

app.listen(5000, () => {
  console.log('Transcript API running on port 5000');
});