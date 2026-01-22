"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SquadCard, SquadMember } from "./SquadCard";

gsap.registerPlugin(ScrollTrigger);

const SQUAD_DATA: SquadMember[] = [
    {
        id: "1",
        name: "The Founder",
        role: "Visionary",
        image: "", // Placeholder
        number: "01",
        stats: [
            { label: "Commit Pushes", value: "3,402" },
            { label: "Coffee/hr", value: "1.2L" },
        ],
    },
    {
        id: "2",
        name: "Lando Norris",
        role: "Inspiration",
        image: "https://upload.wikimedia.org/wikipedia/commons/1/18/Lando_Norris_2024_China.jpg", // Valid placeholder URL if possible, otherwise generic
        number: "04",
        stats: [
            { label: "Wins", value: "1" },
            { label: "Podiums", value: "15" },
        ],
    },
    {
        id: "3",
        name: "Charles Leclerc",
        role: "The Blueprint",
        image: "https://upload.wikimedia.org/wikipedia/commons/6/66/Charles_Leclerc_2024_China.jpg",
        number: "16",
        stats: [
            { label: "Poles", value: "23" },
            { label: "Wins", value: "6" },
        ],
    },
    {
        id: "4",
        name: "Oscar Piastri",
        role: "The Calm",
        image: "",
        number: "81",
        stats: [
            { label: "Rookie Year", value: "2023" },
            { label: "Sprint Wins", value: "1" },
        ],
    },
    {
        id: "5",
        name: "The Void",
        role: "Unknown",
        image: "",
        number: "00",
        stats: [
            { label: "Status", value: "Null" },
            { label: "Origin", value: "Deep Web" },
        ],
    },
];

export function SquadSection() {
    const sectionRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            const track = trackRef.current;
            const section = sectionRef.current;
            if (!track || !section) return;

            const mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                const getScrollAmount = () => -(track.scrollWidth - window.innerWidth);

                // 1. Horizontal Scroll Tween
                const tween = gsap.to(track, {
                    x: getScrollAmount,
                    ease: "none",
                    scrollTrigger: {
                        trigger: section,
                        start: "top top",
                        end: "+=3000", // Scroll length
                        pin: true,
                        scrub: 1, // Inertia is key
                        invalidateOnRefresh: true,
                    },
                });

                // 2. Card Focus Animations
                const cards = gsap.utils.toArray<HTMLElement>(".squad-card");
                cards.forEach((card) => {

                    // Scale & Opacity visual curve
                    gsap.fromTo(
                        card,
                        { scale: 0.8, opacity: 0.4, filter: "grayscale(100%) blur(2px)" },
                        {
                            scale: 1.0,
                            opacity: 1,
                            filter: "grayscale(0%) blur(0px)",
                            duration: 1,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: tween,
                                start: "center 65%", // Enters 'focus zone'
                                end: "center 35%",  // Exits 'focus zone'
                                scrub: true,
                            },
                        }
                    );

                    // Glitch & Border Trigger (Snap effect)
                    const border = card.querySelector(".card-border");
                    if (border) {
                        ScrollTrigger.create({
                            trigger: card,
                            containerAnimation: tween,
                            start: "center 55%",
                            end: "center 45%",
                            toggleActions: "play reverse play reverse",
                            onEnter: () => {
                                border.classList.remove("opacity-0");
                                // Trigger glitch class
                                card.classList.add("animate-glitch-trigger");
                                // We might want to remove it after a timeout to stop constant shaking, 
                                // but toggleActions handles enter/leave the zone.
                            },
                            onLeave: () => {
                                border.classList.add("opacity-0");
                                card.classList.remove("animate-glitch-trigger");
                            },
                            onEnterBack: () => {
                                border.classList.remove("opacity-0");
                            },
                            onLeaveBack: () => {
                                border.classList.add("opacity-0");
                            }
                        });
                    }

                    // Parallax for Content
                    const content = card.querySelector(".card-text-content");
                    if (content) {
                        gsap.to(content, {
                            x: -40, // Parallax text movement against scroll
                            ease: "none",
                            scrollTrigger: {
                                trigger: card,
                                containerAnimation: tween,
                                start: "left right",
                                end: "right left",
                                scrub: true,
                            },
                        });
                    }
                });
            });

            // Mobile Logic (Vertical)
            mm.add("(max-width: 767px)", () => {
                // Vertical triggers
                const cards = gsap.utils.toArray<HTMLElement>(".squad-card");
                cards.forEach((card) => {
                    gsap.fromTo(card,
                        { scale: 0.9, opacity: 0.6 },
                        {
                            scale: 1, opacity: 1,
                            scrollTrigger: {
                                trigger: card,
                                start: "top center",
                                end: "bottom center",
                                scrub: true
                            }
                        }
                    )
                });
            });

        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative min-h-screen overflow-hidden bg-[var(--background)]"
        >
            {/* Title / Header that scrolls away or stays fixed? 
          Leclerc's 'Beginnings' title stays for a bit then scrolls. 
          Let's put a header. */}
            <div className="absolute left-10 top-10 z-50 mix-blend-difference md:fixed">
                <h1 className="font-sans text-4xl font-black uppercase tracking-tighter text-[var(--foreground)] md:text-6xl">
                    The <span className="text-[var(--royal-gold)]">Squad</span>
                </h1>
            </div>

            <div
                ref={trackRef}
                className="flex h-full w-full flex-col items-center gap-20 py-32 md:w-max md:flex-row md:items-center md:gap-[5vw] md:py-0 md:px-[50vw]"
            >
                {SQUAD_DATA.map((member, i) => (
                    <SquadCard key={i} index={i} member={member} />
                ))}
            </div>
        </section>
    );
}
