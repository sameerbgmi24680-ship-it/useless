"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const articles = [
    {
        id: 1,
        title: "The Art of Slow Living",
        excerpt: "Why we decided to disconnect for a week and reconnect with nature.",
        date: "June 24, 2024",
        readTime: "5 min read",
    },
    {
        id: 2,
        title: "Gear Essentials 2024",
        excerpt: "The cameras, lenses, and tools that power our creative workflow.",
        date: "May 12, 2024",
        readTime: "8 min read",
    },
    {
        id: 3,
        title: "Creating a Digital Identity",
        excerpt: "How to build a personal brand that feels authentic in a noisy world.",
        date: "April 02, 2024",
        readTime: "6 min read",
    },
];

export function Lifestyle() {
    return (
        <section id="lifestyle" className="py-24 bg-black text-white relative overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-neutral-900/20 to-transparent pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight mb-2">LIFESTYLE</h2>
                        <p className="text-white/60">Thoughts, stories, and the way we live.</p>
                    </div>
                    <Button variant="link" className="text-white hover:text-yellow-500 transition-colors p-0 h-auto">
                        Read the Journal
                    </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {articles.map((article, index) => (
                        <motion.article
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group cursor-pointer"
                        >
                            <div className="aspect-[16/10] bg-neutral-900 rounded-lg mb-6 overflow-hidden relative">
                                <div className="absolute inset-0 bg-white/5 group-hover:bg-white/10 transition-colors duration-500" />
                                <div className="absolute inset-0 flex items-center justify-center text-white/10 font-mono text-xs">
                                    [THUMBNAIL]
                                </div>
                            </div>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-xs text-white/40 font-mono uppercase tracking-wider">
                                    <span>{article.date}</span>
                                    <span>•</span>
                                    <span>{article.readTime}</span>
                                </div>
                                <h3 className="text-xl font-bold leading-tight group-hover:text-yellow-500 transition-colors duration-300">
                                    {article.title}
                                </h3>
                                <p className="text-white/60 text-sm leading-relaxed">
                                    {article.excerpt}
                                </p>
                            </div>
                        </motion.article>
                    ))}
                </div>
            </div>
        </section>
    );
}
