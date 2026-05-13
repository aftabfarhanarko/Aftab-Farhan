"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function ProjectsHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight mb-2">
          Projects
        </h1>
        <p className="text-foreground/50 font-medium text-sm">
          Manage your portfolio projects and case studies.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-xs sm:text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
        type="button"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}

