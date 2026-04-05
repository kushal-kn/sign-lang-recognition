import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";
import { Vocabulary } from "@/components/Vocabulary";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "SilentSign - Master Sign Language Communication",
  description: "The beauty of silent dialogue. Learn American Sign Language (ASL) with our comprehensive resources. Master alphabets, phrases, and expand your vocabulary.",
  openGraph: {
    type: "website",
    title: "SilentSign - Master Sign Language Communication",
    description: "Learn American Sign Language (ASL) with our comprehensive resources. Master alphabets, phrases, and expand your vocabulary.",
    url: "https://silentsign.com",
    siteName: "SilentSign",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "SilentSign - Master Sign Language Communication",
    description: "Learn American Sign Language (ASL) with our comprehensive resources.",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen selection:bg-brand-blue selection:text-neutral-900">
      <Hero />
      <Features />
      <Vocabulary />
    </div>
  );
}
