"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  Edit2,
  Globe,
  Loader2,
  MapPin,
  Trash2,
} from "lucide-react";
import type { Experience } from "./types";
import { cls } from "./ui";

export default function ExperienceCards({
  experiences,
  isLoading,
  isAdding,
  isDeleting,
  onEdit,
  onDelete,
}: {
  experiences: Experience[];
  isLoading: boolean;
  isAdding: boolean;
  isDeleting: boolean;
  onEdit: (exp: Experience) => void;
  onDelete: (id: number) => void;
}) {
  const getHostname = (url: string | undefined) => {
    if (!url) return "No URL";
    try {
      return url.startsWith("http") ? new URL(url).hostname : url;
    } catch {
      return url;
    }
  };

  return (
    <div>
      {/* Section label */}
      <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-black/40 mb-5 font-['Bai_Jamjuree']">
        <span className="w-5 h-px bg-gray-300 shrink-0" />
        Existing Experiences
        <span className="ml-auto font-black text-black/30">
          {experiences.length} {experiences.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-[#FF6014]" />
        </div>
      ) : (
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: i * 0.04, duration: 0.15 }}
                className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-[#FF6014] transition-all"
              >
                {/* ===== Card Header ===== */}
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 sm:p-6">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-[#FF6014]" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border font-['Bai_Jamjuree'] ${
                          exp.type === "current"
                            ? "bg-emerald-50 border-emerald-200 text-emerald-700"
                            : "bg-gray-50 border-gray-200 text-black/50"
                        }`}
                      >
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-black/50 font-medium">
                        <Calendar className="w-3 h-3" /> {exp.period}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black tracking-tight leading-none mb-2 truncate text-black font-['Bai_Jamjuree']">
                      {exp.company}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-black/60 font-medium">
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-[#FF6014] transition-colors min-w-0"
                      >
                        <Globe className="w-3 h-3 shrink-0" />
                        <span className="truncate">{getHostname(exp.url)}</span>
                      </a>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 shrink-0" /> {exp.location}
                      </span>
                    </div>

                    {exp.techStack?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {exp.techStack.map((tech, idx) => (
                          <span
                            key={`${tech}-${idx}`}
                            className="px-2.5 py-0.5 bg-gray-50 border border-gray-200 rounded-lg text-[10px] font-medium text-black/70"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex sm:flex-col gap-2 shrink-0 self-start">
                    <button
                      onClick={() => onEdit(exp)}
                      className="p-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 hover:border-[#FF6014] text-black/60 hover:text-[#FF6014] rounded-xl transition-all hover:scale-105 active:scale-95"
                      type="button"
                      aria-label="Edit experience"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>

                    <button
                      onClick={() => {
                        if (!exp.id) return;
                        if (!confirm("Delete this experience?")) return;
                        onDelete(exp.id);
                      }}
                      disabled={isDeleting}
                      className="p-2.5 bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-500 hover:text-red-600 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                      type="button"
                      aria-label="Delete experience"
                    >
                      {isDeleting ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* ===== Card Body ===== */}
                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-gray-100">
                  {/* Roles */}
                  <div className="p-5 sm:p-6 md:border-r border-gray-100">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/50 mb-4 font-['Bai_Jamjuree']">
                      Roles & Responsibilities
                    </h4>
                    <div className="space-y-4">
                      {exp.roles.map((role, idx) => (
                        <div
                          key={idx}
                          className="relative pl-4 border-l border-gray-200"
                        >
                          <span className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-[#FF6014] border border-white shadow-sm" />
                          <p className="text-sm font-black mb-0.5 leading-snug text-black font-['Bai_Jamjuree']">
                            {role.title}
                          </p>
                          <p className="text-xs text-black/50 mb-2 font-medium">
                            {role.subtitle}
                          </p>
                          <ul className="space-y-1">
                            {role.responsibilities.slice(0, 2).map((r, j) => (
                              <li
                                key={j}
                                className="text-xs text-black/60 leading-relaxed font-medium"
                              >
                                · {r}
                              </li>
                            ))}
                            {role.responsibilities.length > 2 && (
                              <li className="text-[9px] font-black uppercase tracking-widest text-[#FF6014] font-['Bai_Jamjuree']">
                                +{role.responsibilities.length - 2} more
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Achievements */}
                  <div className="p-5 sm:p-6 border-t md:border-t-0 border-gray-100">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-black/50 mb-4 font-['Bai_Jamjuree']">
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {exp.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-gray-50 rounded-xl border border-gray-200"
                        >
                          <div className="text-xl font-black leading-none mb-1 text-[#FF6014] font-['Bai_Jamjuree']">
                            {ach.metric}
                          </div>
                          <div className="text-[9px] font-black text-black/50 uppercase tracking-widest leading-tight font-['Bai_Jamjuree']">
                            {ach.label}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Empty state */}
          {experiences.length === 0 && !isAdding && (
            <div className="text-center py-16 border border-dashed border-gray-300 rounded-2xl bg-white">
              <div className="w-12 h-12 rounded-xl bg-[#FF6014]/10 border border-[#FF6014]/20 flex items-center justify-center mx-auto mb-3">
                <Briefcase className="w-5 h-5 text-[#FF6014]" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-widest text-black/40 font-['Bai_Jamjuree']">
                No experiences yet — add one to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}