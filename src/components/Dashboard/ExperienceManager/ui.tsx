"use client";

import React from "react";

export const cls = {
  input:
    "w-full bg-white border border-gray-200 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black placeholder:text-black/30 focus:outline-none transition-all",
  label:
    "block text-[10px] font-black uppercase tracking-[0.16em] text-black/50 mb-1.5 font-['Bai_Jamjuree']",
  sectionHead:
    "flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-black/50 mb-5 font-['Bai_Jamjuree']",
  card: "bg-white border border-gray-200 hover:border-[#FF6014] rounded-2xl transition-all duration-300 shadow-sm hover:shadow-md",
};

export function SectionDivider({ label }: { label: string }) {
  return (
    <div className={cls.sectionHead}>
      <span className="w-5 h-px bg-[#FF6014]/60 shrink-0" />
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
      <label className={cls.label}>
        {label}
        {required && <span className="text-[#FF6014] ml-1">*</span>}
      </label>
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