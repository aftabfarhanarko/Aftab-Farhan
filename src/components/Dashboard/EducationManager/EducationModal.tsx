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
            initial={{ opacity: 0, y: 24, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            className="relative w-full max-w-2xl bg-white border border-gray-200 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-7 pt-7 pb-6 border-b border-gray-100">
              <div>
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/40 mb-1 font-['Bai_Jamjuree']">
                  {isEditing ? "Editing Record" : "New Record"}
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
                  <h2 className="text-xl font-black text-black font-['Bai_Jamjuree']">
                    {isEditing ? "Edit" : "Add"} Education
                  </h2>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-xl transition-colors text-black/40 hover:text-black"
                type="button"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="p-7 overflow-y-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                {FIELD_CONFIG.map(
                  ({ key, label, placeholder, required, colSpan }) => (
                    <div
                      key={key}
                      className={`space-y-1.5 ${
                        colSpan === 2 ? "sm:col-span-2" : ""
                      }`}
                    >
                      <label className="block text-[10px] font-black uppercase tracking-[0.15em] text-black/50 px-0.5 font-['Bai_Jamjuree']">
                        {label}
                        {required && (
                          <span className="text-[#FF6014] ml-1">*</span>
                        )}
                      </label>
                      <input
                        required={required}
                        type="text"
                        value={(form[key] as string) ?? ""}
                        onChange={(e) => onChange(key, e.target.value)}
                        className="w-full bg-white border border-gray-200 hover:border-gray-300 focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 rounded-xl px-4 py-3 text-sm font-medium text-black focus:outline-none transition-all placeholder:text-black/30"
                        placeholder={placeholder}
                      />
                    </div>
                  ),
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3.5 bg-gray-100 hover:bg-gray-200 border border-gray-200 rounded-xl font-black text-xs uppercase tracking-widest text-black/70 transition-all font-['Bai_Jamjuree']"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex-1 py-3.5 bg-[#FF6014] text-white rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#e5540f] hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2 font-['Bai_Jamjuree'] shadow-sm hover:shadow-md"
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