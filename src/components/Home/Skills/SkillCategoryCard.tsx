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
    <div
      className="group flex flex-col p-5 sm:p-6 rounded-2xl border border-border bg-foreground/[0.02] hover:border-border hover:bg-foreground/[0.04] transition-all duration-300 h-full"
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

        <span className="text-[10px] font-bold text-foreground/20 tabular-nums">
          {category.skills.length}
        </span>
      </div>

      <div className="h-px bg-border mb-4" />

      {/* Skill pills */}
      <div className="flex flex-wrap gap-1.5">
        {category.skills.map((skill) => (
          <div
            key={skill.id}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-border bg-card/40 hover:border-border hover:bg-card/60 transition-all duration-200 group/chip cursor-default"
          >
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
}
