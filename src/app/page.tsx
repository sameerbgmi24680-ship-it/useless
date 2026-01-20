import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { MarvelIntro } from "@/components/sections/MarvelIntro";
import { About } from "@/components/sections/About";
import { Members } from "@/components/sections/Members";
import { Gallery } from "@/components/sections/Gallery";
import { Projects } from "@/components/sections/Projects";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-black text-white selection:bg-white selection:text-black">
      <Navbar />
      <Hero />
      <MarvelIntro />
      <div className="relative z-10 bg-black">
        <About />
        <Members />
        <Gallery />
        <Projects />
        <Lifestyle />
        <Contact />
      </div>
    </main>
  );
}
