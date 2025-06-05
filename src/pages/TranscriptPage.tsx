import React, { useState } from 'react';
import { getTranscript } from '../api/getTranscript';

export default function TranscriptPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const extractVideoId = (url: string) => {
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/shorts\/)([^&\n?#]+)/,
      /youtube.com\/embed\/([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  };

  const handleExtract = async () => {
    try {
      setLoading(true);
      setError('');
      setTranscript(null);

      const videoId = extractVideoId(videoUrl);
      if (!videoId) {
        setError('Invalid YouTube URL');
        return;
      }

      const data = await getTranscript(videoId);
      setTranscript(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0e16] text-white p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mb-2 text-white">
        Turn YouTube Videos into <span className="text-pink-500">Transcripts Instantly</span>
      </h1>
      <p className="text-center text-gray-400 mb-6 max-w-lg">
        Paste your video link and instantly extract the transcript!
      </p>
      <input
        type="text"
        placeholder="Paste your YouTube video link here"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        className="w-full max-w-xl p-3 rounded text-black"
      />
      <div className="flex gap-4 mt-4">
        <button 
          onClick={handleExtract} 
          disabled={loading}
          className="bg-pink-500 px-6 py-2 text-white rounded text-lg disabled:opacity-50"
        >
          {loading ? 'Extracting...' : 'Extract transcript'}
        </button>
        <button className="bg-gray-800 px-6 py-2 text-white rounded text-lg">
          Extract in Bulk <span className="text-green-500 ml-1">New</span>
        </button>
      </div>

      {error && (
        <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400">
          {error}
        </div>
      )}

      {transcript && (
        <div className="mt-6 w-full max-w-3xl space-y-4">
          <div className="bg-[#1a1d2b] rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-4">{transcript.videoDetails.title}</h2>
            <div className="flex gap-4 text-sm text-gray-400">
              <span>Channel: {transcript.videoDetails.channelTitle}</span>
              <span>•</span>
              <span>Published: {new Date(transcript.videoDetails.publishedAt).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="bg-[#1a1d2b] rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Available Captions</h3>
            {transcript.captions.length > 0 ? (
              <div className="space-y-3">
                {transcript.captions.map((caption: any) => (
                  <div key={caption.id} className="flex items-center justify-between p-3 bg-[#252837] rounded">
                    <div>
                      <p className="font-medium">{caption.snippet.language}</p>
                      <p className="text-sm text-gray-400">{caption.snippet.trackKind}</p>
                    </div>
                    <button className="px-4 py-2 bg-pink-500 rounded hover:bg-pink-600 transition-colors">
                      Download
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No captions available for this video</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}