"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SideReveal } from "@/components/ui/SideReveal";

const features = [
    {
        title: "The Brains",
        description: "Architecting scalable systems and resilient codebases that power our vision.",
    },
    {
        title: "The Vision",
        description: "Crafting immersive user experiences and defining the visual language.",
    },
    {
        title: "The Heart",
        description: "Building community, managing events, and keeping the collective spirit alive.",
    },
];

export function About() {
    return (
        <section id="about" className="py-24 md:py-32 bg-black text-white relative">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">

                    {/* Text Content */}
                    <div className="space-y-12">
                        <SideReveal direction="left">
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
                                <span className="text-[var(--royal-gold)]">USELESS.</span> <br />
                                <span className="text-white/50 text-3xl md:text-4xl font-normal tracking-normal">NOT WORTHLESS.</span>
                            </h2>
                            <p className="text-lg text-white/70 leading-relaxed max-w-md">
                                We are a collective of engineers, designers, and troublemakers.
                                What started as a random group name became our identity.
                                Creating legacy out of nothing.
                            </p>
                        </SideReveal>

                        <div className="grid gap-8">
                            {features.map((feature, index) => (
                                <SideReveal
                                    key={feature.title}
                                    direction="left"
                                    delay={index * 0.1 + 0.3}
                                    className="border-l-2 border-[var(--neon-purple)]/50 pl-6"
                                >
                                    <h3 className="text-xl font-bold mb-1 text-[var(--foreground)]">{feature.title}</h3>
                                    <p className="text-white/50 text-sm">{feature.description}</p>
                                </SideReveal>
                            ))}
                        </div>
                    </div>

                    {/* Visual Element */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, rotate: -2 }}
                        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "easeOut" }}
                        className="relative aspect-auto rounded-none overflow-hidden border-2 border-[var(--royal-gold)]/20 shadow-[0_0_50px_-10px_rgba(176,38,255,0.3)] mt-8 md:mt-0"
                    >
                        {/* Real Image */}
                        <img
                            src="/images/usless-group.jpg"
                            alt="The USLESS Collective"
                            className="w-full h-full object-cover filter saturate-0 contrast-125 hover:saturate-100 transition-all duration-700"
                        />

                        {/* Decorative Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent pointer-events-none" />

                        {/* Floating Badge */}
                        <div className="absolute bottom-6 left-6 right-6 border-t border-[var(--royal-gold)]/50 pt-4 flex justify-between items-end">
                            <div>
                                <p className="font-mono text-xs text-[var(--royal-gold)] mb-1">THE SQUAD • CSE DEPT</p>
                                <p className="text-xl font-bold font-serif italic text-white">"Chaos & Creativity"</p>
                            </div>
                            <div className="h-2 w-2 bg-[var(--neon-purple)] rounded-full animate-pulse shadow-[0_0_10px_var(--neon-purple)]" />
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
