"use client";
import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

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
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      data-cursor-hover-y="-3"
      className="rounded-2xl glass-card-primary transition-all duration-300 overflow-hidden text-left relative hover:border-orange-300 p-6 sm:p-7"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div className="w-12 h-12 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-center shrink-0">
          <Icon className="w-6 h-6 text-[#FF6014]" />
        </div>

        <div className="text-right">
          <div className="text-3xl font-black text-slate-900 leading-none">
            {level}%
          </div>
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mt-1">
            Proficiency
          </div>
        </div>
      </div>

      {/* Title & Description */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-slate-900 mb-2">
          {title}
        </h3>
        <p className="text-base text-slate-800 leading-relaxed font-medium text-justify">
          {description}
        </p>
      </div>

      {/* 3 Progress Bars */}
      <div className="space-y-4 mb-6">
        {subSkills.map((sub, i) => (
          <div key={sub.name}>
            <div className="flex justify-between text-sm mb-1.5 font-bold">
              <span className="text-slate-800">
                {sub.name}
              </span>
              <span className="text-slate-900">{sub.level}%</span>
            </div>
            <div className="h-2 bg-slate-100 border border-slate-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#FF6014] rounded-full"
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
      <div className="mt-5 pt-4 border-t border-slate-200">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">
          Real-World Application
        </p>
        <ul className="space-y-2.5">
          {examples.map((ex, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <CheckCircle2 className="w-4 h-4 mt-0.5 flex-shrink-0 text-[#FF6014]" />
              <span className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                {ex}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
