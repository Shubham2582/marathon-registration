"use client";

import { Inter } from "next/font/google";
import { useEffect } from "react";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const requestPermissionAndPlayAudio = async () => {
      try {
        // Request notification permission which will show in browser's permission UI
        if ("Notification" in window) {
          const permission = await Notification.requestPermission();

          if (permission === "granted") {
            const audio = new Audio("/bg-music.mp3");
            audio.loop = true;
            audio.volume = 0.3;
            await audio.play();
          }
        }
      } catch (error) {
        console.error("Error setting up audio:", error);
      }
    };

    requestPermissionAndPlayAudio();
  }, []);

  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
