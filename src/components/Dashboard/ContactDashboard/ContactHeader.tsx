"use client";

import React from "react";

export default function ContactHeader() {
  return (
    <div className="mb-8 sm:mb-10 pb-6 border-b border-gray-200">
      <div className="flex items-center gap-2 mb-2">
        <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-black/50 font-['Bai_Jamjuree']">
          Visitor Connect
        </p>
      </div>
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-black font-['Bai_Jamjuree']">
        Inbox
      </h1>
      <p className="text-black/60 font-medium text-xs sm:text-sm">
        Manage inquiries and client messages from your portfolio contact form.
      </p>
    </div>
  );
}