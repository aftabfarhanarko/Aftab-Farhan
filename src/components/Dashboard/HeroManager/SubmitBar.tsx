"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export default function SubmitBar({
  disabled,
  isSaving,
}: {
  disabled: boolean;
  isSaving: boolean;
}) {
  return (
    <div className="sticky bottom-0 pt-4 pb-4 bg-background/80 backdrop-blur-md border-t border-black/10 dark:border-white/10 mt-6 z-20">
      <button
        type="submit"
        disabled={disabled}
        className="px-8 py-3 bg-[#FF6014] hover:bg-[#FF6014]/90 disabled:opacity-40 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#FF6014]/25 hover:shadow-[#FF6014]/40 active:scale-[0.98] font-['Bai_Jamjuree']"
      >
        {isSaving ? <Loader2 className="animate-spin w-4 h-4" /> : null}
        Update Hero Section
      </button>
    </div>
  );
}

