"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Home,
  UserCircle2,
  Zap,
  FolderKanban,
  BriefcaseBusiness,
  GraduationCap,
  Phone,
  ArrowLeft,
  Sparkles,
  Menu,
  X,
  MessageSquare,
} from "lucide-react";

// ── Menu config ────────────────────────────────────────────────────────────────
const NAV_ITEMS = [
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
  {
    id: "chat",
    label: "AI Chatbot",
    href: "/dashboard/chat",
    icon: MessageSquare,
    color: "#f43f5e",
  },
] as const;


// ── Nav item ───────────────────────────────────────────────────────────────────
const NavItem = ({
  item,
  isActive,
  collapsed,
}: {
  item: (typeof NAV_ITEMS)[number];
  isActive: boolean;
  collapsed: boolean;
}) => {
  const [hovered, setHovered] = useState(false);
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex items-center rounded-xl transition-all duration-150 group"
      style={{
        padding: collapsed ? "10px 0" : "9px 12px",
        justifyContent: collapsed ? "center" : "flex-start",
        gap: collapsed ? 0 : 12,
        background: isActive
          ? `linear-gradient(90deg, ${item.color}18 0%, transparent 100%)`
          : hovered
            ? "rgba(255,255,255,0.04)"
            : "transparent",
      }}
    >
      {/* Active indicator */}
      {isActive && (
        <motion.div
          layoutId="active-bar"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-full"
          style={{ background: item.color }}
          transition={{ type: "spring", stiffness: 380, damping: 30 }}
        />
      )}

      {/* Icon */}
      <div
        className="relative shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all duration-150"
        style={{
          background: isActive
            ? `${item.color}22`
            : hovered
              ? `${item.color}15`
              : "transparent",
        }}
      >
        <Icon
          size={16}
          style={{
            color: isActive || hovered ? item.color : "rgba(255,255,255,0.4)",
            transition: "color 0.15s",
          }}
        />
        {isActive && (
          <div
            className="absolute inset-0 rounded-lg opacity-30 blur-sm"
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
                ? "#fff"
                : hovered
                  ? "rgba(255,255,255,0.85)"
                  : "rgba(255,255,255,0.42)",
            }}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>

      {/* Collapsed: active dot */}
      {collapsed && isActive && (
        <span
          className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full"
          style={{ background: item.color }}
        />
      )}

      {/* Collapsed: tooltip */}
      {collapsed && hovered && (
        <div
          className="absolute left-full ml-3 px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap pointer-events-none z-50 shadow-xl"
          style={{
            background: "rgba(18,12,30,0.98)",
            border: "1px solid rgba(255,255,255,0.08)",
            color: item.color,
          }}
        >
          {item.label}
          <span
            className="absolute left-[-5px] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rotate-45"
            style={{
              background: "rgba(18,12,30,0.98)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRight: "none",
              borderTop: "none",
            }}
          />
        </div>
      )}
    </Link>
  );
};

// ── Sidebar shell ──────────────────────────────────────────────────────────────
const SidebarContent = ({ collapsed }: { collapsed: boolean }) => {
  const pathname = usePathname();

  return (
    <div
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        background:
          "linear-gradient(160deg, rgba(10,10,18,0.98) 0%, rgba(14,10,28,0.98) 100%)",
        borderRight: "1px solid rgba(255,255,255,0.06)",
      }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-15"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.6) 0%, transparent 70%)",
        }}
      />

      {/* Logo */}
      <div
        className={`relative flex items-center gap-3 py-5 ${collapsed ? "px-4 justify-center" : "px-5"}`}
      >
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg text-white select-none"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                boxShadow: "0 0 20px rgba(124,58,237,0.4)",
              }}
            >
              A
            </div>
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
                <p className="font-extrabold text-[15px] leading-none text-white tracking-tight">
                  Dashboard
                </p>
                <p className="text-[10px] uppercase tracking-[0.18em] text-white/30 font-semibold mt-0.5 flex items-center gap-1">
                  <Sparkles size={9} className="text-violet-400" />
                  Portfolio Manager
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </Link>
      </div>

      {/* Divider */}
      <div className="h-px mx-4 bg-white/[0.06] mb-2" />

      {/* Nav label */}
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

      {/* Nav */}
      <nav className="flex-1 px-3 space-y-0.5 overflow-y-auto scrollbar-none">
        {NAV_ITEMS.map((item) => (
          <NavItem
            key={item.id}
            item={item}
            isActive={pathname === item.href}
            collapsed={collapsed}
          />
        ))}
      </nav>

      {/* Footer */}
      <div
        className="p-3 mt-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
      >
        <Link
          href="/"
          className="flex items-center rounded-xl transition-all duration-150 group"
          style={{
            padding: collapsed ? "10px 0" : "10px 12px",
            justifyContent: collapsed ? "center" : "flex-start",
            gap: collapsed ? 0 : 10,
            background: "rgba(255,255,255,0.03)",
          }}
        >
          <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 group-hover:bg-white/10 transition shrink-0">
            <ArrowLeft
              size={15}
              className="text-white/45 group-hover:text-white/80 transition"
            />
          </div>
          <AnimatePresence>
            {!collapsed && (
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[11px] font-bold text-white/35 group-hover:text-white/65 uppercase tracking-widest transition"
              >
                Back to Site
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </div>
  );
};

// ── Main export ────────────────────────────────────────────────────────────────
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false); // desktop
  const [mobileOpen, setMobileOpen] = useState(false); // mobile drawer
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Mobile hamburger ──────────────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen((p) => !p)}
        className="fixed top-4 left-4 z-[60] md:hidden w-10 h-10 rounded-xl bg-black/70 border border-white/10 flex items-center justify-center text-white backdrop-blur-md shadow-lg"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {mobileOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Menu size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Mobile backdrop ───────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-[45] bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── Mobile drawer ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 32 }}
            className="fixed left-0 top-0 h-full w-[272px] z-[50] md:hidden"
          >
            <SidebarContent collapsed={false} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar ───────────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 272 }}
        transition={{ type: "spring", stiffness: 300, damping: 32 }}
        className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-40"
        onDoubleClick={() => setCollapsed((p) => !p)}
        title="Double-click to collapse"
      >
        <SidebarContent collapsed={collapsed} />
      </motion.aside>
    </>
  );
};

export default Sidebar;
