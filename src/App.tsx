{Previous content remains unchanged until the hero section}

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
            <div className="flex-1 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <img
                  src="https://images.pexels.com/photos/3182833/pexels-photo-3182833.jpeg"
                  alt="Team collaboration"
                  className="rounded-2xl w-full h-64 object-cover"
                />
                <img
                  src="https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg"
                  alt="Content creation"
                  className="rounded-2xl w-full h-64 object-cover"
                />
              </div>
            </div>
            <div className="flex-1 space-y-6">
              <span className="text-[#ff4571] font-semibold">About</span>
              <h2 className="text-4xl font-bold">Simplifying Transcripts for Creators and Professionals</h2>
              <p className={`${
                currentTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
              } text-lg leading-relaxed`}>
                We believe content should be easy to access, repurpose, and share. That's why we created a simple, reliable tool to convert YouTube videos into transcripts — free and hassle-free.
              </p>
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-3xl font-bold mb-2">100K+</div>
                  <p className={`${
                    currentTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>Active Users</p>
                </div>
                <div>
                  <div className="text-3xl font-bold mb-2">2M+</div>
                  <p className={`${
                    currentTheme === 'light' ? 'text-gray-600' : 'text-gray-400'
                  }`}>Transcripts Generated</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
{Rest of the file remains unchanged}