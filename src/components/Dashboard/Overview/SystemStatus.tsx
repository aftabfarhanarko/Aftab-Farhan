"use client";

import React from "react";

export default function SystemStatus({ isError }: { isError: boolean }) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between glass-card-compact border ${
        isError
          ? "bg-red-500/10 border-red-500/25"
          : "bg-emerald-500/10 border-emerald-500/25"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full animate-pulse ${isError ? "bg-red-500" : "bg-emerald-500"}`}
        />
        <span
          className={`text-[10px] sm:text-xs font-black uppercase tracking-widest font-['Bai_Jamjuree'] ${isError ? "text-red-500 dark:text-red-400" : "text-emerald-600 dark:text-emerald-400"}`}
        >
          {isError ? "Backend Error" : "Backend Connected"}
        </span>
      </div>
      <div className="hidden sm:block text-[9px] font-bold text-foreground/40 dark:text-white/30 uppercase tracking-widest font-['Bai_Jamjuree']">
        Version 2.0.4 · April 2026
      </div>
    </div>
  );
}

