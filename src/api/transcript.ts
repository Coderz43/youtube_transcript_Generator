import express from 'express';
import { YoutubeTranscript } from 'youtube-transcript';

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { videoId } = req.query;
    
    // Handle case where videoId might be an array
    const videoIdString = Array.isArray(videoId) ? videoId[0] : videoId;
    
    if (!videoIdString || typeof videoIdString !== 'string') {
      return res.status(400).json({ error: 'Video ID is required and must be a string' });
    }

    const transcript = await YoutubeTranscript.fetchTranscript(videoIdString);
    res.json(transcript);
  } catch (error) {
    // Safely convert error to string to prevent TypeError
    console.error('Transcript fetch error:', String(error));
    res.status(500).json({ error: 'Failed to fetch transcript' });
  }
});

export const router;