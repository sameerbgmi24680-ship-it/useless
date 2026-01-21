"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
    scrollProgress: any;
}

export function Hero({ scrollProgress }: HeroProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);
    const subheadingRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const text = textRef.current;
        if (!text) return;

        // 1. Parallax & Fade Out
        gsap.to(text, {
            yPercent: 30, // Move down
            opacity: 0,
            scale: 1.1,
            filter: "blur(10px)",
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom center",
                scrub: true,
            }
        });

        // 2. High-Intensity Velocity Skew (The "Warp" Effect)
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                const skewAmount = velocity / 300;
                const scaleAmount = 1 + (Math.abs(velocity) / 10000);

                gsap.to(text, {
                    skewY: skewAmount,
                    scale: scaleAmount,
                    overwrite: "auto",
                    duration: 0.1,
                    ease: "power3.out"
                });
            }
        });

        // 3. Subheading Exit
        gsap.to(subheadingRef.current, {
            y: -50,
            opacity: 0,
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "20% top",
                scrub: true,
            }
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden"
        >
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black via-neutral-900 to-black opacity-50 z-0" />

            {/* Main Text */}
            <div className="relative z-10 flex flex-col items-center">
                <h1
                    ref={textRef}
                    className="text-[18vw] font-black leading-none tracking-tighter text-transparent bg-clip-text select-none text-center will-change-transform"
                    style={{
                        backgroundImage: "url('/images/usless-group.jpg')", // Ensure this path is valid
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        WebkitBackgroundClip: "text",
                    }}
                >
                    USELESS
                </h1>

                <div ref={subheadingRef} className="mt-8 text-center">
                    <p className="text-[var(--royal-gold)] font-mono text-xs uppercase tracking-[0.5em] mb-2">
                        EST. 2025 • THE COLLECTIVE
                    </p>
                    <p className="text-white/40 font-light text-sm tracking-wider">
                        A creative tech collective blending design, code, and culture
                    </p>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-12 flex flex-col items-center opacity-50 animate-pulse">
                <p className="text-[10px] uppercase tracking-widest text-white/60 mb-2">Scroll to Reveal</p>
                <div className="w-px h-12 bg-gradient-to-b from-[var(--royal-gold)] to-transparent" />
            </div>
        </section>
    );
}
