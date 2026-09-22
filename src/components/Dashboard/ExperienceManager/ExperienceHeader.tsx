"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function ExperienceHeader({
  isAdding,
  onAdd,
}: {
  isAdding: boolean;
  onAdd: () => void;
}) {
  return (
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-gray-200">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-black/50 mb-2 font-['Bai_Jamjuree']">
          Portfolio
        </p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-black font-['Bai_Jamjuree']">
          Work Experience
        </h1>
        <p className="text-xs text-black/60 mt-2 font-medium">
          Manage your professional journey and key achievements.
        </p>
      </div>
      <div>
        {!isAdding && (
          <button
            onClick={onAdd}
            className="shrink-0 flex items-center justify-center gap-2 px-6 py-3 bg-[#FF6014] text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#e5540f] active:scale-[0.98] transition-all shadow-sm hover:shadow-md font-['Bai_Jamjuree']"
            type="button"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Experience
          </button>
        )}
      </div>
    </div>
  );
}