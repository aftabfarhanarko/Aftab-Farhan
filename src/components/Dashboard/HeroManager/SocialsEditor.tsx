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
        <label className="text-[10px] font-semibold uppercase tracking-widest text-white/30">
          Social Links
        </label>
        <button
          type="button"
          onClick={onAdd}
          className="flex items-center gap-1 text-[10px] text-violet-400/70 hover:text-violet-300 transition-colors uppercase tracking-wider"
        >
          <Plus size={11} /> Add Social
        </button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {socials.map((social, index) => (
          <div
            key={index}
            className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-xl px-3 py-2.5"
          >
            <input
              placeholder="Platform"
              value={social.platform}
              onChange={(e) => onChange(index, "platform", e.target.value)}
              className="w-20 bg-transparent text-xs font-medium text-white/70 placeholder:text-white/20 focus:outline-none shrink-0"
            />
            <div className="w-px h-4 bg-white/[0.08]" />
            <input
              placeholder="https://..."
              value={social.url}
              onChange={(e) => onChange(index, "url", e.target.value)}
              className="flex-1 bg-transparent text-xs text-white/45 placeholder:text-white/20 focus:outline-none min-w-0"
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

