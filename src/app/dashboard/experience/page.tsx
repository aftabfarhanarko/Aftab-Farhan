"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { Plus, Trash2, Edit2, Globe, MapPin, Calendar, PlusCircle, X, Loader2, ArrowLeft } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

// Types
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

const initialExp: Experience = {
  company: "",
  url: "",
  location: "",
  period: "",
  type: "current",
  techStack: [],
  roles: [{ title: "", subtitle: "", iconName: "Briefcase", responsibilities: [""] }],
  achievements: [{ metric: "", label: "" }],
};

const ExperienceManager = () => {
  const { showToast } = useToast();
  const queryClient = useQueryClient();

  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [currentExp, setCurrentExp] = useState<Experience>(initialExp);

  // Fetch experiences
  const { data: experiences = [], isLoading } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error("Failed to fetch experiences");
      return res.json();
    },
  });

  // Save mutation (POST / PUT)
  const saveMutation = useMutation({
    mutationFn: async (data: Experience) => {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.details || errorData.error || "Failed to save");
      }
      return res.json();
    },
    onSuccess: () => {
      showToast(`Experience ${editingId ? "updated" : "added"} successfully!`);
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      handleCancel();
    },
    onError: (error: any) => {
      showToast(error.message || "Error saving experience", "error");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
    },
    onSuccess: () => {
      showToast("Experience deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
    onError: () => {
      showToast("Error deleting experience", "error");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    saveMutation.mutate(currentExp);
  };

  const handleDelete = (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = (exp: Experience) => {
    setCurrentExp(exp);
    setEditingId(exp.id!);
    setIsAdding(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCancel = () => {
    setIsAdding(false);
    setEditingId(null);
    setCurrentExp(initialExp);
  };

  // Role handlers
  const addRole = () => {
    setCurrentExp({
      ...currentExp,
      roles: [...currentExp.roles, { title: "", subtitle: "", iconName: "Briefcase", responsibilities: [""] }],
    });
  };

  const removeRole = (index: number) => {
    const newRoles = [...currentExp.roles];
    newRoles.splice(index, 1);
    setCurrentExp({ ...currentExp, roles: newRoles });
  };

  const handleRoleChange = (index: number, field: keyof Role, value: any) => {
    const newRoles = [...currentExp.roles];
    newRoles[index] = { ...newRoles[index], [field]: value };
    setCurrentExp({ ...currentExp, roles: newRoles });
  };

  const addResponsibility = (roleIndex: number) => {
    const newRoles = [...currentExp.roles];
    newRoles[roleIndex].responsibilities.push("");
    setCurrentExp({ ...currentExp, roles: newRoles });
  };

  const removeResponsibility = (roleIndex: number, respIndex: number) => {
    const newRoles = [...currentExp.roles];
    newRoles[roleIndex].responsibilities.splice(respIndex, 1);
    setCurrentExp({ ...currentExp, roles: newRoles });
  };

  const handleResponsibilityChange = (roleIndex: number, respIndex: number, value: string) => {
    const newRoles = [...currentExp.roles];
    newRoles[roleIndex].responsibilities[respIndex] = value;
    setCurrentExp({ ...currentExp, roles: newRoles });
  };

  // Achievement handlers
  const addAchievement = () => {
    setCurrentExp({
      ...currentExp,
      achievements: [...currentExp.achievements, { metric: "", label: "" }],
    });
  };

  const removeAchievement = (index: number) => {
    const newAchievements = [...currentExp.achievements];
    newAchievements.splice(index, 1);
    setCurrentExp({ ...currentExp, achievements: newAchievements });
  };

  const handleAchievementChange = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...currentExp.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setCurrentExp({ ...currentExp, achievements: newAchievements });
  };

  // ─── Shared input classes ────────────────────────────────────────────────────
  const inputCls =
    "w-full bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5 text-[13px] font-medium text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-white/20 transition-colors";
  const labelCls = "block text-[10px] font-semibold uppercase tracking-[0.14em] text-foreground/30 mb-1.5";
  const sectionHeadingCls =
    "flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/25 mb-6";

  return (
    <div className="max-w-5xl mx-auto px-5 py-10 sm:px-8">

      {/* ── Page Header ── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5 mb-14">
        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-foreground/25 mb-2">Portfolio</p>
          <h1 className="text-[26px] font-semibold tracking-tight leading-none mb-1.5">Work Experience</h1>
          <p className="text-[12px] text-foreground/40">Manage your professional journey and achievements.</p>
        </div>
        {!isAdding && (
          <button
            onClick={() => { setCurrentExp(initialExp); setEditingId(null); setIsAdding(true); }}
            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] hover:opacity-90 active:scale-[0.97] transition-all"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Experience
          </button>
        )}
      </div>

      {/* ── Form ── */}
      <AnimatePresence mode="wait">
        {isAdding && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="mb-14 bg-white/[0.025] border border-white/[0.08] rounded-2xl p-7 sm:p-10"
          >
            {/* Form Header */}
            <div className="flex items-center justify-between mb-10 pb-6 border-b border-white/[0.06]">
              <div className="flex items-center gap-3">
                <button onClick={handleCancel} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                  <ArrowLeft className="w-4 h-4 text-foreground/50" />
                </button>
                <h2 className="text-[15px] font-semibold">
                  {editingId ? "Edit Experience" : "Add New Experience"}
                </h2>
              </div>
              <button onClick={handleCancel} className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                <X className="w-4 h-4 text-foreground/40" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Company Info */}
              <section>
                <div className={sectionHeadingCls}>
                  <span className="w-6 h-px bg-white/10" />
                  Company Information
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className={labelCls}>Company Name</label>
                    <input required type="text" value={currentExp.company}
                      onChange={(e) => setCurrentExp({ ...currentExp, company: e.target.value })}
                      className={inputCls} placeholder="e.g. NexoviaSoft" />
                  </div>
                  <div>
                    <label className={labelCls}>Website URL</label>
                    <input required type="text" value={currentExp.url}
                      onChange={(e) => setCurrentExp({ ...currentExp, url: e.target.value })}
                      className={inputCls} placeholder="https://..." />
                  </div>
                  <div>
                    <label className={labelCls}>Location</label>
                    <input required type="text" value={currentExp.location}
                      onChange={(e) => setCurrentExp({ ...currentExp, location: e.target.value })}
                      className={inputCls} placeholder="e.g. Rangpur, Bangladesh" />
                  </div>
                  <div>
                    <label className={labelCls}>Period</label>
                    <input required type="text" value={currentExp.period}
                      onChange={(e) => setCurrentExp({ ...currentExp, period: e.target.value })}
                      className={inputCls} placeholder="e.g. 2026 – Present" />
                  </div>
                  <div>
                    <label className={labelCls}>Status</label>
                    <select value={currentExp.type}
                      onChange={(e) => setCurrentExp({ ...currentExp, type: e.target.value })}
                      className={inputCls + " appearance-none cursor-pointer"}>
                      <option value="current">Current Role</option>
                      <option value="previous">Previous Role</option>
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Tech Stack (comma separated)</label>
                    <input type="text" value={currentExp.techStack.join(", ")}
                      onChange={(e) => setCurrentExp({
                        ...currentExp,
                        techStack: e.target.value.split(",").map((s) => s.trim()).filter((s) => s !== ""),
                      })}
                      className={inputCls} placeholder="React, Next.js, Node.js" />
                  </div>
                </div>
              </section>

              {/* Roles */}
              <section>
                <div className="flex items-center justify-between mb-6">
                  <div className={sectionHeadingCls} style={{ marginBottom: 0 }}>
                    <span className="w-6 h-px bg-white/10" />
                    Roles & Responsibilities
                  </div>
                  <button type="button" onClick={addRole}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/30 hover:text-foreground/70 transition-colors">
                    <PlusCircle className="w-3.5 h-3.5" /> Add Role
                  </button>
                </div>

                <div className="space-y-4">
                  {currentExp.roles.map((role, ri) => (
                    <div key={ri} className="relative p-6 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                      {currentExp.roles.length > 1 && (
                        <button type="button" onClick={() => removeRole(ri)}
                          className="absolute -top-2.5 -right-2.5 p-1.5 bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg hover:scale-105 transition-transform">
                          <X className="w-3 h-3" />
                        </button>
                      )}
                      <div className="flex items-center gap-2 mb-5">
                        <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20">
                          Role {ri + 1}
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
                        <div>
                          <label className={labelCls}>Job Title</label>
                          <input required type="text" value={role.title}
                            onChange={(e) => handleRoleChange(ri, "title", e.target.value)}
                            className={inputCls} placeholder="e.g. Chief Operating Officer" />
                        </div>
                        <div>
                          <label className={labelCls}>Subtitle / Type</label>
                          <input required type="text" value={role.subtitle}
                            onChange={(e) => handleRoleChange(ri, "subtitle", e.target.value)}
                            className={inputCls} placeholder="e.g. COO · Full-time" />
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <label className={labelCls} style={{ marginBottom: 0 }}>Responsibilities</label>
                          <button type="button" onClick={() => addResponsibility(ri)}
                            className="flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.12em] text-foreground/25 hover:text-foreground/60 transition-colors">
                            <Plus className="w-3 h-3" /> Add Bullet
                          </button>
                        </div>
                        <div className="space-y-2">
                          {role.responsibilities.map((resp, rpi) => (
                            <div key={rpi} className="flex items-center gap-2">
                              <span className="w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                              <input required type="text" value={resp}
                                onChange={(e) => handleResponsibilityChange(ri, rpi, e.target.value)}
                                className="flex-1 bg-transparent border-b border-white/[0.07] py-2 px-1 text-[12px] font-medium text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-white/20 transition-colors"
                                placeholder="Describe a responsibility..." />
                              {role.responsibilities.length > 1 && (
                                <button type="button" onClick={() => removeResponsibility(ri, rpi)}
                                  className="text-foreground/15 hover:text-red-400 transition-colors flex-shrink-0">
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
                <div className="flex items-center justify-between mb-6">
                  <div className={sectionHeadingCls} style={{ marginBottom: 0 }}>
                    <span className="w-6 h-px bg-white/10" />
                    Key Achievements
                  </div>
                  <button type="button" onClick={addAchievement}
                    className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-foreground/30 hover:text-foreground/70 transition-colors">
                    <PlusCircle className="w-3.5 h-3.5" /> Add Achievement
                  </button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {currentExp.achievements.map((ach, ai) => (
                    <div key={ai} className="flex gap-3 items-start p-5 bg-white/[0.02] border border-white/[0.06] rounded-xl">
                      <div className="flex-1 grid grid-cols-2 gap-3">
                        <div>
                          <label className={labelCls}>Metric</label>
                          <input required type="text" value={ach.metric}
                            onChange={(e) => handleAchievementChange(ai, "metric", e.target.value)}
                            className="w-full bg-transparent border-b border-white/[0.07] py-1.5 text-[18px] font-semibold text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-white/20 transition-colors"
                            placeholder="9+" />
                        </div>
                        <div>
                          <label className={labelCls}>Label</label>
                          <input required type="text" value={ach.label}
                            onChange={(e) => handleAchievementChange(ai, "label", e.target.value)}
                            className="w-full bg-transparent border-b border-white/[0.07] py-1.5 text-[12px] font-medium text-foreground placeholder:text-foreground/15 focus:outline-none focus:border-white/20 transition-colors"
                            placeholder="Projects Delivered" />
                        </div>
                      </div>
                      {currentExp.achievements.length > 1 && (
                        <button type="button" onClick={() => removeAchievement(ai)}
                          className="mt-6 text-foreground/15 hover:text-red-400 transition-colors">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </section>

              {/* Actions */}
              <div className="flex gap-3 pt-8 border-t border-white/[0.06]">
                <button type="button" onClick={handleCancel}
                  className="flex-1 py-3 bg-white/5 hover:bg-white/[0.08] border border-white/[0.06] rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] transition-colors">
                  Cancel
                </button>
                <button type="submit" disabled={saveMutation.isPending}
                  className="flex-[2] py-3 bg-white text-black rounded-xl text-[11px] font-bold uppercase tracking-[0.1em] hover:opacity-90 active:scale-[0.98] transition-all disabled:opacity-40 disabled:cursor-not-allowed">
                  {saveMutation.isPending ? "Saving..." : editingId ? "Save Changes" : "Create Experience"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── List ── */}
      <div>
        <div className={sectionHeadingCls}>
          <span className="w-6 h-px bg-white/10" />
          Existing Experiences
          <span className="ml-auto text-[9px] font-bold text-foreground/20">
            {experiences.length} {experiences.length === 1 ? "entry" : "entries"}
          </span>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-48">
            <Loader2 className="w-6 h-6 animate-spin text-foreground/20" />
          </div>
        ) : (
          <div className="space-y-4">
            <AnimatePresence mode="popLayout">
              {experiences.map((exp: Experience) => (
                <motion.div
                  key={exp.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.15 }}
                  className="group bg-white/[0.02] border border-white/[0.06] rounded-2xl hover:border-white/[0.12] hover:bg-white/[0.035] transition-all duration-300 overflow-hidden"
                >
                  {/* Card Top */}
                  <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 p-6 sm:p-7">
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <span className={`px-2.5 py-1 rounded-lg text-[9px] font-bold uppercase tracking-[0.14em] border ${
                          exp.type === "current"
                            ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                            : "bg-white/[0.04] border-white/[0.08] text-foreground/30"
                        }`}>
                          {exp.type}
                        </span>
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-foreground/30">
                          <Calendar className="w-3 h-3" />
                          {exp.period}
                        </span>
                      </div>
                      <h3 className="text-[18px] font-semibold tracking-tight mb-2 leading-none">
                        {exp.company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-[11px] font-medium text-foreground/35">
                        <a href={exp.url} target="_blank" rel="noopener noreferrer"
                          className="flex items-center gap-1.5 hover:text-foreground/70 transition-colors">
                          <Globe className="w-3 h-3" />
                          {exp.url ? (exp.url.startsWith("http") ? new URL(exp.url).hostname : exp.url) : "No URL"}
                        </a>
                        <span className="flex items-center gap-1.5">
                          <MapPin className="w-3 h-3" />
                          {exp.location}
                        </span>
                      </div>
                      {exp.techStack.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-4">
                          {exp.techStack.map((tech, i) => (
                            <span key={i} className="px-2.5 py-1 bg-white/[0.04] border border-white/[0.07] rounded-lg text-[10px] font-medium text-foreground/45">
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex flex-row lg:flex-col gap-2 flex-shrink-0">
                      <button onClick={() => handleEdit(exp)}
                        className="p-2.5 bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.07] text-foreground/50 hover:text-foreground rounded-xl transition-all hover:scale-105 active:scale-95">
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(exp.id!)} disabled={deleteMutation.isPending}
                        className="p-2.5 bg-red-500/[0.04] hover:bg-red-500/10 border border-red-500/[0.12] text-red-500/50 hover:text-red-400 rounded-xl transition-all hover:scale-105 active:scale-95 disabled:opacity-30">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Card Bottom */}
                  <div className="grid md:grid-cols-2 gap-0 border-t border-white/[0.05]">
                    <div className="p-6 sm:p-7 md:border-r border-white/[0.05]">
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-4">
                        Roles & Responsibilities
                      </h4>
                      <div className="space-y-4">
                        {exp.roles.map((role, i) => (
                          <div key={i} className="relative pl-4 border-l border-white/[0.08]">
                            <span className="absolute -left-[3px] top-1.5 w-1.5 h-1.5 rounded-full bg-white/10 border border-white/20" />
                            <p className="text-[13px] font-semibold mb-0.5">{role.title}</p>
                            <p className="text-[11px] text-foreground/35 font-medium mb-2">{role.subtitle}</p>
                            <ul className="space-y-1">
                              {role.responsibilities.slice(0, 2).map((resp, j) => (
                                <li key={j} className="text-[11px] text-foreground/45 leading-relaxed">· {resp}</li>
                              ))}
                              {role.responsibilities.length > 2 && (
                                <li className="text-[9px] font-bold uppercase tracking-[0.1em] text-foreground/20">
                                  +{role.responsibilities.length - 2} more
                                </li>
                              )}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="p-6 sm:p-7">
                      <h4 className="text-[9px] font-bold uppercase tracking-[0.2em] text-foreground/20 mb-4">
                        Key Achievements
                      </h4>
                      <div className="grid grid-cols-2 gap-2.5">
                        {exp.achievements.map((ach, i) => (
                          <div key={i} className="p-3.5 bg-white/[0.03] rounded-xl border border-white/[0.06]">
                            <div className="text-[20px] font-semibold leading-none mb-1">{ach.metric}</div>
                            <div className="text-[9px] font-bold text-foreground/35 uppercase tracking-[0.1em] leading-tight">{ach.label}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {experiences.length === 0 && !isAdding && (
              <div className="text-center py-16 bg-white/[0.015] border border-dashed border-white/[0.08] rounded-2xl">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-foreground/20">
                  No experiences found — add one to get started.
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