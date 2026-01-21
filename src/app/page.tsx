"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import { Hero } from "@/components/sections/Hero";
import { IdentitySequence } from "@/components/sections/IdentitySequence";
import { Members } from "@/components/sections/Members";
import { CinematicContent } from "@/components/sections/CinematicContent";

export default function Home() {
  // New Architecture: Vertical Stack

  // 1. Intro Section (Hero + Identity)
  // We need enough height to scroll through the animations.
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ["start start", "end end"]
  });
  const smoothIntro = useSpring(introProgress, { stiffness: 100, damping: 20 });

  // We need to map the 0-1 range of this section to the 0-0.35 range the components expect
  // if we want to reuse them without modifying code.
  // Hero expects 0-0.12 exit. Identity expects 0.10-0.35.
  // If we make this section represent the first 35% of the old page, we can just pass the progress directly?
  // No, 0-1 here is 0-1 here.
  // Re-mapping:
  // Hero: runs 0 to 0.12 (old). If intro wrapper is shorter, maybe 0 to 0.4 here?
  // Identity: runs 0.10 to 0.35 (old). Maybe 0.3 to 1.0 here?

  // To avoid rewriting components logic too much, let's wrap them in a transform.
  const heroProgress = useTransform(smoothIntro, [0, 0.4], [0, 0.12]);
  // Wait, component logic is hardcoded [0.10, 0.35]. 
  // We need to feed it 0.10 when we are at 0.3 here.
  // We need to feed it 0.35 when we are at 1.0 here.
  const identityProgress = useTransform(smoothIntro, [0.3, 1], [0.10, 0.35]);

  // Actually, cleanest way is to pass a "proxy" progress that mimics the old timeline for just this section.
  // If Intro is 35% of old page, then 0-1 here should map to 0-0.35.
  const simulatedGlobalProgress = useTransform(smoothIntro, [0, 1], [0, 0.35]);

  return (
    <main className="bg-black">

      {/* SECTION 1: INTRO (Sticky) */}
      <div ref={introRef} className="relative h-[250vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <Hero scrollProgress={simulatedGlobalProgress} />
          <IdentitySequence scrollProgress={simulatedGlobalProgress} />
        </div>
      </div>

      {/* SECTION 2: SQUAD (GSAP Pinned) */}
      {/* This component handles its own pinning and height via ScrollTrigger-spacer */}
      <Members scrollProgress={null} />

      {/* SECTION 3: FINALE (Cyberpunk) */}
      <CinematicContent scrollProgress={null} />

    </main>
  );
}
