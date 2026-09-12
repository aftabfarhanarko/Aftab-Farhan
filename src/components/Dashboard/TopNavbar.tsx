"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  User,
  Settings as SettingsIcon,
  Bell,
  Search as SearchIcon,
  ChevronDown,
  Globe,
  Sparkles,
  ExternalLink,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const routeNames: Record<string, string> = {
  "/dashboard": "Overview & Analytics",
  "/dashboard/hero": "Hero Banner Management",
  "/dashboard/about": "About Me & Bio Config",
  "/dashboard/skills": "Skills Inventory & Stack",
  "/dashboard/projects": "Projects Portfolio",
  "/dashboard/achievements": "Certifications & Achievements",
  "/dashboard/experience": "Career & Work History",
  "/dashboard/education": "Academic Education Info",
  "/dashboard/contact": "Contact Messages Inbox",
  "/dashboard/chat": "AI Chatbot Telemetry Logs",
};

const TopNavbar = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "New inquiry message received from portfolio contact form",
      time: "5m ago",
      unread: true,
    },
    {
      id: 2,
      text: "Portfolio projects data synchronized successfully",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      text: "AI Chatbot assistant active & online",
      time: "3h ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;
  const userName = session?.user?.name || "Aftab Farhan";
  const userInitial = userName[0]?.toUpperCase() || "A";
  const pageTitle = routeNames[pathname] || "Dashboard Console";

  return (
    <header className="sticky top-0 z-30 w-full h-15 bg-white/90 backdrop-blur-xl border-b border-slate-200/90 flex items-center justify-between px-4 lg:px-8 gap-4 shadow-xs select-none">
      {/* Left — Breadcrumb & Page Title */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-500">
          <Link href="/dashboard" className="hover:text-[#FF6014] transition-colors">
            Dashboard
          </Link>
          <span>/</span>
        </div>
        <h1 className="text-sm sm:text-base font-black text-slate-900 dark:text-white leading-none truncate flex items-center gap-2">
          <span>{pageTitle}</span>
        </h1>
      </div>

      {/* Right — Actions & User Navigation */}
      <div className="flex items-center gap-2">
        {/* Quick View Website Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"

          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-orange-50 dark:bg-orange-950/30 border border-orange-200/80 dark:border-orange-800/50 text-[#FF6014] text-xs font-bold hover:bg-[#FF6014] hover:text-white transition-all shadow-xs"
        >
          <Globe size={13} />
          <span>Live Site</span>
          <ExternalLink size={11} />
        </a>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
  
            className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-[#FF6014] hover:bg-orange-50 transition-all cursor-pointer shadow-xs"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6014] ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-12 w-72 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 text-left"
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-orange-100 text-[#FF6014] font-bold">
                    {unreadCount} new
                  </span>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 flex items-start gap-2.5 hover:bg-orange-50/40 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                    >
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          n.unread ? "bg-[#FF6014]" : "bg-slate-300"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-snug">
                          {n.text}
                        </p>
                        <p className="text-[10px] text-slate-400 font-bold mt-1">
                          {n.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-slate-200 dark:bg-slate-800 mx-1" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
  
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF6014] text-white flex items-center justify-center text-xs font-black shadow-xs ring-2 ring-orange-500/20">
              {session?.user?.image ? (
                <img
                  src={session.user.image}
                  alt={userName}
                  className="w-full h-full rounded-xl object-cover"
                />
              ) : (
                userInitial
              )}
            </div>
            <div className="hidden lg:block text-left pr-1">
              <p className="text-xs font-bold text-slate-900 dark:text-white leading-none truncate max-w-[100px]">
                {userName}
              </p>
              <p className="text-[10px] text-[#FF6014] font-bold uppercase tracking-wider leading-none mt-1">
                Admin
              </p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${
                profileOpen ? "rotate-180 text-[#FF6014]" : ""
              }`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-12 w-52 bg-white/95 dark:bg-slate-900/95 backdrop-blur-2xl border border-slate-200/90 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden z-50 py-1.5 text-left"
              >
                <div className="px-3.5 py-2.5 border-b border-slate-100 dark:border-slate-800 mb-1">
                  <p className="text-[10px] font-black text-[#FF6014] uppercase tracking-widest">
                    Signed in as
                  </p>
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate mt-0.5">
                    {session?.user?.email || "guest@example.com"}
                  </p>
                </div>

                <Link
                  href="/dashboard/about"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-[#FF6014] hover:bg-orange-50/50 dark:hover:bg-slate-800 transition-all text-left"
                >
                  <User className="w-3.5 h-3.5 text-[#FF6014]" />
                  <span>Profile Config</span>
                </Link>

                <div className="h-px bg-slate-100 dark:bg-slate-800 my-1 mx-2" />

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-bold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all text-left cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  );
};

export default TopNavbar;
