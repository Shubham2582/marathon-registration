"use client";

import { useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export const MusicControl = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(new Audio("/bg-music.mp3"));

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  const toggleMusic = async () => {
    try {
      if (isPlaying) {
        audio.pause();
      } else {
        await audio.play();
      }
      setIsPlaying(!isPlaying);
    } catch (error) {
      console.error("Error playing audio:", error);
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
