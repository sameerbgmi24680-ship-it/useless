"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { IdentitySequence } from "@/components/sections/IdentitySequence";
import { Members } from "@/components/sections/Members";
import { CinematicContent } from "@/components/sections/CinematicContent";

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scroll spring for fluid animation scrubbing
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 20, restDelta: 0.001 });

  return (
    <main ref={containerRef} className="relative bg-black min-h-[3500vh]"> {/* Extended Timeline */}

      {/* Master Sticky Container */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">

        {/* Layer 1: Hero (0-10%) */}
        <div className="absolute inset-0 z-0">
          <Hero scrollProgress={smoothProgress} />
        </div>

        {/* Layer 2: Identity Sequence (10-35%) */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <IdentitySequence scrollProgress={smoothProgress} />
        </div>

        {/* Layer 3: The Squad (35-70%) */}
        <div className="absolute inset-0 z-20 pointer-events-none">
          <Members scrollProgress={smoothProgress} />
        </div>

        {/* Layer 4: Content & Finale (70-100%) */}
        <div className="absolute inset-0 z-30 pointer-events-none">
          <CinematicContent scrollProgress={smoothProgress} />
        </div>

      </div>
    </main>
  );
}
