import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileText, Languages, Youtube, Wand2, Users, BookOpen, Mic2, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, Sun, Moon, Laptop2, History, PlaySquare, List, Table, Apple as Api, UserCircle, Clock, Play } from 'lucide-react';
import AdminRoutes from './pages/admin';
import { useTheme } from './ThemeContext';

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

function convertISODuration(duration: string): string {
  const match = duration.match(/PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return '';
  const [, hours, minutes, seconds] = match.map(v => parseInt(v || '0', 10));
  const parts = [];
  if (hours) parts.push(`${hours}h`);
  if (minutes) parts.push(`${minutes}m`);
  if (seconds) parts.push(`${seconds}s`);
  return parts.join(' ') || '0s';
}

function MainLayout() {
  const { theme } = useTheme();
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);
  const [isBulkOpen, setIsBulkOpen] = useState(false);
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [transcript, setTranscript] = useState<string[] | null>(null);
  const [error, setError] = useState('');
  const [videoDetails, setVideoDetails] = useState<{
    title: string;
    thumbnail: string;
    channel: string;
    channelId: string;
    videoId: string;
    category: string;
    duration: string;
  } | null>(null);

  // ... rest of the original code remains exactly the same until the video details section ...

  {videoDetails && (
    <div className={`mt-6 ${
      theme === 'light'
        ? 'bg-white'
        : 'bg-white/5'
    } rounded-lg p-4`}>
      <div className="flex gap-4">
        <div className="relative group">
          <button 
            onClick={() => {
              window.open(`https://www.youtube.com/watch?v=${videoDetails.videoId}`, '_blank');
            }}
            className="block relative w-48 h-32 overflow-hidden rounded-lg"
          >
            <img
              src={videoDetails.thumbnail}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center group-hover:bg-black/50 transition-all duration-300">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                <Play className="w-6 h-6 text-white" />
              </div>
            </div>
          </button>
        </div>
        <div className="flex-1 min-w-0">
          <button
            onClick={() => {
              window.open(`https://www.youtube.com/watch?v=${videoDetails.videoId}`, '_blank');
            }}
            className="block text-left hover:text-[#ff4571] transition-colors"
          >
            <h3 className="font-semibold mb-2 line-clamp-2">{videoDetails.title}</h3>
          </button>
          <p className="text-sm text-gray-500 mb-2">{videoDetails.channel}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            <div className={`p-2 rounded-lg ${
              theme === 'light'
                ? 'bg-gray-100'
                : 'bg-white/10'
            }`}>
              <p className="text-xs text-gray-500">Video ID</p>
              <p className="text-sm font-mono truncate">{videoDetails.videoId}</p>
            </div>
            <div className={`p-2 rounded-lg ${
              theme === 'light'
                ? 'bg-gray-100'
                : 'bg-white/10'
            }`}>
              <p className="text-xs text-gray-500">Channel ID</p>
              <p className="text-sm font-mono truncate">{videoDetails.channelId}</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <span className={`text-xs px-2 py-1 rounded-full ${
              theme === 'light'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-blue-500/20 text-blue-400'
            }`}>
              {videoDetails.category}
            </span>
            <span className={`text-xs px-2 py-1 rounded-full flex items-center gap-1 ${
              theme === 'light'
                ? 'bg-green-100 text-green-800'
                : 'bg-green-500/20 text-green-400'
            }`}>
              <Clock className="w-3 h-3" />
              {videoDetails.duration}
            </span>
          </div>
        </div>
      </div>
    </div>
  )}

  // ... rest of the original code remains exactly the same ...

  return (
    // ... rest of the original JSX remains exactly the same ...
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