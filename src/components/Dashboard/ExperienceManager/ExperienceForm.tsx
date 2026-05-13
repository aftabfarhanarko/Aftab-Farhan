"use client";

import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Loader2,
  Plus,
  PlusCircle,
  Trash2,
  X,
} from "lucide-react";
import type { Achievement, Experience, Role } from "./types";
import { cls, Field, SectionDivider } from "./ui";

export default function ExperienceForm({
  isOpen,
  editingId,
  currentExp,
  isSaving,
  onCancel,
  onSubmit,
  patch,
  addRole,
  removeRole,
  patchRole,
  addResp,
  removeResp,
  patchResp,
  addAchv,
  removeAchv,
  patchAchv,
}: {
  isOpen: boolean;
  editingId: number | null;
  currentExp: Experience;
  isSaving: boolean;
  onCancel: () => void;
  onSubmit: () => void;
  patch: <K extends keyof Experience>(key: K, val: Experience[K]) => void;
  addRole: () => void;
  removeRole: (i: number) => void;
  patchRole: <K extends keyof Role>(i: number, key: K, val: Role[K]) => void;
  addResp: (ri: number) => void;
  removeResp: (ri: number, pi: number) => void;
  patchResp: (ri: number, pi: number, val: string) => void;
  addAchv: () => void;
  removeAchv: (i: number) => void;
  patchAchv: <K extends keyof Achievement>(
    i: number,
    key: K,
    val: Achievement[K],
  ) => void;
}) {
  return (
    <AnimatePresence mode="wait">
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.18 }}
          className={`mb-10 ${cls.card} p-5 sm:p-8`}
        >
          <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/[0.06]">
            <div className="flex items-center gap-2.5">
              <button
                onClick={onCancel}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                type="button"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <h2 className="text-base font-black">
                {editingId ? "Edit Experience" : "Add New Experience"}
              </h2>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-white"
              type="button"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
            className="space-y-10"
          >
            <section>
              <SectionDivider label="Company Information" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  label="Company Name"
                  required
                  value={currentExp.company}
                  onChange={(v) => patch("company", v)}
                  placeholder="e.g. NexoviaSoft"
                />
                <Field
                  label="Website URL"
                  required
                  value={currentExp.url}
                  onChange={(v) => patch("url", v)}
                  placeholder="https://..."
                />
                <Field
                  label="Location"
                  required
                  value={currentExp.location}
                  onChange={(v) => patch("location", v)}
                  placeholder="e.g. Rangpur, Bangladesh"
                />
                <Field
                  label="Period"
                  required
                  value={currentExp.period}
                  onChange={(v) => patch("period", v)}
                  placeholder="e.g. 2026 – Present"
                />
                <div className="space-y-1.5">
                  <label className={cls.label}>Status</label>
                  <select
                    value={currentExp.type}
                    onChange={(e) => patch("type", e.target.value)}
                    className={cls.input + " appearance-none cursor-pointer"}
                  >
                    <option value="current">Current Role</option>
                    <option value="previous">Previous Role</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className={cls.label}>
                    Tech Stack (comma separated)
                  </label>
                  <input
                    type="text"
                    value={currentExp.techStack.join(", ")}
                    onChange={(e) =>
                      patch(
                        "techStack",
                        e.target.value
                          .split(",")
                          .map((s) => s.trim())
                          .filter(Boolean),
                      )
                    }
                    className={cls.input}
                    placeholder="React, Next.js, Node.js"
                  />
                </div>
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-5">
                <SectionDivider label="Roles & Responsibilities" />
                <button
                  type="button"
                  onClick={addRole}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors shrink-0 ml-4"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add Role
                </button>
              </div>

              <div className="space-y-3">
                {currentExp.roles.map((role, ri) => (
                  <div
                    key={ri}
                    className="relative p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl"
                  >
                    {currentExp.roles.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRole(ri)}
                        className="absolute -top-2.5 -right-2.5 p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:scale-105 transition-transform"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}

                    <p className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">
                      Role {ri + 1}
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      <Field
                        label="Job Title"
                        required
                        value={role.title}
                        onChange={(v) => patchRole(ri, "title", v)}
                        placeholder="e.g. Chief Operating Officer"
                      />
                      <Field
                        label="Subtitle / Type"
                        required
                        value={role.subtitle}
                        onChange={(v) => patchRole(ri, "subtitle", v)}
                        placeholder="e.g. COO · Full-time"
                      />
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <label className={cls.label} style={{ marginBottom: 0 }}>
                          Responsibilities
                        </label>
                        <button
                          type="button"
                          onClick={() => addResp(ri)}
                          className="flex items-center gap-1 text-[9px] font-black uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors"
                        >
                          <Plus className="w-3 h-3" /> Add
                        </button>
                      </div>

                      <div className="space-y-2">
                        {role.responsibilities.map((resp, pi) => (
                          <div key={pi} className="flex items-center gap-2.5">
                            <span className="w-1 h-1 rounded-full bg-white/20 shrink-0" />
                            <input
                              required
                              type="text"
                              value={resp}
                              onChange={(e) =>
                                patchResp(ri, pi, e.target.value)
                              }
                              className="flex-1 min-w-0 bg-transparent border-b border-white/[0.07] focus:border-white/20 py-2 px-1 text-xs font-medium placeholder:text-white/20 focus:outline-none transition-colors"
                              placeholder="Describe a responsibility…"
                            />
                            {role.responsibilities.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeResp(ri, pi)}
                                className="text-white/15 hover:text-red-400 transition-colors shrink-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="flex items-center justify-between mb-5">
                <SectionDivider label="Key Achievements" />
                <button
                  type="button"
                  onClick={addAchv}
                  className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white/70 transition-colors shrink-0 ml-4"
                >
                  <PlusCircle className="w-3.5 h-3.5" /> Add
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {currentExp.achievements.map((ach, ai) => (
                  <div
                    key={ai}
                    className="flex gap-3 items-start p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl"
                  >
                    <div className="flex-1 grid grid-cols-2 gap-3 min-w-0">
                      <div>
                        <label className={cls.label}>Metric</label>
                        <input
                          required
                          type="text"
                          value={ach.metric}
                          onChange={(e) =>
                            patchAchv(ai, "metric", e.target.value)
                          }
                          className="w-full bg-transparent border-b border-white/[0.07] focus:border-white/20 py-1.5 text-lg font-black placeholder:text-white/15 focus:outline-none transition-colors"
                          placeholder="9+"
                        />
                      </div>

                      <div>
                        <label className={cls.label}>Label</label>
                        <input
                          required
                          type="text"
                          value={ach.label}
                          onChange={(e) =>
                            patchAchv(ai, "label", e.target.value)
                          }
                          className="w-full bg-transparent border-b border-white/[0.07] focus:border-white/20 py-1.5 text-xs font-medium placeholder:text-white/15 focus:outline-none transition-colors"
                          placeholder="Projects Delivered"
                        />
                      </div>
                    </div>

                    {currentExp.achievements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeAchv(ai)}
                        className="mt-6 shrink-0 text-white/15 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </section>

            <div className="flex flex-col xs:flex-row gap-3 pt-6 border-t border-white/[0.06]">
              <button
                type="button"
                onClick={onCancel}
                className="flex-1 py-3.5 bg-white/5 hover:bg-white/8 border border-white/[0.06] rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSaving}
                className="flex-[2] py-3.5 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
              >
                {isSaving ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" /> Saving…
                  </>
                ) : editingId ? (
                  "Save Changes"
                ) : (
                  "Create Experience"
                )}
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}