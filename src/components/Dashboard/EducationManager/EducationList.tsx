"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Award,
  BookOpen,
  Calendar,
  Edit2,
  GraduationCap,
  Loader2,
  MapPin,
  Trash2,
} from "lucide-react";
import type { Education } from "./types";

export default function EducationList({
  education,
  isLoading,
  isDeleting,
  onEdit,
  onDelete,
}: {
  education: Education[] | undefined;
  isLoading: boolean;
  isDeleting: boolean;
  onEdit: (edu: Education) => void;
  onDelete: (id: string) => void;
}) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-24">
        <Loader2 className="w-7 h-7 animate-spin text-white/20" />
      </div>
    );
  }

  if (!education || education.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4 text-white/20">
        <BookOpen className="w-10 h-10" />
        <p className="text-sm font-bold uppercase tracking-widest">
          No education records yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {education.map((edu, i) => (
          <motion.div
            key={edu.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ delay: i * 0.04 }}
            className="group w-full relative flex flex-col sm:flex-row sm:items-center gap-5 p-6 sm:p-7 glass-card-primary border border-black/10 dark:border-white/10 hover:border-[#FF6014]/40 dark:hover:border-[#FF6014]/40 rounded-2xl transition-all duration-300 hover:-translate-y-0.5"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-[#FF6014]" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5 font-['Bai_Jamjuree']">
                <h3 className="text-base sm:text-lg font-black leading-tight truncate text-foreground dark:text-white">
                  {edu.degree}
                </h3>
                <span className="text-sm font-semibold text-foreground/50 dark:text-white/40 truncate">
                  {edu.field}
                </span>
              </div>

              <p className="text-sm font-bold text-foreground/70 dark:text-white/60 truncate mb-3 font-['Bai_Jamjuree']">
                {edu.institution}
                {edu.shortName && (
                  <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-[#FF6014] bg-[#FF6014]/10 border border-[#FF6014]/20 px-2.5 py-0.5 rounded-full align-middle">
                    {edu.shortName}
                  </span>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3 font-['Bai_Jamjuree']">
                <span className="flex items-center gap-1 text-[11px] font-bold text-foreground/40 dark:text-white/30">
                  <MapPin className="w-3.5 h-3.5 text-[#FF6014]" /> {edu.location}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-foreground/40 dark:text-white/30">
                  <Calendar className="w-3.5 h-3.5 text-[#FF6014]" /> {edu.period}
                </span>
                {edu.grade && (
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                    <Award className="w-3 h-3" /> {edu.grade}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={() => onEdit(edu)}
                className="p-2.5 bg-black/5 dark:bg-white/5 hover:bg-[#FF6014] hover:text-white border border-black/10 dark:border-white/10 rounded-xl transition-all text-foreground/60 dark:text-white/60"
                type="button"
                aria-label="Edit education"
              >
                <Edit2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => {
                  if (!confirm("Delete this education record?")) return;
                  onDelete(edu.id);
                }}
                className="p-2.5 bg-red-500/10 hover:bg-red-500 border border-red-500/20 hover:text-white text-red-500 rounded-xl transition-all"
                disabled={isDeleting}
                type="button"
                aria-label="Delete education"
              >
                {isDeleting ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <Trash2 className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
