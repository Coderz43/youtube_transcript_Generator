const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

let PORT = process.env.PORT || 5000;

app.get('/transcript', async (req, res) => {
  const { videoId } = req.query;
  const API_KEY = 'AIzaSyANRCCfIhkR80NTq8VS_ryxoc35f--dmMo';

  try {
    const response = await fetch(`https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`);
    const data = await response.json();
    res.json(data);
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