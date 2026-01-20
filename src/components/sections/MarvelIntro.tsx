"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const members = [
    { id: 1, name: "The Brains", role: "Tech Lead", color: "#b026ff" }, // Purple
    { id: 2, name: "The Vision", role: "Creative Dir", color: "#ffd700" }, // Gold
    { id: 3, name: "The Heart", role: "Community", color: "#00ffff" }, // Cyan
    { id: 4, name: "The Soul", role: "Writer", color: "#ff0055" }, // Red
    { id: 5, name: "The Muscle", role: "Logistics", color: "#ffffff" },
];

export function MarvelIntro() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    return (
        <section ref={targetRef} className="h-[300vh] bg-black relative">
            <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
                {members.map((member, index) => {
                    const start = index * 0.2;
                    const end = start + 0.2;

                    // Scale from massive to normal
                    const scale = useTransform(scrollYProgress, [start, end], [3, 1]);
                    // Opacity: fade in then fade out for next
                    const opacity = useTransform(scrollYProgress, [start, end, end + 0.1], [0, 1, 0]);
                    // Blur to focus effect
                    const blur = useTransform(scrollYProgress, [start, end], [20, 0]);

                    return (
                        <motion.div
                            key={member.id}
                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                            style={{ opacity }}
                        >
                            <motion.div
                                style={{ scale, filter: `blur(${blur}px)` }}
                                className="relative z-10 text-center"
                            >
                                <h2
                                    className="text-6xl md:text-9xl font-black uppercase tracking-tighter"
                                    style={{ color: member.color, textShadow: `0 0 30px ${member.color}80` }}
                                >
                                    {member.name}
                                </h2>
                                <p className="text-white/60 font-mono text-xl mt-4 tracking-widest bg-black/50 inline-block px-4 py-1">
                                    {member.role}
                                </p>
                            </motion.div>
                        </motion.div>
                    )
                })}

                <motion.div
                    className="absolute bottom-10 text-white/20 font-mono text-xs animate-pulse"
                    style={{ opacity: useTransform(scrollYProgress, [0.9, 1], [1, 0]) }}
                >
                    SCROLL TO ASSEMBLE
                </motion.div>
            </div>
        </section>
    );
}
