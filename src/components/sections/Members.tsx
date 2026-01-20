"use client";

import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const members = [
    {
        name: "Alex Rivera",
        role: "Full Stack Developer",
        image: "/members/alex.jpg",
        bio: "Building digital cathedrals.",
        socials: { github: "#", linkedin: "#", twitter: "#" },
        persona: "The Architect"
    },
    {
        name: "Sarah Chen",
        role: "UI/UX Designer",
        image: "/members/sarah.jpg",
        bio: "Px perfect or nothing.",
        socials: { instagram: "#", linkedin: "#", twitter: "#" },
        persona: "The Visionary"
    },
    {
        name: "Jordan Lee",
        role: "Creative Director",
        image: "/members/jordan.jpg",
        bio: "Storytelling through motion.",
        socials: { instagram: "#", twitter: "#" },
        persona: "The Director"
    },
    {
        name: "Casey Smith",
        role: "Backend Engineer",
        image: "/members/casey.jpg",
        bio: "Keeping the lights on.",
        socials: { github: "#", linkedin: "#" },
        persona: "The Mechanic"
    },
];

export function Members() {
    return (
        <section id="members" className="py-24 bg-neutral-900 text-white overflow-hidden">
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {members.map((member, index) => (
                        <motion.div
                            key={member.name}
                            initial={{ opacity: 0, y: 50, rotateX: -15 }}
                            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
                            className="group relative h-[400px] w-full bg-black rounded-xl overflow-hidden cursor-pointer perspective-1000"
                        >
                            {/* Image Placeholder */}
                            <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center text-white/10 font-mono text-4xl font-bold group-hover:scale-110 transition-transform duration-700">
                                {member.name.charAt(0)}
                            </div>

                            {/* Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                            {/* Persona Badge (Hover Reveal) */}
                            <div className="absolute top-4 right-4 bg-[var(--neon-purple)] text-white text-xs font-bold px-3 py-1 rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 shadow-[0_0_15px_var(--neon-purple)]">
                                {member.persona}
                            </div>

                            {/* Content */}
                            <div className="absolute bottom-0 left-0 w-full p-6 translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                                <p className="text-[var(--royal-gold)] text-sm font-medium mb-3">{member.role}</p>
                                <p className="text-white/70 text-sm mb-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">{member.bio}</p>

                                <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-200">
                                    {member.socials.github && <Github className="w-5 h-5 text-white hover:text-[var(--royal-gold)] transition-colors" />}
                                    {member.socials.twitter && <Twitter className="w-5 h-5 text-white hover:text-[var(--royal-gold)] transition-colors" />}
                                    {member.socials.linkedin && <Linkedin className="w-5 h-5 text-white hover:text-[var(--royal-gold)] transition-colors" />}
                                    {member.socials.instagram && <Instagram className="w-5 h-5 text-white hover:text-[var(--royal-gold)] transition-colors" />}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
