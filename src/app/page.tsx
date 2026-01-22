"use client";

import { LandingHero } from "@/components/LandingHero";
import { SquadSection } from "@/components/squad/SquadSection";

export default function Home() {
  return (
    <main className="bg-[var(--deep-carbon)] text-[var(--foreground)] selection:bg-[var(--neon-norris)] selection:text-black">
      <LandingHero />
      <SquadSection />

      {/* Footer Placeholder for visual completion */}
      <footer className="flex h-[50vh] flex-col items-center justify-center border-t border-white/10 bg-black">
        <h2 className="font-mono text-xs uppercase tracking-widest text-white/30">
          Useless Theta // 2026
        </h2>
      </footer>
    </main>
  );
}
