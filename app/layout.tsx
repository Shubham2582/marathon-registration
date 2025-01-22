import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { MusicPlayer } from "@/components/MusicPlayer";

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
        {children}
      </body>
    </html>
  );
}
