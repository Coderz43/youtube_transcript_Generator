import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileText, Languages, Youtube, Wand2, Users, BookOpen, Mic2, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, Sun, Moon, Laptop2, History, PlaySquare, List, Table, Apple as Api, UserCircle } from 'lucide-react';
import AdminRoutes from './pages/admin';

function MainLayout() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [transcript, setTranscript] = useState<any[]>([]);
  const [videoDetails, setVideoDetails] = useState<{
    title: string;
    thumbnail: string;
    channel: string;
    channelId: string;
    videoId: string;
    category: string;
    duration: string;
  } | null>(null);
  const [error, setError] = useState('');

  const extractVideoId = (url: string): string | null => {
    try {
      const parsed = new URL(url);
      const hostname = parsed.hostname;

      if (hostname.includes("youtu.be")) {
        return parsed.pathname.slice(1);
      }

      if (hostname.includes("youtube.com")) {
        if (parsed.pathname.startsWith("/watch")) {
          return parsed.searchParams.get("v");
        } else if (parsed.pathname.startsWith("/shorts/")) {
          return parsed.pathname.split("/shorts/")[1];
        }
      }

      return null;
    } catch {
      return null;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setTranscript([]);
    setVideoDetails(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      // Fetch video details from YouTube API
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=YOUR_API_KEY`
      );
      const detailsData = await detailsResponse.json();

      if (!detailsData.items?.length) {
        setError('Video not found');
        setLoading(false);
        return;
      }

      const item = detailsData.items[0];
      setVideoDetails({
        title: item.snippet.title,
        thumbnail: item.snippet.thumbnails.medium.url,
        channel: item.snippet.channelTitle,
        channelId: item.snippet.channelId,
        videoId: videoId,
        category: item.snippet.categoryId,
        duration: item.contentDetails.duration
      });

      // Fetch transcript
      const transcriptResponse = await fetch(`/api/transcript?videoId=${videoId}`);
      const transcriptData = await transcriptResponse.json();

      if (!transcriptResponse.ok) {
        throw new Error(transcriptData.error || 'Failed to fetch transcript');
      }

      setTranscript(transcriptData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4">YouTube Transcript Generator</h1>
          <p className="text-gray-400">Get instant, timestamped transcripts from any YouTube video</p>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="Paste YouTube video URL here"
              className="flex-1 px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Get Transcript'}
            </button>
          </div>

          {error && (
            <div className="mt-4 text-red-400">
              ❌ {error}
            </div>
          )}
        </div>

        {videoDetails && (
          <div className="bg-gray-800 rounded-lg p-6 mb-8">
            <div className="flex gap-6">
              <img
                src={videoDetails.thumbnail}
                alt="Video thumbnail"
                className="w-48 rounded-lg"
              />
              <div>
                <h2 className="text-xl font-semibold mb-2">{videoDetails.title}</h2>
                <p className="text-gray-400 mb-4">{videoDetails.channel}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
                    Category: {videoDetails.category}
                  </span>
                  <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-sm">
                    Duration: {videoDetails.duration}
                  </span>
                  <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
                    Video ID: {videoDetails.videoId}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {transcript.length > 0 && (
          <div className="bg-gray-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Transcript</h3>
              <button
                onClick={() => {
                  const text = transcript
                    .map(line => `${Math.floor(line.start / 60)}:${String(Math.floor(line.start % 60)).padStart(2, '0')} → ${line.text}`)
                    .join('\n');
                  navigator.clipboard.writeText(text);
                }}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600"
              >
                Copy Transcript
              </button>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {transcript.map((line, index) => (
                <p key={index} className="text-gray-300">
                  <span className="text-gray-500">
                    {Math.floor(line.start / 60)}:{String(Math.floor(line.start % 60)).padStart(2, '0')}
                  </span>
                  {' → '}
                  {line.text}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<AdminRoutes />} />
        <Route path="/*" element={<MainLayout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;