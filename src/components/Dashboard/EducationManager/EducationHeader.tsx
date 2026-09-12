"use client";

import React from "react";
import { Plus } from "lucide-react";

export default function EducationHeader({ onAdd }: { onAdd: () => void }) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 pb-6 border-b border-slate-200">
      <div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-2 font-['Bai_Jamjuree']">
          Academic Background
        </p>
        <h1 className="text-2xl sm:text-3xl font-black tracking-tight leading-none text-slate-900 font-['Bai_Jamjuree']">
          Education
        </h1>
      </div>
      <button
        onClick={onAdd}
        className="inline-flex items-center gap-2.5 px-6 py-3 bg-[#FF6014] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#FF6014]/90 active:scale-[0.98] transition-all shadow-lg shadow-[#FF6014]/25 shrink-0 font-['Bai_Jamjuree']"
        type="button"
      >
        <Plus className="w-4 h-4" />
        Add Education
      </button>
    </div>
  );
}

