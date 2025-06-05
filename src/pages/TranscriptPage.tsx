import React, { useState } from 'react';
import { useTheme } from '../ThemeContext';
import { extractVideoId, fetchTranscript } from '../api/transcript';
import {
  Youtube,
  Search,
  FileText,
  Languages,
  Users,
  CheckCircle2,
  Clock,
  Play
} from 'lucide-react';

export default function TranscriptPage() {
  const { theme } = useTheme();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [videoDetails, setVideoDetails] = useState(null);
  const [transcript, setTranscript] = useState(null);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setVideoDetails(null);
    setTranscript(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      const data = await fetchTranscript(videoId);
      if (data.details) {
        setVideoDetails(data.details);
        setTranscript(data.captions);
      } else {
        setError('Failed to fetch transcript');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen ${
      theme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-[#0f172a] text-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 pt-14">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 text-left">
            <h1 className="text-4xl lg:text-5xl font-bold mb-2">
              Turn YouTube Videos into
              <span className="block text-[#ff4571]">Transcripts Instantly</span>
            </h1>
            
            <p className={`${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            } text-sm mb-4 max-w-xl`}>
              Transform any YouTube video into accurate, time-stamped transcripts in a single click.
            </p>

            <div className={`${
              theme === 'light'
                ? 'bg-gray-100'
                : 'bg-white/5'
            } p-6 rounded-xl backdrop-blur-sm mb-6`}>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="Paste your YouTube video link here"
                className={`w-full px-4 py-3 rounded-lg ${
                  theme === 'light'
                    ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                    : 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                } border focus:outline-none focus:ring-2 focus:ring-[#6e76ff] focus:border-transparent text-sm mb-4`}
              />
              
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="w-full px-6 py-3 rounded-lg font-medium text-white bg-[#ff4571] hover:opacity-90 transition-all disabled:opacity-50 text-sm"
              >
                {loading ? 'Processing...' : 'Extract transcript'}
              </button>

              {error && (
                <div className="mt-4 text-red-500 text-sm">
                  ❌ {error}
                </div>
              )}

              {videoDetails && (
                <div className={`mt-6 ${
                  theme === 'light'
                    ? 'bg-white'
                    : 'bg-white/5'
                } rounded-lg p-4`}>
                  <div className="flex gap-4">
                    <div className="relative group w-48 h-32 overflow-hidden rounded-lg">
                      <img
                        src={videoDetails.snippet.thumbnails.medium.url}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                        <Play className="w-12 h-12 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">{videoDetails.snippet.title}</h3>
                      <p className="text-sm text-gray-500 mb-2">{videoDetails.snippet.channelTitle}</p>
                      {transcript && (
                        <div className="space-y-2 mt-4">
                          {transcript.map((caption, index) => (
                            <div key={index} className="text-sm">
                              <span className="text-[#ff4571] font-medium">{caption.snippet.language}</span>
                              <span className="ml-2">{caption.snippet.name}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <img
              src="/heroo.webp"
              alt="Content Creator"
              className="rounded-2xl w-full max-w-lg mx-auto object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}