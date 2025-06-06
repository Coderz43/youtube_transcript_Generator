import React from 'react';
import { ArrowLeft, Upload, List, FileText, Download, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Bulk() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<'playlist' | 'csv'>('playlist');
  const [playlistUrl, setPlaylistUrl] = React.useState('');
  const [csvFile, setCsvFile] = React.useState<File | null>(null);
  const [isProcessing, setIsProcessing] = React.useState(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    }
  };

  const handleDragOver = (event: React.DragEvent) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type === 'text/csv') {
      setCsvFile(file);
    }
  };

  return (
    <div className={`min-h-screen ${
      theme === 'light' 
        ? 'bg-white text-gray-900' 
        : 'bg-[#0f172a] text-white'
    }`}>
      {/* Header */}
      <div className={`border-b ${
        theme === 'light' ? 'border-gray-200' : 'border-white/10'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <button 
            onClick={() => window.history.back()}
            className={`flex items-center gap-2 ${
              theme === 'light' 
                ? 'text-gray-600 hover:text-gray-900' 
                : 'text-gray-400 hover:text-white'
            } transition-colors`}
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#ff4571]/10 mb-6">
            <List className="w-8 h-8 text-[#ff4571]" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            YouTube Bulk Transcript Generator
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Extract transcripts from multiple YouTube videos at once. Process entire playlists or upload a CSV file with video URLs.
          </p>
        </div>

        {/* Experimental Feature Banner */}
        <div className={`max-w-4xl mx-auto mb-8 p-4 rounded-lg ${
          theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-500/10 border border-blue-500/20'
        }`}>
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-blue-500" />
            <div>
              <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                Experimental Feature
              </h3>
              <p className={`text-sm ${
                theme === 'light' ? 'text-blue-600' : 'text-blue-300'
              }`}>
                This feature is experimental and may need some{' '}
                <a href="#" className="underline">feedback</a> to improve.
              </p>
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className={`flex rounded-lg p-1 ${
            theme === 'light' ? 'bg-gray-100' : 'bg-white/10'
          }`}>
            <button
              onClick={() => setActiveTab('playlist')}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'playlist'
                  ? 'bg-[#ff4571] text-white shadow-sm'
                  : theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              Extract From Playlist
            </button>
            <button
              onClick={() => setActiveTab('csv')}
              className={`flex-1 py-3 px-6 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'csv'
                  ? 'bg-[#ff4571] text-white shadow-sm'
                  : theme === 'light'
                    ? 'text-gray-600 hover:text-gray-900'
                    : 'text-gray-400 hover:text-white'
              }`}
            >
              Extract From CSV
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'playlist' ? (
            <div className={`p-8 rounded-xl ${
              theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
            }`}>
              <div className="text-center mb-8">
                <List className="w-12 h-12 text-[#ff4571] mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Extract From YouTube Playlist</h2>
                <p className={`${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Enter a YouTube playlist URL to extract transcripts from all videos
                </p>
              </div>

              <div className="space-y-6">
                <div>
                  <input
                    type="text"
                    value={playlistUrl}
                    onChange={(e) => setPlaylistUrl(e.target.value)}
                    placeholder="https://www.youtube.com/watch?list=PLSq76P-lbXSpuPt13Sy2EFxwl"
                    className={`w-full px-4 py-3 rounded-lg ${
                      theme === 'light'
                        ? 'bg-white border-gray-200 text-gray-900 placeholder-gray-400'
                        : 'bg-white/10 border-white/20 text-white placeholder-gray-400'
                    } border focus:outline-none focus:ring-2 focus:ring-[#ff4571] focus:border-transparent`}
                  />
                </div>

                <div className={`p-4 rounded-lg ${
                  theme === 'light' ? 'bg-blue-50' : 'bg-blue-500/10'
                }`}>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-blue-700' : 'text-blue-300'
                  }`}>
                    You can get create a Channel Playlist from any YouTube Channel by{' '}
                    <a href="#" className="underline font-medium">extracting the Channel ID</a>.
                  </p>
                </div>

                <button
                  onClick={() => setIsProcessing(true)}
                  disabled={!playlistUrl || isProcessing}
                  className="w-full bg-[#ff4571] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#ff3561] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Get Playlist'}
                </button>
              </div>
            </div>
          ) : (
            <div className={`p-8 rounded-xl ${
              theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
            }`}>
              <div className="text-center mb-8">
                <Upload className="w-12 h-12 text-[#ff4571] mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-2">Extract From CSV File</h2>
                <p className={`${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  Upload a CSV file containing YouTube video URLs
                </p>
              </div>

              <div
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
                  csvFile
                    ? 'border-green-500 bg-green-50 dark:bg-green-500/10'
                    : theme === 'light'
                      ? 'border-gray-300 hover:border-gray-400'
                      : 'border-white/20 hover:border-white/30'
                }`}
              >
                {csvFile ? (
                  <div>
                    <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                    <p className="text-lg font-medium text-green-700 dark:text-green-400 mb-2">
                      File uploaded successfully!
                    </p>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      {csvFile.name} ({(csvFile.size / 1024).toFixed(1)} KB)
                    </p>
                  </div>
                ) : (
                  <div>
                    <FileText className={`w-12 h-12 mx-auto mb-4 ${
                      theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                    }`} />
                    <p className="text-lg font-medium mb-2">
                      Drag 'n' drop a CSV file here, or click to upload
                    </p>
                    <p className={`text-sm ${
                      theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                    }`}>
                      CSV files only
                    </p>
                  </div>
                )}
                <input
                  type="file"
                  accept=".csv"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="csv-upload"
                />
                <label
                  htmlFor="csv-upload"
                  className={`inline-block mt-4 px-6 py-2 rounded-lg cursor-pointer transition-colors ${
                    theme === 'light'
                      ? 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      : 'bg-white/10 border border-white/20 text-white hover:bg-white/20'
                  }`}
                >
                  Choose File
                </label>
              </div>

              <div className={`mt-6 p-4 rounded-lg ${
                theme === 'light' ? 'bg-yellow-50' : 'bg-yellow-500/10'
              }`}>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-yellow-700' : 'text-yellow-300'
                }`}>
                  Fetching transcripts in bulk (from a playlist or CSV), requires tokens. One transcript equals one token. You can purchase tokens from the{' '}
                  <a href="#" className="underline font-medium">pricing</a> page.
                </p>
              </div>

              {csvFile && (
                <button
                  onClick={() => setIsProcessing(true)}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-[#ff4571] text-white py-3 px-6 rounded-lg font-medium hover:bg-[#ff3561] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isProcessing ? 'Processing...' : 'Process CSV'}
                </button>
              )}
            </div>
          )}
        </div>

        {/* Processing Status */}
        {isProcessing && (
          <div className="max-w-4xl mx-auto mt-8">
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-blue-50' : 'bg-blue-500/10'
            }`}>
              <div className="flex items-center gap-4">
                <Clock className="w-6 h-6 text-blue-500 animate-spin" />
                <div>
                  <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                    Processing your request...
                  </h3>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-blue-600' : 'text-blue-300'
                  }`}>
                    This may take a few minutes depending on the number of videos.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Info */}
        <div className="max-w-4xl mx-auto mt-16">
          <div className={`p-6 rounded-xl ${
            theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
          }`}>
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Download className="w-5 h-5 text-[#ff4571]" />
              What happens after processing?
            </h3>
            <ul className={`space-y-2 text-sm ${
              theme === 'light' ? 'text-gray-600' : 'text-gray-400'
            }`}>
              <li>• All transcripts will be processed and compiled into a downloadable file</li>
              <li>• You'll receive an email notification when processing is complete</li>
              <li>• Files will be available for download for 30 days</li>
              <li>• Supported formats: CSV, JSON, TXT</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}