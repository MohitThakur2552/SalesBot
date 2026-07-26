# import os
# import requests
# from dotenv import load_dotenv

# load_dotenv()

# API_KEYS = [
#     os.getenv("GEMINI_KEY_1"),
#     os.getenv("GEMINI_KEY_2"),
#     os.getenv("GEMINI_KEY_3"),
#     os.getenv("GEMINI_KEY_4"),
#     os.getenv("GEMINI_KEY_5"),
# ]

# API_KEYS = [k for k in API_KEYS if k]

# MODEL = "gemini-3.5-flash"


# def ask_gemini(config, conversation):

#     conversation_text = ""

#     for msg in conversation:
#         role = "Customer" if msg["role"] == "customer" else "Salesperson"
#         conversation_text += f"{role}: {msg['message']}\n"

#     prompt = f"""
# You are roleplaying as a REAL customer.

# Industry: {config['industry']}
# Personality: {config['personality']}
# Difficulty: {config['difficulty']}
# Objection Style: {config['objection']}
# Goal: {config['goal']}

# Conversation:
# {conversation_text}

# Rules:
# - Speak like a human on a call
# - Stay in character.
# - Never always agree with the salesperson, read the situation and respond according to the personality.
# - Never say you are an AI.
# - DO NOT reveal all your problems or objections upfront. 
# - Make the salesperson earn the information by asking good questions.
# - If they ask a bad or generic question, give a brief, lukewarm response.
# **TTS & Speech Formatting (STRICT):**
# - NO markdown formatting (no bold `**`, no italics, no bullet points, no numbered lists).
# - NO stage directions or emotional cues in parentheses or asterisks (e.g., NEVER write `*sighs*`, `(chuckles)`, or `[pauses]`). TTS engines will read these out loud literally!
# - Use standard punctuation and natural conversational filler words sparingly (e.g., "Look...", "Well...", "Hmm, okay...") to sound human.
# - Reply naturally.
# - Raise objections according to personality.
# - Maximum 60 words.
# """

#     body = {
#         "contents": [
#             {
#                 "parts": [
#                     {
#                         "text": prompt
#                     }
#                 ]
#             }
#         ]
#     }

#     last_error = None

#     for i, api_key in enumerate(API_KEYS):

#         print(f"Trying Gemini Key {i+1}")

#         url = (
#             f"https://generativelanguage.googleapis.com/v1beta/models/"
#             f"{MODEL}:generateContent?key={api_key}"
#         )

#         try:

#             response = requests.post(
#                 url,
#                 json=body,
#                 timeout=30
#             )

#             if response.status_code == 200:

#                 data = response.json()

#                 return data["candidates"][0]["content"]["parts"][0]["text"]

#             else:

#                 print(f"Key {i+1} Failed")
#                 print(response.status_code)
#                 print(response.text)

#                 last_error = response.text

#         except Exception as e:

#             print(f"Key {i+1} Exception")
#             print(e)

#             last_error = str(e)

#     print("All API Keys Failed")

#     return f"Sorry, all Gemini API keys failed.\n{last_error}"





import os
import requests
from dotenv import load_dotenv

load_dotenv()

# Get the OpenRouter API Key from your .env file
OPENROUTER_API_KEY = os.getenv("OPENROUTER_API_KEY")

# The exact OpenRouter model ID for Nvidia's free Nemotron 3 Nano Omni model
MODEL = "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free"

def ask_gemini(config, conversation):
    # The system prompt sets the rules and personality
    system_prompt = f"""
You are roleplaying as a REAL customer.

Industry: {config['industry']}
Personality: {config['personality']}
Difficulty: {config['difficulty']}
Objection Style: {config['objection']}
Goal: {config['goal']}

Rules:
- Speak like a human on a call
- Stay in character.
-Never make all your points in single response, let the salesperson ask questions to uncover your objections.
- Never always agree with the salesperson, read the situation and respond according to the personality.
- Never say you are an AI.
- DO NOT reveal all your problems or objections upfront. 
- Make the salesperson earn the information by asking good questions.
- If they ask a bad or generic question, give a brief, lukewarm response.
**TTS & Speech Formatting (STRICT):**
- NO markdown formatting (no bold `**`, no italics, no bullet points, no numbered lists).
- NO stage directions or emotional cues in parentheses or asterisks (e.g., NEVER write `*sighs*`, `(chuckles)`, or `[pauses]`). TTS engines will read these out loud literally!
- Use standard punctuation and natural conversational filler words sparingly (e.g., "Look...", "Well...", "Hmm, okay...") to sound human.
- Reply naturally.
- Raise objections according to personality.
- Maximum 60 words.
"""

    # Format the messages array for OpenRouter
    messages = [
        {"role": "system", "content": system_prompt}
    ]

    # Map the existing conversation history into OpenRouter's role format
    for msg in conversation:
        # Customer (the bot) is "assistant", Salesperson (the user) is "user"
        role = "assistant" if msg["role"] == "customer" else "user"
        messages.append({
            "role": role,
            "content": msg["message"]
        })

    # OpenRouter requires Bearer authorization
    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "https://salesbot-front.onrender.com", # Optional: Your site URL
        "X-Title": "Sales Roleplay Bot"          # Optional: Your site name
    }

    body = {
        "model": MODEL,
        "messages": messages,
        "temperature": 0.7 # Adjust between 0.5 - 0.9 for varied responses
    }

    url = "https://openrouter.ai/api/v1/chat/completions"

    try:
        response = requests.post(
            url,
            headers=headers,
            json=body,
            timeout=30
        )

        if response.status_code == 200:
            data = response.json()
            # Extract the text response from the OpenRouter payload
            return data["choices"][0]["message"]["content"]
        else:
            print(f"OpenRouter API Failed: {response.status_code}")
            print(response.text)
            return f"Sorry, OpenRouter API failed.\n{response.text}"

    except Exception as e:
        print(f"OpenRouter API Exception: {e}")
        return f"Sorry, an error occurred.\n{str(e)}"