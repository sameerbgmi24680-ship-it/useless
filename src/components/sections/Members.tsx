"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// ... imports
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

// Updated Members List
const members = [
    { name: "J. Sashank", role: "Team Lead & Architect", bio: "Orchestrating the chaos into code.", persona: "The Strategist", image: "/images/usless-group.jpg" },
    { name: "D Savirthru", role: "Frontend Specialist", bio: "Crafting pixels with precision.", persona: "The Artist", image: "/images/usless-group.jpg" },
    { name: "Raskas S Karthik", role: "Backend Engineer", bio: "Building the backbone of our reality.", persona: "The Architect", image: "/images/usless-group.jpg" },
    { name: "S Sai Vodapally", role: "Creative Director", bio: "Visionary behind the visuals.", persona: "The Visionary", image: "/images/usless-group.jpg" },
    { name: "Sameer", role: "Full Stack Dev", bio: "Connecting dots across the stack.", persona: "The Builder", image: "/images/usless-group.jpg" },
    { name: "Shriyan Bohra", role: "UI/UX Designer", bio: "Designing experiences that matter.", persona: "The Designer", image: "/images/usless-group.jpg" },
    { name: "Sathya Krishna", role: "Content Strategist", bio: "Telling stories that stick.", persona: "The Storyteller", image: "/images/usless-group.jpg" },
    { name: "Monuika Dola", role: "Developer", bio: "Turning coffee into code.", persona: "The Coder", image: "/images/usless-group.jpg" },
    { name: "Anvith", role: "Systems Engineer", bio: "Optimizing the machine.", persona: "The Engineer", image: "/images/usless-group.jpg" },
    { name: "Snighda (Reddy)", role: "Developer", bio: "Solving problems one bug at a time.", persona: "The Fixer", image: "/images/usless-group.jpg" },
    { name: "Srija", role: "Designer", bio: "Adding color to the world.", persona: "The Creative", image: "/images/usless-group.jpg" },
];

export function Members() {
    const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);

    return (
        <section id="members" className="py-24 bg-neutral-900 text-white overflow-hidden relative">
            <div className="container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">THE SQUAD</h2>
                    <p className="text-white/60 text-lg">Individually chaotic, collectively useless.</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.name}
                            layoutId={`card-${member.name}`}
                            onClick={() => setSelectedMember(member)}
                            initial={{ opacity: 0, y: 100, x: -50, scale: 0.8 }} // Bottom corner entry
                            whileInView={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6, delay: index * 0.05, ease: "circOut" }}
                            className="group relative h-[350px] w-full bg-neutral-800 rounded-xl overflow-hidden cursor-pointer border border-white/5 hover:border-[var(--neon-purple)] transition-colors"
                        >
                            {/* Image Using Group Photo as Texture */}
                            <div className="absolute inset-0 grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500">
                                <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                            </div>

                            {/* Overlay Gradient */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                            <div className="absolute bottom-0 left-0 w-full p-6">
                                <motion.p layoutId={`role-${member.name}`} className="text-[var(--royal-gold)] text-xs font-mono mb-1">{member.role}</motion.p>
                                <motion.h3 layoutId={`name-${member.name}`} className="text-xl font-bold text-white">{member.name}</motion.h3>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Member Detail Overlay */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/90 backdrop-blur-md"
                        onClick={() => setSelectedMember(null)}
                    >
                        <motion.div
                            layoutId={`card-${selectedMember.name}`}
                            className="bg-neutral-900 w-full max-w-4xl h-[80vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl relative border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                onClick={() => setSelectedMember(null)}
                                className="absolute top-4 right-4 z-50 p-2 bg-black/50 rounded-full text-white hover:bg-white hover:text-black transition-colors"
                            >
                                <X className="w-6 h-6" />
                            </button>

                            {/* Image Side */}
                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-6">
                                <div>
                                    <motion.p layoutId={`role-${selectedMember.name}`} className="text-[var(--royal-gold)] font-mono text-sm uppercase tracking-wider mb-2">
                                        {selectedMember.role}
                                    </motion.p>
                                    <motion.h2 layoutId={`name-${selectedMember.name}`} className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                                        {selectedMember.name}
                                    </motion.h2>
                                    <div className="h-1 w-20 bg-[var(--neon-purple)] rounded-full mb-6" />
                                </div>

                                <p className="text-lg text-white/70 leading-relaxed">
                                    {selectedMember.bio}
                                </p>

                                <div className="pt-8 grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <p className="text-xs text-white/40 uppercase mb-1">Persona</p>
                                        <p className="text-white font-medium">{selectedMember.persona}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-lg border border-white/5">
                                        <p className="text-xs text-white/40 uppercase mb-1">Join Date</p>
                                        <p className="text-white font-medium">Est. 2025</p>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
