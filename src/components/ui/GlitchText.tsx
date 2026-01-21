"use client";

import React from 'react';

interface GlitchTextProps {
    text: string;
    className?: string;
}

export function GlitchText({ text, className = "" }: GlitchTextProps) {
    return (
        <span className={`relative inline-block group ${className}`}>
            <span className="relative z-10">{text}</span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-[var(--glitch-cyan)] opacity-0 group-hover:opacity-100 animate-glitch-1"
                aria-hidden="true"
            >
                {text}
            </span>
            <span
                className="absolute top-0 left-0 -z-10 w-full h-full text-[var(--glitch-magenta)] opacity-0 group-hover:opacity-100 animate-glitch-2"
                aria-hidden="true"
            >
                {text}
            </span>
        </span>
    );
}
