// ✅ Update `src/api/transcript.ts` if needed (already good)
export async function fetchTranscript(videoId: string) {
  const res = await fetch(`/api/transcript?videoId=${videoId}`);

  const contentType = res.headers.get("content-type") || '';
  if (!contentType.includes("application/json")) {
    const text = await res.text();
    console.error("Transcript Error Response:", text);
    throw new Error("Transcript API did not return JSON");
  }

  const data = await res.json();
  if (!Array.isArray(data)) throw new Error("Invalid transcript format");
  return data;
}

// ✅ Inject this into MainLayout.tsx below "setTranscript(formattedTranscript);"
setTranscript(formattedTranscript);

// ✅ Modify transcript rendering to ensure consistent styling
{transcript && (
  <div className={`mt-6 ${theme === 'light' ? 'bg-white' : 'bg-white/5'} rounded-lg p-4`}>
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search Transcript"
            className={`pl-9 pr-4 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'} border-0 focus:ring-2 focus:ring-[#ff4571] text-sm w-64`}
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        <select className={`px-3 py-2 rounded-lg ${theme === 'light' ? 'bg-gray-100 text-gray-900' : 'bg-white/10 text-white'} border-0 text-sm`}>
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
      </div>
    </div>
    <div className={`max-h-[400px] overflow-y-auto rounded-lg ${theme === 'light' ? 'bg-gray-50' : 'bg-white/5'} p-4 space-y-4`}>
      {transcript.map((line, index) => {
        const [timestamp, text] = line.split(' → ');
        return (
          <div key={index} className="flex gap-4">
            <span className={`${theme === 'light' ? 'text-[#ff4571]' : 'text-[#ff6b8b]'} font-medium whitespace-nowrap`}>{timestamp}</span>
            <p className={`${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>{text}</p>
          </div>
        );
      })}
    </div>
  </div>
)}
