"use client";

import { useState, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface WebKit {
  webkitAudioContext: typeof AudioContext;
}

const audioRef = { current: null as HTMLAudioElement | null };
const audioContextRef = { current: null as AudioContext | null };
const isPlayingRef = { current: false };

export const toggleMusic = async () => {
  if (!audioRef.current) return;

  try {
    if (isPlayingRef.current) {
      audioRef.current.pause();
      isPlayingRef.current = false;
    } else {
      if (audioContextRef.current?.state === "suspended") {
        await audioContextRef.current.resume();
      }
      await audioRef.current.play();
      isPlayingRef.current = true;
    }
    window.dispatchEvent(new CustomEvent("musicStateChange", { detail: isPlayingRef.current }));
  } catch (error) {
    console.error("Music toggle error:", error);
  }
};

export const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleMusicStateChange = (e: CustomEvent) => {
      setIsPlaying(e.detail);
    };

    window.addEventListener("musicStateChange", handleMusicStateChange as EventListener);

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
      window.removeEventListener("musicStateChange", handleMusicStateChange as EventListener);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
      document.removeEventListener("click", handleFirstInteraction);
    };
  }, []);

  const handleToggleMusic = async () => {
    await toggleMusic();
  };

  return (
    <button
      onClick={handleToggleMusic}
      className="fixed md:bottom-4 md:left-4 bottom-2 left-2 z-50 p-3 rounded-full bg-gray-900/50 backdrop-blur border border-gray-700 hover:bg-gray-800/50 transition-colors"
      title={isPlaying ? "Mute" : "Play Music"}
    >
      {!isPlaying ? <VolumeX className="w-6 h-6 text-gray-400" /> : <Volume2 className="w-6 h-6 text-[#4CAF50]" />}
    </button>
  );
};
