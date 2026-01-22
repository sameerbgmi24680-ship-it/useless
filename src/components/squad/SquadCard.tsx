import React, { forwardRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface SquadMember {
    id: string;
    name: string;
    role: string;
    image: string;
    stats: {
        label: string;
        value: string;
    }[];
    number: string;
}

interface SquadCardProps {
    member: SquadMember;
    className?: string;
    index: number;
}

export const SquadCard = forwardRef<HTMLDivElement, SquadCardProps>(
    ({ member, className, index }, ref) => {
        return (
            <div
                ref={ref}
                className={cn(
                    "squad-card relative h-[80vh] w-[400px] shrink-0 overflow-hidden rounded-sm bg-black/20 border border-white/5",
                    "transform-gpu will-change-transform", // Optimization
                    className
                )}
            >
                {/* Background Number */}
                <div className="absolute -right-10 -top-20 z-0 select-none text-[30rem] font-black leading-none text-[#D2FF00] opacity-[0.03] font-sans">
                    {member.number}
                </div>

                {/* Image Container */}
                <div className="card-image-container absolute inset-0 z-10 origin-center scale-100 transition-transform duration-700">
                    {/* Using a gray div as placeholder if image fails, but using Image component */}
                    <div className="relative h-full w-full grayscale-[50%] transition-all duration-500 hover:grayscale-0 card-image-inner">
                        {member.image ? (
                            <img
                                src={member.image}
                                alt={member.name}
                                className="h-full w-full object-cover object-center"
                            />
                        ) : (
                            <div className="h-full w-full bg-[#1A1A1A]" />
                        )}

                        {/* Glitch Overlay - Initially hidden/inactive */}
                        <div className="glitch-layer absolute inset-0 hidden opacity-50 mix-blend-color-dodge"></div>
                    </div>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 z-20 w-full bg-gradient-to-t from-black via-black/80 to-transparent p-8 pb-12">
                    <div className="card-text-content transform-gpu">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="inline-block h-[2px] w-8 bg-[var(--neon-norris)]"></span>
                            <span className="font-mono text-xs font-bold uppercase tracking-widest text-[var(--neon-norris)]">
                                {member.role}
                            </span>
                        </div>

                        <h2 className="mb-6 font-sans text-5xl font-black uppercase italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[var(--royal-gold)] to-[#FFD700] drop-shadow-sm">
                            {member.name}
                        </h2>

                        <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-4 font-mono text-sm text-white/80">
                            {member.stats.map((stat, i) => (
                                <div key={i}>
                                    <div className="text-[10px] uppercase text-white/40">{stat.label}</div>
                                    <div className="text-lg font-bold">{stat.value}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Active Border (Hidden by default, shown via class) */}
                <div className="card-border absolute inset-0 z-30 border-2 border-[var(--neon-norris)] opacity-0 transition-opacity duration-300"></div>
            </div>
        );
    }
);

SquadCard.displayName = "SquadCard";
