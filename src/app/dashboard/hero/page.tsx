"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useToast } from "@/components/Dashboard/ui/ToastContext";

const HeroManager = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    greeting: "Hi, I'm",
    name: "Aftab Farhan Arko",
    role: "Full-Stack Developer",
    description: "Building scalable web applications and digital experiences with modern technologies.",
    primaryCTA: "View Projects",
    secondaryCTA: "Contact Me",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Hero section updated successfully!");
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-10">
        <h1 className="text-4xl font-black tracking-tight mb-2">Hero Section</h1>
        <p className="text-foreground/50 font-medium">Manage the first thing visitors see on your portfolio.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Greeting</label>
            <input
              type="text"
              name="greeting"
              value={formData.greeting}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Role</label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium resize-none"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Primary CTA</label>
            <input
              type="text"
              name="primaryCTA"
              value={formData.primaryCTA}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 focus:outline-none focus:border-white/20 transition-colors font-medium"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-widest text-foreground/40 px-1">Secondary CTA</label>
            <input
              type="text"
              name="secondaryCTA"
              value={formData.secondaryCTA}
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

export default HeroManager;
