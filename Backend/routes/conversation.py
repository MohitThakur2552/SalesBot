import os
import base64
import tempfile
import asyncio
import edge_tts

from flask import Blueprint, request, jsonify
from services.gemini import ask_gemini

conversation_bp = Blueprint("conversation", __name__)


async def generate_tts_audio(text, voice="en-US-ChristopherNeural"):
    communicate = edge_tts.Communicate(text, voice)

    fd, tmp_path = tempfile.mkstemp(suffix=".mp3")
    os.close(fd)

    try:
        await communicate.save(tmp_path)

        with open(tmp_path, "rb") as f:
            audio_bytes = f.read()

        return base64.b64encode(audio_bytes).decode("utf-8")

    finally:
        if os.path.exists(tmp_path):
            os.remove(tmp_path)


@conversation_bp.route("/chat", methods=["POST"])
def chat():
    data = request.get_json()

    reply = ask_gemini(
        data["config"],
        data["conversation"]
    )

    audio_b64 = None

    try:
        audio_b64 = asyncio.run(generate_tts_audio(reply))
    except Exception as e:
        print("TTS Error:", e)

    return jsonify({
        "reply": reply,
        "audio": audio_b64
    })


@conversation_bp.route("/tts", methods=["POST"])
def tts():
    data = request.get_json()

    try:
        audio_b64 = asyncio.run(
            generate_tts_audio(data["text"])
        )

        return jsonify({
            "audio": audio_b64
        })

    except Exception as e:
        print("TTS Error:", e)

        return jsonify({
            "audio": None
        }), 500