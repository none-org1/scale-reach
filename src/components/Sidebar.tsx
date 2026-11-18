"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Library,
  Calendar,
  Settings,
  Zap,
  BarChart3,
} from "lucide-react";

const nav = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/library", label: "Library", icon: Library },
  { href: "/clips", label: "Clip Review", icon: Video },
  { href: "/scheduler", label: "Scheduler", icon: Calendar },
  { href: "/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/settings", label: "Settings", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r border-border flex flex-col p-4 space-y-6 h-screen sticky top-0">
      <div className="flex items-center gap-2 px-2">
        <div className="w-9 h-9 bg-gradient-to-br from-accent to-purple-500 rounded-lg flex items-center justify-center shadow-lg shadow-accent/20">
          <Zap className="text-on-accent w-5 h-5 fill-current" />
        </div>
        <span className="font-bold text-xl tracking-tight">ScaleReach</span>
      </div>

      <nav className="flex-1 space-y-1">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg font-medium transition-all duration-200 ${
                isActive
                  ? "bg-accent/10 text-accent"
                  : "text-text-muted hover:text-text hover:bg-surface-hover"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="bg-surface border border-border rounded-xl p-4 space-y-3">
        <div className="flex justify-between items-center text-xs">
          <span className="text-text-muted">Minutes Balance</span>
          <span className="text-text font-semibold">4,800 / 5,000</span>
        </div>
        <div className="w-full bg-bg h-1.5 rounded-full overflow-hidden">
          <div className="bg-gradient-to-r from-accent to-purple-500 h-full w-[96%] rounded-full" />
        </div>
        <button className="w-full py-2 text-xs font-semibold bg-gradient-to-r from-viral to-warning text-on-accent rounded-lg hover:shadow-lg hover:shadow-viral/20 transition">
          Upgrade Plan
        </button>
      </div>
    </aside>
  );
}