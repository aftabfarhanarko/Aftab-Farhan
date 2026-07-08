"use client";
import React from "react";
import { SkillCategory, getCategoryConfig, accentClasses } from "./types";

interface SkillCategoryCardProps {
  category: SkillCategory;
}

export default function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  const { icon: Icon, accent } = getCategoryConfig(category.title);
  const a = accentClasses[accent];

  return (
    <div className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:border-border hover:bg-foreground/[0.05] transition-all duration-300 h-full">
      {/* Card header */}
      <div className="flex items-center gap-3 mb-4">
        {/* ✅ Frosted glass category icon with backdrop-blur + accent glow */}
        <div
          className={`
            relative w-11 h-11 rounded-2xl flex items-center justify-center shrink-0
            backdrop-blur-md border-2 shadow-lg
            group-hover:scale-110 group-hover:shadow-xl
            transition-all duration-300
            ${a.iconWrap}
          `}
          style={{ backdropFilter: "blur(12px)" }}
        >
          {/* Soft inner glow */}
          <div className={`absolute inset-0 rounded-2xl opacity-30 blur-sm ${a.iconWrap}`} />
          <Icon
            className={`relative z-10 w-5 h-5 ${a.iconColor}`}
            strokeWidth={1.8}
          />
        </div>

        <h3 className="text-[13px] font-black text-foreground/80 tracking-tight group-hover:text-foreground transition-colors flex-1">
          {category.title}
        </h3>

        <span className="text-[10px] font-bold text-foreground/20 tabular-nums">
          {category.skills.length}
        </span>
      </div>

      <div className="h-px bg-border mb-4" />

      {/* Skill pills — enlarged icons for clear visibility */}
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <div
            key={skill.id}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-full border border-border bg-card/40 hover:bg-card/70 hover:scale-[1.06] hover:border-foreground/25 hover:shadow-md transition-all duration-200 group/chip cursor-default"
          >
            {skill.imageUrl ? (
              /* ✅ Enlarged to w-7 h-7 with frosted background container */
              <div className="w-7 h-7 rounded-lg overflow-hidden shrink-0 flex items-center justify-center bg-white/10 backdrop-blur-sm border border-white/10 p-0.5">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-full h-full object-contain group-hover/chip:scale-110 transition-transform duration-200 drop-shadow-sm"
                />
              </div>
            ) : (
              <span className={`w-2.5 h-2.5 rounded-full shrink-0 ${a.dot}`} />
            )}
            <span className="text-[12px] sm:text-[12.5px] font-semibold text-foreground/60 group-hover/chip:text-foreground/90 transition-colors whitespace-nowrap">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
