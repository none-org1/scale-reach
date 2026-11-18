"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Button from "@/components/Button";
import ThreeHeroBackground from "@/components/ThreeHeroBackground";
import { Zap, Play, Video, BarChart3, Sparkles, ArrowRight } from "lucide-react";

export default function LandingPage() {
  const contentRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!contentRef.current) return;
    gsap.fromTo(
      contentRef.current,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
    );
  }, []);

  useEffect(() => {
    if (!featuresRef.current) return;
    gsap.fromTo(
      featuresRef.current.children,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );
  }, []);

  const features = [
    {
      icon: <Video size={24} />,
      title: "Auto Clip Detection",
      desc: "AI scans your video and finds the best moments automatically.",
    },
    {
      icon: <Sparkles size={24} />,
      title: "Smart Captions",
      desc: "Generate burned-in captions styled for each platform.",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Viral Scoring",
      desc: "Every clip gets a score based on hook strength and retention.",
    },
    {
      icon: <Zap size={24} />,
      title: "Batch Export",
      desc: "Export dozens of clips to multiple platforms in one click.",
    },
  ];

  return (
    <main className="relative min-h-screen">
      <ThreeHeroBackground />

      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        <div ref={contentRef} className="max-w-4xl space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/20 text-accent text-sm font-medium">
            <Zap size={14} /> Now with AI-powered viral scoring
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Turn long videos into{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent to-purple-400">
              viral clips
            </span>{" "}
            automatically.
          </h1>
          <p className="text-xl text-text-muted max-w-2xl mx-auto">
            ScaleReach watches your video, finds the best moments, and exports
            ready-to-post clips for every platform — in seconds.
          </p>
          <div className="flex gap-4 justify-center pt-4">
            <Button variant="primary" size="lg" icon={<Play size={18} />}>
              Start Generating
            </Button>
            <Button variant="secondary" size="lg" icon={<ArrowRight size={18} />}>
              View Pricing
            </Button>
          </div>
        </div>
      </section>

      <section ref={featuresRef} className="relative z-10 px-6 py-24 max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to repurpose
          </h2>
          <p className="text-text-muted text-lg max-w-2xl mx-auto">
            From upload to export, ScaleReach handles the entire clip-making workflow.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div
              key={i}
              className="bg-surface border border-border rounded-xl p-6 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4">
                {f.icon}
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-text-muted text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="relative z-10 px-6 py-24">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-accent/10 to-purple-500/10 border border-accent/20 rounded-2xl p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to scale your reach?
          </h2>
          <p className="text-text-muted text-lg mb-8">
            Join creators who turn hours of footage into viral moments.
          </p>
          <Button variant="primary" size="lg">
            Start for Free
          </Button>
        </div>
      </section>
    </main>
  );
}