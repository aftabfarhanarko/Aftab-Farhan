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

export default function ExperienceList({
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
      <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-white/25 mb-5">
        <span className="w-5 h-px bg-white/10 shrink-0" />
        Existing Experiences
        <span className="ml-auto font-black text-white/20">
          {experiences.length} {experiences.length === 1 ? "entry" : "entries"}
        </span>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-40">
          <Loader2 className="w-6 h-6 animate-spin text-white/20" />
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
                className={`${cls.card} overflow-hidden`}
              >
                <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 sm:p-6">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                    <Briefcase className="w-4 h-4 text-white/30" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span
                        className={`px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-widest border ${
                          exp.type === "current"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-white/[0.04] border-white/[0.08] text-white/30"
                        }`}
                      >
                        {exp.type}
                      </span>
                      <span className="flex items-center gap-1 text-[11px] text-white/30">
                        <Calendar className="w-3 h-3" /> {exp.period}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black tracking-tight leading-none mb-2 truncate">
                      {exp.company}
                    </h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-white/35">
                      <a
                        href={exp.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 hover:text-white/70 transition-colors min-w-0"
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
                            className="px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[10px] font-medium text-white/45"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex sm:flex-col gap-2 shrink-0 self-start">
                    <button
                      onClick={() => onEdit(exp)}
                      className="p-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-white/40 hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95"
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
                      className="p-2.5 bg-red-500/[0.04] hover:bg-red-500/10 border border-red-500/[0.12] text-red-400/60 hover:text-red-400 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
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

                <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.05]">
                  <div className="p-5 sm:p-6 md:border-r border-white/[0.05]">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">
                      Roles & Responsibilities
                    </h4>
                    <div className="space-y-4">
                      {exp.roles.map((role, idx) => (
                        <div
                          key={idx}
                          className="relative pl-4 border-l border-white/[0.08]"
                        >
                          <span className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/10 border border-white/20" />
                          <p className="text-sm font-bold mb-0.5 leading-snug">
                            {role.title}
                          </p>
                          <p className="text-xs text-white/35 mb-2">
                            {role.subtitle}
                          </p>
                          <ul className="space-y-1">
                            {role.responsibilities.slice(0, 2).map((r, j) => (
                              <li
                                key={j}
                                className="text-xs text-white/40 leading-relaxed"
                              >
                                · {r}
                              </li>
                            ))}
                            {role.responsibilities.length > 2 && (
                              <li className="text-[9px] font-black uppercase tracking-widest text-white/20">
                                +{role.responsibilities.length - 2} more
                              </li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-5 sm:p-6 border-t md:border-t-0 border-white/[0.05]">
                    <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">
                      Key Achievements
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      {exp.achievements.map((ach, idx) => (
                        <div
                          key={idx}
                          className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06]"
                        >
                          <div className="text-xl font-black leading-none mb-1">
                            {ach.metric}
                          </div>
                          <div className="text-[9px] font-bold text-white/35 uppercase tracking-widest leading-tight">
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

          {experiences.length === 0 && !isAdding && (
            <div className="text-center py-16 border border-dashed border-white/[0.08] rounded-2xl">
              <Briefcase className="w-8 h-8 text-white/10 mx-auto mb-3" />
              <p className="text-[10px] font-black uppercase tracking-widest text-white/20">
                No experiences yet — add one to get started.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}