"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Flip } from "gsap/Flip";
import { useGSAP } from "@gsap/react";
import { useMembers } from "@/context/MembersContext";
import { X } from "lucide-react";

gsap.registerPlugin(Flip);

export function MemberOverlay() {
    const { activeMember, setActiveMember } = useMembers();
    const overlayRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!activeMember || !overlayRef.current) return;

        // FLIP Animation
        // The "First" state is usually captured from the clicked element.
        // We need the ID of the element that was clicked.
        // The Members component should utilize Flip.getState(target) and pass it?
        // OR we can just 'flip' from the hidden state if we have a persistent key.

        // Actually, the easiest way in a detached context is to assume the layout changed.
        // But to make it "Seamless", we need the starting coordinates.
        // Since we are using a Context, the 'click' event happened in Members.tsx.
        // We might not have the state here properly shared unless we store the Flip State in context too.
        // But passing DOM objects in Context is bad.

        // Simpler "Cinematic" Entrance for now (as spec allows "Render MemberDetailOverlay"):
        // Use a high-quality expansion animation that feels like FLIP.

        const tl = gsap.timeline();

        tl.fromTo(overlayRef.current,
            { clipPath: "polygon(0 50%, 100% 50%, 100% 50%, 0 50%)", opacity: 0 },
            { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1, duration: 0.8, ease: "expo.inOut" }
        );

        tl.from(contentRef.current, {
            y: 100,
            opacity: 0,
            duration: 0.5,
            delay: 0.3
        });

    }, { dependencies: [activeMember], scope: overlayRef });

    if (!activeMember) return null;

    return (
        <div
            ref={overlayRef}
            className="fixed inset-0 z-[9999] bg-[var(--void-black)] text-white flex flex-col md:flex-row overflow-hidden"
        >
            {/* Close Button */}
            <button
                onClick={() => setActiveMember(null)}
                className="absolute top-8 right-8 z-50 p-4 border border-[var(--lando-neon)] hover:bg-[var(--lando-neon)] hover:text-black transition-colors rounded-none"
            >
                <X className="w-6 h-6" />
            </button>

            {/* Image Side */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full relative overflow-hidden">
                <img
                    src={activeMember.image}
                    alt={activeMember.name}
                    className="w-full h-full object-cover grayscale contrast-125"
                />
                <div className="absolute inset-0 bg-[var(--lando-neon)] mix-blend-multiply opacity-20" />
            </div>

            {/* Content Side */}
            <div className="w-full md:w-1/2 h-1/2 md:h-full flex flex-col justify-center p-12 relative bg-[url('/images/carbon-noise.png')]">
                <div ref={contentRef}>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-neutral-500">
                        {activeMember.name}
                    </h1>
                    <div className="h-1 w-24 bg-[var(--royal-gold)] mb-8" />

                    <div className="space-y-6 font-mono text-sm md:text-base text-gray-400">
                        <p><span className="text-[var(--lando-neon)]">ROLE //</span> {activeMember.role}</p>
                        <p><span className="text-[var(--lando-neon)]">ORIGIN //</span> CLASSIFIED</p>
                        <p><span className="text-[var(--lando-neon)]">STATUS //</span> ACTIVE</p>

                        <p className="mt-8 border-l-2 border-[var(--royal-gold)] pl-6 italic">
                            "{activeMember.persona}"
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
