"use client";

import { Info } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollReveal } from "../ScrollReveal";

export const Navbar = () => {
    const pathname = usePathname();

    const navLinks = [
        { href: "/", label: "Home" },
        { href: "/learn", label: "Learn" },
        { href: "/recognize", label: "Recognize" },
    ];

    return (
        <ScrollReveal delay={0}>
            <nav className="flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
            <div className="text-xl font-bold tracking-tight">SilentSign</div>
            <div className="flex items-center gap-8 text-sm font-medium text-neutral-600">
                {navLinks.map((link) => {
                    const isActive = pathname === link.href;
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={
                                isActive
                                    ? "text-neutral-900 border-b-2 border-neutral-900 pb-1"
                                    : "hover:text-neutral-900 transition-colors"
                            }
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
            <div className="text-neutral-400">
                <Info size={20} />
            </div>
            </nav>
        </ScrollReveal>
    );
};