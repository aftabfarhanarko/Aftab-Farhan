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
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
      <div>
        <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/25 mb-2">
          Portfolio
        </p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
          Work Experience
        </h1>
        <p className="text-xs text-white/35 mt-2">
          Manage your professional journey and achievements.
        </p>
      </div>
      <div>
        {!isAdding && (
          <button
            onClick={onAdd}
            className="shrink-0 flex items-center w-[200px] gap-2 px-5 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.03] active:scale-[0.97] transition-transform"
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

