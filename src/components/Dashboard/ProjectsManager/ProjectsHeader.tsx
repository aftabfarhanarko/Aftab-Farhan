"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function ProjectsHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-slate-900 font-['Bai_Jamjuree']">
          Projects
        </h1>
        <p className="text-slate-600 font-medium text-xs sm:text-sm">
          Manage your portfolio projects and showcase case studies.
        </p>
      </div>
      <button
        onClick={onAdd}
        className="px-6 py-3 bg-[#FF6014] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF6014]/90 active:scale-[0.98] transition-all flex items-center gap-2 shadow-lg shadow-[#FF6014]/25 hover:shadow-[#FF6014]/40 font-['Bai_Jamjuree']"
        type="button"
      >
        <Plus className="w-4 h-4" />
        Add Project
      </button>
    </div>
  );
}

