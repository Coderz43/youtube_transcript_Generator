const express = require('express');
const cors = require('cors');
const { getTranscript } = require('youtube-transcript');

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;

  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId' });
  }

  try {
    const transcript = await getTranscript(videoId); // returns [{ text, start, duration }]
    res.json(transcript);
  } catch (err) {
    console.error('❌ Transcript fetch error:', err.message);
    res.status(500).json({ error: 'Failed to fetch transcript', details: err.message });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`✅ Backend running at http://localhost:${PORT}`));
