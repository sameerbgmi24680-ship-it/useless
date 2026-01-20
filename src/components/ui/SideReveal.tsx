"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface SideRevealProps {
    children: ReactNode;
    direction?: "left" | "right";
    className?: string;
    delay?: number;
}

export function SideReveal({
    children,
    direction = "left",
    className = "",
    delay = 0
}: SideRevealProps) {
    const xOffset = direction === "left" ? -100 : 100;

    return (
        <motion.div
            initial={{ opacity: 0, x: xOffset }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{
                duration: 0.8,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94] // Cinematic easing
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
