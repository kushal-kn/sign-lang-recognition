import { ScrollReveal } from "../ScrollReveal";

export const Footer = () => (
    <ScrollReveal delay={0.5}>
        <footer className="px-8 py-12 max-w-7xl mx-auto w-full border-t border-neutral-200 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-lg font-bold">SilentSign</div>
            <div className="text-[10px] font-bold tracking-widest text-neutral-400">
                © 2024. SILENTSIGN. ALL RIGHTS RESERVED.
            </div>
        </footer>
    </ScrollReveal>
);