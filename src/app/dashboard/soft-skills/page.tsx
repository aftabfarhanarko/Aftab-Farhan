"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/Dashboard/ui/ToastContext";

const SoftSkillsManager = () => {
  const { showToast } = useToast();
  const [skills, setSkills] = useState([
    { 
      id: 1, 
      title: "Leadership & Management", 
      icon: "👥", 
      subSkills: [{ name: "Team Mentorship", level: 95 }], 
      examples: ["Led a team of 10 developers"] 
    },
    { 
      id: 2, 
      title: "Problem Solving", 
      icon: "🧩", 
      subSkills: [{ name: "Analytical Thinking", level: 98 }], 
      examples: ["Resolved critical production bugs under tight deadlines"] 
    },
  ]);

  const addSkill = () => {
    const newSkill = { 
      id: Date.now(), 
      title: "New Soft Skill", 
      icon: "✨", 
      subSkills: [{ name: "Sub Skill", level: 80 }], 
      examples: ["Add a real-world example"] 
    };
    setSkills([...skills, newSkill]);
    showToast("Soft skill category added!");
  };

  const removeSkill = (id: number) => {
    setSkills(skills.filter(s => s.id !== id));
    showToast("Soft skill removed", "error");
  };

  return (
    <div className="max-w-4xl pb-20">
      <div className="flex items-center justify-between mb-10">
        <div>
          <h1 className="text-4xl font-black tracking-tight mb-2">Soft Skills</h1>
          <p className="text-foreground/50 font-medium">Manage your interpersonal and professional attributes.</p>
        </div>
        <button 
          onClick={addSkill} 
          className="px-6 py-3 bg-white text-black rounded-2xl font-bold text-sm uppercase tracking-widest hover:scale-105 transition-transform flex items-center gap-2"
        >
          <span>➕</span> Add Category
        </button>
      </div>

      <div className="space-y-6">
        <AnimatePresence mode="popLayout">
          {skills.map((skill) => (
            <motion.div
              key={skill.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-8 bg-white/[0.03] border border-white/5 rounded-[2.5rem] relative group"
            >
              <button 
                onClick={() => removeSkill(skill.id)}
                className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center bg-red-500/10 text-red-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/20"
              >
                ×
              </button>

              <div className="flex items-center gap-6 mb-8">
                <div className="text-5xl">{skill.icon}</div>
                <div className="flex-1">
                  <input 
                    className="bg-transparent border-none text-2xl font-black focus:outline-none w-full"
                    defaultValue={skill.title}
                  />
                  <div className="text-xs font-bold text-foreground/40 uppercase tracking-widest mt-1">Skill Category</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Sub-Skills & Levels</h4>
                  {skill.subSkills.map((sub, i) => (
                    <div key={i} className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <input className="bg-transparent border-none focus:outline-none" defaultValue={sub.name} />
                        <span>{sub.level}%</span>
                      </div>
                      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div className="h-full bg-white/20" style={{ width: ${sub.level}% }} />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="space-y-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Key Examples</h4>
                  <div className="space-y-2">
                    {skill.examples.map((ex, i) => (
                      <textarea 
                        key={i}
                        className="w-full bg-white/5 border border-white/10 rounded-xl p-3 text-sm focus:outline-none focus:border-white/20 resize-none"
                        defaultValue={ex}
                        rows={2}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default SoftSkillsManager;
