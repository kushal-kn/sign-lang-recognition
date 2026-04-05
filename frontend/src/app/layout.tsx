import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SilentSign - Learn American Sign Language",
  description: "Master American Sign Language (ASL) with our comprehensive resources. Learn alphabets, phrases, and expand your vocabulary with interactive content.",
  keywords: "sign language, ASL, American Sign Language, learn sign language, deaf culture, sign language alphabet",
  authors: [{ name: "SilentSign" }],
  openGraph: {
    type: "website",
    title: "SilentSign - Learn American Sign Language",
    description: "Master American Sign Language (ASL) with our comprehensive resources.",
    siteName: "SilentSign",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SilentSign - Learn American Sign Language",
    description: "Master American Sign Language (ASL) with our comprehensive resources.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}