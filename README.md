# 🎙️ AI Sales Roleplay Voice Bot

An AI-powered Sales Roleplay application that enables sales representatives to practice real-world sales conversations with an intelligent virtual customer. The bot simulates different customer personalities, industries, objection styles, and difficulty levels while maintaining a natural voice conversation. After the meeting, the AI evaluates the salesperson's performance and provides actionable feedback.

---

## ✨ Features

- 🎤 Real-time voice conversation
- 🤖 AI customer roleplay using Google Gemini
- 👤 Configurable customer personalities
- 🏢 Multiple industry scenarios
- ⚡ Adjustable difficulty levels
- 💬 Live conversation transcript
- 📹 User webcam during the meeting
- 🎭 Animated AI customer avatar
- 📊 AI-generated sales performance evaluation
- 🔑 Automatic Gemini API key rotation for uninterrupted conversations

---

## 🛠️ Tech Stack

### Frontend
- React.js (Vite)
- React Router DOM
- Tailwind CSS
- Axios
- Web Speech API
- WebRTC (Camera)

### Backend
- Flask
- Flask-CORS
- Google Gemini API
- Python

---

## 📂 Project Structure

```
AI-Sales-Roleplay/
│
├── backend/
│   ├── app.py
│   ├── routes/
│   ├── services/
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │
│   ├── components/
│   ├── hooks/
│   ├── pages/
│   ├── services/
│   └── App.jsx
│
└── README.md
```

---

## 🚀 Key Features

### Customer Configuration

Sales representatives can configure the AI customer before starting a meeting.

Options include:

- Industry
- Customer Personality
- Difficulty Level
- Objection Style
- Customer Goal

The AI dynamically changes its behavior based on the selected configuration without requiring separate prompts for each customer.

---

### Live Sales Conversation

The AI behaves as a customer instead of an assistant.

It can:

- Ask realistic questions
- Raise objections
- Challenge pricing
- Discuss competitors
- Request demonstrations
- Negotiate
- Stay in character throughout the meeting

---

### Conversation Transcript

The application stores the complete conversation in real time.

Example:

```
Customer:
Hello, I'm interested in learning more about your product.

Salesperson:
Thank you for your time...

Customer:
How is your solution different from our current software?
```

---

### Sales Evaluation

After ending the meeting, Gemini evaluates the salesperson based on:

- Communication
- Confidence
- Product Knowledge
- Objection Handling
- Discovery Questions
- Closing Skills

The system generates:

- Overall Score
- Strengths
- Weaknesses
- Improvement Suggestions
- Final Feedback

---

## 🔄 Application Workflow

```
Salesperson

↓

Configure Customer

↓

Start Meeting

↓

AI Customer Roleplay

↓

Live Conversation

↓

Transcript Generated

↓

End Meeting

↓

Gemini Evaluation

↓

Performance Report
```

---

## ⚙️ Installation

### Clone Repository

```bash
git clone https://github.com/YOUR_USERNAME/AI-Sales-Roleplay.git
```

---

## Frontend

```bash
cd frontend

npm install

npm run dev
```

Runs at:

```
http://localhost:5173
```

---

## Backend

```bash
cd backend

pip install -r requirements.txt

python app.py
```

Runs at:

```
http://localhost:5000
```

---

## Environment Variables

Create a `.env` file inside the backend folder.

```env
GEMINI_API_KEY_1=YOUR_API_KEY
GEMINI_API_KEY_2=YOUR_API_KEY
GEMINI_API_KEY_3=YOUR_API_KEY
GEMINI_API_KEY_4=YOUR_API_KEY
OPENROUTER_API_KEY=YOUR_API_KEY
```

The backend automatically switches to the next available API key if one reaches its quota or becomes temporarily unavailable.

---

## 💡 Architecture

```
User

↓

Speech Recognition

↓

React Frontend

↓

Flask Backend

↓

Google Gemini

↓

AI Customer Response

↓

Speech Synthesis

↓

User
```

---

## 📸 Screenshots

Include screenshots of:

- Home Page
- Customer Configuration
- Live Meeting
- AI Avatar
- Conversation Transcript
- Results Page

---

## 🔮 Future Improvements

- Gemini Live API Integration
- Natural Streaming Voice
- Interruptible Conversations (Barge-In)
- Emotion Detection
- AI Facial Expressions
- Meeting Recording
- CRM Integration
- Conversation Analytics Dashboard
- PDF Performance Reports
- Multi-language Support

---

## 👨‍💻 Author

**Mohit Thakur**

GitHub: https://github.com/MohitThakur2552

LinkedIn: https://www.linkedin.com/in/mohit-thakur-1975b22b8

---

## 📄 License

This project is developed for educational and demonstration purposes.
