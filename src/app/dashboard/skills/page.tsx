"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SkillsManager = () => {
  const [skills, setSkills] = useState([
    { id: 1, name: "React", level: "95%", icon: "⚛️" },
    { id: 2, name: "Next.js", level: "90%", icon: "▲" },
    { id: 3, name: "TypeScript", level: "85%", icon: "TS" },
    { id: 4, name: "Node.js", level: "88%", icon: "🟢" },
  ]);

  const [isAdding, setIsAdding] = useState(false);
  const [newSkill, setNewSkill] = useState({ name: "", level: "80%", icon: "⚡" });

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    setSkills((prev) => [...prev, { ...newSkill, id: Date.now() }]);
    setIsAdding(false);
    setNewSkill({ name: "", level: "80%", icon: "⚡" });
  };

  const handleDelete = (id: number) => {
    setSkills((prev) => prev.filter((s) => s.id !== id));
  };

  return (
    <div className="max-w-5xl">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Skills</h1>
          <p className="text-foreground/50 font-medium">Manage your technical expertise.</p>
        </div>
        <button
          onClick={() => setIsAdding(true)}
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform"
        >
          Add New Skill
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-6 bg-white/[0.03] border border-white/5 rounded-3xl hover:border-white/10 transition-colors group relative"
            >
              <button 
                onClick={() => handleDelete(skill.id)}
                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              >
                ×
              </button>
              <div className="text-3xl mb-4">{skill.icon}</div>
              <div className="font-bold text-lg mb-1">{skill.name}</div>
              <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest">{skill.level} Proficiency</div>
              
              <div className="mt-4 h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: skill.level }}
                  className="h-full bg-white/20 rounded-full"
                />
              </div>
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
              className="relative w-full max-w-lg bg-[#0a0a0a] border border-white/10 rounded-[2.5rem] p-10 shadow-2xl"
            >
              <h2 className="text-2xl font-black mb-8">Add Skill</h2>
              <form onSubmit={handleAdd} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Skill Name</label>
                  <input
                    required
                    type="text"
                    value={newSkill.name}
                    onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Proficiency (%)</label>
                    <input
                      required
                      type="text"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Icon/Emoji</label>
                    <input
                      required
                      type="text"
                      value={newSkill.icon}
                      onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium text-center"
                    />
                  </div>
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
                    Add Skill
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

export default SkillsManager;
