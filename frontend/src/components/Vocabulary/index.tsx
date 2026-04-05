import { ArrowUpRight, Users, Briefcase, BookOpen } from "lucide-react";
import { ScrollReveal } from "../ScrollReveal";

export const Vocabulary = () => (
    <section className="px-8 py-24 max-w-7xl mx-auto w-full">
        <ScrollReveal delay={0.1} className="text-center mb-16">
            <h2 className="text-5xl font-serif mb-4">Expand your vocabulary</h2>
            <p className="text-neutral-500">Explore curated modules designed by linguistic experts to take you from basic alphabets to complex narrative structures.</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[240px]">
            {/* The Fundamentals */}
            <div className="md:col-span-6 row-span-1">
                <ScrollReveal delay={0.2}>
                    <div className="bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="z-10">
                            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2 block">BEGINNER</span>
                            <h3 className="text-2xl font-serif">The Fundamentals</h3>
                            <p className="text-sm text-neutral-500 mt-2 w-60">Master the alphabet, numbers, and core introductory phrases.</p>
                        </div>
                        <div className="w-10 h-10 rounded-full border border-neutral-200 flex items-center justify-center group-hover:bg-neutral-900 group-hover:text-white transition-all">
                            <ArrowUpRight size={18} />
                        </div>
                        <div className="absolute right-0 bottom-0 w-1/2 h-full bg-brand-green-light/50 flex items-center justify-center">
                            <Users className="text-brand-green opacity-40" size={80} />
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Social Interaction */}
            <div className="md:col-span-6 row-span-1">
                <ScrollReveal delay={0.3}>
                    <div className="bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                        <div className="z-10">
                            <span className="text-[10px] font-bold tracking-widest text-neutral-400 uppercase mb-2 block">MOST POPULAR</span>
                            <h3 className="text-2xl font-serif">Social Interaction</h3>
                            <p className="text-sm text-neutral-500 mt-2 max-w-60">Learn how to express feelings, ask questions, and share experience.</p>
                            <div className="flex items-center gap-2 mt-4">
                                <div className="flex -space-x-2">
                                    {[1, 2, 3].map(i => (
                                        <div key={i} className="w-6 h-6 rounded-full bg-neutral-200 border-2 border-white" />
                                    ))}
                                </div>
                                <span className="text-[10px] text-neutral-400 font-medium">6k+ students enrolled</span>
                            </div>
                        </div>
                        <div className="absolute right-0 top-0 w-1/3 h-full bg-neutral-100 flex items-center justify-center">
                            <img
                                src="https://picsum.photos/seed/person/400/600"
                                alt="Person"
                                className="w-full h-full object-cover grayscale opacity-80"
                                referrerPolicy="no-referrer"
                            />
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Professional Sign */}
            <div className="md:col-span-4 row-span-1">
                <ScrollReveal delay={0.4}>
                    <div className="bg-white border border-neutral-200 rounded-3xl p-8 flex flex-col justify-between group">
                        <div>
                            <div className="w-10 h-10 bg-brand-green-light rounded-xl flex items-center justify-center mb-4">
                                <Briefcase className="text-brand-green" size={20} />
                            </div>
                            <h3 className="text-xl font-bold">Professional Sign</h3>
                            <p className="text-sm text-neutral-500 mt-2">Business terminology and office etiquette in ASL.</p>
                        </div>
                        <div className="mt-4 opacity-30 group-hover:opacity-100 transition-opacity">
                            <svg viewBox="0 0 100 40" className="w-full h-10 text-neutral-800">
                                <path d="M10,20 Q30,5 50,20 T90,20" fill="none" stroke="currentColor" strokeWidth="1" />
                            </svg>
                        </div>
                    </div>
                </ScrollReveal>
            </div>

            {/* Deaf Culture & History */}
            <div className="md:col-span-8 row-span-1">
                <ScrollReveal delay={0.5}>
                    <div className="bg-brand-green-light rounded-3xl p-8 flex items-center justify-between group">
                        <div className="max-w-md">
                            <h3 className="text-3xl font-serif mb-4">Deaf Culture & History</h3>
                            <p className="text-sm text-neutral-600 leading-relaxed">
                                Understanding the rich heritage and community behind the language you are learning.
                            </p>
                        </div>
                        <div className="w-24 h-24 bg-white/50 rounded-2xl flex items-center justify-center">
                            <BookOpen className="text-brand-green" size={48} />
                        </div>
                    </div>
                </ScrollReveal>
            </div>
        </div>
    </section>
);
