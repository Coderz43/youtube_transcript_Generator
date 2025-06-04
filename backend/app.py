from flask import Flask, request, jsonify
from flask_cors import CORS
from youtube_transcript_api import YouTubeTranscriptApi, TranscriptsDisabled, NoTranscriptFound

app = Flask(__name__)
CORS(app)

@app.route("/api/transcript", methods=["GET"])
def get_transcript():
    video_id = request.args.get("video_id")
    if not video_id:
        return jsonify({"error": "Missing video_id"}), 400

    print(f"🔍 Fetching transcript for: {video_id}")
    try:
        transcript = YouTubeTranscriptApi.get_transcript(video_id)
        print("✅ Transcript fetched successfully")
        return jsonify(transcript)
    except (TranscriptsDisabled, NoTranscriptFound) as e:
        print(f"⚠️ Transcript error: {e}")
        return jsonify({"error": str(e)}), 404
    except Exception as e:
        print(f"❌ Unexpected error: {e}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
