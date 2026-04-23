"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  UserCircle2,
  Zap,
  Brain,
  FolderKanban,
  BriefcaseBusiness,
  Wrench,
  GraduationCap,
  Phone,
  ArrowLeft,
  ChevronRight,
  Sparkles,
  Menu,
  X,
} from "lucide-react";

const menuItems = [
  {
    id: "overview",
    label: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
    color: "#a78bfa",
  },
  {
    id: "hero",
    label: "Hero Section",
    href: "/dashboard/hero",
    icon: Home,
    color: "#60a5fa",
  },
  {
    id: "about",
    label: "About Me",
    href: "/dashboard/about",
    icon: UserCircle2,
    color: "#34d399",
  },
  {
    id: "skills",
    label: "Skills",
    href: "/dashboard/skills",
    icon: Zap,
    color: "#fbbf24",
  },
  {
    id: "soft-skills",
    label: "Soft Skills",
    href: "/dashboard/soft-skills",
    icon: Brain,
    color: "#f472b6",
  },
  {
    id: "projects",
    label: "Projects",
    href: "/dashboard/projects",
    icon: FolderKanban,
    color: "#38bdf8",
  },
  {
    id: "experience",
    label: "Experience",
    href: "/dashboard/experience",
    icon: BriefcaseBusiness,
    color: "#fb923c",
  },
  {
    id: "services",
    label: "Services",
    href: "/dashboard/services",
    icon: Wrench,
    color: "#a3e635",
  },
  {
    id: "education",
    label: "Education",
    href: "/dashboard/education",
    icon: GraduationCap,
    color: "#e879f9",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/dashboard/contact",
    icon: Phone,
    color: "#2dd4bf",
  },
];

/* ─────────────────── Sidebar ─────────────────── */
const Sidebar = () => {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      {/* ── Mobile toggle ── */}
      <button
        onClick={() => setCollapsed((p) => !p)}
        className="fixed top-4 left-4 z-50 md:hidden w-10 h-10 rounded-xl bg-black/60 border border-white/10 flex items-center justify-center text-white backdrop-blur-md"
      >
        {collapsed ? <X size={18} /> : <Menu size={18} />}
      </button>

      {/* ── Sidebar shell ── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 272 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="relative flex flex-col h-screen sticky top-0 overflow-hidden z-40"
        style={{
          background:
            "linear-gradient(160deg, rgba(10,10,18,0.97) 0%, rgba(14,10,28,0.97) 100%)",
          borderRight: "1px solid rgba(255,255,255,0.06)",
        }}
      >
        {/* Subtle radial glow top-left */}
        <div
          className="pointer-events-none absolute -top-16 -left-16 w-64 h-64 rounded-full opacity-20"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.5) 0%, transparent 70%)",
          }}
        />

        {/* ── Logo ── */}
        <div
          className={`relative flex items-center gap-3 px-4 py-6 ${
            collapsed ? "justify-center" : "px-5"
          }`}
        >
          <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
            {/* Avatar badge */}
            <div className="relative flex-shrink-0">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg text-white select-none"
                style={{
                  background:
                    "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                  boxShadow: "0 0 20px rgba(124,58,237,0.45)",
                }}
              >
                A
              </div>
              {/* Online dot */}
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a12]"
                style={{ background: "#34d399" }}
              />
            </div>

            <AnimatePresence>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.18 }}
                  className="min-w-0"
                >
                  <p className="font-extrabold text-[15px] leading-none text-white tracking-tight truncate">
                    Dashboard
                  </p>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold mt-0.5 truncate flex items-center gap-1">
                    <Sparkles size={9} className="text-violet-400" />
                    Portfolio Manager
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </Link>

          {/* Collapse toggle — desktop */}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="ml-auto flex-shrink-0 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-white/40 hover:text-white/80"
            >
              <ChevronRight size={14} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="mx-auto mb-1 w-7 h-7 rounded-lg bg-white/5 hover:bg-white/10 transition flex items-center justify-center text-white/40 hover:text-white/80"
          >
            <ChevronRight size={14} className="rotate-180" />
          </button>
        )}

        {/* Divider */}
        <div className="h-px mx-4 bg-white/5 mb-3" />

        {/* ── Section label ── */}
        <AnimatePresence>
          {!collapsed && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="px-5 mb-2 text-[9px] uppercase tracking-[0.22em] font-bold text-white/20"
            >
              Navigation
            </motion.p>
          )}
        </AnimatePresence>

        {/* ── Nav items ── */}
        <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-none">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            const isHovered = hovered === item.id;

            return (
              <Link
                key={item.id}
                href={item.href}
                onMouseEnter={() => setHovered(item.id)}
                onMouseLeave={() => setHovered(null)}
                className="relative flex items-center gap-3 rounded-xl transition-all duration-150 group"
                style={{
                  padding: collapsed ? "10px 0" : "10px 12px",
                  justifyContent: collapsed ? "center" : "flex-start",
                  background: isActive
                    ? `linear-gradient(90deg, ${item.color}18 0%, transparent 100%)`
                    : isHovered
                      ? "rgba(255,255,255,0.04)"
                      : "transparent",
                }}
              >
                {/* Active left bar */}
                {isActive && (
                  <motion.div
                    layoutId="active-bar"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
                    style={{ background: item.color }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}

                {/* Icon wrapper */}
                <div
                  className="relative flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
                  style={{
                    background: isActive
                      ? `${item.color}22`
                      : isHovered
                        ? `${item.color}15`
                        : "transparent",
                  }}
                >
                  <Icon
                    size={16}
                    style={{
                      color: isActive
                        ? item.color
                        : isHovered
                          ? item.color
                          : "rgba(255,255,255,0.4)",
                      transition: "color 0.15s",
                    }}
                  />
                  {/* Glow on active */}
                  {isActive && (
                    <div
                      className="absolute inset-0 rounded-lg opacity-40 blur-sm"
                      style={{ background: item.color }}
                    />
                  )}
                </div>

                {/* Label */}
                <AnimatePresence>
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -6 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -6 }}
                      transition={{ duration: 0.15 }}
                      className="text-[13px] font-semibold tracking-tight truncate"
                      style={{
                        color: isActive
                          ? "#ffffff"
                          : isHovered
                            ? "rgba(255,255,255,0.85)"
                            : "rgba(255,255,255,0.42)",
                      }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Active dot badge (collapsed) */}
                {collapsed && isActive && (
                  <span
                    className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
                    style={{ background: item.color }}
                  />
                )}

                {/* Tooltip on collapsed */}
                {collapsed && isHovered && (
                  <div
                    className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none z-50 shadow-xl"
                    style={{
                      background: "rgba(20,15,35,0.98)",
                      border: "1px solid rgba(255,255,255,0.08)",
                      color: item.color,
                    }}
                  >
                    {item.label}
                    {/* Arrow */}
                    <span
                      className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45"
                      style={{
                        background: "rgba(20,15,35,0.98)",
                        border: "1px solid rgba(255,255,255,0.08)",
                        borderRight: "none",
                        borderTop: "none",
                      }}
                    />
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* ── Footer ── */}
        <div
          className="p-3 mt-2"
          style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
        >
          <Link
            href="/"
            className="flex items-center gap-2.5 rounded-xl transition-all duration-150 group"
            style={{
              padding: collapsed ? "10px 0" : "10px 12px",
              justifyContent: collapsed ? "center" : "flex-start",
              background: "rgba(255,255,255,0.04)",
            }}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition flex-shrink-0">
              <ArrowLeft
                size={15}
                className="text-white/50 group-hover:text-white/80 transition"
              />
            </div>
            <AnimatePresence>
              {!collapsed && (
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-[12px] font-semibold text-white/40 group-hover:text-white/70 uppercase tracking-widest transition"
                >
                  Back to Site
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
        </div>
      </motion.aside>
    </>
  );
};

export default Sidebar;
