"use client";

import React, { useRef } from "react";
import { motion } from "framer-motion";
import { Loader2, Upload, X } from "lucide-react";
import type { SkillCategory, SkillFormState } from "./types";

export default function SkillModal({
  isOpen,
  title,
  categories,
  form,
  imagePreview,
  isSaving,
  isUploading,
  onClose,
  onSubmit,
  onChangeName,
  onChangeCategory,
  onPickImage,
  onClearImage,
}: {
  isOpen: boolean;
  title: string;
  categories: SkillCategory[];
  form: SkillFormState;
  imagePreview: string | null;
  isSaving: boolean;
  isUploading: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChangeName: (value: string) => void;
  onChangeCategory: (categoryId: string) => void;
  onPickImage: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClearImage: (e: React.MouseEvent) => void;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);

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
        className="relative w-full max-w-md bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-2xl"
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
          {/* Skill Name */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/50 font-['Bai_Jamjuree']">
              Skill Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => onChangeName(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black placeholder:text-black/30 focus:outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all font-medium"
              placeholder="e.g. React"
            />
          </div>

          {/* Image Upload */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/50 font-['Bai_Jamjuree']">
              Icon / Image
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-xl border-2 border-dashed border-gray-300 hover:border-[#FF6014] bg-gray-50 hover:bg-[#FF6014]/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group overflow-hidden relative"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white">
                    <Upload className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-widest">
                      Change
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onClearImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-[#FF6014]" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-bold text-black/70">
                      Upload Image
                    </p>
                    <p className="text-[9px] text-black/40 font-black uppercase tracking-widest mt-0.5 font-['Bai_Jamjuree']">
                      PNG, SVG or JPG · max 2MB
                    </p>
                  </div>
                </>
              )}
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={onPickImage}
              className="hidden"
              accept="image/*"
            />
          </div>

          {/* Category */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-black/50 font-['Bai_Jamjuree']">
              Category
            </label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => onChangeCategory(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-black focus:outline-none focus:border-[#FF6014] focus:ring-2 focus:ring-[#FF6014]/10 transition-all appearance-none font-medium"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id} className="bg-white text-black">
                  {c.title}
                </option>
              ))}
            </select>
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
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {isUploading ? "Uploading…" : "Saving…"}
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