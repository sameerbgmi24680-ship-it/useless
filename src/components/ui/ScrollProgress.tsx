"use client";

import { motion, useScroll, useSpring } from "framer-motion";

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 bg-[var(--royal-gold)] origin-left z-[100]"
            style={{
                scaleX,
                boxShadow: "0 0 20px var(--royal-gold), 0 0 10px var(--royal-gold)"
            }}
        >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-20 h-4 bg-[var(--royal-gold)] blur-md opacity-50" />
            <div className="absolute right-0 top-0 bottom-0 w-8 bg-white opacity-80 blur-[2px]" />
        </motion.div>
    );
}
