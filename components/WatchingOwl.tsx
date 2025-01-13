"use client";
import React from "react";
import { create } from "zustand";

interface OwlState {
  direction: number;
  setDirection: (direction: number) => void;
}

export const useOwlStore = create<OwlState>((set) => ({
  direction: 0,
  setDirection: (direction) => set({ direction }),
}));

export const WatchingOwl = () => {
  const { direction } = useOwlStore();

  return (
    <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50">
      <svg
        viewBox="0 0 100 100"
        className="w-20 h-20"
        style={{
          transform: `rotate(${direction * 15}deg)`,
          transition: "transform 0.3s ease-in-out",
        }}
      >
        {/* Owl body */}
        <circle cx="50" cy="50" r="30" fill="#8B4513" />
        {/* Owl face */}
        <circle cx="50" cy="45" r="25" fill="#D2691E" />
        {/* Eyes */}
        <g style={{ transform: `translateX(${direction * 3}px)`, transition: "transform 0.3s ease-in-out" }}>
          <circle cx="40" cy="40" r="8" fill="white" />
          <circle cx="60" cy="40" r="8" fill="white" />
          <circle cx={40 + direction * 2} cy="40" r="4" fill="black" />
          <circle cx={60 + direction * 2} cy="40" r="4" fill="black" />
        </g>
        {/* Beak */}
        <path d="M45 50 L50 55 L55 50" fill="none" stroke="#FFA500" strokeWidth="2" />
        {/* Ears */}
        <path d="M30 25 L40 35 L50 25" fill="#8B4513" />
        <path d="M50 25 L60 35 L70 25" fill="#8B4513" />
      </svg>
    </div>
  );
};
