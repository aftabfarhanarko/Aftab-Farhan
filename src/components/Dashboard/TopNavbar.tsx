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

  const handleSignOut = () => {
    signOut({ callbackUrl: "/login" });
  };

  return (
    <header className="sticky top-0 z-30 w-full h-16 bg-black/80 backdrop-blur-md border-b border-white/[0.06] flex items-center justify-between px-6 gap-4">
      {/* Left — Page title / breadcrumb */}
      <div className="flex items-center gap-3">
        <div className="flex flex-col">
          <span className="text-[11px] font-mono text-white/25 uppercase tracking-widest leading-none mb-0.5">
            Dashboard
          </span>
          <h1 className="text-sm font-semibold text-white/90 leading-none">
            Overview
          </h1>
        </div>
      </div>

      {/* Center — Search */}
      <div className="hidden md:flex flex-1 max-w-sm mx-auto">
        <div className="relative w-full">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-white/25" />
          <input
            type="text"
            placeholder="Search anything..."
            className="w-full bg-white/[0.04] border border-white/[0.08] rounded-full pl-8 pr-4 py-1.5 text-xs text-white/70 placeholder:text-white/25 outline-none focus:border-white/20 focus:bg-white/[0.06] transition-all"
          />
          <kbd className="absolute right-3 top-1/2 -translate-y-1/2 text-[9px] text-white/20 bg-white/[0.05] border border-white/[0.08] rounded px-1.5 py-0.5 font-mono">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right — Actions */}
      <div className="flex items-center gap-1">
        {/* Notification bell */}
        <div className="relative">
          <button
            onClick={() => {
              setNotifOpen((v) => !v);
              setProfileOpen(false);
            }}
            className="relative w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-violet-500 ring-1 ring-black" />
            )}
          </button>

          {/* Dropdown */}
          <AnimatePresence>
            {notifOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-10 w-72 bg-[#111014] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50"
              >
                <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
                  <span className="text-xs font-semibold text-white/70">
                    Notifications
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/20">
                    {unreadCount} new
                  </span>
                </div>
                {notifications.map((n) => (
                  <div
                    key={n.id}
                    className={`px-4 py-3 flex items-start gap-3 hover:bg-white/[0.03] transition-colors cursor-pointer ${
                      n.unread ? "bg-white/[0.02]" : ""
                    }`}
                  >
                    {n.unread && (
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-violet-400 shrink-0" />
                    )}
                    {!n.unread && (
                      <span className="mt-1.5 w-1.5 h-1.5 shrink-0" />
                    )}
                    <div>
                      <p className="text-xs text-white/70 leading-relaxed">
                        {n.text}
                      </p>
                      <p className="text-[10px] text-white/25 mt-0.5">
                        {n.time}
                      </p>
                    </div>
                  </div>
                ))}
                <div className="px-4 py-2.5 border-t border-white/[0.06]">
                  <button className="text-[11px] text-violet-400 hover:text-violet-300 transition-colors">
                    View all notifications
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Settings */}
        <button className="w-8 h-8 rounded-full flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
          <SettingsIcon className="w-4 h-4" />
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-white/[0.08] mx-1" />

        {/* Avatar / Profile Section */}
        <div className="relative">
          <button
            onClick={() => {
              setProfileOpen((v) => !v);
              setNotifOpen(false);
            }}
            className="flex items-center gap-2.5 pl-1 pr-3 py-1 rounded-full hover:bg-white/[0.05] border border-transparent hover:border-white/[0.08] transition-all"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-600 to-cyan-500 flex items-center justify-center text-[11px] font-bold text-white uppercase">
              {session?.user?.name?.[0] || "U"}
            </div>
            <div className="hidden sm:block text-left">
              <p className="text-xs font-medium text-white/80 leading-none truncate max-w-[100px]">
                {session?.user?.name || "User"}
              </p>
              <p className="text-[10px] text-white/30 leading-none mt-0.5 uppercase tracking-tighter">
                Admin
              </p>
            </div>
            <ChevronDown
              className={`w-3 h-3 text-white/25 transition-transform ${profileOpen ? "rotate-180" : ""}`}
            />
          </button>

          {/* Profile Dropdown */}
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                className="absolute right-0 top-11 w-48 bg-[#111014] border border-white/[0.08] rounded-xl shadow-2xl shadow-black/60 overflow-hidden z-50 py-1"
              >
                <div className="px-4 py-3 border-b border-white/[0.06] mb-1">
                  <p className="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-0.5">
                    Signed in as
                  </p>
                  <p className="text-xs font-medium text-white/70 truncate">
                    {session?.user?.email || "Guest"}
                  </p>
                </div>

                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/[0.04] transition-all text-left">
                  <User className="w-3.5 h-3.5" />
                  Profile Settings
                </button>

                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-white/60 hover:text-white hover:bg-white/[0.04] transition-all text-left">
                  <SettingsIcon className="w-3.5 h-3.5" />
                  Account Preferences
                </button>

                <div className="h-px bg-white/[0.06] my-1 mx-2" />

                <button
                  onClick={handleSignOut}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all text-left font-bold"
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
