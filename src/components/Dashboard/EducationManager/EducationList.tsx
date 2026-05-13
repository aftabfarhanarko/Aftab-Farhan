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
            className="group w-full relative flex flex-col sm:flex-row sm:items-center gap-5 p-6 sm:p-7 bg-white/[0.025] hover:bg-white/[0.04] border border-white/[0.06] hover:border-white/10 rounded-2xl transition-all duration-200"
          >
            <div className="shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-white/30" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-0.5 mb-1.5">
                <h3 className="text-base sm:text-lg font-black leading-tight truncate">
                  {edu.degree}
                </h3>
                <span className="text-sm font-semibold text-white/40 truncate">
                  {edu.field}
                </span>
              </div>

              <p className="text-sm font-bold text-white/60 truncate mb-3">
                {edu.institution}
                {edu.shortName && (
                  <span className="ml-2 text-[10px] font-black uppercase tracking-widest text-white/25 bg-white/5 px-2 py-0.5 rounded-full align-middle">
                    {edu.shortName}
                  </span>
                )}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <span className="flex items-center gap-1 text-[11px] font-bold text-white/30">
                  <MapPin className="w-3 h-3" /> {edu.location}
                </span>
                <span className="flex items-center gap-1 text-[11px] font-bold text-white/30">
                  <Calendar className="w-3 h-3" /> {edu.period}
                </span>
                {edu.grade && (
                  <span className="flex items-center gap-1 text-[11px] font-black text-emerald-400/70 bg-emerald-500/8 border border-emerald-500/10 px-2.5 py-0.5 rounded-full">
                    <Award className="w-3 h-3" /> {edu.grade}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity shrink-0">
              <button
                onClick={() => onEdit(edu)}
                className="p-2.5 bg-white/5 hover:bg-white/10 border border-white/5 hover:border-white/10 rounded-xl transition-all"
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
                className="p-2.5 bg-red-500/8 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 text-red-400 rounded-xl transition-all"
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
