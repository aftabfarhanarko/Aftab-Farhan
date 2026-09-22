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
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.97 }}
        transition={{ type: "spring", stiffness: 300, damping: 28 }}
        className="relative w-full max-w-sm bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
            <h2 className="text-lg font-black text-black font-['Bai_Jamjuree']">
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-black/5 rounded-lg transition-colors text-black/40 hover:text-black"
            type="button"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={onSubmit} className="space-y-5">
          {/* Title Input */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/50 font-['Bai_Jamjuree']">
              Category Title
            </label>
            <input
              required
              value={form.title}
              onChange={(e) => onChangeTitle(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all font-medium"
              placeholder="e.g. Frontend"
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-100 rounded-xl text-xs font-black uppercase tracking-widest text-black/70 hover:bg-gray-200 transition-colors font-['Bai_Jamjuree']"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 py-3 bg-[#FF6014] text-white rounded-xl text-xs font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:bg-[#e5540f] hover:scale-[1.02] transition-all font-['Bai_Jamjuree']"
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