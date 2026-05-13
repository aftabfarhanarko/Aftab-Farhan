"use client";

import React from "react";
import { motion } from "framer-motion";
import { Briefcase, Calendar, Edit2, Star, Trash2 } from "lucide-react";
import type { Project } from "./types";

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.div
      key={project.id}
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="group bg-white/[0.03] border border-white/5 rounded-3xl overflow-hidden hover:border-white/10 transition-all flex flex-col"
    >
      <div className="relative aspect-video overflow-hidden bg-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-wider text-white/80">
            {project.category.replace("_", " ")}
          </span>
          {project.featured && (
            <span className="px-3 py-1 bg-violet-500/80 backdrop-blur-md border border-violet-400/20 rounded-full text-[10px] font-bold uppercase tracking-wider text-white">
              <Star className="w-2.5 h-2.5 inline-block mr-1 -mt-0.5 fill-current" />
              Featured
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 bg-black/50 backdrop-blur-md hover:bg-white/10 rounded-xl border border-white/10 transition-all text-white/70 hover:text-white"
            type="button"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-black/50 backdrop-blur-md hover:bg-red-500/20 rounded-xl border border-white/10 transition-all text-white/70 hover:text-red-500"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-4">
          <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-xs font-semibold text-white/30 uppercase tracking-widest">
            {project.tagline}
          </p>
        </div>

        <p className="text-sm text-white/50 line-clamp-2 mb-6 leading-relaxed">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="flex items-center gap-2 text-white/30">
            <Calendar className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {project.year}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/30">
            <Briefcase className="w-3.5 h-3.5" />
            <span className="text-[11px] font-bold uppercase tracking-wider">
              {project.projectType}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-1 bg-white/[0.05] border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-wider text-white/40"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2 py-1 bg-white/[0.05] border border-white/5 rounded-lg text-[9px] font-bold uppercase tracking-wider text-white/40">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

