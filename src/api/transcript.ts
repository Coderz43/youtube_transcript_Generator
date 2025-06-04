import express from 'express';
import cors from 'cors';
import { YoutubeTranscript } from 'youtube-transcript';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/transcript', async (req, res) => {
  try {
    const { videoId } = req.query;
    
    if (!videoId) {
      return res.status(400).json({ error: 'Video ID is required' });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoId as string);
    res.json(transcript);
  } catch (error) {
    console.error('Error fetching transcript:', error);
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

app.listen(PORT, () => {
  console.log(`Transcript API running on port ${PORT}`);
});