"use client";
import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { Experience as ExperienceType } from "./types";
import ExperienceCard from "./ExperienceCard";

export default function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [activeTab, setActiveTab] = useState<"all" | "current" | "previous">("all");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const res = await fetch("/api/experience");
        if (res.ok) {
          const data = await res.json();
          setExperiences(data);
        }
      } catch (error) {
        console.error("Error fetching experiences:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchExperiences();
  }, []);

  const filtered = activeTab === "all"
    ? experiences
    : experiences.filter((e) => e.type === activeTab);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin" />
      </div>
    );
  }

  if (experiences.length === 0) return null;

  return (
    <section id="experience" className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 mb-5">
            <Star className="w-3.5 h-3.5 text-black/40 dark:text-white/50" />
            <span className="text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">
              Career Path
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-4">
            <span className="text-foreground">Work </span>
            <span className="text-foreground/25">Experience</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0">
            A chronological timeline of my professional journey, highlighting
            the teams I've worked with and the impact I've made along the way.
          </p>

          {/* Mini stats */}
          <div className="grid grid-cols-2 gap-3 mb-8">
            {[
              { v: "1.5+", l: "Years Exp." },
              { v: "10+", l: "Projects" },
              { v: "7+", l: "Clients" },
              { v: "12+", l: "Tech Stack" },
            ].map(({ v, l }) => (
              <div key={l} className="p-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 text-center">
                <div className="text-xl font-black text-foreground">{v}</div>
                <div className="text-[10px] font-medium text-black/40 dark:text-white/40 uppercase tracking-wide mt-0.5">{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-black/20 dark:from-white/20 via-black/10 dark:via-white/10 to-transparent hidden sm:block" />

          <div className="space-y-6">
            {filtered.map((exp) => (
              <ExperienceCard key={exp.id} exp={exp} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
