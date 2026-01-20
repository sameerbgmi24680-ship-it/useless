"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";

const projects = [
    {
        year: "2024",
        title: "The Collective App",
        category: "Software",
        description: "A digital space for our community to connect and share.",
    },
    {
        year: "2023",
        title: "Midnight Run II",
        category: "Event",
        description: "Organized a cross-state rally with over 500 attendees.",
    },
    {
        year: "2023",
        title: "Project Alpha",
        category: "Brand",
        description: "Launched our own merchandise line, selling out in 48 hours.",
    },
];

export function Projects() {
    return (
        <section id="projects" className="py-24 bg-neutral-950 text-white border-t border-white/5 relative">
            <div className="container mx-auto px-6">

                {/* Timeline Line */}
                <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-[var(--neon-purple)]/50 to-transparent hidden md:block" />

                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 relative z-10">
                    <motion.div
                        initial={{ opacity: 0, x: -50, scale: 0.9 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-4xl font-bold tracking-tight mb-2">PROJECTS</h2>
                        <p className="text-white/60">What we've built, where we're going.</p>
                    </motion.div>
                </div>

                <div className="space-y-4">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50, scale: 0.9 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
                            className="group flex flex-col md:flex-row items-center justify-between p-8 border border-white/5 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] transition-colors gap-6 relative z-10"
                        >
                            {/* Timeline Dot */}
                            <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-[var(--background)] border border-[var(--neon-purple)] rounded-full hidden md:block group-hover:bg-[var(--royal-gold)] group-hover:scale-150 transition-all duration-300" />

                            <div className="flex flex-col md:flex-row md:items-center gap-6 w-full">
                                <div className="font-mono text-[var(--royal-gold)] text-xl font-bold">{project.year}</div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-1 flex items-center gap-2">
                                        {project.title}
                                        <ArrowUpRight className="w-5 h-5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-[var(--neon-purple)]" />
                                    </h3>
                                    <span className="text-xs uppercase tracking-wider text-white/40 border border-white/10 px-2 py-0.5 rounded-full">{project.category}</span>
                                </div>
                            </div>

                            <p className="text-white/60 md:max-w-md">{project.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
