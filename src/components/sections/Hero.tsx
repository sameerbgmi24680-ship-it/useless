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
    const baseLayerRef = useRef<HTMLDivElement>(null);
    const midLayerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLHeadingElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.5,
            }
        });

        // Deep Gradient Parallax Spec
        // Base: y: 20%
        // Mid: y: 50%
        // Text: y: -50% (Fast reverse)

        tl.to(baseLayerRef.current, { yPercent: 20, ease: "none" }, 0);
        tl.to(midLayerRef.current, { yPercent: 50, ease: "none" }, 0);
        tl.to(textRef.current, { yPercent: -50, scale: 0.8, ease: "none" }, 0);

        // Velocity Skew on Text
        ScrollTrigger.create({
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            onUpdate: (self) => {
                const velocity = self.getVelocity();
                gsap.to(textRef.current, {
                    skewY: velocity / 300,
                    overwrite: "auto",
                    duration: 0.1,
                    ease: "power3.out"
                });
            }
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="relative h-screen w-full overflow-hidden bg-[var(--void-black)]"
        >
            {/* Base Layer: Monochrome Texture */}
            <div
                ref={baseLayerRef}
                className="absolute inset-0 bg-[url('/images/asphalt-texture.jpg')] bg-cover bg-center grayscale opacity-80"
            />

            {/* Mid Layer: Gradient Map */}
            {/* mix-blend-mode: hard-light. Flow from Royal Blue to Electric Lime */}
            <div
                ref={midLayerRef}
                className="absolute inset-0 bg-gradient-to-br from-[#002366] to-[var(--lando-neon)] mix-blend-hard-light opacity-60"
            />

            {/* Top Layer: Typography */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center">
                <h1
                    ref={textRef}
                    className="text-[18vw] font-black leading-none tracking-tighter text-white select-none text-center mix-blend-overlay"
                >
                    USELESS
                </h1>
            </div>
        </section>
    );
}
