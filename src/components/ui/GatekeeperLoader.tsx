"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export function GatekeeperLoader({ onComplete }: { onComplete: () => void }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const pathRef = useRef<SVGPathElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            onComplete: onComplete
        });

        // Stage 1: The Ignition (Trace Path)
        // Simulate a racing line trace
        tl.to(pathRef.current, {
            strokeDashoffset: 0,
            duration: 1.5,
            ease: "power2.inOut"
        });

        // Stage 2: Glitch to Text
        tl.to(pathRef.current, { opacity: 0, duration: 0.1 });
        tl.to(textRef.current, { opacity: 1, duration: 0.1 }, "<");

        // Glitch effect on text "THETA" -> "USELESS"
        // We can simulate this with text content replacement or pure CSS glitch
        tl.to(textRef.current, {
            clipPath: "inset(0 0 0 0)", // Reveal fully
            duration: 0.1
        });

        // Pseudo-glitch timeline
        const chars = "USELESS";
        tl.to(textRef.current, {
            duration: 0.5,
            scrambleText: { text: "USELESS", chars: "XO#@!%$", revealDelay: 0.1, speed: 0.1 },
            // Note: ScrambleText is premium. If not available, we use basic swap.
            onStart: () => {
                if (textRef.current) textRef.current.innerText = "USELESS"; // Hard swap if plugin missing
            }
        });

        // Stage 4: Reveal (Curtain Wipe)
        tl.to(containerRef.current, {
            clipPath: "polygon(50% 0, 50% 0, 50% 100%, 50% 100%)", // Start closed
            duration: 0.1
        });
        tl.to(containerRef.current, {
            clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", // Open center-out? 
            // Wait, standard wipe is usually simple. 
            // Spec says "Vertical curtain wipe (center-out)".
            // Actually, to REVEAL the content behind, we need to shrink the loader.
            // ClipPath: polygon(0 0, 100% 0, 100% 100%, 0 100%) -> polygon(50% 0, 50% 0, 50% 100%, 50% 100%) (Disappearing line)
        });

        tl.to(containerRef.current, {
            scaleY: 0, // Fallback wipe
            transformOrigin: "center",
            duration: 0.8,
            ease: "expo.inOut"
        });

    }, { scope: containerRef });

    return (
        <div ref={containerRef} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
            <svg
                className="w-64 h-64 absolute"
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    ref={pathRef}
                    d="M10 90 L30 10 L70 10 L90 90" // Simple aggressive racing line shape
                    stroke="var(--lando-neon)"
                    strokeWidth="2"
                    strokeDasharray="300"
                    strokeDashoffset="300"
                />
            </svg>

            <div
                ref={textRef}
                className="text-[var(--lando-neon)] font-black text-6xl tracking-tighter opacity-0"
            >
                THETA
            </div>
        </div>
    );
}
