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
    <div className="sticky bottom-0 pt-4 pb-2 bg-gradient-to-t from-black via-black/90 to-transparent border-t border-white/[0.05] mt-4">
      <button
        type="submit"
        disabled={disabled}
        className="px-8 py-2.5 bg-violet-600 hover:bg-violet-500 disabled:opacity-40 text-white rounded-xl text-xs font-semibold uppercase tracking-widest transition-all flex items-center gap-2 active:scale-[0.98]"
      >
        {isSaving ? <Loader2 className="animate-spin w-3.5 h-3.5" /> : null}
        Update Hero Section
      </button>
    </div>
  );
}

