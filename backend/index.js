const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');
require('dotenv').config();

app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 5000;

app.get('/transcript', async (req, res) => {
  const { videoId } = req.query;
  const API_KEY = process.env.YOUTUBE_API_KEY;

  if (!videoId) {
    return res.status(400).json({ error: 'Video ID is required' });
  }

  if (!API_KEY) {
    return res.status(500).json({ error: 'YouTube API key is not configured.' });
  }

  try {
    // First, get video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
    );
    const detailsData = await detailsResponse.json();

    if (!detailsData.items?.length) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Then get captions
    const captionsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`
    );
    const captionsData = await captionsResponse.json();

    if (captionsData.error) {
      return res.status(captionsData.error.code).json({ error: captionsData.error.message });
    }

    // Combine video details with captions
    const response = {
      videoDetails: detailsData.items[0].snippet,
      captions: captionsData.items || []
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).json({ error: 'Failed to fetch transcript.' });
  }
});

const startServer = () => {
  try {
    app.listen(PORT, () => {
      console.log(`Backend running on port ${PORT}`);
    });
  } catch (err) {
    if (err.code === 'EADDRINUSE') {
      console.log(`Port ${PORT} is busy, trying ${PORT + 1}`);
      PORT++;
      startServer();
    } else {
      console.error('Server error:', err);
    }
  }
};

startServer();