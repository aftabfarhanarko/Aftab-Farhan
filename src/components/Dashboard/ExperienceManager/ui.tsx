"use client";

import React from "react";

export const cls = {
  input:
    "w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.12] focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium placeholder:text-white/20 focus:outline-none transition-all",
  label:
    "block text-[10px] font-black uppercase tracking-[0.16em] text-white/30 mb-1.5",
  sectionHead:
    "flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-white/25 mb-5",
  card: "bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.04] rounded-2xl transition-all duration-200",
};

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className={cls.sectionHead}>
      <span className="w-5 h-px bg-white/10 shrink-0" />
      {label}
    </div>
  );
}

export function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label className={cls.label}>{label}</label>
      <input
        required={required}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={cls.input}
        placeholder={placeholder}
      />
    </div>
  );
}

