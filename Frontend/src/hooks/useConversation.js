import { useEffect, useState, useRef } from "react";
import api from "../services/api";

import useSpeechRecognition from "./useSpeechRecognition";
// Removed useSpeechSynthesis completely

export default function useConversation(config) {
  const [meetingStatus, setMeetingStatus] = useState("Idle");
  const [conversation, setConversation] = useState([]);
  
  // Ref to hold the current audio instance so we can stop it on demand
  const audioRef = useRef(null);

  const stopSpeaking = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };

  // Helper to play base64 audio and trigger callbacks
  const playAudioStream = (base64Audio, onComplete) => {
    stopSpeaking(); // Stop any currently playing audio
    
    const audio = new Audio(`data:audio/mp3;base64,${base64Audio}`);
    audioRef.current = audio;
    
    audio.onended = () => {
      if (onComplete) onComplete();
    };
    
    audio.play().catch(e => console.error("Audio playback failed:", e));
  };

  // Helper to fetch audio for frontend-generated text (greetings/errors)
  const speakStaticText = async (text, onComplete) => {
    try {
      const response = await api.post("/tts", { text });
      if (response.data.audio) {
        playAudioStream(response.data.audio, onComplete);
      } else {
        onComplete(); // Failsafe if TTS fails
      }
    } catch (error) {
      console.error("TTS fetch error:", error);
      onComplete(); 
    }
  };

  const processUserSpeech = async (text) => {
    if (!text.trim()) return;

    // User message
    const updatedConversation = [
      ...conversation,
      {
        role: "user",
        message: text,
      },
    ];

    setConversation(updatedConversation);
    setMeetingStatus("Thinking");

    try {
      const response = await api.post("/chat", {
        config,
        conversation: updatedConversation,
      });

      // Backend now returns both text and the base64 audio
      const { reply, audio } = response.data;

      const finalConversation = [
        ...updatedConversation,
        {
          role: "customer",
          message: reply,
        },
      ];

      setConversation(finalConversation);
      setMeetingStatus("Speaking");

      // Play the audio received from Edge-TTS
      if (audio) {
        playAudioStream(audio, () => {
          setMeetingStatus("Listening");
          startListening();
        });
      } else {
        // Fallback in case audio generation failed on backend
        setMeetingStatus("Listening");
        startListening();
      }

    } catch (error) {
      console.error(error);

      const errorReply = "Sorry, I couldn't understand. Could you repeat that?";

      setConversation((prev) => [
        ...prev,
        {
          role: "customer",
          message: errorReply,
        },
      ]);

      setMeetingStatus("Speaking");
      
      // Fetch and play audio for the error message
      speakStaticText(errorReply, () => {
        setMeetingStatus("Listening");
        startListening();
      });
    }
  };

  const {
    startListening,
    stopListening,
    transcript,
    isListening,
    resetTranscript,
  } = useSpeechRecognition(processUserSpeech);

  useEffect(() => {
    if (!config) return;

    // const greeting = `Hello. I am a ${config.personality.toLowerCase()} customer from the ${config.industry} industry. I would like to discuss ${config.goal.toLowerCase()}. Please tell me about your product.`;
    const greeting= `Hello. Thanks for getting on the call today`;
    setConversation([
      {
        role: "customer",
        message: greeting,
      },
    ]);

    setMeetingStatus("Speaking");

    // Fetch and play audio for the initial greeting
    speakStaticText(greeting, () => {
      setMeetingStatus("Listening");
      startListening();
    });

    // Cleanup: stop speaking if the component unmounts mid-sentence
    return () => stopSpeaking();
  }, [config]);

  const endMeeting = () => {
    stopListening();
    stopSpeaking(); // Halts the audio instantly
    setMeetingStatus("Ended");
  };

  return {
    conversation,
    transcript,
    isListening,
    meetingStatus,
    startListening,
    stopListening,
    endMeeting,
  };
}