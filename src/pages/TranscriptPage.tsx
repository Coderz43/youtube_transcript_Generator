import React, { useState } from 'react';
import { getTranscript } from '../api/getTranscript';

export default function TranscriptPage() {
  const [videoUrl, setVideoUrl] = useState('');
  const [transcript, setTranscript] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleExtract = async () => {
    setLoading(true);
    setError('');
    const match = videoUrl.match(/v=([^&]+)/);
    if (!match) return setError('Invalid YouTube URL');

    const videoId = match[1];
    const data = await getTranscript(videoId);

    if (!data || data.error) {
      setError('Transcript not found or quota exceeded.');
      setTranscript(null);
    } else {
      setTranscript(data);
    }
    setLoading(false);
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

      {error && <p className="text-red-500 mt-6">{error}</p>}

      {transcript && (
        <div className="bg-[#1a1d2b] text-sm rounded p-4 mt-6 max-w-3xl w-full overflow-auto">
          <pre>{JSON.stringify(transcript, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}