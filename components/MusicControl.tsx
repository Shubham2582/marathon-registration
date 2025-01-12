"use client";

import { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/bg-music.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.3;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    };
  }, []);

  const toggleMusic = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        await audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  return (
    <button
      onClick={toggleMusic}
      className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-gray-900/50 backdrop-blur 
      border border-gray-700 hover:bg-gray-800/50 transition-colors
      animate-bounce-slow"
      title={isPlaying ? "Mute" : "Play Music"}
    >
      {isPlaying ? <Volume2 className="w-6 h-6 text-[#4CAF50]" /> : <VolumeX className="w-6 h-6 text-gray-400" />}
    </button>
  );
};
