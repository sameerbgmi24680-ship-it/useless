"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { Members } from "@/components/sections/Members";
import { About } from "@/components/sections/About";
import { Projects } from "@/components/sections/Projects";
import { Gallery } from "@/components/sections/Gallery";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll spring for fluid animation scrubbing
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

  return (
    <main ref={containerRef} className="relative bg-black min-h-[800vh]"> {/* Massive height for scrubbing */}

      {/* SCENE 1: HERO (0% - 15%) */}
      {/* Pins the Hero and handles its exit animation */}
      <div className="sticky top-0 h-screen overflow-hidden">
        <Hero scrollProgress={smoothProgress} />
      </div>

      {/* SCENE 2: MEMBERS (15% - 45%+) */}
      {/* Overlaps/Pins for member sequence. 
                Pointer events 'none' by default so scroll passes through, 
                but children can re-enable events if needed (like the detail modal). 
            */}
      <div className="sticky top-0 h-screen overflow-hidden z-10 pointer-events-none">
        <Members scrollProgress={smoothProgress} />
      </div>

      {/* SCENE 3: REST OF CONTENT (Normal Flow or Pinned) */}
      {/* For now, we will let these flow after the scroll scrubbing or be pinned as well.
                Given the requirement for "no standard vertical flow", these should probably be revealed sequentially too.
                But let's stick to the critical Hero -> Members flow first.
                To make them appear *after* the huge scroll space, we place them at the bottom of the container?
                Actually, if we put them in a relative div at the end, they will appear after 800vh.
            */}
      <div className="relative z-20 bg-neutral-900 mt-[100vh]">
        {/* The 'mt' here helps separate, but really we want these to be part of the flow. 
                    If we want them to scroll normally, we can just put them here. 
                */}
        <About />
        <Gallery />
        <Projects />
        <Lifestyle />
        <Contact />
      </div>
    </main>
  );
}
