import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/ScrollReveal";
import ImageWithFallback from "@/components/ImageWithFallback";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn American Sign Language - SilentSign",
  description:
    "Start your journey to effective communication through American Sign Language (ASL). Browse our curated collection of learning resources and master essential signs.",
  openGraph: {
    type: "article",
    title: "Learn American Sign Language - SilentSign",
    description:
      "Start your journey to effective communication through American Sign Language (ASL).",
  },
};

const learnResources = [
  {
    title: "American Sign Language (ASL) Basics",
    description: "Learn the alphabet, basic signs, and finger spelling.",
    type: "Video",
    duration: "15:42",
    thumbnail: "https://placehold.co/600x338/8ba88e/ffffff?text=ASL+Basics",
    url: "https://www.youtube.com/results?search_query=asl+basics",
  },
  {
    title: "ASL for Beginners - Full Course",
    description: "Comprehensive introduction to American Sign Language.",
    type: "Video",
    duration: "45:20",
    thumbnail: "https://placehold.co/600x338/8ba88e/ffffff?text=ASL+Course",
    url: "https://www.youtube.com/results?search_query=asl+for+beginners+full+course",
  },
  {
    title: "Sign Language Alphabet (ASL)",
    description: "Master the ASL alphabet with clear demonstrations.",
    type: "Video",
    duration: "8:30",
    thumbnail: "https://placehold.co/600x338/8ba88e/ffffff?text=ASL+Alphabet",
    url: "https://www.youtube.com/results?search_query=asl+alphabet",
  },
  {
    title: "Everyday Phrases in Sign Language",
    description: "Learn common phrases used in daily communication.",
    type: "Video",
    duration: "12:15",
    thumbnail: "https://placehold.co/600x338/8ba88e/ffffff?text=Phrases",
    url: "https://www.youtube.com/results?search_query=everyday+phrases+sign+language",
  },
  {
    title: "Learn Sign Language - Free Online Course",
    description: "Structured lessons from beginner to intermediate level.",
    type: "Course",
    duration: "Self-paced",
    thumbnail: "https://placehold.co/600x338/8ba88e/ffffff?text=Free+Course",
    url: "https://www.youtube.com/results?search_query=learn+sign+language+free+online+course",
  },
  {
    title: "ASL Storytime for Beginners",
    description: "Watch stories told in sign language with explanations.",
    type: "Video",
    duration: "20:45",
    thumbnail: "https://placehold.co/600x338/8ba88e/ffffff?text=Storytime",
    url: "https://www.youtube.com/results?search_query=asl+storytime+for+beginners",
  },
];

const commonPhrases = [
  {
    phrase: "Hello",
    signDescription:
      "Hand shape: Open fist. Movement: Touch fingertips to chin, move forward.",
  },
  {
    phrase: "Thank you",
    signDescription:
      "Hand shape: Flat hand near lips. Movement: Move hand forward and down.",
  },
  {
    phrase: "Yes",
    signDescription: "Fist hand. Movement: Move fist up and down.",
  },
  {
    phrase: "No",
    signDescription:
      "Index and middle fingers extended. Movement: Snap fingers together.",
  },
  {
    phrase: "Please",
    signDescription:
      "Hand shape: Flat hand. Movement: Rub chest in circular motion.",
  },
  {
    phrase: "How are you?",
    signDescription: "Hand shape: Flat hands. Movement: Fingers move forward.",
  },
];

export default function LearnPage() {
  return (
    <div className="min-h-screen bg-brand-bg">
      {/* Hero Section */}
      <section className="px-8 py-24 max-w-4xl mx-auto">
        <ScrollReveal delay={0.1}>
          <h1 className="text-5xl lg:text-6xl font-serif mb-6 text-neutral-900">
            Learn Sign Language
          </h1>
          <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
            Start your journey to effective communication through American Sign
            Language (ASL).
          </p>
        </ScrollReveal>
      </section>

      {/* Resources */}
      <section className="px-8 py-24 max-w-7xl mx-auto">
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl font-bold mb-12">
            Recommended Resources
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {learnResources.map((resource, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1}>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-all"
              >
                <div className="aspect-video relative overflow-hidden">
                  <ImageWithFallback
                    src={resource.thumbnail}
                    alt={resource.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                    {resource.duration}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold mb-2">
                    {resource.title}
                  </h3>
                  <p className="text-sm text-neutral-600">
                    {resource.description}
                  </p>
                </div>
              </a>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* ✅ Common Phrases Section (Restored) */}
      <section className="px-8 py-24 max-w-7xl mx-auto bg-white rounded-3xl shadow-sm">
        <ScrollReveal delay={0.2}>
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">
              Common Phrases to Start With
            </h2>
            <p className="text-neutral-600">
              Practice these essential signs in your daily conversations.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {commonPhrases.map((item, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1}>
              <div className="p-6 rounded-2xl bg-brand-bg border border-brand-green/10 hover:border-brand-green/30 transition-colors">
                <h3 className="text-xl font-bold mb-2">
                  {item.phrase}
                </h3>
                <p className="text-neutral-600 text-sm">
                  {item.signDescription}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
      <section className="px-8 py-24 max-w-4xl mx-auto">
        <ScrollReveal delay={0.2}>
          <h2 className="text-3xl font-bold mb-8">Learning Tips</h2>
        </ScrollReveal>
        <div className="space-y-6">
          {[
            "Practice regularly, even if just for 10 minutes a day.",
            "Watch ASL videos and try to mimic the signs.",
            "Find a language partner to practice with.",
            "Use flashcards to memorize vocabulary.",
            "Don't be afraid to make mistakes - they're part of learning!",
          ].map((tip, i) => (
            <ScrollReveal key={i} delay={0.3 + i * 0.1}>
              <div className="flex items-start gap-4 p-6 bg-white rounded-xl">
                <div className="flex-shrink-0 w-8 h-8 bg-brand-green text-white rounded-full flex items-center justify-center font-bold">
                  {i + 1}
                </div>
                <p className="text-neutral-700">{tip}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>
    </div>
  );
}