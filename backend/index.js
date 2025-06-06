import express from 'express';
import cors from 'cors';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// POST endpoint for Gladia transcription
app.post('/api/transcript', async (req, res) => {
  const { audioUrl } = req.body;

  if (!audioUrl) return res.status(400).json({ error: 'Missing audioUrl' });

  try {
    const response = await axios.post(
      'https://api.gladia.io/audio/text/audio-transcription/',
      { audio_url: audioUrl },
      {
        headers: {
          'x-gladia-key': process.env.GLADIA_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    // ✅ Double-check this is JSON before returning
    if (typeof response.data !== 'object') {
      return res.status(500).json({ error: 'Invalid Gladia response format' });
    }

    res.json(response.data);
  } catch (err) {
    console.error('Gladia API Error:', err.response?.data || err.message);

    // ✅ Always return a JSON object, even in error
    res.status(500).json({ error: 'Gladia API failed', details: err.message });
  }
});
