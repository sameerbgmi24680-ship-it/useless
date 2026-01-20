"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export function Contact() {
    return (
        <footer id="contact" className="bg-neutral-950 text-white pt-24 pb-8 border-t border-white/5">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24">

                    {/* Text Info */}
                    <div className="space-y-8">
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
                            LET'S CREATE <br />
                            <span className="text-white/50">SOMETHING LEGENDARY.</span>
                        </h2>
                        <p className="text-lg text-white/60 max-w-md">
                            Whether you want to collaborate, sponsor a project, or just say hello — we're always open to new connections.
                        </p>

                        <div className="space-y-2">
                            <p className="text-white/40 text-sm font-mono uppercase">Email</p>
                            <a href="mailto:hello@thecollective.com" className="text-xl hover:text-yellow-500 transition-colors">
                                hello@thecollective.com
                            </a>
                        </div>

                        <div className="space-y-2">
                            <p className="text-white/40 text-sm font-mono uppercase">Socials</p>
                            <div className="flex gap-6">
                                {["Instagram", "Twitter", "YouTube", "LinkedIn"].map((platform) => (
                                    <a key={platform} href="#" className="hover:text-yellow-500 transition-colors">
                                        {platform}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <motion.form
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-6 bg-white/5 p-8 rounded-2xl border border-white/5"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Name</label>
                                <Input className="bg-black/50 border-white/10 text-white placeholder:text-white/20" placeholder="John Doe" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Email</label>
                                <Input className="bg-black/50 border-white/10 text-white placeholder:text-white/20" placeholder="john@example.com" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Purpose</label>
                            <select className="flex h-10 w-full rounded-md border border-white/10 bg-black/50 px-3 py-2 text-sm text-white ring-offset-background placeholder:text-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
                                <option>Collaboration</option>
                                <option>Join the Collective</option>
                                <option>Events / Media</option>
                                <option>Just saying hi</option>
                            </select>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium">Message</label>
                            <Textarea className="bg-black/50 border-white/10 text-white placeholder:text-white/20 min-h-[120px]" placeholder="Tell us about your idea..." />
                        </div>

                        <Button className="w-full bg-white text-black hover:bg-neutral-200" size="lg">
                            Send Message
                        </Button>
                    </motion.form>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row items-center justify-between text-sm text-white/40">
                    <p>© 2024 The Collective. All rights reserved.</p>
                    <div className="flex gap-6 mt-4 md:mt-0">
                        <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
