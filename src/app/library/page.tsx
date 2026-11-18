"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Search, Filter, Video, Clock, MoreVertical, Download, Trash2 } from "lucide-react";
import Sidebar from "@/components/Sidebar";
import Button from "@/components/Button";

export default function LibraryPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(ref.current, { opacity: 0 }, { opacity: 1, duration: 0.5, ease: "power2.out" });
  }, []);

  const videos = [
    { id: 1, title: "How to Scale your AI business", duration: "12:45", date: "Nov 18", clips: 12, size: "2.4 GB" },
    { id: 2, title: "Podcast Episode #42: Future of LLMs", duration: "45:30", date: "Nov 17", clips: 24, size: "5.1 GB" },
    { id: 3, title: "Twitch Stream: Deep Dive into Coding", duration: "2:15:00", date: "Nov 15", clips: 48, size: "11.8 GB" },
    { id: 4, title: "Product Launch Live", duration: "1:22:00", date: "Nov 12", clips: 18, size: "3.9 GB" },
    { id: 5, title: "Tutorial: Building with Next.js 15", duration: "38:20", date: "Nov 10", clips: 15, size: "1.7 GB" },
  ];

  return (
    <div ref={ref} className="flex min-h-screen bg-bg">
      <Sidebar />

      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-bg/50 backdrop-blur-md sticky top-0 z-10">
          <div>
            <h1 className="text-xl font-bold">Library</h1>
            <p className="text-xs text-text-muted">All your processed videos</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
              <input
                type="text"
                placeholder="Search videos..."
                className="w-64 bg-surface border border-border-input rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent transition"
              />
            </div>
            <Button variant="secondary" size="md" icon={<Filter size={16} />}>
              Filter
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {videos.map((v) => (
              <div
                key={v.id}
                className="bg-surface border border-border rounded-xl p-4 flex items-center gap-4 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-accent/20 to-purple-500/20 flex items-center justify-center flex-shrink-0">
                  <Video size={28} className="text-accent" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{v.title}</h3>
                  <div className="flex items-center gap-3 text-xs text-text-muted mt-1">
                    <span className="flex items-center gap-1"><Clock size={12} />{v.duration}</span>
                    <span>•</span>
                    <span>{v.clips} clips</span>
                    <span>•</span>
                    <span>{v.size}</span>
                    <span>•</span>
                    <span>{v.date}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={<Download size={14} />}>
                    Export
                  </Button>
                  <button className="text-text-muted hover:text-text p-2 rounded-md hover:bg-surface-hover">
                    <MoreVertical size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}