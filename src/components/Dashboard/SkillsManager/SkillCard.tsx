"use client";

import React from "react";
import { Code2, Edit2, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import type { Skill } from "./types";

export default function SkillCard({
  skill,
  onEdit,
  onDelete,
}: {
  skill: Skill;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="p-3 glass-card-compact border border-slate-200/90 rounded-xl hover:border-[#FF6014]/60 transition-all duration-300 group relative flex flex-col items-center gap-2 hover:-translate-y-0.5 shadow-2xs"
    >
      <div className="w-8 h-8 rounded-lg bg-orange-50 border border-orange-200/60 flex items-center justify-center overflow-hidden shrink-0">
        {skill.imageUrl ? (
          <img
            src={skill.imageUrl}
            alt={skill.name}
            className="w-5 h-5 object-contain"
          />
        ) : (
          <Code2 className="w-4 h-4 text-[#FF6014]" />
        )}
      </div>
      <span className="font-bold text-[11px] text-center leading-tight line-clamp-2 w-full text-slate-800 font-['Bai_Jamjuree']">
        {skill.name}
      </span>

      <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1 bg-black/60 backdrop-blur-sm hover:bg-[#FF6014] rounded-md transition-colors text-white"
          type="button"
        >
          <Edit2 className="w-2.5 h-2.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 bg-black/60 backdrop-blur-sm hover:bg-red-500 rounded-md transition-colors text-white"
          type="button"
        >
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      </div>
    </motion.div>
  );
}

