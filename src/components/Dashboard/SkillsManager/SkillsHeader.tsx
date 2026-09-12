"use client";

import React from "react";
import { LayoutGrid, Plus } from "lucide-react";

export default function SkillsHeader({
  onAddCategory,
  onAddSkill,
}: {
  onAddCategory: () => void;
  onAddSkill: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1 text-slate-900 font-['Bai_Jamjuree']">
          Skills
        </h1>
        <p className="text-sm text-slate-600 font-medium">
          Manage your technical expertise and categories.
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onAddCategory}
          className="px-4 py-2.5 glass-card-compact border border-black/10 dark:border-white/10 text-foreground dark:text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:border-[#FF6014]/40 transition-all flex items-center gap-1.5 font-['Bai_Jamjuree']"
        >
          <LayoutGrid className="w-3.5 h-3.5 text-[#FF6014]" />
          Category
        </button>
        <button
          onClick={onAddSkill}
          className="px-5 py-2.5 bg-[#FF6014] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF6014]/90 active:scale-[0.98] transition-all flex items-center gap-1.5 shadow-lg shadow-[#FF6014]/25 font-['Bai_Jamjuree']"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Skill
        </button>
      </div>
    </div>
  );
}

