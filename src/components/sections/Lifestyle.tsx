"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const articles = [
    {
        id: 1,
        title: "The Art of Slow Living",
        excerpt: "Why we decided to disconnect for a week and reconnect with nature.",
        date: "June 24, 2024",
        readTime: "5 min read",
    },
    {
        id: 2,
        title: "Gear Essentials 2024",
        excerpt: "The cameras, lenses, and tools that power our creative workflow.",
        date: "May 12, 2024",
        readTime: "8 min read",
    },
    {
        id: 3,
        title: "Creating a Digital Identity",
        excerpt: "How to build a personal brand that feels authentic in a noisy world.",
        date: "April 02, 2024",
        readTime: "6 min read",
    },
];

export function Lifestyle() {
    return (
        <section id="lifestyle" className="py-24 bg-black text-white relative overflow-hidden flex items-center justify-center min-h-[50vh]">
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-10 pointer-events-none" />

            <div className="text-center z-10">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-4xl md:text-6xl font-black tracking-tighter mb-4"
                >
                    LIFESTYLE
                </motion.h2>
                <p className="text-xl text-[var(--royal-gold)] font-mono uppercase tracking-[0.2em] animate-pulse">
                    Coming Soon
                </p>
            </div>
        </section>
    );
}
