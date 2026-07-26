import os
import base64
import tempfile
import edge_tts
from flask import Blueprint, request, jsonify

# Your existing Gemini import
from services.gemini import ask_gemini

conversation_bp = Blueprint("conversation", __name__)

async def generate_tts_audio(text, voice="en-US-ChristopherNeural"):
    """
    Takes text, generates high-quality speech using Edge-TTS, 
    and returns a Base64 encoded audio string.
    """
    # Create the TTS object
    communicate = edge_tts.Communicate(text, voice)
    
    # Create a secure temporary file to save the mp3
    fd, tmp_path = tempfile.mkstemp(suffix=".mp3")
    os.close(fd)
    
    try:
        # Save audio to the temporary file
        await communicate.save(tmp_path)
        
        # Read the file and convert it to Base64
        with open(tmp_path, "rb") as f:
            audio_bytes = f.read()
        return base64.b64encode(audio_bytes).decode("utf-8")
    finally:
        # Clean up the file to prevent storage leaks
        os.remove(tmp_path)

@conversation_bp.route("/chat", methods=["POST"])
async def chat():
    data = request.json
    
    # 1. Get the text reply from Gemini
    reply = ask_gemini(
        data["config"],
        data["conversation"]
    )
    
    # 2. Generate the premium audio
    try:
        audio_b64 = await generate_tts_audio(reply)
    except Exception as e:
        print(f"TTS Error: {e}")
        audio_b64 = None
        
    # Return BOTH text and audio
    return jsonify({
        "reply": reply,
        "audio": audio_b64
    })



@conversation_bp.route("/tts", methods=["POST"])
async def tts():
    # A dedicated endpoint just for converting frontend text to audio
    data = request.json
    try:
        audio_b64 = await generate_tts_audio(data["text"])
        return jsonify({"audio": audio_b64})
    except Exception as e:
        print(f"TTS Error: {e}")
        return jsonify({"audio": None})