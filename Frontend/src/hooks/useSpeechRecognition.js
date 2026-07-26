import { useEffect, useRef, useState } from "react";

export default function useSpeechRecognition(onResult) {
  const recognitionRef = useRef(null);
  const silenceTimer = useRef(null);

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

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      let finalTranscript = "";
      let interimTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];

        if (result.isFinal) {
          finalTranscript += result[0].transcript;
        } else {
          interimTranscript += result[0].transcript;
        }
      }

      const currentText = (finalTranscript + interimTranscript).trim();
      setTranscript(currentText);

      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }

      silenceTimer.current = setTimeout(() => {
        if (currentText.length > 2) {
          recognition.stop();
          onResult(currentText);
        }
      }, 1800);
    };

    recognition.onerror = (event) => {
      console.log(event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);

      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      if (silenceTimer.current) {
        clearTimeout(silenceTimer.current);
      }
    };
  }, [onResult]);

  const startListening = () => {
    if (!recognitionRef.current) return;

    setTranscript("");

    try {
      recognitionRef.current.start();
    } catch {}
  };

  const stopListening = () => {
    if (!recognitionRef.current) return;

    if (silenceTimer.current) {
      clearTimeout(silenceTimer.current);
    }

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