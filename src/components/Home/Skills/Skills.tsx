"use client";
import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import {
  Monitor,
  Server,
  Database,
  Sparkles,
  Wrench,
  Settings,
  Loader2,
} from "lucide-react";

// --- Types ---
interface Skill {
  id: string;
  name: string;
  imageUrl?: string;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

const categoryIconMap: Record<string, any> = {
  "Frontend": Monitor,
  "Backend": Server,
  "Database": Database,
  "Animation": Sparkles,
  "Tools": Wrench,
  "DevOps": Settings,
};

export default function Skills() {
  const { data: categories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ["skills-categories"],
    queryFn: async () => {
      const res = await axios.get("/api/skills");
      return res.data;
    },
  });

  return (
    <section id="skills" className="mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      <div className="text-left mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-foreground/40 uppercase tracking-[0.2em]">Technical Arsenal</span>
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">Mastering the Modern Stack</h2>
        <p className="mt-4 max-w-2xl text-foreground/60 text-sm sm:text-base leading-relaxed">Technologies and tools I leverage to build scalable, high-performance applications.</p>
      </div>

      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-white/10" />
          </div>
        ) : (
          categories?.map((category) => {
            const Icon = categoryIconMap[category.title] || categoryIconMap[Object.keys(categoryIconMap).find(k => category.title.includes(k)) || ""] || Settings;
            return (
              <div key={category.id} className="relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-foreground/[0.05] group">
                <div className="flex items-center gap-3 mb-4 sm:mb-5">
                  <div className="p-2.5 sm:p-3 rounded-xl bg-foreground/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <div 
                      key={skill.id} 
                      className="inline-flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/10 hover:border-white/20 hover:bg-white/[0.08] transition-all duration-200 group/skill cursor-default"
                    >
                      <div className="w-5 h-5 rounded-md overflow-hidden bg-white/5 flex items-center justify-center shrink-0">
                        {skill.imageUrl ? (
                          <img 
                            src={skill.imageUrl} 
                            alt={skill.name} 
                            className="w-full h-full object-contain p-0.5 group-hover/skill:scale-110 transition-transform duration-200" 
                          />
                        ) : (
                          <div className="w-full h-full bg-white/10" />
                        )}
                      </div>
                      <span className="text-xs sm:text-sm font-semibold text-foreground/70 group-hover/skill:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
