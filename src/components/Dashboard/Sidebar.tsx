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
  ChevronLeft,
  ChevronRight,
  Sparkles,
  X,
  Menu,
  Trophy,
  User,
} from "lucide-react";

// ── Collapsible Menu Groups Config ──────────────────────────────────────────────
const GROUPS = [
  {
    id: "sections",
    label: "Portfolio Profile",
    icon: FolderKanban,
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
    items: [
      { id: "experience", label: "Experience Info", href: "/dashboard/experience", icon: BriefcaseBusiness },
      { id: "education", label: "Education Info", href: "/dashboard/education", icon: GraduationCap },
    ],
  },
  {
    id: "interactions",
    label: "Visitor Connect",
    icon: MessageSquare,
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
    <div className="relative flex flex-col h-full bg-white border-r border-slate-200/90 text-slate-800 shadow-xs select-none">
      
      {/* Header Logo */}
      <div className="relative flex items-center justify-between py-4 px-4 border-b border-slate-100">
        <Link href="/dashboard" className="flex items-center gap-2.5 min-w-0 group">
          <div className="relative shrink-0">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-lg text-white bg-[#FF6014] shadow-md shadow-orange-500/20 group-hover:scale-105 transition-transform">
              A
            </div>
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white bg-emerald-500" />
          </div>
          
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              transition={{ duration: 0.15 }}
              className="min-w-0"
            >
              <p className="font-black text-[15px] leading-tight tracking-tight text-slate-900 dark:text-white">
                {"<arko />"}
              </p>
              <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#FF6014] flex items-center gap-1 mt-0.5">
                <Sparkles size={10} className="text-[#FF6014] animate-pulse" />
                Admin Console
              </p>
            </motion.div>
          )}
        </Link>

        {/* Desktop Collapse Button */}
        {setCollapsed && !collapsed && (
          <button
            onClick={() => setCollapsed(true)}
           
            className="hidden md:flex w-7 h-7 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 hover:bg-orange-50 hover:border-orange-300 text-slate-500 hover:text-[#FF6014] transition-all cursor-pointer"
            title="Collapse Sidebar"
          >
            <ChevronLeft size={14} />
          </button>
        )}
      </div>

      {/* View Portfolio Shortcut Button */}
      <div className={`mt-3 ${collapsed ? "px-2" : "px-3"}`}>
        <Link
          href="/"
          target="_blank"
         
          className="flex items-center justify-center rounded-xl bg-orange-50 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/50 text-[#FF6014] hover:bg-[#FF6014] hover:text-white hover:border-[#FF6014] transition-all duration-200 group/site shadow-xs"
          style={{
            padding: collapsed ? "10px" : "10px 14px",
            justifyContent: collapsed ? "center" : "space-between",
          }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Globe size={15} className="shrink-0 group-hover/site:rotate-12 transition-transform duration-300" />
            {!collapsed && (
              <span className="text-xs font-bold uppercase tracking-wider truncate">
                View Portfolio
              </span>
            )}
          </div>
          {!collapsed && (
            <ArrowUpRight size={13} className="shrink-0 group-hover/site:translate-x-0.5 group-hover/site:-translate-y-0.5 transition-transform" />
          )}
        </Link>
      </div>

      {/* Navigation Links Area */}
      <div className="flex-1 overflow-y-auto py-3 px-3 space-y-1.5 scrollbar-thin">
        
        {/* Main Dashboard / Overview */}
        <div>
          <Link
            href="/dashboard"
           
            className={`flex items-center rounded-xl transition-all duration-200 group ${
              pathname === "/dashboard"
                ? "bg-[#FF6014]/10 border border-[#FF6014]/30 text-[#FF6014] font-bold shadow-xs"
                : "text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
            }`}
            style={{
              padding: collapsed ? "10px 0" : "10px 14px",
              justifyContent: collapsed ? "center" : "flex-start",
              gap: collapsed ? 0 : 12,
            }}
          >
            <LayoutDashboard
              size={18}
              className={pathname === "/dashboard" ? "text-[#FF6014]" : "text-slate-500 group-hover:text-slate-800 dark:group-hover:text-white transition-colors"}
            />
            {!collapsed && (
              <span className="text-[13px] font-bold tracking-tight flex-1">
                Overview
              </span>
            )}
            {!collapsed && pathname === "/dashboard" && (
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014] shrink-0" />
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
                <div className="flex justify-center py-2.5 text-slate-400 hover:text-slate-700 transition-colors" title={group.label}>
                  <GroupIcon size={18} />
                </div>
              ) : (
                <button
                  onClick={() => toggleGroup(group.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/40 transition-colors text-left group cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <GroupIcon size={16} className="text-[#FF6014] opacity-80" />
                    <span className="text-[12px] font-black text-slate-800 dark:text-slate-200 tracking-wider uppercase">
                      {group.label}
                    </span>
                  </div>
                  {isOpen ? (
                    <ChevronUp size={14} className="text-slate-400" />
                  ) : (
                    <ChevronDown size={14} className="text-slate-400" />
                  )}
                </button>
              )}

              {/* Group Items List */}
              {(!collapsed ? isOpen : true) && (
                <div className={`${collapsed ? "space-y-1" : "pl-3 space-y-0.5 border-l-2 border-slate-200/60 dark:border-slate-800 ml-3.5 my-1"}`}>
                  {group.items.map((item) => {
                    const isActive = pathname === item.href;
                    const ItemIcon = item.icon;

                    return (
                      <Link
                        key={item.id}
                        href={item.href}
                       
                        className={`flex items-center rounded-xl transition-all duration-200 group ${
                          isActive
                            ? "bg-[#FF6014]/10 border border-[#FF6014]/30 text-[#FF6014] font-bold shadow-xs"
                            : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                        }`}
                        style={{
                          padding: collapsed ? "9px 0" : "8px 12px",
                          justifyContent: collapsed ? "center" : "flex-start",
                          gap: collapsed ? 0 : 10,
                        }}
                      >
                        <ItemIcon
                          size={16}
                          className={isActive ? "text-[#FF6014]" : "text-slate-400 group-hover:text-slate-700 dark:group-hover:text-slate-200 transition-colors"}
                        />

                        {!collapsed && (
                          <span className="text-xs font-bold tracking-tight truncate flex-1">
                            {item.label}
                          </span>
                        )}

                        {!collapsed && isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014] shrink-0" />
                        )}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* User Profile & Sign Out Footer */}
      <div className="p-3 border-t border-slate-200/80 dark:border-slate-800">
        {!collapsed ? (
          <div className="p-3 rounded-2xl glass-card-compact flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-9 h-9 rounded-xl bg-orange-100 dark:bg-orange-950/60 border border-orange-200 text-[#FF6014] font-black flex items-center justify-center shrink-0">
                {userInitial}
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                  {userName}
                </p>
                <p className="text-[10px] text-slate-500 truncate">
                  {userEmail}
                </p>
              </div>
            </div>

            <button
              onClick={() => signOut({ callbackUrl: "/login" })}
             
              className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut size={16} />
            </button>
          </div>
        ) : (
          <button
            onClick={() => signOut({ callbackUrl: "/login" })}
           
            className="w-full flex justify-center py-2 text-slate-400 hover:text-red-500 transition-colors cursor-pointer"
            title="Sign Out"
          >
            <LogOut size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

// ── Main Sidebar Export with Desktop Collapse & Mobile Drawer ───────────────────────
export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Menu Bar Button (Fixed Top Left) */}
      <div className="md:hidden fixed top-3 left-3 z-40">
        <button
          onClick={() => setMobileOpen(true)}
         
          className="p-2.5 rounded-xl bg-white/90 dark:bg-slate-900/90 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 shadow-md backdrop-blur-md cursor-pointer"
          aria-label="Open Navigation Menu"
        >
          <Menu size={20} className="text-[#FF6014]" />
        </button>
      </div>

      {/* Desktop Sidebar Container */}
      <motion.aside
        animate={{ width: collapsed ? 80 : 270 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="hidden md:block h-screen sticky top-0 shrink-0 z-30 overflow-hidden"
      >
        <SidebarContent collapsed={collapsed} setCollapsed={setCollapsed} />
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
           
            className="absolute bottom-20 right-2 w-6 h-6 flex items-center justify-center rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-slate-600 hover:text-[#FF6014] transition cursor-pointer"
            title="Expand Sidebar"
          >
            <ChevronRight size={14} />
          </button>
        )}
      </motion.aside>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex">
            {/* Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs"
            />

            {/* Slide Drawer */}
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 350, damping: 30 }}
              className="relative w-[280px] h-full z-10"
            >
              <SidebarContent collapsed={false} />
              <button
                onClick={() => setMobileOpen(false)}
                className="absolute top-4 right-3 p-1.5 rounded-lg bg-slate-100 text-slate-600 hover:text-slate-900"
              >
                <X size={18} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
