import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  try {
    const { videoId } = req.query;
    
    // Handle case where videoId might be an array
    const videoIdString = Array.isArray(videoId) ? videoId[0] : videoId;
    
    if (!videoIdString || typeof videoIdString !== 'string') {
      return res.status(400).json({ error: 'Video ID is required and must be a string' });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoIdString);
    res.json(transcript);
  } catch (error) {
    console.error('Transcript fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Transcript API running on port ${PORT}`);
});