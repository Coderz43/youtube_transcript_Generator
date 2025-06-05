const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript');

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const videoId = req.query.video_id;
  if (!videoId) {
    return res.status(400).json({ error: "Missing video_id" });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});