import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(onResult) {
  const recognitionRef = useRef(null);

  const [isListening, setIsListening] = useState(false);

  const [transcript, setTranscript] = useState("");

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();

    recognition.continuous = false;

    recognition.interimResults = false;

    recognition.lang = "en-US";

    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript;

      setTranscript(text);

      if (onResult) {
        onResult(text);
      }
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Error:", event.error);

      setIsListening(false);
    };

    recognitionRef.current = recognition;
  }, [onResult]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    setTranscript("");

    recognitionRef.current.start();
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    recognitionRef.current.stop();
  };

  const resetTranscript = () => {
    setTranscript("");
  };

  return {
    transcript,
    isListening,
    startListening,
    stopListening,
    resetTranscript,
  };
}