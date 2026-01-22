"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

const MagneticLetter = ({ children }: { children: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        const dist = Math.sqrt(Math.pow(clientX - centerX, 2) + Math.pow(clientY - centerY, 2));
        const maxDist = 200; // Radius of effect

        if (dist < maxDist) {
            // Repulsion force
            const force = (maxDist - dist) / maxDist;
            const x = (centerX - clientX) * force * 1.5;
            const y = (centerY - clientY) * force * 1.5;
            setPosition({ x, y });
        } else {
            setPosition({ x: 0, y: 0 });
        }
    };

    const handleMouseLeave = () => {
        setPosition({ x: 0, y: 0 });
    };

    return (
        <motion.span
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
            className="inline-block cursor-default font-black text-transparent hover:text-[var(--neon-norris)]"
            style={{
                WebkitTextStroke: "2px var(--neon-norris)",
                // textShadow: "0 0 20px rgba(210, 255, 0, 0.5)" // Optional glow
            }}
        // Attach event listeners to window or parent if we want global gather/scatter, 
        // but for "magnetic repulsion" usually it's local. 
        // However, the prompt says "On mouse move... repel".
        // Let's attach to the span itself for now, but usually for a big effect we want it to react even when near.
        >
            {children}
        </motion.span>
    );
};

export function LandingHero() {
    const title = "USELESS";

    // We need a parent to track mouse if we want the repulsion to work from a distance
    // But for individual letters, tracking mouse on the parent container is better.

    return (
        <section
            className="relative flex h-screen w-full flex-col items-center justify-center overflow-hidden bg-[var(--deep-carbon)]"
        >
            {/* Background Noise/Grid - Optional */}
            <div className="absolute inset-0 opacity-20 pointer-events-none"
                style={{ backgroundImage: "radial-gradient(#1A1A1A 1px, transparent 1px)", backgroundSize: "40px 40px" }}>
            </div>

            <div className="z-10 flex select-none">
                {title.split("").map((char, i) => (
                    <RepulsiveLetter key={i}>{char}</RepulsiveLetter>
                ))}
            </div>

            <p className="mt-8 font-mono text-sm text-[var(--neon-norris)] opacity-60">
                [ SCROLL TO INITIALIZE ]
            </p>
        </section>
    );
}

// Improved Repulsive Letter that listens to parent mouse
const RepulsiveLetter = ({ children }: { children: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            if (!ref.current) return;
            const { left, top, width, height } = ref.current.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;

            const dist = Math.sqrt(Math.pow(e.clientX - centerX, 2) + Math.pow(e.clientY - centerY, 2));
            const maxDist = 300;

            if (dist < maxDist) {
                const force = (maxDist - dist) / maxDist; // 0 to 1
                // Repel: move AWAY from cursor
                const dirX = centerX - e.clientX;
                const dirY = centerY - e.clientY;

                const x = dirX * force * 0.8;
                const y = dirY * force * 0.8;
                setPosition({ x, y });
            } else {
                setPosition({ x: 0, y: 0 });
            }
        };

        window.addEventListener("mousemove", handleGlobalMouseMove);
        return () => window.removeEventListener("mousemove", handleGlobalMouseMove);
    }, []);

    return (
        <motion.span
            ref={ref}
            animate={{ x: position.x, y: position.y }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className="text-[12vw] leading-none font-bold tracking-tighter transition-colors duration-300"
            style={{
                color: "var(--deep-carbon)",
                WebkitTextStroke: "2px var(--neon-norris)",
            }}
        >
            {children}
        </motion.span>
    );
}
