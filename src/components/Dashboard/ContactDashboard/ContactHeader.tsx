"use client";

import React from "react";

export default function ContactHeader() {
  return (
    <div className="mb-10">
      <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-foreground dark:text-white font-['Bai_Jamjuree']">
        Inbox
      </h1>
      <p className="text-foreground/50 dark:text-white/40 font-medium text-xs sm:text-sm">
        Manage inquiries and client messages from your portfolio contact form.
      </p>
    </div>
  );
}

