import React from 'react';
import { ArrowLeft, MessageCircle, Users, Zap, Heart, ExternalLink, Crown, Shield, Star } from 'lucide-react';
import { useTheme } from '../ThemeContext';

export default function Discord() {
  const { theme } = useTheme();

  const features = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Active Community",
      description: "Join 5,000+ creators, developers, and content enthusiasts"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Quick Support",
      description: "Get help from our team and community members instantly"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Feature Requests",
      description: "Suggest new features and vote on upcoming improvements"
    },
    {
      icon: <Crown className="w-6 h-6" />,
      title: "Exclusive Updates",
      description: "Be the first to know about new features and beta releases"
    }
  ];

  const channels = [
    {
      name: "📢 announcements",
      description: "Latest updates and news from the YouTube Transcript team"
    },
    {
      name: "💬 general-chat",
      description: "General discussion about transcripts, YouTube, and content creation"
    },
    {
      name: "🆘 support",
      description: "Get help with technical issues and account problems"
    },
    {
      name: "💡 feature-requests",
      description: "Suggest new features and improvements"
    },
    {
      name: "🔧 api-discussion",
      description: "Technical discussions about our API and integrations"
    },
    {
      name: "🎉 showcase",
      description: "Share your projects and success stories"
    }
  ];

  const stats = [
    { number: "5,000+", label: "Community Members" },
    { number: "24/7", label: "Active Support" },
    { number: "100+", label: "Daily Messages" },
    { number: "50+", label: "Countries Represented" }
  ];

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
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#5865F2]/10 mb-6">
            <img 
              src="/icons8-discord-24.png" 
              alt="Discord" 
              className="w-12 h-12"
            />
          </div>
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">
            Join Our Discord Community
          </h1>
          <p className={`text-xl max-w-3xl mx-auto mb-8 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Connect with fellow creators, get instant support, and be part of the YouTube Transcript community. 
            Share ideas, get help, and stay updated with the latest features.
          </p>
          
          <a
            href="https://discord.gg/youtube-transcript"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-[#5865F2] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#4752C4] transition-colors"
          >
            <img src="/icons8-discord-24.png" alt="Discord" className="w-6 h-6" />
            Join Our Discord
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center p-6 rounded-xl ${
                theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
              }`}
            >
              <div className="text-3xl font-bold text-[#ff4571] mb-2">
                {stat.number}
              </div>
              <div className={`text-sm ${
                theme === 'light' ? 'text-gray-600' : 'text-gray-400'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Join Our Discord?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl text-center ${
                  theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
                }`}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-[#5865F2]/10 text-[#5865F2] mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className={`text-sm ${
                  theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                }`}>
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Channels Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Server Channels
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className={`rounded-xl overflow-hidden ${
              theme === 'light' ? 'bg-gray-50' : 'bg-white/5'
            }`}>
              {channels.map((channel, index) => (
                <div
                  key={index}
                  className={`p-4 border-b last:border-b-0 ${
                    theme === 'light' ? 'border-gray-200' : 'border-white/10'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <MessageCircle className={`w-5 h-5 ${
                        theme === 'light' ? 'text-gray-400' : 'text-gray-500'
                      }`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{channel.name}</h3>
                      <p className={`text-sm ${
                        theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                      }`}>
                        {channel.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Community Guidelines */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">
            Community Guidelines
          </h2>
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8">
            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-green-50' : 'bg-green-500/10'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-green-500" />
                <h3 className="text-lg font-semibold text-green-700 dark:text-green-400">
                  Be Respectful
                </h3>
              </div>
              <ul className={`space-y-2 text-sm ${
                theme === 'light' ? 'text-green-600' : 'text-green-300'
              }`}>
                <li>• Treat all members with respect and kindness</li>
                <li>• No harassment, discrimination, or hate speech</li>
                <li>• Keep discussions constructive and helpful</li>
                <li>• Use appropriate language and tone</li>
              </ul>
            </div>

            <div className={`p-6 rounded-xl ${
              theme === 'light' ? 'bg-blue-50' : 'bg-blue-500/10'
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <Star className="w-6 h-6 text-blue-500" />
                <h3 className="text-lg font-semibold text-blue-700 dark:text-blue-400">
                  Stay On Topic
                </h3>
              </div>
              <ul className={`space-y-2 text-sm ${
                theme === 'light' ? 'text-blue-600' : 'text-blue-300'
              }`}>
                <li>• Keep discussions relevant to the channel topic</li>
                <li>• Use the appropriate channels for different topics</li>
                <li>• No spam or excessive self-promotion</li>
                <li>• Search before asking duplicate questions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className={`text-center p-12 rounded-xl ${
          theme === 'light' ? 'bg-gradient-to-r from-blue-50 to-purple-50' : 'bg-gradient-to-r from-blue-500/10 to-purple-500/10'
        }`}>
          <h2 className="text-3xl font-bold mb-4">
            Ready to Join the Community?
          </h2>
          <p className={`text-lg mb-8 max-w-2xl mx-auto ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            Connect with thousands of creators, developers, and YouTube enthusiasts. 
            Get support, share ideas, and stay updated with the latest features.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://discord.gg/youtube-transcript"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#5865F2] text-white px-8 py-4 rounded-lg font-semibold hover:bg-[#4752C4] transition-colors"
            >
              <img src="/icons8-discord-24.png" alt="Discord" className="w-6 h-6" />
              Join Discord Server
              <ExternalLink className="w-5 h-5" />
            </a>
            
            <a
              href="https://discord.com/download"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-3 px-8 py-4 rounded-lg font-semibold transition-colors ${
                theme === 'light'
                  ? 'border border-gray-300 text-gray-700 hover:bg-gray-50'
                  : 'border border-white/20 text-white hover:bg-white/5'
              }`}
            >
              Download Discord App
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}