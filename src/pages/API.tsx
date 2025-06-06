import React from 'react';
import { ArrowLeft, Copy, Code, Key, Globe, Zap, Shield, BookOpen } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function API() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<'curl' | 'node' | 'python'>('curl');

  const codeExamples = {
    curl: `curl -X POST https://www.youtube-transcript.io/api/transcripts \\
  -H "Authorization: Basic <your-api-token>" \\
  -H "Content-Type: application/json" \\
  -d '{"ids": ["dQw4w9WgXcQ", "jNQXAC9IVRw"]}'`,
    node: `const fetch = require('node-fetch');

const response = await fetch('https://www.youtube-transcript.io/api/transcripts', {
  method: 'POST',
  headers: {
    'Authorization': 'Basic <your-api-token>',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    ids: ['dQw4w9WgXcQ', 'jNQXAC9IVRw']
  })
});

const data = await response.json();
console.log(data);`,
    python: `import requests

url = "https://www.youtube-transcript.io/api/transcripts"
headers = {
    "Authorization": "Basic <your-api-token>",
    "Content-Type": "application/json"
}
data = {
    "ids": ["dQw4w9WgXcQ", "jNQXAC9IVRw"]
}

response = requests.post(url, headers=headers, json=data)
print(response.json())`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
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
            <Code className="w-8 h-8 text-[#ff4571]" />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            YouTube Transcript API
          </h1>
          <p className={`text-xl max-w-3xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            This API allows you to fetch the transcripts of a set of YouTube video IDs.
            Integrate transcript extraction directly into your applications.
          </p>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: <Zap className="w-6 h-6" />,
              title: "Fast & Reliable",
              description: "Get transcripts in seconds with 99.9% uptime guarantee"
            },
            {
              icon: <Globe className="w-6 h-6" />,
              title: "100+ Languages",
              description: "Support for all major languages with automatic detection"
            },
            {
              icon: <Shield className="w-6 h-6" />,
              title: "Secure & Private",
              description: "Enterprise-grade security with API key authentication"
            }
          ].map((feature, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl ${
                theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
              } text-center`}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#ff4571]/10 text-[#ff4571] mb-4">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
              <p className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* API Documentation */}
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Column - Documentation */}
          <div>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <BookOpen className="w-6 h-6 text-[#ff4571]" />
              Transcripts
            </h2>
            
            <div className={`p-6 rounded-lg ${
              theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
            } mb-6`}>
              <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500 text-white px-2 py-1 rounded text-sm font-medium">
                  POST
                </span>
                <code className="text-sm font-mono">/api/transcripts</code>
              </div>
              <p className={`${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                This API allows you to fetch the transcripts of a set of YouTube video IDs.
              </p>
            </div>

            {/* Headers */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Headers</h3>
              <div className="space-y-3">
                <div className={`p-4 rounded-lg ${
                  theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Authorization</span>
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs">Required</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Basic API token generated in your{' '}
                    <a href="#" className="text-[#ff4571] hover:underline">profile</a>.
                    Check the{' '}
                    <a href="#" className="text-[#ff4571] hover:underline">pricing</a>{' '}
                    page to see the cost of this API.
                  </p>
                </div>
                <div className={`p-4 rounded-lg ${
                  theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
                }`}>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium">Content-Type</span>
                    <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs">Required</span>
                  </div>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    application/json
                  </p>
                </div>
              </div>
            </div>

            {/* Parameters */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4">Parameters</h3>
              <div className={`p-4 rounded-lg ${
                theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
              }`}>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-medium">ids</span>
                  <span className="bg-red-500 text-white px-2 py-0.5 rounded text-xs">Required</span>
                </div>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                } mb-2`}>
                  Array of strings that contains the ids of all the video's you want the transcripts of. Limited to 50 at a time!
                </p>
                <div className="mt-3">
                  <p className={`text-sm font-medium ${
                    theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                  }`}>
                    countryCode
                  </p>
                  <p className={`text-sm ${
                    theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>
                    Optional string that indicates the country code to use for fetching the transcripts. If not provided, the default is "us". See{' '}
                    <a href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2" className="text-[#ff4571] hover:underline" target="_blank" rel="noopener noreferrer">
                      https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2
                    </a>{' '}
                    for valid country codes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Code Examples */}
          <div>
            <div className={`rounded-lg overflow-hidden ${
              theme === 'light' ? 'bg-gray-900' : 'bg-black/50'
            }`}>
              {/* Tab Headers */}
              <div className="flex border-b border-gray-700">
                {Object.keys(codeExamples).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setActiveTab(lang as keyof typeof codeExamples)}
                    className={`px-4 py-3 text-sm font-medium transition-colors ${
                      activeTab === lang
                        ? 'bg-[#ff4571] text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {lang === 'curl' ? 'cURL' : lang === 'node' ? 'Node.js' : 'Python'}
                  </button>
                ))}
              </div>

              {/* Code Content */}
              <div className="relative">
                <button
                  onClick={() => copyToClipboard(codeExamples[activeTab])}
                  className="absolute top-4 right-4 p-2 text-gray-400 hover:text-white transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
                <pre className="p-6 text-sm text-gray-300 overflow-x-auto">
                  <code>{codeExamples[activeTab]}</code>
                </pre>
              </div>
            </div>

            {/* API Key Section */}
            <div className={`mt-8 p-6 rounded-lg ${
              theme === 'light' ? 'bg-blue-50 border border-blue-200' : 'bg-blue-500/10 border border-blue-500/20'
            }`}>
              <div className="flex items-center gap-2 mb-3">
                <Key className="w-5 h-5 text-blue-500" />
                <h3 className="font-semibold text-blue-700 dark:text-blue-400">
                  Need an API Key?
                </h3>
              </div>
              <p className={`text-sm mb-4 ${
                theme === 'light' ? 'text-blue-600' : 'text-blue-300'
              }`}>
                Get your API key from your profile dashboard to start making requests.
              </p>
              <button className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-600 transition-colors">
                Get API Key
              </button>
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-16 text-center">
          <p className={`text-sm ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            By using this Service, you acknowledge that you have read, understood, and agreed to these{' '}
            <a href="#" className="text-[#ff4571] hover:underline">Terms of Service</a>.
          </p>
        </div>
      </div>
    </div>
  );
}