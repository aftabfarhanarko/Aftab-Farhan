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
        className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl"
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
              Skill Name
            </label>
            <input
              required
              value={form.name}
              onChange={(e) => onChangeName(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 placeholder:text-white/20"
              placeholder="e.g. React"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Icon / Image
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-32 rounded-xl border-2 border-dashed border-white/10 hover:border-white/20 bg-white/5 transition-all cursor-pointer flex flex-col items-center justify-center gap-3 group overflow-hidden relative"
            >
              {imagePreview ? (
                <>
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="w-full h-full object-contain p-4"
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <Upload className="w-5 h-5" />
                    <span className="font-bold text-xs uppercase tracking-widest">
                      Change
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={onClearImage}
                    className="absolute top-2 right-2 p-1.5 bg-red-500/20 text-red-400 rounded-full hover:bg-red-500/40 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </>
              ) : (
                <>
                  <div className="p-3 rounded-xl bg-white/5 group-hover:scale-110 transition-transform">
                    <Upload className="w-5 h-5 text-white/30" />
                  </div>
                  <div className="text-center">
                    <p className="text-xs font-semibold text-white/50">
                      Upload Image
                    </p>
                    <p className="text-[9px] text-white/20 font-bold uppercase tracking-widest mt-0.5">
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

          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-widest text-white/30">
              Category
            </label>
            <select
              required
              value={form.categoryId}
              onChange={(e) => onChangeCategory(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-white/25 appearance-none"
            >
              {categories.map((c) => (
                <option key={c.id} value={c.id} className="bg-[#0a0a0a]">
                  {c.title}
                </option>
              ))}
            </select>
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
              className="flex-1 py-3 bg-white text-black rounded-xl text-sm font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform"
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
