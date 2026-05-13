"use client";
import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {
  LogOut,
  User,
  Settings as SettingsIcon,
  Bell,
  Search as SearchIcon,
  ChevronDown,
} from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const TopNavbar = () => {
  const { data: session } = useSession();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const notifications = [
    {
      id: 1,
      text: "New project comment on DevFlow",
      time: "2m ago",
      unread: true,
    },
    {
      id: 2,
      text: "TaskFlow AI deployment successful",
      time: "1h ago",
      unread: true,
    },
    {
      id: 3,
      text: "Client review request from MediCare",
      time: "3h ago",
      unread: false,
    },
  ];

  const unreadCount = notifications.filter((n) => n.unread).length;
  const userName = session?.user?.name || "Aftab Farhan";
  const userInitial = userName[0]?.toUpperCase() || "A";

  return (
    <header className="sticky top-0 z-30 w-full h-14 bg-[#0a0a0f]/90 backdrop-blur-md border-b border-white/[0.05] flex items-center justify-between px-4 lg:px-6 gap-4">
      {/* Left — Breadcrumb */}
      <div className="flex flex-col min-w-0">
        <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest leading-none">
          Dashboard
        </span>
        <h1 className="text-sm font-semibold text-white/85 leading-none mt-0.5 truncate">
          Overview
        </h1>
      </div>

     

      {/* Right — Actions */}
      <div className="flex items-center gap-1">
        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative w-8 h-8 flex items-center justify-center rounded-full text-white/35 hover:text-white/70 hover:bg-white/[0.05] transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-violet-500" />
            )}
          </button>

          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-10 w-68 bg-[#0f0f14] border border-white/[0.07] rounded-xl shadow-2xl shadow-black/70 overflow-hidden z-50"
                style={{ width: "272px" }}
              >
                <div className="px-4 py-2.5 border-b border-white/[0.05] flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-white/60">
                    Notifications
                  </span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-violet-500/15 text-violet-400 border border-violet-500/20">
                    {unreadCount} new
                  </span>
                </div>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className="px-4 py-2.5 flex items-start gap-2.5 hover:bg-white/[0.02] transition-colors cursor-pointer"
                  >
                    <span
                      className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${n.unread ? "bg-violet-400" : "bg-transparent"}`}
                    />
                    <div>
                      <p className="text-xs text-white/60 leading-relaxed">
                        {n.text}
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2 border-t border-white/[0.05]">
                  <button className="text-[11px] text-violet-400/80 hover:text-violet-300 transition-colors">
                    View all
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <button className="w-8 h-8 flex items-center justify-center rounded-full text-white/35 hover:text-white/70 hover:bg-white/[0.05] transition-all">
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-4 bg-white/[0.07] mx-1" />

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2 pl-1 pr-2 py-1 rounded-full hover:bg-white/[0.04] transition-all"
          >
            {/* Avatar — image-style circle with gradient */}
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-blue-400 flex items-center justify-center text-[11px] font-bold text-white ring-1 ring-white/10">
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
            {/* Name — visible on lg+ */}
            <div className="hidden lg:block text-left">
              <p className="text-xs font-medium text-white/75 leading-none truncate max-w-[90px]">
                {userName}
              </p>
              <p className="text-[9px] text-white/25 uppercase tracking-wide leading-none mt-0.5">
                Admin
              </p>
            </div>
            <ChevronDown
              className={`w-3 h-3 text-white/20 transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 top-11 w-44 bg-[#0f0f14] border border-white/[0.07] rounded-xl shadow-2xl shadow-black/70 overflow-hidden z-50 py-1"
              >
                <div className="px-3 py-2.5 border-b border-white/[0.05] mb-1">
                  <p className="text-[9px] text-white/20 uppercase tracking-widest mb-0.5">
                    Signed in as
                  </p>
                  <p className="text-xs text-white/60 truncate">
                    {session?.user?.email || "guest@example.com"}
                  </p>
                </div>

                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition-all text-left">
                  <User className="w-3.5 h-3.5" />
                  Profile
                </button>
                <button className="w-full flex items-center gap-2 px-3 py-2 text-xs text-white/50 hover:text-white/80 hover:bg-white/[0.03] transition-all text-left">
                  <SettingsIcon className="w-3.5 h-3.5" />
                  Preferences
                </button>

                <div className="h-px bg-white/[0.05] my-1 mx-2" />

                <button
                  onClick={() => signOut({ callbackUrl: "/login" })}
                  className="w-full flex items-center gap-2 px-3 py-2 text-xs text-red-400/80 hover:text-red-300 hover:bg-red-500/[0.07] transition-all text-left"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Sign Out
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
