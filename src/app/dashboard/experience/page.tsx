"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Dashboard/ui/ToastContext";
import { Plus, Trash2, Edit2, Globe, MapPin, Calendar, PlusCircle, X } from "lucide-react";

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

const ExperienceManager = () => {
  const { showToast } = useToast();
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);

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

  const [currentExp, setCurrentExp] = useState<Experience>(initialExp);

  useEffect(() => {
    fetchExperiences();
  }, []);

  const fetchExperiences = async () => {
    try {
      const res = await fetch("/api/experience");
      if (!res.ok) throw new Error("Failed to fetch");
      const data = await res.json();
      setExperiences(data);
    } catch (error) {
      showToast("Error fetching experiences", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId ? `/api/experience/${editingId}` : "/api/experience";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(currentExp),
      });

      if (!res.ok) throw new Error("Failed to save");

      showToast(`Experience ${editingId ? "updated" : "added"} successfully!`);
      setIsAdding(false);
      setEditingId(null);
      setCurrentExp(initialExp);
      fetchExperiences();
    } catch (error) {
      showToast("Error saving experience", "error");
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return;
    try {
      const res = await fetch(`/api/experience/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete");
      showToast("Experience deleted successfully!");
      fetchExperiences();
    } catch (error) {
      showToast("Error deleting experience", "error");
    }
  };

  const handleEdit = (exp: Experience) => {
    setCurrentExp(exp);
    setEditingId(exp.id!);
    setIsAdding(true);
  };

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

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-12">
        <div>
          <h1 className="text-5xl font-black tracking-tight mb-3">Work Experience</h1>
          <p className="text-foreground/50 font-medium text-lg">Manage your professional journey and achievements.</p>
        </div>
        <button
          onClick={() => {
            setCurrentExp(initialExp);
            setEditingId(null);
            setIsAdding(true);
          }}
          className="group flex items-center gap-2 px-8 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 transition-all shadow-xl shadow-white/5"
        >
          <Plus className="w-5 h-5" />
          Add Experience
        </button>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center h-64">
          <div className="w-12 h-12 border-4 border-white/10 border-t-white rounded-full animate-spin" />
        </div>
      ) : (
        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {experiences.map((exp) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="group relative p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] hover:border-white/10 transition-all duration-500"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] border ${
                        exp.type === "current" 
                          ? "bg-green-500/10 border-green-500/20 text-green-500" 
                          : "bg-white/5 border-white/10 text-foreground/40"
                      }`}>
                        {exp.type}
                      </span>
                      <span className="text-foreground/20">•</span>
                      <span className="text-xs font-bold text-foreground/40 flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {exp.period}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black tracking-tight mb-2 group-hover:text-white transition-colors">
                      {exp.company}
                    </h3>

                    <div className="flex flex-wrap items-center gap-5 text-sm font-bold text-foreground/40">
                      <a href={exp.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
                        <Globe className="w-4 h-4" />
                        {exp.url ? new URL(exp.url).hostname : "No URL"}
                      </a>
                      <span className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {exp.location}
                      </span>
                    </div>

                    <div className="mt-8 flex flex-wrap gap-2">
                      {exp.techStack.map((tech, i) => (
                        <span key={i} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[11px] font-bold text-foreground/60">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-row lg:flex-col gap-3">
                    <button
                      onClick={() => handleEdit(exp)}
                      className="p-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all hover:scale-110 active:scale-95"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(exp.id!)}
                      className="p-4 bg-red-500/5 hover:bg-red-500/10 text-red-500 rounded-2xl transition-all hover:scale-110 active:scale-95"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="mt-10 grid md:grid-cols-2 gap-8 border-t border-white/5 pt-8">
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/20 mb-6">Roles & Responsibilities</h4>
                    <div className="space-y-6">
                      {exp.roles.map((role, i) => (
                        <div key={i} className="relative pl-6 border-l border-white/10">
                          <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-white/10 border border-white/20" />
                          <h5 className="font-bold text-lg mb-1">{role.title}</h5>
                          <p className="text-sm text-foreground/40 font-medium mb-3">{role.subtitle}</p>
                          <ul className="space-y-2">
                            {role.responsibilities.slice(0, 2).map((resp, j) => (
                              <li key={j} className="text-xs text-foreground/50 leading-relaxed">• {resp}</li>
                            ))}
                            {role.responsibilities.length > 2 && (
                              <li className="text-[10px] font-black text-foreground/20 uppercase tracking-widest">+{role.responsibilities.length - 2} more</li>
                            )}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/20 mb-6">Key Achievements</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {exp.achievements.map((ach, i) => (
                        <div key={i} className="p-4 bg-white/5 rounded-2xl border border-white/5">
                          <div className="text-2xl font-black mb-1">{ach.metric}</div>
                          <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest leading-tight">{ach.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="fixed inset-0 bg-black/90 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] p-8 sm:p-12 shadow-2xl my-auto"
            >
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-3xl font-black tracking-tight">
                  {editingId ? "Edit Experience" : "Add New Experience"}
                </h2>
                <button
                  onClick={() => setIsAdding(false)}
                  className="p-3 hover:bg-white/5 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-12">
                {/* Basic Info */}
                <section>
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 mb-8 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-white/10" />
                    Company Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Company Name</label>
                      <input
                        required
                        type="text"
                        value={currentExp.company}
                        onChange={(e) => setCurrentExp({ ...currentExp, company: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                        placeholder="e.g. NexoviaSoft"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Website URL</label>
                      <input
                        required
                        type="url"
                        value={currentExp.url}
                        onChange={(e) => setCurrentExp({ ...currentExp, url: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                        placeholder="https://..."
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Location</label>
                      <input
                        required
                        type="text"
                        value={currentExp.location}
                        onChange={(e) => setCurrentExp({ ...currentExp, location: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                        placeholder="e.g. Rangpur, Bangladesh"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Period</label>
                      <input
                        required
                        type="text"
                        value={currentExp.period}
                        onChange={(e) => setCurrentExp({ ...currentExp, period: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                        placeholder="e.g. 2026 – Present"
                      />
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Status</label>
                      <select
                        value={currentExp.type}
                        onChange={(e) => setCurrentExp({ ...currentExp, type: e.target.value })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all font-bold text-sm appearance-none"
                      >
                        <option value="current">Current Role</option>
                        <option value="previous">Previous Role</option>
                      </select>
                    </div>
                    <div className="space-y-3">
                      <label className="text-[10px] font-black uppercase tracking-widest text-foreground/40 ml-1">Tech Stack (comma separated)</label>
                      <input
                        type="text"
                        value={currentExp.techStack.join(", ")}
                        onChange={(e) => setCurrentExp({ ...currentExp, techStack: e.target.value.split(",").map(s => s.trim()).filter(s => s !== "") })}
                        className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                        placeholder="React, Next.js, Node.js"
                      />
                    </div>
                  </div>
                </section>

                {/* Roles Section */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 mb-8 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-white/10" />
                      Roles & Responsibilities
                    </h3>
                    <button
                      type="button"
                      onClick={addRole}
                      className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Role
                    </button>
                  </div>

                  <div className="space-y-8">
                    {currentExp.roles.map((role, ri) => (
                      <div key={ri} className="p-8 bg-white/[0.02] border border-white/5 rounded-3xl relative">
                        {currentExp.roles.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeRole(ri)}
                            className="absolute -top-3 -right-3 p-2 bg-red-500/10 border border-red-500/20 text-red-500 rounded-full hover:scale-110 transition-transform"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        )}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-1">Job Title</label>
                            <input
                              required
                              type="text"
                              value={role.title}
                              onChange={(e) => handleRoleChange(ri, "title", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                              placeholder="e.g. Chief Operating Officer"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-1">Subtitle/Type</label>
                            <input
                              required
                              type="text"
                              value={role.subtitle}
                              onChange={(e) => handleRoleChange(ri, "subtitle", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-white/20 transition-all font-bold text-sm"
                              placeholder="e.g. COO · Full-time"
                            />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center justify-between mb-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-1">Responsibilities</label>
                            <button
                              type="button"
                              onClick={() => addResponsibility(ri)}
                              className="text-[9px] font-black uppercase tracking-widest text-white/20 hover:text-white transition-colors flex items-center gap-1.5"
                            >
                              <Plus className="w-3 h-3" />
                              Add Bullet
                            </button>
                          </div>
                          {role.responsibilities.map((resp, rpi) => (
                            <div key={rpi} className="flex gap-3">
                              <input
                                required
                                type="text"
                                value={resp}
                                onChange={(e) => handleResponsibilityChange(ri, rpi, e.target.value)}
                                className="flex-1 bg-white/5 border border-white/5 rounded-xl px-5 py-3 focus:outline-none focus:border-white/20 transition-all text-xs font-medium"
                                placeholder="Describe a responsibility or achievement..."
                              />
                              {role.responsibilities.length > 1 && (
                                <button
                                  type="button"
                                  onClick={() => removeResponsibility(ri, rpi)}
                                  className="p-3 text-foreground/20 hover:text-red-500 transition-colors"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              )}
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Achievements Section */}
                <section>
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground/30 flex items-center gap-3">
                      <span className="w-8 h-[1px] bg-white/10" />
                      Key Achievements
                    </h3>
                    <button
                      type="button"
                      onClick={addAchievement}
                      className="text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors flex items-center gap-2"
                    >
                      <PlusCircle className="w-4 h-4" />
                      Add Achievement
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentExp.achievements.map((ach, ai) => (
                      <div key={ai} className="flex gap-4 items-start p-6 bg-white/[0.02] border border-white/5 rounded-2xl relative">
                        <div className="flex-1 grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-1">Metric</label>
                            <input
                              required
                              type="text"
                              value={ach.metric}
                              onChange={(e) => handleAchievementChange(ai, "metric", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-white/20 transition-all font-black text-lg"
                              placeholder="9+"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-foreground/30 ml-1">Label</label>
                            <input
                              required
                              type="text"
                              value={ach.label}
                              onChange={(e) => handleAchievementChange(ai, "label", e.target.value)}
                              className="w-full bg-white/5 border border-white/10 rounded-xl px-5 py-3 focus:outline-none focus:border-white/20 transition-all font-bold text-xs"
                              placeholder="Projects Delivered"
                            />
                          </div>
                        </div>
                        {currentExp.achievements.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeAchievement(ai)}
                            className="mt-8 p-2 text-foreground/20 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </section>

                <div className="flex gap-6 pt-12 border-t border-white/5">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-5 bg-white/5 hover:bg-white/10 rounded-2xl font-black text-sm uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-[2] py-5 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all shadow-2xl shadow-white/10"
                  >
                    {editingId ? "Save Changes" : "Create Experience"}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ExperienceManager;
