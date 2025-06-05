import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;
  const API_KEY = 'AIzaSyBubHh4ttMSOc5WnZXnqQF-0S2wzCz7XJg';

  try {
    // First fetch video details
    const detailsResponse = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=${API_KEY}`
    );
    const detailsData = await detailsResponse.json();

    if (!detailsData.items?.length) {
      return res.status(404).json({ error: 'Video not found' });
    }

    // Then fetch captions
    const captionsResponse = await fetch(
      `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`
    );
    const captionsData = await captionsResponse.json();

    res.json({
      details: detailsData.items[0],
      captions: captionsData.items || []
    });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ error: 'Failed to fetch video data' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));