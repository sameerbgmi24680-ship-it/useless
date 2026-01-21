"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { Member } from "@/data/members";

interface MembersContextType {
    activeMember: Member | null;
    setActiveMember: (member: Member | null) => void;
}

const MembersContext = createContext<MembersContextType | undefined>(undefined);

export function MembersProvider({ children }: { children: ReactNode }) {
    const [activeMember, setActiveMember] = useState<Member | null>(null);

    return (
        <MembersContext.Provider value={{ activeMember, setActiveMember }}>
            {children}
        </MembersContext.Provider>
    );
}

export function useMembers() {
    const context = useContext(MembersContext);
    if (!context) {
        throw new Error("useMembers must be used within a MembersProvider");
    }
    return context;
}
