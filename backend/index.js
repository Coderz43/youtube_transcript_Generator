import express from 'express';
import cors from 'cors';
import pkg from 'youtube-transcript'; // ✅ Import entire CJS module

const { getTranscript } = pkg; // ✅ Extract method manually

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId' });
  }

  try {
    const transcript = await getTranscript(videoId);
    res.json(transcript);
  } catch (err) {
    console.error('❌ Transcript fetch failed:', err.message);
    res.status(500).json({ error: 'Failed to fetch transcript', message: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
