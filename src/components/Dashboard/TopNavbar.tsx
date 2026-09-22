"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LogOut,
  User,
  Bell,
  ChevronDown,
  Globe,
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
    <header className="sticky top-0 z-30 w-full h-15 bg-white/90 backdrop-blur-xl border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 gap-4 shadow-sm select-none">
      {/* ===== Left: Breadcrumb + Page Title ===== */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="hidden sm:flex items-center gap-2 text-xs font-black text-black/50 font-['Bai_Jamjuree']">
          <Link
            href="/dashboard"
            className="hover:text-[#FF6014] transition-colors"
          >
            Dashboard
          </Link>
          <span>/</span>
        </div>
        <h1 className="text-sm sm:text-base font-black text-black leading-none truncate flex items-center gap-2 font-['Bai_Jamjuree']">
          <span>{pageTitle}</span>
        </h1>
      </div>

      {/* ===== Right: Actions + User Nav ===== */}
      <div className="flex items-center gap-2">
        {/* Live Site Link */}
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FF6014]/5 border border-[#FF6014]/20 text-[#FF6014] text-xs font-black uppercase tracking-wider hover:bg-[#FF6014] hover:text-white hover:border-[#FF6014] transition-all shadow-sm font-['Bai_Jamjuree']"
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
            className="relative w-9 h-9 flex items-center justify-center rounded-xl border border-gray-200 bg-gray-50 text-black/60 hover:text-[#FF6014] hover:bg-[#FF6014]/5 hover:border-[#FF6014]/30 transition-all cursor-pointer shadow-sm"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FF6014] ring-2 ring-white" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.96 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="absolute right-0 top-12 w-72 bg-white backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 text-left"
              >
                {/* Dropdown Header */}
                <div className="px-4 py-3 border-b border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-black text-black uppercase tracking-wider font-['Bai_Jamjuree']">
                    Notifications
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#FF6014]/10 text-[#FF6014] font-black border border-[#FF6014]/20 font-['Bai_Jamjuree']">
                    {unreadCount} new
                  </span>
                </div>

                {/* Dropdown Body */}
                <div className="divide-y divide-gray-100 max-h-64 overflow-y-auto">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-3 flex items-start gap-2.5 hover:bg-[#FF6014]/5 transition-colors cursor-pointer"
                    >
                      <span
                        className={`mt-1.5 w-2 h-2 rounded-full shrink-0 ${
                          n.unread ? "bg-[#FF6014]" : "bg-gray-300"
                        }`}
                      />
                      <div>
                        <p className="text-xs text-black/80 font-medium leading-snug">
                          {n.text}
                        </p>
                        <p className="text-[10px] text-black/40 font-black mt-1 uppercase tracking-wider font-['Bai_Jamjuree']">
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
        <div className="w-px h-5 bg-gray-200 mx-1" />

        {/* Profile Dropdown */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 p-1 rounded-xl hover:bg-gray-100 transition-all cursor-pointer"
          >
            <div className="w-8 h-8 rounded-xl bg-[#FF6014] text-white flex items-center justify-center text-xs font-black shadow-sm ring-2 ring-[#FF6014]/20 font-['Bai_Jamjuree']">
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
              <p className="text-xs font-black text-black leading-none truncate max-w-[100px] font-['Bai_Jamjuree']">
                {userName}
              </p>
              <p className="text-[10px] text-[#FF6014] font-black uppercase tracking-wider leading-none mt-1 font-['Bai_Jamjuree']">
                Admin
              </p>
            </div>
            <ChevronDown
              className={`w-3.5 h-3.5 text-black/40 transition-transform duration-200 ${
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
                className="absolute right-0 top-12 w-52 bg-white backdrop-blur-2xl border border-gray-200 rounded-2xl shadow-2xl overflow-hidden z-50 py-1.5 text-left"
              >
                {/* Signed in as */}
                <div className="px-3.5 py-2.5 border-b border-gray-100 mb-1">
                  <p className="text-[10px] font-black text-[#FF6014] uppercase tracking-widest font-['Bai_Jamjuree']">
                    Signed in as
                  </p>
                  <p className="text-xs font-black text-black truncate mt-0.5">
                    {session?.user?.email || "guest@example.com"}
                  </p>
                </div>

                {/* Profile link */}
                <Link
                  href="/dashboard/about"
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-black text-black/70 hover:text-[#FF6014] hover:bg-[#FF6014]/5 transition-all text-left font-['Bai_Jamjuree']"
                >
                  <User className="w-3.5 h-3.5 text-[#FF6014]" />
                  <span>Profile Config</span>
                </Link>

                <div className="h-px bg-gray-100 my-1 mx-2" />

                {/* Sign Out */}
                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-2.5 px-3.5 py-2 text-xs font-black text-red-600 hover:bg-red-50 transition-all text-left cursor-pointer font-['Bai_Jamjuree']"
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