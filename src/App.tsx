import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { FileText, Languages, Youtube, Wand2, Users, BookOpen, Mic2, GraduationCap, CheckCircle2, ChevronDown, ChevronRight, Sun, Moon, Laptop2, History, PlaySquare, List, Table, Apple as Api, UserCircle, Clock } from 'lucide-react';
import AdminRoutes from './pages/admin';

function App() {
  const [currentTheme, setCurrentTheme] = useState('light');
  const [videoDetails, setVideoDetails] = useState(null);

  return (
    <div className={`min-h-screen ${
      currentTheme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-[#0f172a] text-white'
    }`}>
      <div className="relative ml-[60px]">
        {videoDetails && (
          <div className={`mt-6 ${
            currentTheme === 'light'
              ? 'bg-white'
              : 'bg-white/5'
          } rounded-lg p-6`}>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="w-full md:w-[400px]">
                <img
                  src={videoDetails.thumbnail}
                  alt="Video thumbnail"
                  className="w-full aspect-video object-cover rounded-lg shadow-lg"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-xl font-semibold mb-3 line-clamp-2">{videoDetails.title}</h3>
                <p className="text-base text-gray-500 dark:text-gray-400 mb-4">{videoDetails.channel}</p>
                <div className="grid grid-cols-1 gap-4 mb-4">
                  <div className={`p-3 rounded-lg ${
                    currentTheme === 'light'
                      ? 'bg-gray-50'
                      : 'bg-white/10'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Video ID</p>
                    <p className="text-sm font-mono break-all">{videoDetails.videoId}</p>
                  </div>
                  <div className={`p-3 rounded-lg ${
                    currentTheme === 'light'
                      ? 'bg-gray-50'
                      : 'bg-white/10'
                  }`}>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Channel ID</p>
                    <p className="text-sm font-mono break-all">{videoDetails.channelId}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  <span className={`text-sm px-3 py-1.5 rounded-full ${
                    currentTheme === 'light'
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-blue-500/20 text-blue-400'
                  }`}>
                    {videoDetails.category}
                  </span>
                  <span className={`text-sm px-3 py-1.5 rounded-full flex items-center gap-1.5 ${
                    currentTheme === 'light'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-green-500/20 text-green-400'
                  }`}>
                    <Clock className="w-4 h-4" />
                    {videoDetails.duration}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;