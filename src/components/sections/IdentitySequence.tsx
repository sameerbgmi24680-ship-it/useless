import { motion, useTransform } from "framer-motion";

interface IdentitySequenceProps {
    scrollProgress: any;
}

const chapters = [
    { title: "THE BRAINS", desc: "Strategizing the chaos.", align: "left" },
    { title: "THE VISION", desc: "Seeing what others don't.", align: "right" },
    { title: "THE HEART", desc: "Pumping life into code.", align: "center" },
    { title: "THE SOUL", desc: "The essence of our craft.", align: "left" },
    { title: "THE MUSCLE", desc: "Building with brute force.", align: "right" },
    { title: "THIS IS USELESS", desc: "We are the collective.", align: "center", big: true },
];

export function IdentitySequence({ scrollProgress }: IdentitySequenceProps) {
    // Timeline configuration (10% to 35% of page scroll)
    const START = 0.10;
    const END = 0.35;
    const TOTAL = END - START;
    const STEP = TOTAL / chapters.length;

    return (
        <section className="relative h-screen w-full pointer-events-none">
            {chapters.map((chapter, index) => {
                const start = START + (index * STEP);
                const end = start + STEP;
                const mid = start + (STEP * 0.5);

                const opacity = useTransform(scrollProgress, [start, mid, end], [0, 1, 0]);
                const scale = useTransform(scrollProgress, [start, end], [0.8, 1.2]);
                const blur = useTransform(scrollProgress, [start, mid, end], ["10px", "0px", "10px"]);

                // Directional motion
                const xIn = chapter.align === "left" ? -100 : chapter.align === "right" ? 100 : 0;
                const x = useTransform(scrollProgress, [start, mid, end], [xIn, 0, -xIn]);

                return (
                    <motion.div
                        key={chapter.title}
                        style={{ opacity, scale, filter: blur as any, x }}
                        className="absolute inset-0 flex flex-col items-center justify-center z-20"
                    >
                        <h2 className={`${chapter.big ? "text-[8vw] md:text-[10vw]" : "text-[6vw] md:text-[7vw]"} font-black tracking-tighter text-white drop-shadow-2xl text-center leading-none`}>
                            {chapter.title}
                        </h2>
                        <p className="mt-4 font-mono text-xs md:text-sm tracking-[0.5em] text-[var(--royal-gold)] uppercase">
                            {chapter.desc}
                        </p>
                    </motion.div>
                );
            })}
        </section>
    );
}
