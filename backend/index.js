const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const app = express();

app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;
  const API_KEY = 'AIzaSyBubHh4ttMSOc5WnZXnqQF-0S2wzCz7XJg';

  try {
    const response = await fetch(
      `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`
    );
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Transcript fetch error:', error);
    res.status(500).json({ error: 'Transcript fetch failed.' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));