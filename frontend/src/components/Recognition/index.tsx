"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { Play, Square } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal } from "../ScrollReveal";
import { translateSignLanguage } from "@/lib/translation";

export default function RecognitionScreen() {
    const [isStarted, setIsStarted] = useState(false);
    const [isSpeechEnabled, setIsSpeechEnabled] = useState(true);

    // The current sign being detected (e.g. "A")
    const [currentSign, setCurrentSign] = useState("");

    // Letters accumulated so far into a word (e.g. ["H","E","L","L","O"])
    const [letterBuffer, setLetterBuffer] = useState<string[]>([]);

    // Completed words saved to history
    const [history, setHistory] = useState<string[]>([]);

    const [isHandDetected, setIsHandDetected] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    const lastSignRef = useRef<string>("");
    const noSignCountRef = useRef<number>(0);

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const streamRef = useRef<MediaStream | null>(null);
    const processingIntervalRef = useRef<NodeJS.Timeout | null>(null);

    // WITH this:
    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: "user" },
            });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
                streamRef.current = stream;

                // Wait for video to be ready before marking as started
                videoRef.current.onloadedmetadata = () => {
                    videoRef.current?.play().catch(console.error);
                    setIsStarted(true);
                };
            }
        } catch (error) {
            console.error("Error accessing camera:", error);
            alert("Please allow camera access to use this feature.");
        }
    };

    const stopCamera = () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach((t) => t.stop());
            streamRef.current = null;
        }
        if (videoRef.current) videoRef.current.srcObject = null;
        if (processingIntervalRef.current) clearInterval(processingIntervalRef.current);

        setIsStarted(false);
        setIsHandDetected(false);
        setCurrentSign("");
        setLetterBuffer([]);
        lastSignRef.current = "";
        noSignCountRef.current = 0;
    };

    const speak = useCallback((text: string) => {
        if ("speechSynthesis" in window) {
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(new SpeechSynthesisUtterance(text));
        }
    }, []);

    const saveToHistory = useCallback((word: string) => {
        if (!word) return;
        setHistory((prev) => [word, ...prev].slice(0, 10));
        if (isSpeechEnabled) speak(word);
    }, [isSpeechEnabled, speak]);

    const captureFrame = useCallback(async () => {
        if (!videoRef.current || !canvasRef.current || !isStarted || isProcessing) return;

        const canvas = canvasRef.current;
        const video = videoRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const base64Image = canvas.toDataURL("image/jpeg", 0.7).split(",")[1];

        setIsProcessing(true);
        const sign = await translateSignLanguage(base64Image);
        setIsProcessing(false);

        const detected = sign && sign !== "Waiting for input..." && sign !== "Error in translation";

        if (detected) {
            setIsHandDetected(true);
            setCurrentSign(sign);
            noSignCountRef.current = 0;

            // Only append if it's a new sign
            if (sign !== lastSignRef.current) {
                lastSignRef.current = sign;
                setLetterBuffer((prev) => [...prev, sign]);
            }
        } else {
            setIsHandDetected(false);
            setCurrentSign("");
            noSignCountRef.current += 1;

            // 3 consecutive empty frames = word boundary
            if (noSignCountRef.current === 3 && lastSignRef.current !== "") {
                setLetterBuffer((prev) => {
                    if (prev.length === 0) return prev;
                    saveToHistory(prev.join(""));
                    return [];
                });
                lastSignRef.current = "";
            }
        }
    }, [isStarted, isProcessing, saveToHistory]);

    useEffect(() => {
        if (isStarted) {
            processingIntervalRef.current = setInterval(captureFrame, 1500);
        } else {
            if (processingIntervalRef.current) clearInterval(processingIntervalRef.current);
        }
        return () => {
            if (processingIntervalRef.current) clearInterval(processingIntervalRef.current);
        };
    }, [isStarted, captureFrame]);

    const clearHistory = () => {
        setHistory([]);
        setCurrentSign("");
        setLetterBuffer([]);
        lastSignRef.current = "";
        noSignCountRef.current = 0;
    };

    const commitWord = () => {
        if (letterBuffer.length === 0) return;
        saveToHistory(letterBuffer.join(""));
        setLetterBuffer([]);
        lastSignRef.current = "";
    };

    return (
        <main className="flex flex-col items-center max-w-5xl mx-auto px-4 py-12">
            <ScrollReveal delay={0.1} className="text-center mb-12">
                <h1 className="text-4xl font-bold text-gray-900 mb-4">Real-time Recognition</h1>
                <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                    Sign clearly within the frame. Letters accumulate into words automatically.
                </p>
            </ScrollReveal>

            {/* Camera Feed */}
            <div className="relative w-full aspect-video bg-gray-100 rounded-3xl overflow-hidden shadow-2xl border-8 border-white ring-1 ring-gray-200">
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className={`w-full h-full object-cover ${isStarted ? "block" : "hidden"}`}
                />

                {/* Show placeholder only when not started */}
                {!isStarted && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-50">
                        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 text-gray-300">
                            <Play size={32} />
                        </div>
                        <p className="text-gray-400 font-medium">Camera is off</p>
                    </div>
                )}


                <AnimatePresence>
                    {isHandDetected && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="absolute top-6 right-6 bg-green-100/90 backdrop-blur-sm text-green-700 px-4 py-1.5 rounded-full text-xs font-bold flex items-center gap-2 shadow-sm"
                        >
                            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                            HAND DETECTED
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Translation Overlay */}
                <div className="absolute bottom-6 left-6 right-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-white/20"
                    >
                        <div className="flex items-center justify-between mb-3">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Current Sign</span>
                            {currentSign && (
                                <span className="text-2xl font-black text-[#2D4A3E]">{currentSign}</span>
                            )}
                        </div>
                        <div className="flex items-center gap-1 flex-wrap min-h-[2rem]">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mr-2">Building:</span>
                            {letterBuffer.length === 0 ? (
                                <span className="text-gray-300 italic text-sm">waiting for signs...</span>
                            ) : (
                                letterBuffer.map((letter, i) => (
                                    <motion.span
                                        key={i}
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="inline-block bg-[#A8C3B1]/30 text-[#2D4A3E] font-bold px-2 py-0.5 rounded-md text-lg"
                                    >
                                        {letter}
                                    </motion.span>
                                ))
                            )}
                        </div>
                    </motion.div>
                </div>
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {/* Controls */}
            <div className="flex items-center gap-4 mt-12 bg-gray-100/50 p-2 rounded-full border border-gray-200 flex-wrap justify-center">
                <button
                    onClick={startCamera}
                    disabled={isStarted}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${isStarted ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-[#A8C3B1] text-[#2D4A3E] hover:bg-[#97B2A0] shadow-sm"
                        }`}
                >
                    <Play size={18} fill="currentColor" />
                    Start
                </button>
                <button
                    onClick={stopCamera}
                    disabled={!isStarted}
                    className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${!isStarted ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-gray-700 hover:bg-gray-400 shadow-sm"
                        }`}
                >
                    <Square size={18} fill="currentColor" />
                    Stop
                </button>
                <button
                    onClick={commitWord}
                    disabled={letterBuffer.length === 0}
                    className={`px-6 py-3 rounded-full font-bold transition-all border ${letterBuffer.length === 0
                        ? "bg-gray-100 text-gray-300 border-gray-200 cursor-not-allowed"
                        : "bg-white text-[#2D4A3E] border-[#A8C3B1] hover:bg-[#A8C3B1]/20"
                        }`}
                >
                    Save Word ✓
                </button>
                <div className="h-8 w-px bg-gray-300 mx-2" />
                <button
                    onClick={clearHistory}
                    className="px-6 py-3 rounded-full font-bold text-gray-600 hover:bg-gray-200 transition-all border border-gray-300"
                >
                    Clear
                </button>
                <div className="flex items-center gap-3 ml-4 mr-6">
                    <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Speech</span>
                    <button
                        onClick={() => setIsSpeechEnabled(!isSpeechEnabled)}
                        className={`relative w-12 h-6 rounded-full transition-colors ${isSpeechEnabled ? "bg-green-500" : "bg-gray-300"}`}
                    >
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${isSpeechEnabled ? "left-7" : "left-1"}`} />
                    </button>
                </div>
            </div>

            {/* History */}
            <div className="w-full mt-16 max-w-3xl">
                <ScrollReveal delay={0.2}>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-lg font-bold text-gray-900">Word History</h2>
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                            {history.length} WORDS CAPTURED
                        </span>
                    </div>
                </ScrollReveal>
                <div className="space-y-4">
                    <AnimatePresence initial={false}>
                        {history.map((word, index) => (
                            <ScrollReveal key={index} delay={0.1 * index}>
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex items-center justify-between"
                                >
                                    <p className="text-gray-700 font-medium text-lg">{word}</p>
                                    <button
                                        onClick={() => speak(word)}
                                        className="text-xs text-[#2D4A3E] font-bold px-3 py-1 rounded-full border border-[#A8C3B1] hover:bg-[#A8C3B1]/20 transition-all"
                                    >
                                        🔊 Speak
                                    </button>
                                </motion.div>
                            </ScrollReveal>
                        ))}
                    </AnimatePresence>
                    {history.length === 0 && (
                        <div className="bg-gray-50/50 p-6 rounded-2xl border border-dashed border-gray-200">
                            <p className="text-gray-400 italic">Signed words will appear here...</p>
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}