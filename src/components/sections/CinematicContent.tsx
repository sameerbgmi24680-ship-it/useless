import { motion, useTransform } from "framer-motion";
import { Gallery } from "@/components/sections/Gallery";
import { Projects } from "@/components/sections/Projects";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Contact } from "@/components/sections/Contact";

interface CinematicContentProps {
    scrollProgress: any;
}

export function CinematicContent({ scrollProgress }: CinematicContentProps) {
    // 70% to 90% : Content
    // 90% to 100% : Finale

    // SCENE 1: MOMENTS / GALLERY (70% - 77%)
    const galleryOpacity = useTransform(scrollProgress, [0.70, 0.71, 0.76, 0.77], [0, 1, 1, 0]);
    const galleryX = useTransform(scrollProgress, [0.70, 0.72, 0.78], ["100%", "0%", "-100%"]);
    const galleryScale = useTransform(scrollProgress, [0.70, 0.74], [0.8, 1]);

    // SCENE 2: PROJECTS (77% - 84%)
    const projectOpacity = useTransform(scrollProgress, [0.77, 0.78, 0.83, 0.84], [0, 1, 1, 0]);
    const projectY = useTransform(scrollProgress, [0.77, 0.79, 0.85], ["100%", "0%", "-100%"]);

    // SCENE 3: LIFESTYLE & CONTACT (84% - 90%)
    const lifestyleOpacity = useTransform(scrollProgress, [0.84, 0.86, 0.89, 0.91], [0, 1, 1, 0]);

    // FINALE: USELESS (90% - 100%)
    const finalOpacity = useTransform(scrollProgress, [0.90, 0.92], [0, 1]);
    const finalScale = useTransform(scrollProgress, [0.90, 1.0], [2, 1]); // Settle
    const finalRotate = useTransform(scrollProgress, [0.90, 1.0], [20, 0]);

    return (
        <section className="relative w-full h-full pointer-events-none">
            {/* Gallery Layer */}
            <motion.div
                style={{ opacity: galleryOpacity, x: galleryX, scale: galleryScale }}
                className="absolute inset-0 z-20 overflow-hidden flex items-center justify-center bg-black/80 backdrop-blur-sm"
            >
                <div className="scale-75 pointer-events-auto">
                    <Gallery />
                </div>
            </motion.div>

            {/* Projects Layer */}
            <motion.div
                style={{ opacity: projectOpacity, y: projectY }}
                className="absolute inset-0 z-30 overflow-hidden flex items-center justify-center bg-black/90 backdrop-blur-sm"
            >
                <div className="scale-75 pointer-events-auto">
                    <Projects />
                </div>
            </motion.div>

            {/* Lifestyle/Contact Layer */}
            <motion.div
                style={{ opacity: lifestyleOpacity }}
                className="absolute inset-0 z-40 overflow-hidden flex items-center justify-center bg-black"
            >
                <div className="w-full max-w-4xl pointer-events-auto">
                    <Lifestyle />
                    <Contact />
                </div>
            </motion.div>

            {/* GRAND FINALE */}
            <motion.div
                style={{ opacity: finalOpacity, scale: finalScale, rotateX: finalRotate, rotateZ: finalRotate }}
                className="absolute inset-0 z-50 flex items-center justify-center pointer-events-none mix-blend-difference"
            >
                <h1 className="text-[15vw] font-black tracking-tighter text-white">
                    USELESS
                </h1>
            </motion.div>
        </section>
    );
}
