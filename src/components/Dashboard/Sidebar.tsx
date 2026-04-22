"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";

const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    { id: "overview", label: "Overview", href: "/dashboard", icon: "📊" },
    { id: "hero", label: "Hero Section", href: "/dashboard/hero", icon: "🏠" },
    { id: "about", label: "About Me", href: "/dashboard/about", icon: "👤" },
    { id: "skills", label: "Skills", href: "/dashboard/skills", icon: "⚡" },
    { id: "soft-skills", label: "Soft Skills", href: "/dashboard/soft-skills", icon: "🧠" },
    { id: "projects", label: "Projects", href: "/dashboard/projects", icon: "📁" },
    { id: "experience", label: "Experience", href: "/dashboard/experience", icon: "💼" },
    { id: "services", label: "Services", href: "/dashboard/services", icon: "🛠️" },
    { id: "education", label: "Education", href: "/dashboard/education", icon: "🎓" },
    { id: "contact", label: "Contact", href: "/dashboard/contact", icon: "📞" },
  ];

  return (
    <div className="w-72 bg-black/40 backdrop-blur-xl border-r border-white/5 flex flex-col h-screen sticky top-0">
      {/* Logo Section */}
      <div className="p-8">
        <Link href="/dashboard" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-foreground text-background rounded-xl flex items-center justify-center font-black text-xl group-hover:rotate-12 transition-transform">
            A
          </div>
          <div>
            <h1 className="font-black text-lg tracking-tight text-white">Dashboard</h1>
            <p className="text-[10px] uppercase tracking-widest text-foreground/40 font-bold">Portfolio Manager</p>
          </div>
        </Link>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all relative group ${
                isActive
                  ? "bg-white/10 text-white"
                  : "text-foreground/60 hover:text-white hover:bg-white/5"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="active-nav"
                  className="absolute left-0 w-1 h-6 bg-foreground rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-bold text-sm tracking-tight">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-6 border-t border-white/5">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 w-full py-3 rounded-xl border border-white/10 text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-all text-white"
        >
          <span>←</span> Back to Site
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
