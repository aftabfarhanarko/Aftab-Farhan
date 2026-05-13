"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Loader2, X } from "lucide-react";
import { FIELD_CONFIG } from "./fieldConfig";
import type { EducationFormState } from "./types";

export default function EducationModal({
  isOpen,
  isEditing,
  form,
  onChange,
  onClose,
  onSubmit,
  isSaving,
}: {
  isOpen: boolean;
  isEditing: boolean;
  form: EducationFormState;
  onChange: (key: string, value: string) => void;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  isSaving: boolean;
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/75 backdrop-blur-md"
          />

          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative w-full max-w-2xl bg-[#0c0c0c] border border-white/10 rounded-3xl shadow-2xl overflow-hidden"
          >
            <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-white/5">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/25 mb-1">
                  {isEditing ? "Editing Record" : "New Record"}
                </p>
                <h2 className="text-xl font-black">
                  {isEditing ? "Edit" : "Add"} Education
                </h2>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-white/5 rounded-xl transition-colors text-white/30 hover:text-white"
                type="button"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={onSubmit} className="p-7">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {FIELD_CONFIG.map(({ key, label, placeholder, required, colSpan }) => (
                  <div
                    key={key}
                    className={`space-y-1.5 ${colSpan === 2 ? "sm:col-span-2" : ""}`}
                  >
                    <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-white/30 px-0.5">
                      {label}
                    </label>
                    <input
                      required={required}
                      type="text"
                      value={(form[key] as string) ?? ""}
                      onChange={(e) => onChange(key, e.target.value)}
                      className="w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/8 hover:border-white/12 focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium focus:outline-none transition-all placeholder:text-white/15"
                      placeholder={placeholder}
                    />
                  </div>
                ))}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/8 border border-white/5 hover:border-white/10 rounded-xl font-bold text-sm uppercase tracking-widest transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3.5 bg-white text-black rounded-xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Saving…
                    </>
                  ) : isEditing ? (
                    "Update"
                  ) : (
                    "Add"
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

