"use client";

import React from "react";
import { motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import type { CategoryFormState } from "./types";

export default function CategoryModal({
  isOpen,
  title,
  form,
  isSaving,
  onClose,
  onSubmit,
  onChangeTitle,
}: {
  isOpen: boolean;
  title: string;
  form: CategoryFormState;
  isSaving: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChangeTitle: (value: string) => void;
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-sm bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-black">{title}</h2>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Category Title
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => onChangeTitle(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 placeholder:text-white/20"
              placeholder="e.g. Frontend"
            />
          </div>

          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-white/5 rounded-xl text-sm font-bold uppercase tracking-widest hover:bg-white/8 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-black uppercase tracking-widest hover:scale-[1.02] transition-transform disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                </>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
