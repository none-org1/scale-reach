"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import {
  LayoutDashboard,
  Video,
  Library,
  Calendar,
  Settings,
  Zap,
  Plus,
  Search,
  MoreVertical,
  Clock,
  ExternalLink
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      containerRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.6, ease: "power2.out" }
    );
  }, []);

  const videos = [
    { id: 1, title: "How to Scale your AI business", duration: "12:45", status: "complete", clips: 12, thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=225&fit=crop" },
    { id: 2, title: "Podcast Episode #42: Future of LLMs", duration: "45:30", status: "complete", clips: 24, thumbnail: "https://images.unsplash.com/photo-1589903303904-a042229d285c?w=400&h=225&fit=crop" },
    { id: 3, title: "Twitch Stream: Deep Dive into Coding", duration: "2:15:00", status: "processing", progress: 65, thumbnail: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=225&fit=crop" },
  ];

  return (
    <div ref={containerRef} className="flex min-h-screen bg-bg">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border flex flex-col p-4 space-y-8">
        <div className="flex items-center gap-2 px-2">
          <div className="w-8 h-8 bg-accent rounded flex items-center justify-center">
            <Zap className="text-on-accent w-5 h-5 fill-current" />
          </div>
          <span className="font-bold text-xl tracking-tight">ScaleReach</span>
        </div>

        <nav className="flex-1 space-y-1">
          <Link href="/dashboard" className="flex items-center gap-3 px-3 py-2 bg-surface text-accent rounded-md">
            <LayoutDashboard size={18} />
            <span className="font-medium">Dashboard</span>
          </Link>
          <Link href="/library" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-text hover:bg-surface-hover rounded-md transition">
            <Library size={18} />
            <span className="font-medium">Library</span>
          </Link>
          <Link href="/scheduler" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-text hover:bg-surface-hover rounded-md transition">
            <Calendar size={18} />
            <span className="font-medium">Scheduler</span>
          </Link>
          <Link href="/settings" className="flex items-center gap-3 px-3 py-2 text-text-muted hover:text-text hover:bg-surface-hover rounded-md transition">
            <Settings size={18} />
            <span className="font-medium">Settings</span>
          </Link>
        </nav>

        <div className="bg-surface rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-text-muted">Minutes Balance</span>
            <span className="text-text">4,800 / 5,000</span>
          </div>
          <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden">
            <div className="bg-accent h-full w-[96%]" />
          </div>
          <button className="w-full py-2 text-xs font-semibold bg-accent/10 text-accent hover:bg-accent/20 rounded-md transition">
            Upgrade Plan
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b border-border flex items-center justify-between px-8 bg-bg/50 backdrop-blur-md sticky top-0 z-10">
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted" size={16} />
            <input
              type="text"
              placeholder="Search videos or clips..."
              className="w-full bg-surface border border-border-input rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-accent transition"
            />
          </div>
          <button className="bg-accent hover:bg-accent-hover text-on-accent px-4 py-2 rounded-md font-semibold flex items-center gap-2 transition text-sm">
            <Plus size={18} />
            New Project
          </button>
        </header>

        <div className="p-8 space-y-8">
          <div>
            <h2 className="text-2xl font-bold">Your Videos</h2>
            <p className="text-text-muted text-sm">Manage and review your AI generated clips.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video) => (
              <div key={video.id} className="group bg-surface border border-border rounded-xl overflow-hidden hover:border-accent/50 transition cursor-pointer">
                <div className="aspect-video relative overflow-hidden">
                  <img src={video.thumbnail} alt={video.title} className="object-cover w-full h-full group-hover:scale-105 transition duration-500" />
                  <div className="absolute bottom-2 right-2 bg-black/70 px-1.5 py-0.5 rounded text-[10px] font-bold">
                    {video.duration}
                  </div>
                  {video.status === 'processing' && (
                    <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4 space-y-3">
                      <div className="w-full max-w-[150px] bg-white/20 h-1.5 rounded-full overflow-hidden">
                        <div className="bg-accent h-full transition-all" style={{ width: `${video.progress}%` }} />
                      </div>
                      <span className="text-xs font-medium">Processing... {video.progress}%</span>
                    </div>
                  )}
                </div>
                <div className="p-4 flex justify-between items-start">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm line-clamp-1">{video.title}</h3>
                    <div className="flex items-center gap-3 text-xs text-text-muted">
                      <span className="flex items-center gap-1">
                        <Video size={12} />
                        {video.clips} clips
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={12} />
                        Just now
                      </span>
                    </div>
                  </div>
                  <button className="text-text-muted hover:text-text">
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
