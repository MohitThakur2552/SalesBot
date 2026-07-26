# import json
# from services.gemini import MODEL, API_KEYS
# import requests


# def score_sales_call(config, conversation):

#     conversation_text = ""

#     for msg in conversation:

#         role = "Customer" if msg["role"] == "customer" else "Salesperson"

#         conversation_text += f"{role}: {msg['message']}\n"

#     prompt = f"""
# You are an expert sales coach.

# Evaluate the salesperson.

# Return ONLY valid JSON.

# {{
# "score":0,
# "grade":"",
# "summary":"",
# "strengths":[],
# "improvements":[],
# "confidence":0,
# "communication":0,
# "objectionHandling":0,
# "productKnowledge":0
# }}

# Conversation

# {conversation_text}
# """

#     url = f"https://generativelanguage.googleapis.com/v1beta/models/{MODEL}:generateContent?key={API_KEYS[0]}"

#     body = {
#         "contents":[
#             {
#                 "parts":[
#                     {
#                         "text":prompt
#                     }
#                 ]
#             }
#         ]
#     }

#     response = requests.post(url,json=body)

#     data = response.json()

#     text=data["candidates"][0]["content"]["parts"][0]["text"]

#     text=text.replace("```json","").replace("```","").strip()

#     return json.loads(text)





import json
import requests
from services.gemini import MODEL, OPENROUTER_API_KEY

def score_sales_call(config, conversation):

    conversation_text = ""

    for msg in conversation:
        role = "Customer" if msg["role"] == "customer" else "Salesperson"
        conversation_text += f"{role}: {msg['message']}\n"

    prompt = f"""
You are an expert sales coach.

Evaluate the salesperson.

Return ONLY valid JSON. Do not include any other text, markdown, or explanations.

{{
"score":0,
"grade":"",
"summary":"",
"strengths":[],
"improvements":[],
"confidence":0,
"communication":0,
"objectionHandling":0,
"productKnowledge":0
}}

Conversation:
{conversation_text}
"""

    headers = {
        "Authorization": f"Bearer {OPENROUTER_API_KEY}",
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", 
        "X-Title": "Sales Roleplay Bot"          
    }

    body = {
        "model": MODEL,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.1  # Low temperature ensures more consistent JSON formatting
    }

    url = "https://openrouter.ai/api/v1/chat/completions"

    try:
        response = requests.post(url, headers=headers, json=body, timeout=30)
        
        if response.status_code == 200:
            data = response.json()
            text = data["choices"][0]["message"]["content"]
            
            # Clean up the output in case the model adds markdown code blocks
            text = text.replace("```json", "").replace("```", "").strip()
            
            return json.loads(text)
            
        else:
            print(f"Scoring API Failed: {response.status_code}")
            print(response.text)
            raise Exception("API request failed.")

    except json.JSONDecodeError:
        print("Failed to parse JSON from the model's response.")
        print(f"Raw output: {text}")
        # Fallback empty score in case of a hard JSON failure
        return {
            "score": 0,
            "grade": "N/A",
            "summary": "Failed to generate report due to parsing error.",
            "strengths": [],
            "improvements": [],
            "confidence": 0,
            "communication": 0,
            "objectionHandling": 0,
            "productKnowledge": 0
        }
    except Exception as e:
        print(f"Exception during scoring: {e}")
        raise e