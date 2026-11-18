"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ThreeHeroBackground from "@/components/ThreeHeroBackground";

export default function LandingPage() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GSAP Reveal Animation
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  return (
    <main className="relative min-h-screen flex flex-col items-center justify-center p-6">
      <ThreeHeroBackground />

      <div
        ref={contentRef}
        className="relative z-10 text-center max-w-3xl space-y-6"
      >
        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-400">
          Scale your reach automatically.
        </h1>
        <p className="text-xl text-text-muted">
          Turn your long-form video content into viral social media clips in seconds with AI-driven repurposing.
        </p>
        <div className="flex gap-4 justify-center pt-8">
          <button className="px-8 py-3 bg-accent hover:bg-accent-hover text-on-accent rounded-lg font-semibold transition">
            Start Generating
          </button>
          <button className="px-8 py-3 bg-surface hover:bg-surface-hover border border-border text-text rounded-lg font-semibold transition">
            View Pricing
          </button>
        </div>
      </div>
    </main>
  );
}
