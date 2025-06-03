import React, { useState } from 'react';
import './style.css';
import copyStepImg from './assets/images/copy-step.png';
import pasteStepImg from './assets/images/paste-step.png';

const categoryMap: { [key: string]: string } = {
  '1': 'Film & Animation', '2': 'Autos & Vehicles', '10': 'Music',
  '15': 'Pets & Animals', '17': 'Sports', '18': 'Short Movies',
  '19': 'Travel & Events', '20': 'Gaming', '21': 'Videoblogging',
  '22': 'People & Blogs', '23': 'Comedy', '24': 'Entertainment',
  '25': 'News & Politics', '26': 'Howto & Style', '27': 'Education',
  '28': 'Science & Technology', '29': 'Nonprofits & Activism',
  '30': 'Movies', '31': 'Anime/Animation', '32': 'Action/Adventure',
  '33': 'Classics', '34': 'Comedy', '35': 'Documentary',
  '36': 'Drama', '37': 'Family', '38': 'Foreign', '39': 'Horror',
  '40': 'Sci-Fi/Fantasy', '41': 'Thriller', '42': 'Shorts',
  '43': 'Shows', '44': 'Trailers'
};

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

function convertISODuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const [, hours, minutes, seconds] = match.map((v) => parseInt(v || '0', 10));
  const h = hours ? `${hours}h ` : '';
  const m = minutes ? `${minutes}m ` : '';
  const s = seconds ? `${seconds}s` : '';
  return `${h}${m}${s}`.trim();
}

function App() {
  const [url, setUrl] = useState('');
  const [transcript, setTranscript] = useState<string[] | null>(null);
  const [title, setTitle] = useState('');
  const [thumbnail, setThumbnail] = useState('');
  const [error, setError] = useState('');
  const [channel, setChannel] = useState('');
  const [channelId, setChannelId] = useState('');
  const [videoId, setVideoId] = useState('');
  const [category, setCategory] = useState('');
  const [duration, setDuration] = useState('');

  const fetchVideoDetails = async (videoId: string) => {
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyANRCCfIhkR80NTq8VS_ryxoc35f--dmMo`
    );
    const data = await response.json();
    const item = data.items[0];

    if (item?.snippet && item?.contentDetails) {
      setTitle(item.snippet.title);
      setChannel(item.snippet.channelTitle);
      setThumbnail(item.snippet.thumbnails.medium.url);
      setChannelId(item.snippet.channelId);
      setVideoId(videoId);
      setCategory(categoryMap[item.snippet.categoryId] || 'Unknown');
      setDuration(convertISODuration(item.contentDetails.duration));
    }
  };

  const handleSubmit = async () => {
    const id = extractVideoId(url);
    if (!id) return setError('Invalid YouTube URL');

    try {
      await fetchVideoDetails(id);
      const res = await fetch(`http://localhost:5000/api/transcript?video_id=${id}`);
      const data = await res.json();

      if (res.status !== 200) {
        setTranscript(null);
        setError(data.error || 'Failed to fetch transcript');
        return;
      }

      const formatted = data.map((line: any) => {
        const min = Math.floor(line.start / 60);
        const sec = String(Math.floor(line.start % 60)).padStart(2, '0');
        return `${min}:${sec} → ${line.text}`;
      });

      setTranscript(formatted);
      setError('');
    } catch (err) {
      setError('Server error while fetching transcript');
      setTranscript(null);
    }
  };

  return (
    <>
      <div className="header">
        <h1>YouTube Transcript Generator</h1>
        <p>Paste any public YouTube link to get instant, timestamped transcripts.</p>
      </div>

      <div className="container">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube link here"
        />
        <button onClick={handleSubmit}>Get Transcript</button>

        {error && <p style={{ color: 'red', marginTop: '1rem' }}>❌ {error}</p>}

        {title && (
          <div className="video-card">
            <img src={thumbnail} alt="Thumbnail" />
            <div className="video-info">
              <h2>{title}</h2>
              <p>{channel}</p>
              <div className="video-meta">
                <span className="meta-pill">{category}</span>
                <span className="meta-pill">⏱ {duration}</span>
                <span className="meta-pill">Video ID: <code>{videoId}</code></span>
                <span className="meta-pill">Channel ID: <code>{channelId}</code></span>
              </div>
            </div>
          </div>
        )}

        {transcript && (
          <div className="transcript-container">
            <div className="copy-bar">
              <button
                className="copy-button"
                onClick={() => navigator.clipboard.writeText(transcript.join('\n'))}
              >
                📋 Copy Transcript
              </button>
            </div>
            <div className="transcript">
              {transcript.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="how-to-section">
        <h2>How to get the transcript of a YouTube video</h2>
        <button className="cta-button">Get started</button>
        <div className="steps-grid">
          <div className="step-card">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Copy the YouTube URL</h3>
              <p>
                Copy the URL from the address bar of your web browser or right-click the video and
                select “Copy Video URL”.
              </p>
            </div>
            <img src={copyStepImg} alt="Copy Step" />
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Paste the URL above</h3>
              <p>Simply paste the copied YouTube video URL above and click “Get Transcript”.</p>
            </div>
            <img src={pasteStepImg} alt="Paste Step" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
