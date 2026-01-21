import { motion, useTransform, useScroll } from "framer-motion";
import { members } from "@/data/members"; // Use shared data
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

interface MembersProps {
    scrollProgress: any;
}

export function Members({ scrollProgress }: MembersProps) {
    const router = useRouter();

    // Timeline Configuration (35% to 70%)
    const START = 0.35;
    const END = 0.70;

    // Total horizontal distance needed = 100% * (number of members)
    // We want to translate the "Track" to the left.
    // Ideally, we move by (N-1) * 100vw? Or slightly less to keep them centered?
    // Let's do a strict track movement.

    // Opacity: Fade in at start, Fade out REALLY cleanly at end
    const opacity = useTransform(scrollProgress, [START, START + 0.05, END - 0.05, END], [0, 1, 1, 0]);
    const pointerEvents = useTransform(scrollProgress, (v: any) => v >= START && v <= END ? "auto" : "none");

    // Horizontal Movement
    // Map scroll range [0.35, 0.70] to x transform ["0%", "-100% * (N-1)"]?
    // Actually, we want the first member to start in Center, then move Left.
    // The last member ends in Center.
    // So if we have N members, we need N "frames".

    // We use a large flex container (width = N * 100vw).
    // Initial X = 0 (first slide). Final X = -(N-1) * 100vw (last slide).
    const numberOfMembers = members.length;
    const xInput = [START, END];
    const xOutput = ["0vw", `-${(numberOfMembers - 1) * 100}vw`];

    const x = useTransform(scrollProgress, xInput, xOutput);

    // Progress Bar Logic (Which member is active?)
    // We can map scroll to index: 0 to N-1
    // const currentDate = useTransform(scrollProgress, [START, END], [2018, 2025]); 

    return (
        <section
            id="members"
            className="relative h-full w-full overflow-hidden"
            style={{ pointerEvents: "none" }} // Container is none, inner is controlled
        >
            <motion.div
                style={{ opacity, pointerEvents }}
                className="absolute inset-0 flex items-center"
            >
                {/* The Horizontal Track */}
                <motion.div
                    style={{ x }}
                    className="flex flex-row items-center h-full"
                >
                    {members.map((member, index) => {
                        return (
                            <div
                                key={member.id}
                                className="w-[100vw] h-screen flex-shrink-0 flex flex-col md:flex-row items-center justify-center p-8 md:p-20 gap-8 md:gap-20"
                            >
                                {/* TEXT - Left Side */}
                                <div className="w-full md:w-1/3 flex flex-col justify-center items-start space-y-4">
                                    <p className="text-[var(--royal-gold)] font-mono text-sm uppercase tracking-widest">
                                        0{index + 1} / {numberOfMembers}
                                    </p>
                                    <h2 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
                                        {member.name}
                                    </h2>
                                    <p className="text-white/60 text-lg md:text-xl font-light max-w-md">
                                        {member.role}
                                    </p>

                                    <button
                                        onClick={() => router.push(`/members/${member.id}`)}
                                        className="mt-8 group flex items-center gap-3 text-white/80 hover:text-white transition-colors"
                                    >
                                        <span className="uppercase tracking-widest text-xs border-b border-transparent group-hover:border-[var(--neon-purple)] pb-1 transition-all">
                                            View Profile
                                        </span>
                                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>

                                {/* IMAGE - Right Side (Parallax feel) */}
                                <div
                                    className="w-full md:w-1/3 aspect-[3/4] relative overflow-hidden bg-neutral-900 shadow-2xl skew-x-[-2deg] hover:skew-x-0 transition-transform duration-700 cursor-pointer group"
                                    onClick={() => router.push(`/members/${member.id}`)}
                                >
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                    <img
                                        src={member.image}
                                        alt={member.name}
                                        className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 grayscale group-hover:grayscale-0"
                                    />

                                    {/* Persona Badge */}
                                    <div className="absolute bottom-6 left-6 z-20 overflow-hidden">
                                        <p className="text-white font-black text-4xl translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                                            {member.persona}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </motion.div>

                {/* Global Section Title (Stays pinned?) No, it scrolls with them or stays fixed? */}
                {/* Leclerc has subtle fixed elements. Let's keep it clean for now. */}
            </motion.div>
        </section>
    );
}
