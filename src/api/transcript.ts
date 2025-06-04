import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
app.use(cors());

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'YouTube Transcript API is running' });
});

// Transcript route
app.get('/transcript', async (req, res) => {
  try {
    const { videoId } = req.query;
    
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    console.log('Fetching transcript for video:', videoId);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId as string);
    
    if (!transcript || transcript.length === 0) {
      return res.status(404).json({ error: 'No transcript found for this video' });
    }

    res.json(transcript);
  } catch (error) {
    console.error('Transcript fetch error:', error);
    res.status(500).json({ error: 'Failed to fetch transcript. Make sure the video exists and has captions available.' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Transcript API running on port ${PORT}`);
  console.log(`Root endpoint: http://localhost:${PORT}`);
  console.log(`Transcript endpoint: http://localhost:${PORT}/transcript`);
});