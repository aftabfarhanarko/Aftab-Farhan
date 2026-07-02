"use client";
import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

interface SubSkill {
  name: string;
  level: number;
}

interface SoftSkill {
  id: string;
  title: string;
  Icon: React.ElementType;
  level: number;
  description: string;
  subSkills: SubSkill[];
  examples: string[];
}

export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

export default function SkillCard({
  skill,
  delay = 0,
}: {
  skill: SoftSkill;
  delay?: number;
}) {
  const { ref, inView } = useInView(0.2);
  const { title, Icon, level, description, subSkills, examples } = skill;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      <div className="p-5 sm:p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-foreground leading-none">
              {level}%
            </div>
            <div className="text-[11px] sm:text-xs text-black/40 dark:text-white/40 mt-0.5">
              Proficiency
            </div>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-foreground mb-1.5">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-black/50 dark:text-white/50 leading-relaxed mb-5">
          {description}
        </p>

        {/* 3 Progress Bars — animate when scrolled into view */}
        <div className="space-y-3 sm:space-y-4">
          {subSkills.map((sub, i) => (
            <div key={sub.name}>
              <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                <span className="text-black/60 dark:text-white/60 font-medium">
                  {sub.name}
                </span>
                <span className="text-black/35 dark:text-white/35">{sub.level}%</span>
              </div>
              <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black dark:bg-white rounded-full"
                  style={{
                    width: inView ? `${sub.level}%` : "0%",
                    transition: `width 900ms cubic-bezier(0.4, 0, 0.2, 1) ${delay + i * 120}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Real-World Examples */}
        <div className="mt-5 pt-4 border-t border-black/[0.07] dark:border-white/[0.07]">
          <p className="text-[10px] sm:text-[11px] font-bold text-black/35 dark:text-white/35 uppercase tracking-wider mb-2.5">
            Real-World Application
          </p>
          <ul className="space-y-1.5 sm:space-y-2">
            {examples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-black/40 dark:text-white/40" />
                <span className="text-xs sm:text-sm text-black/55 dark:text-white/55 leading-relaxed">
                  {ex}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
