import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { MusicPlayer } from "@/components/MusicPlayer";
import "./globals.css";
import { WatchingOwl } from "@/components/WatchingOwl";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abujhmad Marathon",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <MusicPlayer />
        <WatchingOwl />
        {children}
      </body>
    </html>
  );
}
