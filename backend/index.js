// backend/index.js
import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
app.use(cors());

app.get('/', (req, res) => {
  res.json({ message: 'Transcript API running' });
});

app.get('/api/transcript', async (req, res) => {
  try {
    const { videoId } = req.query;
    if (!videoId) return res.status(400).json({ error: 'Missing video ID' });

    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    if (!transcript?.length) return res.status(404).json({ error: 'No transcript found' });

    res.json(transcript);
  } catch (err) {
    console.error('Transcript fetch error:', err);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Transcript API live at http://localhost:${PORT}`);
});
