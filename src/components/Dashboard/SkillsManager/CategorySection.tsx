"use client";

import React from "react";
import { Edit2, Plus, Trash2 } from "lucide-react";
import type { SkillCategory } from "./types";
import SkillCard from "./SkillCard";

export default function CategorySection({
  category,
  onEditCategory,
  onDeleteCategory,
  onAddSkillInCategory,
  onEditSkill,
  onDeleteSkill,
}: {
  category: SkillCategory;
  onEditCategory: () => void;
  onDeleteCategory: () => void;
  onAddSkillInCategory: () => void;
  onEditSkill: (skillId: string) => void;
  onDeleteSkill: (skillId: string) => void;
}) {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-5">
        <h2 className="text-base sm:text-lg font-bold flex items-center gap-2">
          <span className="text-white/20 text-sm">#</span>
          {category.title}
          <span className="text-xs text-white/20 font-normal ml-1">
            {category.skills.length} skill
            {category.skills.length !== 1 ? "s" : ""}
          </span>
        </h2>
        <div className="flex gap-1">
          <button
            onClick={onEditCategory}
            className="p-1.5 hover:bg-white/5 rounded-lg transition-colors text-white/30 hover:text-white"
            type="button"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={onDeleteCategory}
            className="p-1.5 hover:bg-red-500/10 rounded-lg transition-colors text-white/30 hover:text-red-400"
            type="button"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 xs:grid-cols-4 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-3">
        {category.skills.map((skill) => (
          <SkillCard
            key={skill.id}
            skill={skill}
            onEdit={() => onEditSkill(skill.id)}
            onDelete={() => onDeleteSkill(skill.id)}
          />
        ))}

        <button
          onClick={onAddSkillInCategory}
          className="p-3 border border-dashed border-white/10 rounded-xl hover:bg-white/5 hover:border-white/20 transition-all flex flex-col items-center justify-center gap-1.5 text-white/20 hover:text-white/40 min-h-[80px]"
          type="button"
        >
          <Plus className="w-4 h-4" />
          <span className="text-[10px] font-bold uppercase tracking-widest">
            Add
          </span>
        </button>
      </div>
    </div>
  );
}
