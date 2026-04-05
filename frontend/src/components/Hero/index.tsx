"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { ScrollReveal } from "../ScrollReveal";

export const Hero = () => (
    <section className="px-8 pt-12 pb-24 max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">
        <ScrollReveal delay={0.1} className="lg:pr-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
            >
                <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-500 bg-neutral-200 rounded-full mb-6">
                    DISCOVERY
                </span>
                <h1 className="text-6xl lg:text-7xl font-serif leading-[1.1] mb-8">
                    The beauty of <br />
                    <span className="italic text-neutral-400">silent</span> dialogue.
                </h1>
                <p className="text-lg text-neutral-600 max-w-md mb-10 leading-relaxed">
                    Sign language is more than hand gestures—it's a rich, visual-spatial language with its own grammar and culture. Explore the depth of non-verbal communication.
                </p>
                <div className="flex items-center gap-8">
                    <Link
                        href="/learn"
                        className="bg-brand-green text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-opacity inline-flex items-center gap-2"
                    >
                        Start Learning <ChevronRight size={16} />
                    </Link>
                    <Link
                        href="/recognize"
                        className="flex items-center gap-2 text-neutral-500 font-medium hover:text-neutral-900 transition-colors"
                    >
                        View Guide <ChevronRight size={18} />
                    </Link>
                </div>
            </motion.div>
        </ScrollReveal>

        <ScrollReveal delay={0.3} className="relative flex justify-center lg:pl-8">
            {/* Abstract blobs */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-brand-blue rounded-full blur-3xl opacity-40 -z-10" />
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-brand-green rounded-full blur-3xl opacity-30 -z-10" />

            {/* Hand Illustration - Sign Language Hands */}
            <div className="relative w-full max-w-md aspect-square flex items-center justify-center">
                <img
                    src="/hero-image.png"
                    alt="Sign language hands"
                    className="w-full h-full object-contain drop-shadow-2xl"
                />
            </div>
        </ScrollReveal>
    </section>
);