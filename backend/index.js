import express from 'express';
import cors from 'cors';
import pkg from 'youtube-transcript';

const { getTranscript } = pkg;

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const videoId = req.query.videoId;

  if (!videoId || typeof videoId !== 'string') {
    return res.status(400).json({ error: 'Missing or invalid videoId' });
  }

  try {
    const transcript = await getTranscript(videoId);

    // ✅ if empty or unexpected, fallback gracefully
    if (!Array.isArray(transcript)) {
      console.warn('⚠️ Invalid format:', transcript);
      return res.status(200).json([]);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(transcript);
  } catch (err) {
    console.error('❌ Transcript fetch failed:', err.message);
    
    // ✅ Always return valid JSON (even if failed)
    res.status(200).json([]);
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});



