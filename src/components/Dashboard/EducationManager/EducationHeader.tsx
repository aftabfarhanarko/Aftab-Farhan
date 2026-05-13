"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function EducationHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-2">
          Academic Background
        </p>
        <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
          Education
        </h1>
      </div>
      <button
        onClick={onAdd}
        className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 bg-white text-black rounded-2xl font-black text-xs uppercase tracking-widest overflow-hidden hover:scale-[1.03] active:scale-[0.97] transition-transform shrink-0"
        type="button"
      >
        <span className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity" />
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}

