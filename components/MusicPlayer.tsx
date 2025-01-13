"use client";

import { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface WebKit {
  webkitAudioContext: typeof AudioContext;
}

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const handleFirstInteraction = async () => {
      try {
        if (!audioRef.current) {
          audioRef.current = new Audio();
          audioRef.current.src = "/bg-music.mp3";
          audioRef.current.loop = true;
          audioRef.current.volume = 0.3;
          audioRef.current.preload = "auto";

          const AudioContextConstructor = window.AudioContext || (window as unknown as WebKit).webkitAudioContext;
          audioContextRef.current = new AudioContextConstructor();
          await audioContextRef.current.resume();
        }
      } catch (error) {
        console.error("Audio initialization error:", error);
      }
    };

    document.addEventListener("click", handleFirstInteraction, { once: true });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        if (audioContextRef.current?.state === "suspended") {
          await audioContextRef.current.resume();
        }
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Music toggle error:", error);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gray-900/50 backdrop-blur border border-gray-700 hover:bg-gray-800/50 transition-colors"
      title={isPlaying ? "Mute" : "Play Music"}
    >
      {isPlaying ? <Volume2 className="w-6 h-6 text-[#4CAF50]" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
    </button>
  );
};
