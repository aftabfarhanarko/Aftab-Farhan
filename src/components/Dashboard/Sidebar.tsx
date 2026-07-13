"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession, signOut } from "next-auth/react";
import {
  LayoutDashboard,
  Home,
  UserCircle2,
  Zap,
  FolderKanban,
  BriefcaseBusiness,
  GraduationCap,
  Phone,
  MessageSquare,
  Globe,
  ArrowUpRight,
  LogOut,
  ChevronDown,
  ChevronUp,
  LifeBuoy,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Menu,
  Trophy,
} from "lucide-react";

// ── Collapsible Menu Groups Config ──────────────────────────────────────────────
const GROUPS = [
  {
    id: "sections",
    label: "Portfolio Profile",
    icon: FolderKanban,
    color: "#7c3aed", // violet
    items: [
      { id: "hero", label: "Hero Banner", href: "/dashboard/hero", icon: Home },
      { id: "about", label: "About Me", href: "/dashboard/about", icon: UserCircle2 },
      { id: "skills", label: "Skills Inventory", href: "/dashboard/skills", icon: Zap },
      { id: "projects", label: "Projects Portfolio", href: "/dashboard/projects", icon: FolderKanban },
      { id: "achievements", label: "Achievements", href: "/dashboard/achievements", icon: Trophy },
    ],
  },
  {
    id: "timeline",
    label: "Career History",
    icon: BriefcaseBusiness,
    color: "#2563eb", // blue
    items: [
      { id: "experience", label: "Experience Info", href: "/dashboard/experience", icon: BriefcaseBusiness },
      { id: "education", label: "Education Info", href: "/dashboard/education", icon: GraduationCap },
    ],
  },
  {
    id: "interactions",
    label: "Visitor Connect",
    icon: MessageSquare,
    color: "#db2777", // pink
    items: [
      { id: "contact", label: "Contact Inbox", href: "/dashboard/contact", icon: Phone },
      { id: "chat", label: "AI Chatbot Logs", href: "/dashboard/chat", icon: MessageSquare },
    ],
  },
] as const;

// ── Sidebar Content Component ───────────────────────────────────────────────────
const SidebarContent = ({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed?: (val: boolean) => void;
}) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const userName = session?.user?.name || "Aftab Farhan";
  const userEmail = session?.user?.email || "arko@nexoviasoft.com";
  const userInitial = userName[0]?.toUpperCase() || "A";

  // State to track open/closed groups
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>({
    sections: true,
    timeline: true,
    interactions: true,
  });

  const toggleGroup = (groupId: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Automatically expand corresponding group if a child route is active
  useEffect(() => {
    if (
      pathname.includes("/hero") ||
      pathname.includes("/about") ||
      pathname.includes("/skills") ||
      pathname.includes("/projects") ||
      pathname.includes("/achievements")
    ) {
      setOpenGroups((prev) => ({ ...prev, sections: true }));
    }
    if (pathname.includes("/experience") || pathname.includes("/education")) {
      setOpenGroups((prev) => ({ ...prev, timeline: true }));
    }
    if (pathname.includes("/contact") || pathname.includes("/chat")) {
      setOpenGroups((prev) => ({ ...prev, interactions: true }));
    }
  }, [pathname]);

  return (
    <div className="relative flex flex-col h-full bg-[#0a0a0f] text-white/70 border-r border-white/[0.06] shadow-2xl select-none">
      
      {/* Header Logo */}
      <div className={`relative flex items-center justify-between py-5 px-5 border-b border-white/[0.04]`}>
        <Link href="/dashboard" className="flex items-center gap-3 min-w-0">
          <div className="relative shrink-0">
            <div
              className="w-10 h-10 rounded-2xl flex items-center justify-center font-black text-lg text-white select-none"
              style={{
                background: "linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%)",
                boxShadow: "0 0 15px rgba(124,58,237,0.4)",
              }}
            >
              A
            </div>
            <span
              className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-[#0a0a0f]"
              style={{ background: "#34d399" }}
            />
          </div>
          
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="min-w-0"
            >
              <p className="font-extrabold text-[15px] leading-none text-white tracking-tight">
                Dashboard
              </p>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 font-bold mt-0.5 flex items-center gap-1">
                <Sparkles size={9} className="text-violet-400" />
                Portfolio Control
              </p>
            </motion.div>
          )}
        </Link>

        {/* Desktop Collapse Arrow Button */}
        {setCollapsed && !collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="hidden md:flex w-6 h-6 items-center justify-center rounded-lg border border-white/[0.08] hover:bg-white/[0.03] text-white/40 hover:text-white transition"
            title="Collapse Sidebar"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* View Portfolio Shortcut Button */}
      <div className={`mt-4 ${collapsed ? "px-2" : "px-4"}`}>
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-center rounded-xl bg-violet-500/10 border border-violet-500/20 text-violet-400 hover:bg-violet-500/20 hover:border-violet-500/35 transition-all duration-200 group/site"
          style={{
            padding: collapsed ? "10px" : "10px 14px",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Globe size={15} className="shrink-0 text-violet-400 group-hover/site:rotate-12 transition-transform duration-300" />
            {!collapsed && (
              <span className="text-[12px] font-black uppercase tracking-wider truncate">
                View Portfolio
              </span>
            )}
          </div>
          {!collapsed && (
            <ArrowUpRight size={13} className="shrink-0 text-violet-400/70 group-hover/site:text-violet-400 transition-colors" />
          )}
        </Link>
      </div>

      {/* Navigation Links Area */}
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1.5 scrollbar-thin scrollbar-thumb-white/[0.02]">
        
        {/* Main Dashboard / Overview */}
        <div>
          <Link
            href="/dashboard"
            className={`flex items-center rounded-xl transition-all duration-200 group`}
            style={{
              padding: collapsed ? "10px 0" : "10px 14px",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 12,
              background: pathname === "/dashboard" ? "#7c3aed" : "transparent",
              color: pathname === "/dashboard" ? "#ffffff" : "",
            }}
          >
            <LayoutDashboard
              size={18}
              className={pathname === "/dashboard" ? "text-white" : "text-white/40 group-hover:text-white/70 transition-colors"}
            />
            {!collapsed && (
              <span className={`text-[13px] font-extrabold tracking-tight ${pathname === "/dashboard" ? "text-white" : "text-white/70 group-hover:text-white"}`}>
                Overview
              </span>
            )}
          </Link>
        </div>

        {/* Collapsible Menu Categories */}
        {GROUPS.map((group) => {
          const isOpen = openGroups[group.id];
          const GroupIcon = group.icon;

          return (
            <div key={group.id} className="space-y-0.5">
              
              {/* Group Header Button */}
              {collapsed ? (
                <div className="flex justify-center py-2.5 text-white/40 hover:text-white/70 transition-colors" title={group.label}>
                  <GroupIcon size={18} />
                </div>
              ) : (
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-white/70 hover:bg-white/[0.02] transition-colors text-left group"
                >
                  <div className="flex items-center gap-3">
                    <GroupIcon size={16} className="text-white/40 group-hover:text-white/70 transition-colors" />
                    <span className="text-[13px] font-extrabold text-white/80 tracking-tight">
                      {group.label}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={14} className="text-white/40" />
                  ) : (
                    <ChevronDown size={14} className="text-white/40" />
                  )}
                </button>
              )}

              {/* Group Child Sub-items (Tree View) */}
              <AnimatePresence initial={false}>
                {isOpen && !collapsed && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2, ease: "easeInOut" }}
                    className="relative overflow-hidden pl-3"
                  >
                    {group.items.map((subItem, idx) => {
                      const isChildActive = pathname === subItem.href;
                      const ChildIcon = subItem.icon;
                      const isLast = idx === group.items.length - 1;

                      return (
                        <div key={subItem.id} className="relative pl-8 h-[38px] flex items-center">
                          
                          {/* Curved L-connector Tree Lines */}
                          <div className="absolute left-[13px] top-0 bottom-0 w-4 pointer-events-none">
                            {/* Vertical Line */}
                            <div
                              className={`absolute left-0 top-0 w-px bg-white/[0.08] ${
                                isLast ? "h-[19px]" : "h-full"
                              }`}
                            />
                            {/* Horizontal curve bend */}
                            <div className="absolute left-0 top-[7px] w-3.5 h-[12px] border-l border-b border-white/[0.08] rounded-bl-md" />
                          </div>

                          {/* Link Sub-Item */}
                          <Link
                            href={subItem.href}
                            className={`flex items-center gap-2.5 py-1.5 px-3 rounded-lg text-xs transition-all duration-200 w-full group/child ${
                              isChildActive
                                ? "text-violet-400 bg-violet-500/10 font-bold"
                                : "text-white/40 hover:text-white/80 hover:bg-white/[0.02]"
                            }`}
                          >
                            <ChildIcon
                              size={13}
                              className={isChildActive ? "text-violet-400" : "text-white/30 group-hover/child:text-white/60 transition-colors"}
                            />
                            <span className="truncate tracking-wide">{subItem.label}</span>
                          </Link>
                        </div>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* Support Card (Need Help?) */}
      {!collapsed && (
        <div className="p-4 border-t border-white/[0.04]">
          <div className="p-4 rounded-2xl border border-white/[0.04] bg-white/[0.01] flex flex-col items-center text-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-400 shadow-sm border border-violet-500/20">
              <LifeBuoy size={18} className="animate-spin-slow" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white/80">Need help?</h4>
              <p className="text-[10px] text-white/30 mt-0.5">Go to Help Center</p>
            </div>
            <Link
              href="mailto:arko@nexoviasoft.com"
              className="text-[10px] font-black text-violet-400 hover:text-violet-300 flex items-center gap-1 transition-colors uppercase tracking-wider"
            >
              Contact Support &rarr;
            </Link>
          </div>
        </div>
      )}

      {/* Bottom Profile Footer */}
      <div className="p-4 border-t border-white/[0.04] bg-white/[0.01]">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Avatar circle */}
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center text-[11px] font-bold text-white shrink-0 ring-1 ring-white/10 shadow-sm">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={userName}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                userInitial
              )}
            </div>
            
            {!collapsed && (
              <div className="min-w-0 text-left">
                <p className="text-[12px] font-extrabold text-white/80 leading-tight truncate">
                  {userName}
                </p>
                <p className="text-[10px] text-white/30 truncate mt-0.5">
                  {userEmail}
                </p>
              </div>
            )}
          </div>
          
          {!collapsed && (
            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
              className="p-1.5 rounded-lg text-white/30 hover:text-red-400 hover:bg-red-500/10 transition-colors shrink-0"
              title="Sign Out"
            >
              <LogOut size={14} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// ── Main Sidebar Export ────────────────────────────────────────────────────────
const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Auto-close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Lock scroll when mobile drawer is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop Expand Toggle Floating Arrow ────────────────────────────── */}
      {collapsed && (
        <button
          onClick={() => setCollapsed(false)}
          className="hidden md:flex fixed top-4 left-6 z-[60] w-6 h-6 items-center justify-center rounded-lg border border-white/[0.08] bg-[#0a0a0f] text-white/40 hover:text-white hover:bg-white/[0.03] transition shadow-sm"
          title="Expand Sidebar"
        >
          <ChevronRight size={14} />
        </button>
      )}

      {/* ── Mobile Hamburger button ─────────────────────────────────────────── */}
      <button
        onClick={() => setMobileOpen((p) => !p)}
        className="fixed top-4 left-4 z-[60] md:hidden w-10 h-10 rounded-xl bg-[#0a0a0f] border border-white/[0.08] flex items-center justify-center text-white/80 backdrop-blur-md shadow-md"
        aria-label={mobileOpen ? "Close menu" : "Open menu"}
      >
        <AnimatePresence mode="wait">
          {mobileOpen ? (
            <motion.span
              key="x"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <X size={18} />
            </motion.span>
          ) : (
            <motion.span
              key="menu"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.12 }}
            >
              <Menu size={18} />
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Mobile backdrop overlay ────────────────────────────────────────── */}
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

      {/* ── Mobile drawer ──────────────────────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed left-0 top-0 h-full w-[272px] z-[50] md:hidden"
          >
            <SidebarContent collapsed={false} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Desktop sidebar wrapper ────────────────────────────────────────── */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 272 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="hidden md:flex flex-col h-screen sticky top-0 shrink-0 z-40"
      >
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
      </motion.aside>
    </>
  );
};

export default Sidebar;
