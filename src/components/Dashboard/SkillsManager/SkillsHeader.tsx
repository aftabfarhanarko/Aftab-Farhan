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
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight mb-1">
          Skills
        </h1>
        <p className="text-sm text-white/40 font-medium">
          Manage your technical expertise.
        </p>
      </div>
      <div className="flex gap-2 flex-wrap">
        <button
          onClick={onAddCategory}
          className="px-4 py-2.5 bg-white/5 border border-white/10 text-white rounded-xl font-semibold text-xs uppercase tracking-widest hover:bg-white/10 transition-all flex items-center gap-1.5"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
          Category
        </button>
        <button
          onClick={onAddSkill}
          className="px-4 py-2.5 bg-white text-black rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-1.5"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Skill
        </button>
      </div>
    </div>
  );
}

