"use client";

import { motion } from "framer-motion";
import { Camera, Brain, Languages } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

export const Features = () => (
    <section className="px-8 py-24 max-w-7xl mx-auto w-full">
        <ScrollReveal delay={0.1}>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
                <div className="max-w-xl">
                    <h2 className="text-4xl font-serif mb-4">Bridging the gap with AI Intelligence.</h2>
                    <p className="text-neutral-500 leading-relaxed">
                        Our technology translates fluid motion into text in real time, making communication accessible for everyone, everywhere.
                    </p>
                </div>
                <a href="#" className="text-neutral-400 text-sm border-b border-neutral-300 pb-1 hover:text-neutral-900 transition-colors">
                    Technology Overview
                </a>
            </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
            {[
                {
                    title: "Motion Capture",
                    desc: "High precision tracking points map your hand movements and facial expressions through any standard camera.",
                    icon: <Camera className="text-neutral-600" size={24} />,
                    bg: "bg-brand-blue/30"
                },
                {
                    title: "Neural Analysis",
                    desc: "Our trained models interpret the syntax and context of signs, distinguishing between similar gestures with 95% accuracy.",
                    icon: <Brain className="text-neutral-600" size={24} />,
                    bg: "bg-brand-green-light"
                },
                {
                    title: "Real-time Feedback",
                    desc: "Instant transcription appears on-screen, allowing for a seamless communication flow between signers and non-signers.",
                    icon: <Languages className="text-neutral-600" size={24} />,
                    bg: "bg-brand-blue/30"
                }
            ].map((feature, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`${feature.bg} p-8 rounded-3xl flex flex-col gap-6`}
                >
                    <div className="w-12 h-12 bg-white/50 rounded-xl flex items-center justify-center">
                        {feature.icon}
                    </div>
                    <div>
                        <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                        <p className="text-sm text-neutral-600 leading-relaxed">{feature.desc}</p>
                    </div>
                </motion.div>
            ))}
        </div>

        <div className="mt-16">
            <ScrollReveal delay={0.3}>
                <div className="flex justify-center">
                    <div className="w-16 h-1 bg-brand-green/30 rounded-full" />
                </div>
            </ScrollReveal>
        </div>
    </section>
);