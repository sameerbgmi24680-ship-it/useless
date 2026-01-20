"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
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

            {/* 3D Container with Tilt */}
            <motion.div
                className="relative z-10 flex flex-col items-center"
                style={{
                    rotateX: useTransform(mouseY, [-500, 500], [15, -15]), // Enhanced depth
                    rotateY: useTransform(mouseX, [-500, 500], [-15, 15]),
                    transformStyle: "preserve-3d",
                }}
            >
                {/* Base Shadow Layer (Depth) */}
                <h1 className="text-[15vw] font-black leading-none tracking-tighter text-neutral-900 select-none absolute top-4 left-4 opacity-50 blur-md transform translate-z-[-50px]">
                    USELESS
                </h1>

                {/* Container for Morphing Text */}
                <div className="relative z-20">
                    {/* Layer 1: Gradient Text (Fades OUT on scroll) */}
                    <motion.h1
                        className="text-[15vw] font-black leading-none tracking-tighter bg-gradient-to-br from-[var(--royal-gold)] via-[var(--neon-purple)] to-cyan-500 bg-clip-text text-transparent select-none absolute inset-0"
                        style={{
                            opacity: useTransform(useScroll().scrollY, [0, 300], [1, 0]),
                        }}
                    >
                        USELESS
                    </motion.h1>

                    {/* Layer 2: Photo Text (Fades IN on scroll) */}
                    <motion.h1
                        className="relative text-[15vw] font-black leading-none tracking-tighter text-transparent bg-clip-text select-none"
                        style={{
                            backgroundImage: "url('/images/usless-group.jpg')", // Ensure this path is correct
                            backgroundSize: "cover",
                            backgroundPosition: useTransform(useScroll().scrollY, [0, 800], ["50% 0%", "50% 100%"]), // Vertical Internal Motion
                            WebkitBackgroundClip: "text",
                            opacity: useTransform(useScroll().scrollY, [0, 300], [0, 1]), // Cross-fade
                        }}
                    >
                        USELESS
                    </motion.h1>
                </div>

                <p className="mt-8 font-mono text-sm uppercase tracking-[0.5em] text-neutral-400 transform translate-z-[20px] drop-shadow-lg">
                    Est. 2024 • The Collective
                </p>
            </motion.div>

            {/* Revealed Text (Neon/Gold) - Spotlight Effect */}
            <motion.div
                className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none mix-blend-overlay"
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
                <h1 className="text-[15vw] font-black leading-none tracking-tighter text-white select-none drop-shadow-[0_0_30px_rgba(255,255,255,0.8)]">
                    USELESS
                </h1>
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
