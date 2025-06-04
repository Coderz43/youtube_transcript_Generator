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

  const extractVideoId = (url: string): string | null => {
    try {
      const urlObj = new URL(url);
      const hostname = urlObj.hostname;

      if (hostname.includes('youtu.be')) {
        return urlObj.pathname.slice(1);
      }

      if (hostname.includes('youtube.com')) {
        if (urlObj.pathname.startsWith('/watch')) {
          return urlObj.searchParams.get('v');
        } else if (urlObj.pathname.startsWith('/shorts/')) {
          return urlObj.pathname.split('/shorts/')[1];
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
    setTranscript(null);
    setVideoDetails(null);

    const videoId = extractVideoId(url);
    if (!videoId) {
      setError('Invalid YouTube URL');
      setLoading(false);
      return;
    }

    try {
      // Fetch video details
      const detailsResponse = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyANRCCfIhkR80NTq8VS_ryxoc35f--dmMo`
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
        category: categoryMap[item.snippet.categoryId] || 'Unknown',
        duration: convertISODuration(item.contentDetails.duration)
      });

      // Fetch transcript
      const transcriptResponse = await fetch(`/api/transcript?videoId=${videoId}`);
      const transcriptData = await transcriptResponse.json();

      if (!transcriptResponse.ok) {
        throw new Error(transcriptData.error || 'Failed to fetch transcript');
      }

      const formattedTranscript = transcriptData.map((line: any) => {
        const minutes = Math.floor(line.start / 60);
        const seconds = Math.floor(line.start % 60).toString().padStart(2, '0');
        return `${minutes}:${seconds} → ${line.text}`;
      });

      setTranscript(formattedTranscript);
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
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="flex-1 px-6 py-3 rounded-lg font-medium text-white bg-[#ff4571] hover:opacity-90 transition-all disabled:opacity-50 text-sm"
                >
                  {loading ? 'Processing...' : 'Extract transcript'}
                </button>
                <button className={`px-6 py-3 rounded-lg font-medium ${
                  theme === 'light'
                    ? 'text-gray-900 bg-white hover:bg-gray-50'
                    : 'text-white bg-white/10 hover:bg-white/20'
                } transition-all text-sm`}>
                  Extract in Bulk
                  <span className="ml-2 bg-green-500 text-white text-xs px-1.5 py-0.5 rounded-full">New</span>
                </button>
              </div>

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
                    <img
                      src={videoDetails.thumbnail}
                      alt="Video thumbnail"
                      className="w-40 h-24 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold mb-2 line-clamp-2">{videoDetails.title}</h3>
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

              {transcript && (
                <div className={`mt-6 ${
                  theme === 'light'
                    ? 'bg-white'
                    : 'bg-white/5'
                } rounded-lg p-4`}>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold">Transcript</h3>
                    <button
                      onClick={() => navigator.clipboard.writeText(transcript.join('\n'))}
                      className="text-sm px-3 py-1 bg-[#6e76ff] text-white rounded-lg hover:bg-[#5a61cc] transition-colors"
                    >
                      Copy to Clipboard
                    </button>
                  </div>
                  <div className={`max-h-96 overflow-y-auto space-y-2 ${
                    theme === 'light'
                      ? 'bg-gray-50'
                      : 'bg-white/5'
                  } rounded-lg p-4`}>
                    {transcript.map((line, index) => (
                      <p key={index} className="text-sm">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="flex-1">
            <img
              src="/heroo.webp"
              alt="Content Creator"
              className="rounded-2xl w-full h-[400px] object-cover"
            />
          </div>
        </div>
      </div>

      {/* Features Section - Always Dark */}
      <div className="bg-[#0f172a] mt-20 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-white mb-4">Features</h2>
          <p className="text-center mb-16 max-w-2xl mx-auto text-gray-400">
            Everything You Need to Turn YouTube Videos into Actionable Content
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <FileText className="w-6 h-6" />,
                title: "Free Extraction",
                description: "Extract up to 25 YouTube transcripts at no cost, no sign-ups required."
              },
              {
                icon: <Wand2 className="w-6 h-6" />,
                title: "Fast and Reliable",
                description: "Get accurate transcripts in seconds with our advanced processing."
              },
              {
                icon: <Languages className="w-6 h-6" />,
                title: "Multiple Languages",
                description: "Support for over 100+ languages with automatic detection."
              }
            ].map((feature, index) => (
              <div key={index} className="bg-white/5 rounded-2xl p-8 backdrop-blur-sm border border-white/10">
                <div className="text-[#ff4571] mb-6">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer - Always Dark */}
      <footer className="bg-[#0f172a] text-white border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="grid md:grid-cols-4 gap-12">
            <div>
              <h3 className="font-bold text-xl mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Documentation</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">API Reference</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Legal</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Company</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Blog</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-xl mb-4">Connect</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Twitter</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Discord</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">GitHub</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-20 pt-8 border-t border-white/10 text-gray-400 text-center">
            <p>© 2025 YouTube Transcript Generator. All rights reserved.</p>
          </div>
        </div>
      </footer>
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