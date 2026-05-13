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
      className="p-3 bg-white/[0.03] border border-white/5 rounded-xl hover:border-white/10 transition-all group relative flex flex-col items-center gap-2"
    >
      <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center overflow-hidden shrink-0">
        {skill.imageUrl ? (
          <img
            src={skill.imageUrl}
            alt={skill.name}
            className="w-5 h-5 object-contain"
          />
        ) : (
          <Code2 className="w-4 h-4 text-white/20" />
        )}
      </div>
      <span className="font-semibold text-[11px] text-center leading-tight line-clamp-2 w-full text-white/70">
        {skill.name}
      </span>

      <div className="absolute top-1.5 right-1.5 flex gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={onEdit}
          className="p-1 bg-black/60 backdrop-blur-sm hover:bg-white/10 rounded-md transition-colors"
          type="button"
        >
          <Edit2 className="w-2.5 h-2.5" />
        </button>
        <button
          onClick={onDelete}
          className="p-1 bg-black/60 backdrop-blur-sm hover:bg-red-500/20 rounded-md transition-colors text-red-400"
          type="button"
        >
          <Trash2 className="w-2.5 h-2.5" />
        </button>
      </div>
    </motion.div>
  );
}

