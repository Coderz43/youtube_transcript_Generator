import express from 'express';
import cors from 'cors';
import router from '../src/api/transcript.js';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/transcript', router);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', String(err));
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});