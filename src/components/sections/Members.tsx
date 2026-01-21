import { useRef } from "react";
import { members } from "@/data/members";
// import { useRouter } from "next/navigation"; // Removed for FLIP
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useMembers } from "@/context/MembersContext";

gsap.registerPlugin(ScrollTrigger);

interface MembersProps {
    scrollProgress: any;
}

export function Members({ scrollProgress }: MembersProps) {
    // const router = useRouter();
    const { setActiveMember } = useMembers(); // Use Global Context
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const track = trackRef.current;
        if (!track) return;

        const scrollDistance = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
            x: -scrollDistance,
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1, // Inertia
                snap: 1 / (members.length), // Snap to items (approx)
                anticipatePin: 1, // Prevent jitter
                start: "top top",
                end: () => "+=" + scrollDistance,
                invalidateOnRefresh: true,
            }
        });

    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            id="members-gsap"
            className="relative h-screen w-full overflow-hidden bg-black"
        >
            <div
                ref={trackRef}
                className="flex flex-row items-center h-full w-fit will-change-transform"
            >
                {/* Intro Card */}
                <div className="w-[50vw] h-full flex items-center justify-center flex-shrink-0">
                    <h2 className="text-8xl font-black text-white/10 tracking-tighter rotate-90">THE SQUAD</h2>
                </div>

                {members.map((member, index) => (
                    <div
                        key={member.id}
                        className="squad-card w-[80vw] md:w-[60vw] h-full flex-shrink-0 flex flex-col items-center justify-center relative border-r border-white/5"
                    >
                        <div className="z-10 text-center mb-8">
                            <p className="text-[var(--royal-gold)] font-mono text-sm uppercase tracking-[0.2em] mb-2">
                                0{index + 1}
                            </p>
                            <h2
                                className="text-6xl md:text-8xl font-black text-white tracking-tighter cursor-pointer hover:text-[var(--lando-neon)] transition-colors duration-300"
                                onClick={() => setActiveMember(member)}
                            >
                                {member.name.split(' ')[0]}
                            </h2>
                            <p className="text-white/50">{member.role}</p>
                        </div>

                        <div
                            className="w-[30vw] aspect-[3/4] overflow-hidden grayscale hover:grayscale-0 transition-all duration-500 cursor-pointer"
                            onClick={() => setActiveMember(member)}
                        >
                            <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
