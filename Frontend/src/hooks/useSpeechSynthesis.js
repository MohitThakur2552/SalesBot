import { useState } from "react";

export default function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  const speak = (text, onEnd = () => {}) => {
    if (!window.speechSynthesis) {
      console.error("Speech Synthesis not supported");
      return;
    }

    // Stop previous speech if any
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;
    utterance.volume = 1;

    // Optional: choose a better voice
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find(v => v.name.includes("Google")) ||
      voices.find(v => v.lang.startsWith("en"));

    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => {
      setIsSpeaking(true);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      onEnd();
    };

    utterance.onerror = (err) => {
      console.error(err);
      setIsSpeaking(false);
      onEnd();
    };

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  return {
    speak,
    stopSpeaking,
    isSpeaking,
  };
}