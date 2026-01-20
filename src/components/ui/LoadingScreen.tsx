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
                    exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
                >
                    {/* Cinematic Background Cycle */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-br from-black via-neutral-900 to-black bg-[length:400%_400%]"
                        animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
                        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    />
                    <div className="absolute inset-0 opacity-[0.1] bg-[url('/noise.png')]" />

                    {/* Text Animation */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, filter: "blur(10px)" }}
                        animate={{
                            scale: 1,
                            opacity: 1,
                            filter: "blur(0px)",
                            transition: { duration: 1.5, ease: "easeOut" }
                        }}
                        exit={{ scale: 1.1, opacity: 0, filter: "blur(20px)", transition: { duration: 0.5 } }}
                        className="relative z-10 flex flex-col items-center"
                    >
                        <h1 className="text-6xl md:text-9xl font-black tracking-tighter text-white drop-shadow-2xl mix-blend-overlay">
                            USELESS
                        </h1>
                        <motion.div
                            initial={{ width: 0, opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="h-[2px] bg-white/80 mt-4 rounded-full"
                        />
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
