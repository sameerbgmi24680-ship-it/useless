"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

export function Hero() {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <div
            className="group relative flex h-screen w-full items-center justify-center bg-black overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Background - Subtle Grid & Ambient Pulse */}
            <motion.div
                className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"
                animate={{ opacity: [0.3, 0.6, 0.3], scale: [1, 1.05, 1] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Base Text (Dark/Muted) */}
            <div className="relative z-0 flex flex-col items-center">
                <h1 className="text-[15vw] font-black leading-none tracking-tighter text-neutral-800 select-none">
                    USELESS
                </h1>
                <p className="mt-4 font-mono text-sm uppercase tracking-[0.5em] text-neutral-700">
                    Est. 2024 • The Collective
                </p>
            </div>

            {/* Revealed Text (Neon/Gold) */}
            <motion.div
                className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none"
                style={{
                    maskImage: useMotionTemplate`radial-gradient(
            300px circle at ${mouseX}px ${mouseY}px,
            black 0%,
            transparent 100%
          )`,
                    WebkitMaskImage: useMotionTemplate`radial-gradient(
            300px circle at ${mouseX}px ${mouseY}px,
            black 0%,
            transparent 100%
          )`,
                }}
            >
                <h1 className="text-[15vw] font-black leading-none tracking-tighter bg-gradient-to-br from-[var(--royal-gold)] via-[var(--neon-purple)] to-cyan-500 bg-clip-text text-transparent select-none drop-shadow-[0_0_30px_rgba(176,38,255,0.5)]">
                    USELESS
                </h1>
                <p className="mt-4 font-mono text-sm uppercase tracking-[0.5em] text-[var(--royal-gold)] drop-shadow-md">
                    Est. 2024 • The Collective
                </p>
            </motion.div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 1 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 flex flex-col items-center gap-2"
            >
                <span className="text-[10px] uppercase tracking-widest">Scroll to Reveal</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-[var(--royal-gold)] to-transparent" />
            </motion.div>
        </div>
    );
}
