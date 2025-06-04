import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileText, Languages, Youtube, Wand2, Users, BookOpen, Mic2, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, Sun, Moon, Laptop2, History, PlaySquare, List, Table, Apple as Api, UserCircle, Clock, Shield } from 'lucide-react';
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
            } text-lg mb-6 max-w-xl leading-relaxed`}>
              Transform any YouTube video into accurate, time-stamped transcripts with just one click. Perfect for content creators, researchers, and professionals looking to make their content more accessible and SEO-friendly.
            </p>

            <div className="flex items-center gap-8 text-sm mb-8">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#ff4571]" />
                <span className="text-gray-400">Enterprise-Grade Security</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4 text-[#ff4571]" />
                <span className="text-gray-400">Used by 100K+ professionals</span>
              </div>
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[#ff4571]" />
                <span className="text-gray-400">99.9% Accuracy</span>
              </div>
            </div>
          </div>
        </div>
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