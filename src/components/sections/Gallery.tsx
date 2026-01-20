"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ZoomIn } from "lucide-react";

const moments = [
    { id: 1, src: "/images/usless-group.jpg", title: "Midnight Drive" },
    { id: 2, src: "/images/usless-group.jpg", title: "Studio Sessions" },
    { id: 3, src: "/images/usless-group.jpg", title: "The Summit" },
    { id: 4, src: "/images/usless-group.jpg", title: "Backstage Pass" },
    { id: 5, src: "/images/usless-group.jpg", title: "Urban Exploration" },
    { id: 6, src: "/images/usless-group.jpg", title: "Golden Hour" },
    { id: 7, src: "/images/usless-group.jpg", title: "Neon Nights" },
    { id: 8, src: "/images/usless-group.jpg", title: "Rooftop Vibes" },
];

export function Gallery() {
    const targetRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    const x = useTransform(scrollYProgress, [0, 1], ["1%", "-95%"]);

    return (
        <section ref={targetRef} id="gallery" className="relative h-[300vh] bg-neutral-950">
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                {/* Title Overlay (Fixed) */}
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="absolute top-10 left-10 z-20"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white drop-shadow-lg">
                        MOMENTS <span className="text-[var(--royal-gold)]">UNLOCKED</span>
                    </h2>
                </motion.div>

                <motion.div style={{ x }} className="flex gap-4 pl-10">
                    {moments.map((item) => (
                        <div
                            key={item.id}
                            className="group relative h-[60vh] aspect-[3/4] md:aspect-[4/5] bg-neutral-900 rounded-xl overflow-hidden flex-shrink-0 cursor-pointer border border-white/5 hover:border-[var(--neon-purple)] transition-colors duration-500"
                        >
                            {/* Placeholder for Image */}
                            <div className="absolute inset-0 flex items-center justify-center text-white/10 font-mono text-xl">
                                {item.title}
                            </div>

                            {/* Use Real Image if available, redundant but safe */}
                            <img src={item.src} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity duration-500" />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80 group-hover:to-[var(--neon-purple)]/80 transition-colors duration-500" />

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-2xl font-bold text-white mb-1">{item.title}</h3>
                                <p className="text-white/50 text-sm font-mono uppercase">0{item.id}</p>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
