"use client";

import React from "react";

export default function SystemStatus({ isError }: { isError: boolean }) {
  return (
    <div
      className={`p-4 sm:p-5 rounded-2xl flex items-center justify-between ${
        isError
          ? "bg-red-500/5 border border-red-500/15"
          : "bg-green-500/5 border border-green-500/15"
      }`}
    >
      <div className="flex items-center gap-3">
        <div
          className={`w-2.5 h-2.5 rounded-full animate-pulse ${isError ? "bg-red-500" : "bg-green-500"}`}
        />
        <span
          className={`text-[10px] sm:text-xs font-black uppercase tracking-widest ${isError ? "text-red-400" : "text-green-400"}`}
        >
          {isError ? "Backend Error" : "Backend Connected"}
        </span>
      </div>
      <div className="hidden sm:block text-[9px] font-bold text-white/20 uppercase tracking-widest">
        Version 2.0.4 · April 2026
      </div>
    </div>
  );
}

