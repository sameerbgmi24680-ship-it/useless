"use client";

import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GatekeeperLoader } from "@/components/ui/GatekeeperLoader";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { MembersProvider } from "@/context/MembersContext";
import { MemberOverlay } from "@/components/ui/MemberOverlay";

export function Providers({ children }: { children: React.ReactNode }) {
    return (
        <MembersProvider>
            <SmoothScroll>
                <GatekeeperLoader onComplete={() => { }} />
                <MemberOverlay />
                <ScrollProgress />
                <NoiseOverlay />
                <MagneticCursor />
                {children}
            </SmoothScroll>
        </MembersProvider>
    );
}
