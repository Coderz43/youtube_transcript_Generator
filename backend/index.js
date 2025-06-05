const express = require('express');
const cors = require('cors');
const { YoutubeTranscript } = require('youtube-transcript-api');

const app = express();
const port = 5000;

app.use(cors());
app.use(express.json());

app.get('/transcript', async (req, res) => {
  const { videoId } = req.query;
  
  if (!videoId) {
    return res.status(400).json({ error: 'Missing videoId parameter' });
  }

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    res.json(transcript);
  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

app.listen(port, () => {
  console.log(`Backend server running on port ${port}`);
});