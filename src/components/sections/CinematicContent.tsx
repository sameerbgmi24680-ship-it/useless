"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion"; // Keep using Framer for simple reveals
import { GlitchText } from "@/components/ui/GlitchText";

interface CinematicContentProps {
    scrollProgress: any; // Unused in new flow
}

export function CinematicContent({ scrollProgress }: CinematicContentProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    const y = useTransform(scrollYProgress, [0, 1], ["-20%", "0%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);

    return (
        <section
            ref={containerRef}
            className="relative min-h-screen w-full bg-[var(--void-black)] flex flex-col items-center justify-center py-40 z-50 overflow-hidden"
        >
            {/* Background Grid/Cyberpunk Noise */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(20,20,20,0.8)_1px,transparent_1px),linear-gradient(90deg,rgba(20,20,20,0.8)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

            <motion.div
                style={{ y, opacity }}
                className="relative z-10 flex flex-col items-center justify-center space-y-12"
            >
                {/* CYBERPUNK FINALE */}
                <h1 className="text-[15vw] font-black leading-none tracking-tighter text-transparent bg-clip-text select-none text-center outline-text-neon relative group cursor-default">
                    <span className="absolute inset-0 text-[var(--lando-neon)] opacity-30 blur-2xl animate-pulse">USELESS</span>
                    <GlitchText text="USELESS" className="text-white drop-shadow-[0_0_15px_rgba(210,255,0,0.5)]" />
                </h1>

                {/* Call to Action Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl px-8">
                    <div className="border border-[var(--lando-neon)] p-8 bg-[var(--void-black)] hover:bg-[var(--lando-neon)] hover:text-black transition-all duration-300 group cursor-pointer relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
                        <h3 className="text-2xl font-bold font-mono mb-2">JOIN THE COLLECTIVE</h3>
                        <p className="font-mono text-sm opacity-70 group-hover:opacity-100"> initiate_protocol(v2.0) </p>
                    </div>

                    <div className="border border-[var(--quadrant-orange)] p-8 bg-[var(--void-black)] hover:bg-[var(--quadrant-orange)] hover:text-black transition-all duration-300 group cursor-pointer">
                        <h3 className="text-2xl font-bold font-mono mb-2">LIFESTYLE APPAREL</h3>
                        <p className="font-mono text-sm opacity-70 group-hover:opacity-100"> equipping_future_agents </p>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-40 text-center relative">
                    <div className="h-px w-screen bg-gradient-to-r from-transparent via-[var(--lando-neon)] to-transparent opacity-50 mb-8" />
                    <p className="text-[10px] md:text-xs text-[var(--lando-neon)] uppercase tracking-[0.3em] font-mono opacity-60">
                        © USELESS Collective — Engineered in Motion
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
