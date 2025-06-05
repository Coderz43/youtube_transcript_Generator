// App.tsx (Full Updated with Transcript Formatting & Styling)
import React, { useState } from 'react';
import { fetchTranscript, extractVideoId } from './api/transcript';
import { useTheme } from './ThemeContext';
import { categoryMap } from './categoryMap';

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
      const detailsRes = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&id=${videoId}&key=AIzaSyANRCCfIhkR80NTq8VS_ryxoc35f--dmMo`
      );
      const detailsData = await detailsRes.json();
      if (!detailsData.items?.length) throw new Error('Video not found');
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

      const data = await fetchTranscript(videoId);
      const formatted = data.map((line: any) => {
        const mins = Math.floor(line.start / 60);
        const secs = Math.floor(line.start % 60).toString().padStart(2, '0');
        return `${mins}:${secs} → ${line.text}`;
      });
      setTranscript(formatted);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transcript');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen p-6 ${theme === 'dark' ? 'bg-black text-white' : 'bg-white text-black'}`}>
      <h1 className="text-2xl font-bold mb-4">YouTube Transcript Generator</h1>
      <input
        type="text"
        className="w-full p-3 border rounded text-black"
        placeholder="Paste YouTube URL here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        disabled={loading}
        className="mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
      >
        {loading ? 'Loading...' : 'Get Transcript'}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {videoDetails && (
        <div className="mt-6 flex gap-4 items-start">
          <img src={videoDetails.thumbnail} alt="thumbnail" className="rounded-lg w-48 h-32 object-cover" />
          <div>
            <h2 className="text-lg font-semibold">{videoDetails.title}</h2>
            <p>Channel: {videoDetails.channel}</p>
            <p>Category: {videoDetails.category}</p>
            <p>Duration: {videoDetails.duration}</p>
            <p>Video ID: {videoDetails.videoId}</p>
            <p>Channel ID: {videoDetails.channelId}</p>
          </div>
        </div>
      )}

      {transcript && (
        <>
          <button
            className="mt-6 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => navigator.clipboard.writeText(transcript.join('\n'))}
          >
            📋 Copy Transcript
          </button>

          <div className="mt-4 bg-gray-800 p-4 rounded max-h-[400px] overflow-y-auto text-sm">
            {transcript.map((line, i) => (
              <p key={i} className="mb-1 text-white font-mono">{line}</p>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default MainLayout;


  const themes = [
    { id: 'light', label: 'Light', Icon: Sun },
    { id: 'dark', label: 'Dark', Icon: Moon },
    { id: 'system', label: 'System', Icon: Laptop2 }
  ];

  const sidebarItems = [
    { 
      icon: <Youtube className="w-5 h-5" />, 
      label: "YouTube Transcript", 
      description: "Extract transcripts from any YouTube video"
    },
    { 
      icon: <History className="w-5 h-5" />, 
      label: "Your History",
      description: "View your transcript history" 
    },
    { 
      icon: <PlaySquare className="w-5 h-5" />, 
      label: "Channel Info", 
      description: "Get channel information",
      isNew: true 
    },
    { 
      icon: <List className="w-5 h-5" />, 
      label: "Extract From Playlist",
      description: "Bulk extract from playlists" 
    },
    { 
      icon: <Table className="w-5 h-5" />, 
      label: "Extract From CSV",
      description: "Import from CSV file" 
    },
    { 
      icon: <Api className="w-5 h-5" />, 
      label: "API",
      description: "Access our API" 
    }
  ];

  const faqItems = [
    {
      question: "What is YouTube Transcript?",
      answer: "YouTube Transcript is a powerful tool that converts YouTube video content into text format. It helps you extract and read video transcripts without watching the entire video."
    },
    {
      question: "How do I use YouTube Transcript?",
      answer: "Simply paste the YouTube video URL in the input field and click 'Extract transcript'. Our tool will automatically generate the transcript for you in seconds."
    },
    {
      question: "Is YouTube Transcript free to use?",
      answer: "Yes! You can extract up to 25 transcripts per day completely free. No sign-up required for basic usage."
    },
    {
      question: "Which languages are supported?",
      answer: "We support over 100+ languages with automatic language detection. The tool can extract transcripts from videos with subtitles in any of these languages."
    }
  ];

  return (
    <div className={`min-h-screen ${
      theme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-[#0f172a] text-white'
    }`}>
      {/* Top Navigation */}
      <div className={`fixed top-0 left-0 right-0 z-50 ${
        theme === 'light'
          ? 'bg-white/80'
          : 'bg-[#0f172a]/80'
      } backdrop-blur-lg border-b ${
        theme === 'light'
          ? 'border-gray-200'
          : 'border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-2 flex justify-end items-center gap-6">
          <a href="#" className={`${
            theme === 'light' 
              ? 'text-gray-600 hover:text-gray-900' 
              : 'text-gray-400 hover:text-white'
          } text-sm font-medium transition-colors`}>
            Pricing
          </a>
          <a href="#" className={`${
            theme === 'light' 
              ? 'text-gray-600 hover:text-gray-900' 
              : 'text-gray-400 hover:text-white'
          } text-sm font-medium transition-colors`}>
            API
          </a>
          <div className="relative">
            <button
              onClick={() => setIsBulkOpen(!isBulkOpen)}
              className={`${
                theme === 'light' 
                  ? 'text-gray-600 hover:text-gray-900' 
                  : 'text-gray-400 hover:text-white'
              } text-sm font-medium transition-colors flex items-center gap-1`}
            >
              Bulk
              <ChevronDown className="w-4 h-4" />
            </button>
            {isBulkOpen && (
              <div className={`absolute top-full right-0 mt-2 w-48 ${
                theme === 'light'
                  ? 'bg-white/80 text-gray-900'
                  : 'bg-white/10 text-white'
              } backdrop-blur-lg rounded-lg shadow-lg py-2`}>
                <a href="#" className={`block px-4 py-2 text-sm ${
                  theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                  Extract from Playlist
                </a>
                <a href="#" className={`block px-4 py-2 text-sm ${
                  theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}>
                  Extract from CSV
                </a>
              </div>
            )}
          </div>
          <a 
            href="#" 
            className={`${
              theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-gray-400 hover:text-white'
            } text-sm font-medium transition-colors flex items-center gap-1`}
          >
            <img src="/icons8-discord-24.png" alt="Discord" className="w-5 h-5" />
            Join us on Discord
          </a>
          <div className="relative">
            <button
              onClick={() => setIsThemeOpen(!isThemeOpen)}
              className={`${
                theme === 'light'
                  ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              } transition-colors p-2 rounded-lg`}
            >
              {theme === 'light' ? (
                <Sun className="w-5 h-5" />
              ) : theme === 'dark' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Laptop2 className="w-5 h-5" />
              )}
            </button>
            {isThemeOpen && (
              <div className={`absolute top-full right-0 mt-2 w-36 ${
                theme === 'light'
                  ? 'bg-white/80 text-gray-900'
                  : 'bg-white/10 text-white'
              } backdrop-blur-lg rounded-lg shadow-lg py-2`}>
                {themes.map((themeOption) => (
                  <button
                    key={themeOption.id}
                    onClick={() => {
                      setIsThemeOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-4 py-2 text-sm ${
                      theme === themeOption.id 
                        ? theme === 'light'
                          ? 'text-gray-900 bg-gray-100'
                          : 'text-white bg-white/10'
                        : theme === 'light'
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <themeOption.Icon className="w-4 h-4" />
                    {themeOption.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-40 w-[60px] hover:w-[240px] ${
        theme === 'light'
          ? 'bg-gray-100/80'
          : 'bg-white/5'
      } backdrop-blur-lg transition-all duration-300 ease-in-out group`}>
        <div className="flex-1 p-3">
          <nav>
            <ul className="space-y-4">
              {sidebarItems.map((item, index) => (
                <li key={index}>
                  <a 
                    href="#" 
                    className={`relative flex items-center gap-3 py-2 px-3 rounded-lg transition-colors ${
                      index === 0 
                        ? theme === 'light'
                          ? 'text-gray-900 font-semibold mb-6'
                          : 'text-white font-semibold mb-6'
                        : theme === 'light'
                          ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                          : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <div className="relative group/tooltip">
                      {item.icon}
                      <div className={`absolute left-full ml-2 px-2 py-1 ${
                        theme === 'light'
                          ? 'bg-gray-800 text-white'
                          : 'bg-gray-800 text-white'
                      } text-xs rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap pointer-events-none`}>
                        {item.description}
                      </div>
                    </div>
                    <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap overflow-hidden">
                      {item.label}
                      {item.isNew && (
                        <span className="ml-2 bg-pink-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                          New
                        </span>
                      )}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        
        {/* Profile at bottom */}
        <div className={`absolute bottom-0 left-0 right-0 p-3 border-t ${
          theme === 'light'
            ? 'border-gray-200'
            : 'border-white/10'
        }`}>
          <a 
            href="#" 
            className={`flex items-center gap-3 py-2 px-3 rounded-lg ${
              theme === 'light'
                ? 'text-gray-600 hover:text-gray-900 hover:bg-gray-200/50'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
            } transition-colors`}
          >
            <div className="relative group/tooltip">
              <UserCircle className="w-5 h-5" />
              <div className={`absolute left-full ml-2 px-2 py-1 ${
                theme === 'light'
                  ? 'bg-gray-800 text-white'
                  : 'bg-gray-800 text-white'
              } text-xs rounded opacity-0 invisible group-hover/tooltip:opacity-100 group-hover/tooltip:visible transition-all duration-200 whitespace-nowrap pointer-events-none`}>
                Manage your profile
              </div>
            </div>
            <span className="opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              Profile
            </span>
          </a>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative ml-[60px]">
        {/* Hero Section */}
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
                Transform any YouTube video into accurate, time-stamped transcripts in a single click. Start with 25 complimentary credits and experience professional-grade results instantly.
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
                      {/* Updated thumbnail with always-visible play button */}
                      <div className="relative group w-48 h-32 overflow-hidden rounded-lg">
                        <img
                          src={videoDetails.thumbnail}
                          alt="Video thumbnail"
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/30 flex items-center justify-center transition duration-300 group-hover:bg-black/50">
                          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 shadow-lg">
                            <Play className="w-6 h-6 text-white fill-current" />
                          </div>
                        </div>
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.youtube.com/watch?v=${videoDetails.videoId}`,
                              '_blank'
                            )
                          }
                          className="absolute inset-0 z-10"
                          aria-label="Play on YouTube"
                        />
                      </div>

                      {/* Video details */}
                      <div className="flex-1 min-w-0">
                        <button
                          onClick={() =>
                            window.open(
                              `https://www.youtube.com/watch?v=${videoDetails.videoId}`,
                              '_blank'
                            )
                          }
                          className="block text-left hover:text-[#ff4571] transition-colors"
                        >
                          <h3 className="font-semibold mb-2 line-clamp-2">
                            {videoDetails.title}
                          </h3>
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

                {transcript && (
                  <div className={`mt-6 ${
                    theme === 'light'
                      ? 'bg-white'
                      : 'bg-white/5'
                  } rounded-lg p-4`}>
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Search Transcript"
                            className={`pl-9 pr-4 py-2 rounded-lg ${
                              theme === 'light'
                                ? 'bg-gray-100 text-gray-900'
                                : 'bg-white/10 text-white'
                            } border-0 focus:ring-2 focus:ring-[#ff4571] text-sm w-64`}
                          />
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                        <select className={`px-3 py-2 rounded-lg ${
                          theme === 'light'
                            ? 'bg-gray-100 text-gray-900'
                            : 'bg-white/10 text-white'
                        } border-0 text-sm`}>
                          <option>English (auto-generated)</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigator.clipboard.writeText(transcript.join('\n'))}
                          className="flex items-center gap-2 px-4 py-2 bg-[#ff4571] text-white rounded-lg hover:bg-[#ff3561] transition-colors text-sm font-medium"
                        >
                          <FileText className="w-4 h-4" />
                          Copy Transcript
                        </button>
                        <button className={`p-2 rounded-lg ${
                          theme === 'light'
                            ? 'hover:bg-gray-100'
                            : 'hover:bg-white/10'
                        }`}>
                          <MoreVertical className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                    <div className={`max-h-[400px] overflow-y-auto rounded-lg ${
                      theme === 'light'
                        ? 'bg-gray-50'
                        : 'bg-white/5'
                    } p-4 space-y-4`}>
                      {transcript.map((line, index) => {
                        const [timestamp, text] = line.split(' → ');
                        return (
                          <div key={index} className="flex gap-4">
                            <span className={`${
                              theme === 'light'
                                ? 'text-[#ff4571]'
                                : 'text-[#ff6b8b]'
                            } font-medium whitespace-nowrap`}>
                              {timestamp}
                            </span>
                            <p className={`${
                              theme === 'light'
                                ? 'text-gray-700'
                                : 'text-gray-300'
                            }`}>
                              {text}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-8 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#ff4571]" />
                  Third-Party Security Verified (Scamadviser)
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#ff4571]" />
                  Global Trust: 563,000+ Users and Growing
                </div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#ff4571]" />
                  SSL Encryption Ensures Full Data Security
                </div>
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

        {/* About Section */}
        <div className="max-w-7xl mx-auto px-4 py-20">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1">
              <div className="grid grid-cols-2 gap-6">
                <img
                  src="https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg"
                  alt="Team collaboration"
                  className="rounded-2xl w-full h-48 object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
                  alt="Content creation"
                  className="rounded-2xl w-full h-48 mt-12 object-cover shadow-lg transform hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>
            <div className="flex-1 lg:pl-8 space-y-6">
              <span className="text-[#ff4571] font-semibold">About</span>
              <h2 className="text-4xl font-bold">Simplifying Transcripts for Creators and Professionals</h2>
              <p className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              } text-lg leading-relaxed`}>
                We believe content should be easy to access, repurpose, and share. That's why we created a simple, reliable tool to convert YouTube videos into transcripts — free and hassle-free.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-2">100K+</div>
                  <p className={`${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>Active Users</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">2M+</div>
                  <p className={`${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>Transcripts Generated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="bg-[#0f172a] text-white border-y border-white/10 mt-20">
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold text-center mb-4">Features</h2>
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
                <div key={index} className="bg-white/5 hover:bg-white/10 rounded-2xl p-8 backdrop-blur-sm border border-white/10 transition-colors">
                  <div className="text-[#ff4571] mb-6">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-4 text-white">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className={`${
          theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
        } border-y ${
          theme === 'light' ? 'border-gray-100' : 'border-white/10'
        }`}>
          <div className="max-w-7xl mx-auto px-4 py-20">
            <h2 className="text-4xl font-bold text-center mb-4">Frequently Asked Questions</h2>
            <p className={`text-center mb-16 max-w-2xl mx-auto ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              Get answers to common questions about our YouTube transcript tool
            </p>

            <div className="max-w-3xl mx-auto space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className={`${
                    theme === 'light'
                      ? 'bg-white'
                      : 'bg-white/5'
                  } rounded-xl backdrop-blur-sm border ${
                    theme === 'light' ? 'border-gray-100' : 'border-white/10'
                  } overflow-hidden`}
                >
                  <button
                    onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                    className="w-full px-6 py-4 text-left flex justify-between items-center"
                  >
                    <span className="font-medium">{item.question}</span>
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedFaq === index ? 'rotate-180' : ''}`} />
                  </button>
                  {expandedFaq === index && (
                    <div className={`px-6 pb-4 ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {item.answer}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
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