import { motion, useTransform } from "framer-motion";

interface IdentitySequenceProps {
    scrollProgress: any;
}

const chapters = [
    { title: "THE BRAINS", desc: "Strategizing the chaos.", color: "#2E5CFF" }, // Electric Royal Blue
    { title: "THE VISION", desc: "Seeing what others don't.", color: "#9D00FF" }, // Deep Violet
    { title: "THE HEART", desc: "Pumping life into code.", color: "#FF0040" }, // Crimson Neon
    { title: "THE SOUL", desc: "The essence of our craft.", color: "#00F0FF" }, // Cyan Glow
    { title: "THE MUSCLE", desc: "Building with brute force.", color: "#FFD700" }, // Royal Gold
    { title: "THIS IS USELESS", desc: "We are the collective.", color: "#FFFFFF", big: true },
];

export function IdentitySequence({ scrollProgress }: IdentitySequenceProps) {
    // Timeline configuration (10% to 35% of page scroll)
    const START = 0.10;
    const END = 0.35;
    const TOTAL = END - START;
    const STEP = TOTAL / chapters.length;

    return (
        <section className="relative h-screen w-full pointer-events-none perspective-500">
            {chapters.map((chapter, index) => {
                const start = START + (index * STEP);
                const end = start + STEP;
                const mid = start + (STEP * 0.5);

                // Royal Motion: Slow, deliberate emerge from dark (Z-axis)
                // From -500 (deep) to 200 (close)
                const z = useTransform(scrollProgress, [start, end], [-500, 200]);
                const scale = useTransform(scrollProgress, [start, mid, end], [0.5, 1, 1.2]);
                const opacity = useTransform(scrollProgress, [start, mid, end], [0, 1, 0]);
                const blur = useTransform(scrollProgress, [start, mid, end], ["10px", "0px", "10px"]);

                return (
                    <motion.div
                        key={chapter.title}
                        style={{ opacity, scale, filter: blur as any, z }}
                        className="absolute inset-0 flex flex-col items-center justify-center transform-style-3d origin-center"
                    >
                        <h2
                            className={`${chapter.big ? "text-[10vw]" : "text-[6vw] md:text-[8vw]"} font-black tracking-tighter text-transparent bg-clip-text drop-shadow-2xl text-center leading-none`}
                            style={{
                                backgroundImage: `linear-gradient(to bottom, white, ${chapter.color})`,
                                textShadow: `0 0 20px ${chapter.color}40`,
                                WebkitBackgroundClip: "text"
                            }}
                        >
                            {chapter.title}
                        </h2>
                        {chapter.desc && (
                            <p
                                className="mt-4 font-mono text-xs md:text-sm tracking-[0.5em] uppercase opacity-80"
                                style={{ color: chapter.color }}
                            >
                                {chapter.desc}
                            </p>
                        )}
                    </motion.div>
                );
            })}
        </section>
    );
}
