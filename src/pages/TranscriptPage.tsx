import React, { useState } from 'react';
import { getTranscript } from '../api/getTranscript';

export default function TranscriptPage() {
  const [videoId, setVideoId] = useState('');
  const [transcript, setTranscript] = useState<any>(null);

  const handleFetch = async () => {
    const id = videoId.split('v=')[1];
    const data = await getTranscript(id);
    setTranscript(data);
  };

  return (
    <div className="p-6 max-w-xl mx-auto text-white">
      <h1 className="text-2xl font-bold mb-4">Transcript Generator</h1>
      <input
        type="text"
        placeholder="Paste YouTube URL here..."
        value={videoId}
        onChange={(e) => setVideoId(e.target.value)}
        className="p-2 w-full text-black rounded"
      />
      <button onClick={handleFetch} className="mt-4 px-4 py-2 bg-pink-500 text-white rounded">
        Extract Transcript
      </button>

      {transcript && (
        <pre className="mt-6 bg-gray-900 p-4 rounded text-sm overflow-auto">
          {JSON.stringify(transcript, null, 2)}
        </pre>
      )}
    </div>
  );
}
