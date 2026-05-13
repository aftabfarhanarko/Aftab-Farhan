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
  Cpu,
  Globe,
} from "lucide-react";


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


// Each category gets an icon + a Tailwind color accent class set
type AccentKey =
  | "blue"
  | "green"
  | "amber"
  | "pink"
  | "purple"
  | "teal"
  | "default";

interface CategoryConfig {
  icon: React.ElementType;
  accent: AccentKey;
}

const categoryConfig: Record<string, CategoryConfig> = {
  Frontend: { icon: Monitor, accent: "blue" },
  Backend: { icon: Server, accent: "green" },
  Database: { icon: Database, accent: "amber" },
  Animation: { icon: Sparkles, accent: "pink" },
  Tools: { icon: Wrench, accent: "purple" },
  DevOps: { icon: Settings, accent: "teal" },
  Mobile: { icon: Cpu, accent: "pink" },
  API: { icon: Globe, accent: "teal" },
};

// Tailwind accent classes per key (icon bg / icon color / chip dot)
const accentClasses: Record<
  AccentKey,
  { iconWrap: string; iconColor: string; dot: string }
> = {
  blue: {
    iconWrap: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-400",
    dot: "bg-blue-400",
  },
  green: {
    iconWrap: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  amber: {
    iconWrap: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-400",
    dot: "bg-amber-400",
  },
  pink: {
    iconWrap: "bg-pink-500/10 border-pink-500/20",
    iconColor: "text-pink-400",
    dot: "bg-pink-400",
  },
  purple: {
    iconWrap: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-400",
    dot: "bg-violet-400",
  },
  teal: {
    iconWrap: "bg-teal-500/10 border-teal-500/20",
    iconColor: "text-teal-400",
    dot: "bg-teal-400",
  },
  default: {
    iconWrap: "bg-foreground/[0.07] border-border",
    iconColor: "text-foreground/60",
    dot: "bg-foreground/30",
  },
};

function getCategoryConfig(title: string): CategoryConfig {
  const direct = categoryConfig[title];
  if (direct) return direct;
  const matched = Object.keys(categoryConfig).find((k) => title.includes(k));
  return matched
    ? categoryConfig[matched]
    : { icon: Settings, accent: "default" };
}


function SkillsSkeleton() {
  return (
    <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div
          key={i}
          className="p-5 rounded-2xl border border-border bg-foreground/[0.02] animate-pulse"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-8 rounded-xl bg-foreground/10 shrink-0" />
            <div className="h-3.5 w-24 rounded-full bg-foreground/10" />
          </div>
          <div className="h-px bg-border mb-4" />
          <div className="flex flex-wrap gap-1.5">
            {Array.from({ length: 6 }).map((_, j) => (
              <div
                key={j}
                className="h-6 w-16 rounded-full bg-foreground/[0.06]"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}


export default function Skills() {
  const { data: categories, isLoading } = useQuery<SkillCategory[]>({
    queryKey: ["skills-categories"],
    queryFn: async () => {
      const res = await axios.get("/api/skills");
      return res.data;
    },
  });

  return (
    <section id="skills" className="mb-20 sm:mb-24 scroll-mt-24">
     
      <div className="mb-10 sm:mb-12">
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-foreground/35 font-bold mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-foreground/25 inline-block" />
          Technical Arsenal
        </span>

        <h2 className="text-[clamp(28px,5vw,48px)] font-black text-foreground tracking-tight leading-none mb-4">
          Mastering the <span className="text-foreground/25">Modern Stack</span>
        </h2>

        <p className="max-w-2xl text-foreground/50 text-sm sm:text-base leading-relaxed">
          Technologies I leverage to build scalable, high-performance
          applications ÃƒÆ’Ã‚Â¢ÃƒÂ¢Ã¢â‚¬Å¡Ã‚Â¬ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â from pixel-perfect UIs to robust backend systems.
        </p>
      </div>

     
      {isLoading ? (
        <SkillsSkeleton />
      ) : (
        <div className="grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {categories?.map((category) => {
            const { icon: Icon, accent } = getCategoryConfig(category.title);
            const a = accentClasses[accent];

            return (
              <div
                key={category.id}
                className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:border-border hover:bg-foreground/[0.04] transition-all duration-300"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-4">
                  <div
                    className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300 ${a.iconWrap}`}
                  >
                    <Icon
                      className={`w-4 h-4 ${a.iconColor}`}
                      strokeWidth={1.8}
                    />
                  </div>

                  <h3 className="text-sm font-black text-foreground/75 tracking-tight group-hover:text-foreground transition-colors flex-1">
                    {category.title}
                  </h3>

                  {/* Count */}
                  <span className="text-[10px] font-bold text-foreground/20 tabular-nums">
                    {category.skills.length}
                  </span>
                </div>

                {/* Divider */}
                <div className="h-px bg-border mb-4" />

                {/* Skill pills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.id}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-card/40 hover:border-border hover:bg-card/60 transition-all duration-200 group/chip cursor-default"
                    >
                      {/* Logo or accent dot */}
                      {skill.imageUrl ? (
                        <div className="w-3.5 h-3.5 rounded overflow-hidden shrink-0 flex items-center justify-center">
                          <img
                            src={skill.imageUrl}
                            alt={skill.name}
                            className="w-full h-full object-contain group-hover/chip:scale-110 transition-transform duration-200"
                          />
                        </div>
                      ) : (
                        <span
                          className={`w-1.5 h-1.5 rounded-full shrink-0 ${a.dot}`}
                        />
                      )}
                      <span className="text-[11px] sm:text-[11.5px] font-semibold text-foreground/50 group-hover/chip:text-foreground/85 transition-colors whitespace-nowrap">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
