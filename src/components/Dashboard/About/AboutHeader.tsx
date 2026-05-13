"use client";

import React from "react";

export default function AboutHeader() {
  return (
    <div className="mb-8 pt-2">
      <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2 bg-gradient-to-r from-foreground to-foreground/40 bg-clip-text text-transparent">
        About Section
      </h1>
      <p className="text-foreground/40 font-medium text-sm max-w-xl">
        Craft your personal narrative, showcase your expertise, and highlight
        your best work.
      </p>
    </div>
  );
}

