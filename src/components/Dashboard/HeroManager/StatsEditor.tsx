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
        <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Stats
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-[10px] text-violet-400/70 hover:text-violet-300 transition-colors uppercase tracking-wider"
        >
          <Plus size={11} /> Add Stat
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5"
          >
            <input
              placeholder="Label"
              value={stat.label}
              onChange={(e) => onChange(index, "label", e.target.value)}
              className="flex-1 bg-transparent text-xs text-white/70 placeholder:text-white/20 focus:outline-none min-w-0"
            />
            <div className="w-px h-4 bg-white/[0.08]" />
            <input
              placeholder="Value"
              value={stat.value}
              onChange={(e) => onChange(index, "value", e.target.value)}
              className="w-14 bg-transparent text-xs font-semibold text-violet-400 placeholder:text-white/20 focus:outline-none text-right"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="text-white/20 hover:text-red-400 transition-colors ml-1 shrink-0"
            >
              <Trash2 size={13} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

