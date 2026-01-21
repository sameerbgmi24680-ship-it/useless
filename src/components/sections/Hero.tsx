"use client";

import { motion, useMotionTemplate, useMotionValue, useScroll, useTransform } from "framer-motion";
import { MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface HeroProps {
    scrollProgress: any;
}

export function Hero({ scrollProgress }: HeroProps) {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Cinematic Morph: 0-10%
    // Gradient Text fades OUT
    // Photo Text fades IN
    // Whole Container moves UP and Scales DOWN (Inverse motion)

    const gradientOpacity = useTransform(scrollProgress, [0, 0.05], [1, 0]);
    const photoOpacity = useTransform(scrollProgress, [0, 0.05], [0, 1]); // Quick morph

    const contentScale = useTransform(scrollProgress, [0, 0.1], [1, 0.8]);
    const contentY = useTransform(scrollProgress, [0, 0.1], ["0%", "-20%"]);
    const contentBlur = useTransform(scrollProgress, [0, 0.08, 0.15], ["0px", "0px", "10px"]);

    function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    return (
        <motion.div
            className="group relative flex h-full w-full items-center justify-center bg-black overflow-hidden perspective-1000"
            onMouseMove={handleMouseMove}
            style={{
                scale: contentScale,
                y: contentY,
                filter: useMotionTemplate`blur(${contentBlur})`
            }}
        >
            {/* ... Background ... */}
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
                    {/* Layer 1: Gradient Text (Fades OUT) */}
                    <motion.h1
                        className="text-[15vw] font-black leading-none tracking-tighter bg-gradient-to-br from-[var(--royal-gold)] via-[var(--neon-purple)] to-cyan-500 bg-clip-text text-transparent select-none absolute inset-0"
                        style={{ opacity: gradientOpacity }}
                    >
                        USELESS
                    </motion.h1>

                    {/* Layer 2: Photo Text (Fades IN) */}
                    <motion.h1
                        className="relative text-[15vw] font-black leading-none tracking-tighter text-transparent bg-clip-text select-none"
                        style={{
                            backgroundImage: "url('/images/usless-group.jpg')",
                            backgroundSize: "cover",
                            WebkitBackgroundClip: "text",
                            opacity: photoOpacity,
                        }}
                    >
                        USELESS
                    </motion.h1>
                </div>

                <div className="mt-8 flex flex-col items-center gap-4 text-center transform translate-z-[20px]">
                    <p className="font-mono text-xs md:text-sm uppercase tracking-[0.5em] text-neutral-400 drop-shadow-lg">
                        Est. 2025 • The Collective
                    </p>
                    <p className="text-white/60 text-sm md:text-base font-light tracking-wide max-w-md mx-auto">
                        A creative tech collective blending design, code, and culture.
                    </p>
                </div>
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
        </motion.div>
    );
}
