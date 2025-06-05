const express = require('express');
const fetch = require('node-fetch');
const app = express();
const cors = require('cors');
app.use(cors());

app.get('/api/transcript', async (req, res) => {
  const { videoId } = req.query;
  const API_KEY = 'AIzaSyANRCCflhkR80NTq8Vs_zyxoc35f-dmMo';
  const url = `https://youtube.googleapis.com/youtube/v3/captions?part=snippet&videoId=${videoId}&key=${API_KEY}`;
  const response = await fetch(url);
  const data = await response.json();
  res.json(data);
});

app.listen(3001, () => {
  console.log("Backend running on port 3001");
});
