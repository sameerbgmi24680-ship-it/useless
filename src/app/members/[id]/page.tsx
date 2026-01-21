"use client";

import { useParams, useRouter } from "next/navigation";
import { members } from "@/data/members";
import { motion } from "framer-motion";
import { ArrowLeft, X } from "lucide-react";
import { useEffect, useState } from "react";

export default function MemberPage() {
    const params = useParams();
    const router = useRouter();
    const [id, setId] = useState<string | null>(null);

    // Hydration fix for useParams
    useEffect(() => {
        if (params?.id) {
            setId(params.id as string);
        }
    }, [params]);

    if (!id) return <div className="bg-black h-screen w-full" />;

    const member = members.find((m) => m.id === id);

    if (!member) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-black text-white">
                <h1>Member not found</h1>
            </div>
        );
    }

    return (
        <main className="relative min-h-screen w-full bg-black text-white overflow-hidden">
            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="absolute top-8 left-8 z-50 p-4 rounded-full bg-white/5 hover:bg-white/10 backdrop-blur-md transition-all group"
            >
                <ArrowLeft className="w-6 h-6 text-white group-hover:-translate-x-1 transition-transform" />
            </button>

            {/* Background Image (Dimmed) */}
            <div className="absolute inset-0 z-0">
                <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover opacity-30 grayscale scale-105 blur-sm"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="relative z-10 h-screen flex flex-col md:flex-row items-center justify-center p-8 md:p-20 gap-12">

                {/* Hero Image */}
                <motion.div
                    initial={{ opacity: 0, x: -50, scale: 0.9 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                    className="w-full max-w-md aspect-[3/4] relative rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                >
                    <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                    />
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    className="max-w-xl space-y-8"
                >
                    <div>
                        <p className="text-[var(--royal-gold)] font-mono text-sm uppercase tracking-[0.2em] mb-4">
                            {member.persona}
                        </p>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-2">
                            {member.name}
                        </h1>
                        <div className="h-1 w-24 bg-[var(--neon-purple)] rounded-full" />
                    </div>

                    <div className="space-y-4">
                        <h2 className="text-2xl font-bold text-white/90">{member.role}</h2>
                        <p className="text-xl text-white/60 leading-relaxed font-light">
                            {member.bio}
                        </p>
                    </div>

                    <div className="pt-8 flex gap-8">
                        <div>
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Status</p>
                            <p className="text-white">Active</p>
                        </div>
                        <div>
                            <p className="text-xs text-white/30 uppercase tracking-widest mb-1">Collective</p>
                            <p className="text-white">USELESS</p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
