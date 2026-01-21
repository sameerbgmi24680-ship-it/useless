import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ScrollProgress } from "@/components/ui/ScrollProgress";
import { GatekeeperLoader } from "@/components/ui/GatekeeperLoader";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { MagneticCursor } from "@/components/ui/MagneticCursor";
import { NoiseOverlay } from "@/components/ui/NoiseOverlay";
import { MembersProvider } from "@/context/MembersContext";
import { MemberOverlay } from "@/components/ui/MemberOverlay";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "The Collective",
  description: "A showcase of friendship, creativity, and ambition.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          inter.variable,
          "min-h-screen bg-background text-foreground antialiased"
        )}
      >
        <SmoothScroll>
          <LoadingScreen />
          <ScrollProgress />
          <NoiseOverlay />
          <MagneticCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
