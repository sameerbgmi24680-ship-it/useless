"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function LoadingScreen() {
    const [show, setShow] = useState(true);

    useEffect(() => {
        // Check if valid "visited" flag exists
        const hasVisited = localStorage.getItem("hasVisited");

        if (hasVisited) {
            setShow(false);
        } else {
            // Short delay before finishing
            const timer = setTimeout(() => {
                setShow(false);
                localStorage.setItem("hasVisited", "true");
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, []);

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
                >
                    {/* Cinematic Background Noise */}
                    <div className="absolute inset-0 opacity-[0.15] pointer-events-none bg-[url('/noise.png')] animate-pulse" />

                    {/* Text Animation */}
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, filter: "blur(10px)" }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                            transition: { duration: 1.5, ease: "easeOut" }
                        }}
                        exit={{ scale: 1.1, opacity: 0, filter: "blur(10px)", transition: { duration: 0.5 } }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <h1 className="text-4xl md:text-7xl font-black tracking-[0.5em] text-white/90 drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]">
                            INITIALIZING
                        </h1>
                        <motion.div
                            className="mt-4 h-[1px] bg-white/50"
                            initial={{ width: 0 }}
                            animate={{ width: "200px" }}
                            transition={{ delay: 0.5, duration: 1.5, ease: "easeInOut" }}
                        />
                    </motion.div>

                </motion.div>
            )}
        </AnimatePresence>
    );
}
