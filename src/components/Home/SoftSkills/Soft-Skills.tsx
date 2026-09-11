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
      className="mb-20 sm:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="grid lg:grid-cols-[1fr_320px] gap-10 lg:gap-16 items-start">
        {/* Left: grid of 4 cards */}
        <div className="grid sm:grid-cols-2 gap-6 order-2 lg:order-1">
          {softSkills.map((skill, index) => (
            <SkillCard key={skill.id} skill={skill} delay={index * 150} />
          ))}
        </div>

        {/* Right: sticky panel */}
        <div className="lg:sticky lg:top-28 flex flex-col items-center text-center lg:items-start lg:text-left order-1 lg:order-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200 bg-orange-50 mb-4">
            <Star className="w-4 h-4 text-[#FF6014]" />
            <span className="text-xs font-bold text-[#FF6014] uppercase tracking-wider">
              Interpersonal Skills
            </span>
          </div>

          <h2 className="text-[36px] sm:text-[44px] md:text-[48px] font-black tracking-tight leading-tight mb-4 text-slate-900">
            Soft <span className="text-[#FF6014]">Skills</span>
          </h2>

          <p className="text-base sm:text-lg text-slate-600 leading-[1.7] mb-8 max-w-xs mx-auto lg:mx-0 font-normal">
            Beyond technical expertise, I bring strong interpersonal skills that enable effective collaboration, clear communication, and successful project outcomes.
          </p>

          {/* Core Strengths Pills */}
          <div ref={headerRef} className="w-full">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 lg:text-left text-center">
              Core Strengths
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {coreStrengths.map((item, i) => {
                const SIcon = item.Icon;
                return (
                  <span
                    key={item.name}
                    className="flex items-center gap-2 px-3.5 py-2 text-xs font-semibold bg-slate-100 border border-slate-200 rounded-lg text-slate-800"
                    style={{
                      opacity: headerInView ? 1 : 0,
                      transform: headerInView ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 400ms, transform 400ms`,
                      transitionDelay: `${i * 50}ms`,
                    }}
                  >
                    <SIcon className="w-4 h-4 text-[#FF6014]" />
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