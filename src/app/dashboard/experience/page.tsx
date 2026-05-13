"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import {
  Plus,
  Trash2,
  Edit2,
  Globe,
  MapPin,
  Calendar,
  PlusCircle,
  X,
  Loader2,
  ArrowLeft,
  Briefcase,
} from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// ── Types ──────────────────────────────────────────────────────────────────────
interface Role {
  id?: number;
  title: string;
  subtitle: string;
  iconName: string;
  responsibilities: string[];
}

interface Achievement {
  id?: number;
  metric: string;
  label: string;
}

interface Experience {
  id?: number;
  company: string;
  url: string;
  location: string;
  period: string;
  type: string;
  techStack: string[];
  roles: Role[];
  achievements: Achievement[];
}

// ── Constants ──────────────────────────────────────────────────────────────────
const INITIAL_EXP: Experience = {
  company: "",
  url: "",
  location: "",
  period: "",
  type: "current",
  techStack: [],
  roles: [
    { title: "", subtitle: "", iconName: "Briefcase", responsibilities: [""] },
  ],
  achievements: [{ metric: "", label: "" }],
};

// ── Shared style tokens ────────────────────────────────────────────────────────
const cls = {
  input:
    "w-full bg-white/[0.04] hover:bg-white/[0.06] border border-white/[0.08] hover:border-white/[0.12] focus:border-white/20 rounded-xl px-4 py-3 text-sm font-medium placeholder:text-white/20 focus:outline-none transition-all",
  label:
    "block text-[10px] font-black uppercase tracking-[0.16em] text-white/30 mb-1.5",
  sectionHead:
    "flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-white/25 mb-5",
  card: "bg-white/[0.025] border border-white/[0.07] hover:border-white/[0.12] hover:bg-white/[0.04] rounded-2xl transition-all duration-200",
};

// ── Sub-components ─────────────────────────────────────────────────────────────
const SectionDivider = ({ label }: { label: string }) => (
  <div className={cls.sectionHead}>
    <span className="w-5 h-px bg-white/10 shrink-0" />
    {label}
  </div>
);

const Field = ({
  label,
  value,
  onChange,
  placeholder,
  required = false,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  required?: boolean;
  type?: string;
}) => (
  <div className="space-y-1.5">
    <label className={cls.label}>{label}</label>
    <input
      required={required}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={cls.input}
      placeholder={placeholder}
    />
  </div>
);

// ── Main Component ─────────────────────────────────────────────────────────────
const ExperienceManager = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentExp, setCurrentExp] = useState<Experience>(INITIAL_EXP);

  // ── Query ────────────────────────────────────────────────────────────────────
  const { data: experiences = [], isLoading } = useQuery<Experience[]>({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error("Failed to fetch");
      return res.json();
    },
  });

  // ── Mutations ────────────────────────────────────────────────────────────────
  const saveMutation = useMutation({
    mutationFn: async (data: Experience) => {
      const res = await fetch(
        editingId ? `/api/experience/${editingId}` : "/api/experience",
        {
          method: editingId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.details || err.error || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      showToast(`Experience ${editingId ? "updated" : "added"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      handleCancel();
    },
    onError: (e: any) =>
      showToast(e.message || "Error saving experience", "error"),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      showToast("Experience deleted!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: () => showToast("Error deleting experience", "error"),
  });

  // ── Handlers ─────────────────────────────────────────────────────────────────
  const handleCancel = useCallback(() => {
    setIsAdding(false);
    setEditingId(null);
    setCurrentExp(INITIAL_EXP);
  }, []);

  const handleEdit = useCallback((exp: Experience) => {
    setCurrentExp(exp);
    setEditingId(exp.id!);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const patch = useCallback(
    <K extends keyof Experience>(key: K, val: Experience[K]) =>
      setCurrentExp((prev) => ({ ...prev, [key]: val })),
    [],
  );

  // Roles
  const addRole = () =>
    patch("roles", [
      ...currentExp.roles,
      {
        title: "",
        subtitle: "",
        iconName: "Briefcase",
        responsibilities: [""],
      },
    ]);

  const removeRole = (i: number) =>
    patch(
      "roles",
      currentExp.roles.filter((_, idx) => idx !== i),
    );

  const patchRole = (i: number, key: keyof Role, val: any) => {
    const next = [...currentExp.roles];
    next[i] = { ...next[i], [key]: val };
    patch("roles", next);
  };

  const addResp = (ri: number) => {
    const next = [...currentExp.roles];
    next[ri] = {
      ...next[ri],
      responsibilities: [...next[ri].responsibilities, ""],
    };
    patch("roles", next);
  };

  const removeResp = (ri: number, pi: number) => {
    const next = [...currentExp.roles];
    next[ri] = {
      ...next[ri],
      responsibilities: next[ri].responsibilities.filter((_, i) => i !== pi),
    };
    patch("roles", next);
  };

  const patchResp = (ri: number, pi: number, val: string) => {
    const next = [...currentExp.roles];
    const resps = [...next[ri].responsibilities];
    resps[pi] = val;
    next[ri] = { ...next[ri], responsibilities: resps };
    patch("roles", next);
  };

  // Achievements
  const addAchv = () =>
    patch("achievements", [
      ...currentExp.achievements,
      { metric: "", label: "" },
    ]);

  const removeAchv = (i: number) =>
    patch(
      "achievements",
      currentExp.achievements.filter((_, idx) => idx !== i),
    );

  const patchAchv = (i: number, key: keyof Achievement, val: string) => {
    const next = [...currentExp.achievements];
    next[i] = { ...next[i], [key]: val };
    patch("achievements", next);
  };

  // ── Render ────────────────────────────────────────────────────────────────────
  return (
    <div className="w-full">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10 pb-6 border-b border-white/5">
        <div>
          <p className="text-[9px] font-black uppercase tracking-[0.22em] text-white/25 mb-2">
            Portfolio
          </p>
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight leading-none">
            Work Experience
          </h1>
          <p className="text-xs text-white/35 mt-2">
            Manage your professional journey and achievements.
          </p>
        </div>
        <div>
          {!isAdding && (
            <button
              onClick={() => {
                setCurrentExp(INITIAL_EXP);
                setEditingId(null);
                setIsAdding(true);
              }}
              className="shrink-0 flex items-center w-[200px] gap-2 px-5 py-3 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.03] active:scale-[0.97] transition-transform"
            >
              <Plus className="w-3.5 h-3.5" />
              Add Experience
            </button>
          )}
        </div>
      </div>

      {/* ── Form ─────────────────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.18 }}
            className={`mb-10 ${cls.card} p-5 sm:p-8`}
          >
            {/* Form header */}
            <div className="flex items-center justify-between mb-8 pb-5 border-b border-white/[0.06]">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={handleCancel}
                  className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/40 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                <h2 className="text-base font-black">
                  {editingId ? "Edit Experience" : "Add New Experience"}
                </h2>
              </div>
              <button
                onClick={handleCancel}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                saveMutation.mutate(currentExp);
              }}
              className="space-y-10"
            >
              {/* Company Info */}
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

              {/* Roles */}
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
                          <label
                            className={cls.label}
                            style={{ marginBottom: 0 }}
                          >
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

              {/* Achievements */}
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

              {/* Submit */}
              <div className="flex flex-col xs:flex-row gap-3 pt-6 border-t border-white/[0.06]">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 py-3.5 bg-white/5 hover:bg-white/8 border border-white/[0.06] rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saveMutation.isPending}
                  className="flex-[2] py-3.5 bg-white text-black rounded-xl text-xs font-black uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-2"
                >
                  {saveMutation.isPending ? (
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

      {/* ── List ─────────────────────────────────────────────────────────────── */}
      <div>
        <div className="flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.22em] text-white/25 mb-5">
          <span className="w-5 h-px bg-white/10 shrink-0" />
          Existing Experiences
          <span className="ml-auto font-black text-white/20">
            {experiences.length}{" "}
            {experiences.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-40">
            <Loader2 className="w-6 h-6 animate-spin text-white/20" />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {experiences.map((exp: Experience, i: number) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ delay: i * 0.04, duration: 0.15 }}
                  className={`${cls.card} overflow-hidden`}
                >
                  {/* Card top */}
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4 p-5 sm:p-6">
                    {/* Left — company icon */}
                    <div className="shrink-0 w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center">
                      <Briefcase className="w-4 h-4 text-white/30" />
                    </div>

                    {/* Middle — info */}
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
                          <span className="truncate">
                            {exp.url
                              ? exp.url.startsWith("http")
                                ? new URL(exp.url).hostname
                                : exp.url
                              : "No URL"}
                          </span>
                        </a>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" /> {exp.location}
                        </span>
                      </div>
                      {exp.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {exp.techStack.map((tech, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-0.5 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[10px] font-medium text-white/45"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right — actions */}
                    <div className="flex sm:flex-col gap-2 shrink-0 self-start">
                      <button
                        onClick={() => handleEdit(exp)}
                        className="p-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-white/40 hover:text-white rounded-xl transition-all hover:scale-105 active:scale-95"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() =>
                          confirm("Delete this experience?") &&
                          deleteMutation.mutate(exp.id!)
                        }
                        disabled={deleteMutation.isPending}
                        className="p-2.5 bg-red-500/[0.04] hover:bg-red-500/10 border border-red-500/[0.12] text-red-400/60 hover:text-red-400 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30"
                      >
                        {deleteMutation.isPending ? (
                          <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        ) : (
                          <Trash2 className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Card bottom — roles + achievements */}
                  <div className="grid grid-cols-1 md:grid-cols-2 border-t border-white/[0.05]">
                    {/* Roles */}
                    <div className="p-5 sm:p-6 md:border-r border-white/[0.05]">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">
                        Roles & Responsibilities
                      </h4>
                      <div className="space-y-4">
                        {exp.roles.map((role, i) => (
                          <div
                            key={i}
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

                    {/* Achievements */}
                    <div className="p-5 sm:p-6 border-t md:border-t-0 border-white/[0.05]">
                      <h4 className="text-[9px] font-black uppercase tracking-[0.2em] text-white/20 mb-4">
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        {exp.achievements.map((ach, i) => (
                          <div
                            key={i}
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
    </div>
  );
};

export default ExperienceManager;
