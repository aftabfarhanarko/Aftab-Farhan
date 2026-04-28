"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

const AboutManager = () => {
  const [formData, setFormData] = useState({
    bio: "I'm a passionate Full-Stack Developer with over 6 years of experience in building modern web applications. I specialize in the MERN stack and Next.js, focusing on performance and user experience.",
    skills: "React, Next.js, TypeScript, Node.js, MongoDB, Tailwind CSS",
    yearsOfExperience: "6+",
    projectsCompleted: "50+",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Changes saved locally! (Backend not implemented)");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">About Me</h1>
        <p className="text-foreground/50 font-medium">Manage your personal bio and key statistics.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Biography</label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={6}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium resize-none"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Skills (Comma separated)</label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Years of Experience</label>
            <input
              type="text"
              name="yearsOfExperience"
              value={formData.yearsOfExperience}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Projects Completed</label>
            <input
              type="text"
              name="projectsCompleted"
              value={formData.projectsCompleted}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            className="px-8 py-4 bg-foreground text-background rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-[1.02] active:scale-[0.98] transition-all"
          >
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
};

export default AboutManager;
