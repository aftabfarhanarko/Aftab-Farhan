"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Clock, Inbox } from "lucide-react";
import type { ContactMessage } from "./types";

const statusCls = (s: ContactMessage["status"]) => {
  if (s === "UNREAD")
    return "bg-[#FF6014]/15 text-[#FF6014] border-[#FF6014]/30";
  if (s === "REPLIED") return "bg-blue-500/15 text-blue-400 border-blue-500/30";
  if (s === "ARCHIVED") return "bg-black/5 dark:bg-white/5 text-foreground/40 dark:text-white/30 border-black/10 dark:border-white/10";
  return "bg-black/5 dark:bg-white/5 text-foreground/40 dark:text-white/40 border-black/10 dark:border-white/10";
};

const formatDate = (iso: string) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : new Intl.DateTimeFormat("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }).format(d);
};

const msgPreview = (t: string) => {
  const s = t.replace(/\s+/g, " ").trim();
  return s.length <= 100 ? s : `${s.slice(0, 100)}…`;
};

export default function RecentMessages({
  recentMessages,
  isLoading,
}: {
  recentMessages?: ContactMessage[];
  isLoading: boolean;
}) {
  return (
    <section>
      <div className="flex items-center justify-between mb-3 sm:mb-4 px-0.5">
        <div>
          <div className="text-[9px] sm:text-[10px] font-black uppercase tracking-[0.28em] text-foreground/40 dark:text-white/35 font-['Bai_Jamjuree']">
            Recent Messages
          </div>
          <div className="text-[11px] sm:text-xs text-foreground/50 dark:text-white/40 font-medium mt-0.5">
            Latest contact form submissions.
          </div>
        </div>
        <Link
          href="/dashboard/contact"
          className="flex items-center gap-1 text-[11px] sm:text-xs font-bold text-[#FF6014] hover:underline transition-colors font-['Bai_Jamjuree']"
        >
          View all <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="p-4 sm:p-5 rounded-2xl glass-card-compact border border-black/10 dark:border-white/10 space-y-2.5 animate-pulse"
            >
              <div className="flex justify-between">
                <div className="h-3.5 w-32 bg-foreground/10 dark:bg-white/10 rounded" />
                <div className="h-4 w-16 bg-foreground/10 dark:bg-white/10 rounded-full" />
              </div>
              <div className="h-3 w-44 bg-foreground/10 dark:bg-white/10 rounded" />
              <div className="h-3 w-full bg-foreground/10 dark:bg-white/10 rounded" />
              <div className="h-3 w-3/4 bg-foreground/10 dark:bg-white/10 rounded" />
            </div>
          ))}
        </div>
      ) : !recentMessages?.length ? (
        <div className="p-8 sm:p-10 border border-dashed border-black/10 dark:border-white/10 rounded-2xl text-center glass-card-compact">
          <div className="w-12 h-12 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center mx-auto mb-3">
            <Inbox className="w-5 h-5 text-[#FF6014]" />
          </div>
          <div className="text-[10px] font-black uppercase tracking-widest text-foreground/40 dark:text-white/30 mb-1 font-['Bai_Jamjuree']">
            No messages yet
          </div>
          <div className="text-xs text-foreground/50 dark:text-white/30 font-medium">
            Messages from your contact section will appear here.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          {recentMessages.map((msg, i) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="p-4 sm:p-5 rounded-2xl glass-card-primary border border-black/10 dark:border-white/10 hover:border-[#FF6014]/40 dark:hover:border-[#FF6014]/40 transition-all duration-300 group hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm font-black text-slate-900 dark:text-white truncate font-['Bai_Jamjuree']">
                      {msg.name}
                    </span>
                    <span
                      className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full border font-['Bai_Jamjuree'] ${statusCls(
                        msg.status,
                      )}`}
                    >
                      {msg.status}
                    </span>
                  </div>
                  <div className="text-[11px] text-slate-500 dark:text-white/50 font-medium truncate mt-0.5">
                    {msg.email}
                  </div>
                </div>
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-500 dark:text-white/40 whitespace-nowrap flex items-center gap-1 shrink-0 font-['Bai_Jamjuree']">
                  <Clock className="w-3 h-3 text-[#FF6014]" />
                  {formatDate(msg.createdAt)}
                </div>
              </div>
              <div className="text-xs font-bold text-slate-800 dark:text-white/80 truncate mb-1">
                {msg.subject}
              </div>
              <div className="text-[11px] sm:text-xs text-slate-600 dark:text-white/60 font-medium leading-relaxed line-clamp-2">
                {msgPreview(msg.message)}
              </div>
              <div className="mt-3">
                <Link
                  href="/dashboard/contact"
                  className="flex items-center gap-1 text-[11px] font-bold text-[#FF6014] group-hover:underline transition-colors font-['Bai_Jamjuree']"
                >
                  Open inbox <ChevronRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </section>
  );
}
