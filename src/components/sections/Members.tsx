import { motion, useTransform } from "framer-motion";
import { Github, Instagram, Linkedin, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

// ... imports
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronRight } from "lucide-react";

interface MembersProps {
    scrollProgress: any;
}

// Updated Members List with rotated images
const members = [
    { name: "J. Sashank", role: "Team Lead & Architect", bio: "Orchestrating the chaos into code.", persona: "The Strategist", image: "/images/group-1.jpg" },
    { name: "D Savirthru", role: "Frontend Specialist", bio: "Crafting pixels with precision.", persona: "The Artist", image: "/images/group-2.jpg" },
    { name: "Raskas S Karthik", role: "Backend Engineer", bio: "Building the backbone of our reality.", persona: "The Architect", image: "/images/group-3.jpg" },
    { name: "S Sai Vodapally", role: "Creative Director", bio: "Visionary behind the visuals.", persona: "The Visionary", image: "/images/group-1.jpg" },
    { name: "Sameer", role: "Full Stack Dev", bio: "Connecting dots across the stack.", persona: "The Builder", image: "/images/group-2.jpg" },
    { name: "Shriyan Bohra", role: "UI/UX Designer", bio: "Designing experiences that matter.", persona: "The Designer", image: "/images/group-3.jpg" },
    { name: "Sathya Krishna", role: "Content Strategist", bio: "Telling stories that stick.", persona: "The Storyteller", image: "/images/group-1.jpg" },
    { name: "Monuika Dola", role: "Developer", bio: "Turning coffee into code.", persona: "The Coder", image: "/images/group-2.jpg" },
    { name: "Anvith", role: "Systems Engineer", bio: "Optimizing the machine.", persona: "The Engineer", image: "/images/group-3.jpg" },
    { name: "Snighda (Reddy)", role: "Developer", bio: "Solving problems one bug at a time.", persona: "The Fixer", image: "/images/group-1.jpg" },
    { name: "Srija", role: "Designer", bio: "Adding color to the world.", persona: "The Creative", image: "/images/group-2.jpg" },
];

export function Members({ scrollProgress }: MembersProps) {
    const [selectedMember, setSelectedMember] = useState<typeof members[0] | null>(null);

    // Scroll Timeline Configuration
    const START_SCROLL = 0.10; // Members start appearing
    const SQUAD_END_SCROLL = 0.85; // Last member finishes
    const FINAL_PAN_START = 0.88; // "USELESS" text starts (slight pause after squad)
    const FINAL_PAN_END = 0.99; // "USELESS" text settles just before content arrives

    const TOTAL_SQUAD_DURATION = SQUAD_END_SCROLL - START_SCROLL;
    const STEP = TOTAL_SQUAD_DURATION / members.length;

    return (
        <section id="members" className="relative h-full w-full flex items-center justify-center pointer-events-none perspective-1000">
            {/* Center Stage Container */}
            <div className="relative w-full max-w-4xl h-[60vh] flex items-center justify-center transform-style-3d">
                <motion.div
                    initial={{ opacity: 0 }}
                    style={{ opacity: useTransform(scrollProgress, [0.05, 0.1], [0, 1]), y: useTransform(scrollProgress, [0.1, 0.2], [0, -100]) }}
                    className="absolute top-0 left-0 w-full text-center z-50 mb-8"
                >
                    <h2 className="text-4xl md:text-6xl font-black tracking-tight mb-2 text-white drop-shadow-2xl">THE SQUAD</h2>
                    <p className="text-white/60 text-lg uppercase tracking-widest">Est. 2025</p>
                </motion.div>

                {members.map((member, index) => {
                    // Definition of this member's time on stage
                    const start = START_SCROLL + (index * STEP);
                    const end = start + STEP;

                    // Slightly overlap entry/exit for smoothness
                    const fadeInEnd = start + (STEP * 0.2);
                    const fadeOutStart = end - (STEP * 0.2);

                    const opacity = useTransform(scrollProgress, [start, fadeInEnd, fadeOutStart, end], [0, 1, 1, 0]);
                    const scale = useTransform(scrollProgress, [start, end], [0.6, 1.1]);

                    // Alternating entry direction for visual interest
                    const xStart = index % 2 === 0 ? -300 : 300;
                    const xEnd = index % 2 === 0 ? 100 : -100;
                    const x = useTransform(scrollProgress, [start, end], [xStart, xEnd]);

                    const y = useTransform(scrollProgress, [start, end], [300, -50]);
                    const rotate = useTransform(scrollProgress, [start, end], [index % 2 === 0 ? -15 : 15, 0]);

                    return (
                        <motion.div
                            key={member.name}
                            layoutId={`card-${member.name}`}
                            style={{
                                opacity,
                                scale,
                                x,
                                y,
                                rotate,
                                zIndex: index + 10 // Ensure members stack properly
                            }}
                            className="absolute w-80 md:w-96 aspect-[3/4] bg-neutral-800 rounded-2xl overflow-hidden border border-white/10 shadow-2xl pointer-events-auto cursor-pointer"
                            onClick={() => setSelectedMember(member)}
                        >
                            {/* Content */}
                            <div className="relative h-full w-full">
                                <img src={member.image} alt={member.name} className="absolute inset-0 w-full h-full object-cover grayscale brightness-75 hover:grayscale-0 hover:brightness-100 transition-all duration-500" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-90" />

                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-[var(--royal-gold)] font-mono text-xs uppercase tracking-wider mb-1">{member.role}</p>
                                    <h3 className="text-2xl font-bold text-white mb-2">{member.name}</h3>
                                    <p className="text-white/60 text-xs line-clamp-2">{member.bio}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}

                {/* FINAL PAN: "USELESS" TEXT REVEAL */}
                <motion.div
                    style={{
                        opacity: useTransform(scrollProgress, [FINAL_PAN_START, FINAL_PAN_START + 0.05], [0, 1]),
                        scale: useTransform(scrollProgress, [FINAL_PAN_START, FINAL_PAN_END], [2, 1]),
                        x: useTransform(scrollProgress, [FINAL_PAN_START, FINAL_PAN_END], [400, 0]), // Starts right, moves center
                        y: useTransform(scrollProgress, [FINAL_PAN_START, FINAL_PAN_END], [200, 0]), // Starts bottom, moves center
                        rotateY: useTransform(scrollProgress, [FINAL_PAN_START, FINAL_PAN_END], [45, 0]),
                        zIndex: 100
                    }}
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                >
                    <h1 className="text-[12vw] font-black tracking-tighter text-white drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]">
                        USELESS
                    </h1>
                </motion.div>
            </div>

            {/* Reuse Detail Overlay (Unchanged logic, just ensure Z-index is high) */}
            <AnimatePresence>
                {selectedMember && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 bg-black/95 backdrop-blur-xl pointer-events-auto"
                        onClick={() => setSelectedMember(null)}
                    >
                        {/* ... (Same Detail Card Content) ... */}
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

                            <div className="w-full md:w-1/2 h-1/2 md:h-full relative">
                                <img src={selectedMember.image} alt={selectedMember.name} className="w-full h-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-transparent to-transparent md:bg-gradient-to-r" />
                            </div>

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
