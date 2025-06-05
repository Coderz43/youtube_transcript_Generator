import express from "express";
import cors from "cors";
import { YoutubeTranscript } from "youtube-transcript";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.get("/api/transcript", async (req, res) => {
  try {
    const { videoId } = req.query;
    if (!videoId) return res.status(400).json({ error: "Missing videoId" });

    console.log(`🔍 Fetching transcript for: ${videoId}`);
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);
    console.log("✅ Transcript fetched successfully");
    res.json(transcript);
  } catch (err) {
    console.error("❌ Error fetching transcript:", err);
    res.status(500).json({ error: err.message || "Failed to fetch transcript" });
  }
});

// Handle server startup with error handling
const startServer = () => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  }).on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.log(`⚠️ Port ${PORT} is busy, trying again...`);
      setTimeout(() => {
        server.close();
        PORT++;
        startServer();
      }, 1000);
    } else {
      console.error('❌ Server error:', err);
    }
  });
};

startServer();