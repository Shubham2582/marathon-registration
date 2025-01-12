import { Inter } from "next/font/google";
import { MusicControl } from "@/components/MusicControl";
import type { Metadata } from "next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Abujhmad Marathon",
  description: "",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        <MusicControl />
        {children}
      </body>
    </html>
  );
}
