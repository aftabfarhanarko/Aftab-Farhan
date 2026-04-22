"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ExperienceManager = () => {
  const [experiences, setExperiences] = useState([
    { id: 1, company: "Freelance / Self-Employed", role: "Senior Full-Stack Developer", period: "2023 - Present", description: "Led various projects for international clients." },
    { id: 2, company: "TechSolutions Ltd", role: "Senior Full-Stack Developer", period: "2021 - 2023", description: "Led a team of 5 developers." },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newExp, setNewExp] = useState({ company: "", role: "", period: "", description: "" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setExperiences((prev) => [...prev, { ...newExp, id: Date.now() }]);
    setIsAdding(false);
    setNewExp({ company: "", role: "", period: "", description: "" });
  };

  const handleDelete = (id: number) => {
    setExperiences((prev) => prev.filter((e) => e.id !== id));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Experience</h1>
          <p className="text-foreground/50 font-medium">Manage your professional journey.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Add Experience
        </button>
      </div>

      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {experiences.map((exp) => (
            <motion.div
              key={exp.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="p-8 bg-white/[0.03] border border-white/5 rounded-[2rem] hover:border-white/10 transition-colors group relative"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="text-xl font-bold mb-1">{exp.role}</h3>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-sm text-foreground/60">{exp.company}</span>
                    <span className="text-[10px] text-foreground/30 font-bold uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-full">{exp.period}</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors">Edit</button>
                  <button 
                    onClick={() => handleDelete(exp.id)}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="text-sm text-foreground/50 leading-relaxed max-w-3xl">{exp.description}</p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add Modal */}
      <AnimatePresence>
        {isAdding && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAdding(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              className="relative w-full max-w-xl bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8">Add Experience</h2>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Role</label>
                    <input
                      required
                      type="text"
                      value={newExp.role}
                      onChange={(e) => setNewExp({ ...newExp, role: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Company</label>
                    <input
                      required
                      type="text"
                      value={newExp.company}
                      onChange={(e) => setNewExp({ ...newExp, company: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Period (e.g. 2021 - 2023)</label>
                  <input
                    required
                    type="text"
                    value={newExp.period}
                    onChange={(e) => setNewExp({ ...newExp, period: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Description</label>
                  <textarea
                    required
                    value={newExp.description}
                    onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                    rows={4}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium resize-none"
                  />
                </div>
                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAdding(false)}
                    className="flex-1 py-4 bg-white/5 hover:bg-white/10 rounded-2xl font-bold text-sm uppercase tracking-widest transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-4 bg-white text-black rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
                  >
                    Add Experience
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
