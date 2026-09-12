"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { HeroSocial } from "./types";

export default function SocialsEditor({
  socials,
  onAdd,
  onRemove,
  onChange,
}: {
  socials: HeroSocial[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onChange: (index: number, field: keyof HeroSocial, value: string) => void;
}) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-700 font-['Bai_Jamjuree']">
          Social Links
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-[10px] font-black text-[#FF6014] hover:underline transition-colors uppercase tracking-wider font-['Bai_Jamjuree']"
        >
          <Plus size={11} /> Add Social
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {socials.map((social, index) => (
          <div
            key={index}
            className="flex items-center gap-2 glass-card-compact border border-slate-200 rounded-xl px-3 py-2.5 hover:border-[#FF6014]/60 transition-colors"
          >
            <input
              placeholder="Platform"
              value={social.platform}
              onChange={(e) => onChange(index, "platform", e.target.value)}
              className="w-20 bg-transparent text-xs font-bold text-slate-900 placeholder:text-slate-400 focus:outline-none shrink-0 font-['Bai_Jamjuree']"
            />
            <div className="w-px h-4 bg-slate-200" />
            <input
              placeholder="https://..."
              value={social.url}
              onChange={(e) => onChange(index, "url", e.target.value)}
              className="flex-1 bg-transparent text-xs text-slate-700 placeholder:text-slate-400 focus:outline-none min-w-0 font-medium"
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

