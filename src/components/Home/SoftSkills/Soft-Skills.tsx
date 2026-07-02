"use client";
import React from "react";
import { Star } from "lucide-react";
import { softSkills, coreStrengths } from "./softSkillsData";
import SkillCard, { useInView } from "./SkillCard";

export default function SoftSkills() {
  const { ref: headerRef, inView: headerInView } = useInView(0.2);

  return (
    <section
      id="soft-skills"
      className="mb-12 sm:mb-16 lg:mb-20 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
        {/* Left: grid of 4 cards */}
        <div className="grid sm:grid-cols-2 gap-5 order-2 lg:order-1">
          {softSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} delay={index * 150} />
          ))}
        </div>

        {/* Right: sticky panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 mb-5">
            <Star className="w-3.5 h-3.5 text-black/40 dark:text-white/50" />
            <span className="text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">
              Interpersonal Skills
            </span>
          </div>

          <h2 className="text-2xl md:text-4xl font-black tracking-tight leading-none mb-4">
            <span className="text-foreground">Soft </span>
            <span className="text-foreground/25">Skills</span>
          </h2>

          <p className="text-sm sm:text-base text-foreground/60 leading-relaxed mb-8 max-w-xs mx-auto lg:mx-0">
            Beyond technical expertise, I bring strong interpersonal skills that
            enable effective collaboration, clear communication, and successful
            project outcomes.
          </p>

          {/* Core Strengths Pills */}
          <div ref={headerRef} className="w-full">
            <p className="text-[10px] font-bold text-black/30 dark:text-white/30 uppercase tracking-wider mb-3 lg:text-left text-center">
              Core Strengths
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-1.5">
              {coreStrengths.map((item, i) => {
                const SIcon = item.Icon;
                return (
                  <span
                    key={item.name}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-xs bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-lg text-black/60 dark:text-white/60"
                    style={{
                      opacity: headerInView ? 1 : 0,
                      transform: headerInView ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 400ms, transform 400ms`,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    <SIcon className="w-3.5 h-3.5 opacity-60" />
                    {item.name}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}