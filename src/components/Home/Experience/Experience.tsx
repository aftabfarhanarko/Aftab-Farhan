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
    <section id="experience" className="mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      <div className="grid lg:grid-cols-[320px_1fr] gap-10 lg:gap-16 items-start">
        {/* Left panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 mb-3">
            <Star className="w-4 h-4 text-[#FF6014]" />
            <span className="text-xs font-bold text-[#FF6014] uppercase tracking-wider">
              Career Path
            </span>
          </div>

          <h2 className="text-[32px] sm:text-[38px] lg:text-[40px] font-black tracking-tight leading-tight mb-3 text-slate-900">
            Professional <span className="text-[#FF6014]">Experience</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-800 leading-[1.7] max-w-xs mx-auto lg:mx-0 font-medium">
            A chronological timeline of my professional engineering journey, highlighting key technical positions and measurable achievements.
          </p>
        </div>

        {/* Right timeline */}
        <div className="relative">
          {/* Vertical Glowing Gradient Line */}
          <div className="absolute left-5 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#FF6014] via-orange-400 to-slate-200 hidden sm:block opacity-80" />

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
