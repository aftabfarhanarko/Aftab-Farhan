"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { HeroStat } from "./types";

export default function StatsEditor({
  stats,
  onAdd,
  onRemove,
  onChange,
}: {
  stats: HeroStat[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof HeroStat, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 font-['Bai_Jamjuree']">
          Stats
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-[10px] font-black text-[#FF6014] hover:underline transition-colors uppercase tracking-wider font-['Bai_Jamjuree']"
        >
          <Plus size={11} /> Add Stat
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 glass-card-compact border border-slate-200 rounded-xl px-3 py-2.5 hover:border-[#FF6014]/60 transition-colors"
          >
            <input
              placeholder="Label"
              value={stat.label}
              onChange={(e) => onChange(index, "label", e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none min-w-0 font-medium"
            />
            <div className="w-px h-4 bg-slate-200" />
            <input
              placeholder="Value"
              value={stat.value}
              onChange={(e) => onChange(index, "value", e.target.value)}
              className="w-14 bg-transparent text-xs font-black text-[#FF6014] placeholder:text-slate-400 focus:outline-none text-right font-['Bai_Jamjuree']"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-slate-400 hover:text-red-500 transition-colors ml-1 shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

