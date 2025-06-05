import express from 'express';
import cors from 'cors';
import pkg from 'youtube-transcript';

const { getTranscript } = pkg;

const app = express();
app.use(cors());

// ✅ New route to fix "Cannot GET /"
app.get('/', (req, res) => {
  res.send('YouTube Transcript Backend is Running');
});

app.get('/api/transcript', async (req, res) => {
  const videoId = req.query.videoId;

  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid videoId' });
  }

  try {
    const transcript = await getTranscript(videoId);

    if (!Array.isArray(transcript)) {
      throw new Error('Transcript format is invalid');
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(transcript);
  } catch (err) {
    console.error('❌ Transcript fetch failed:', err.message);
    res.status(500).json({
      error: 'Failed to fetch transcript',
      message: err instanceof Error ? err.message : 'Unknown error',
    });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
