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
      className="group glass-card-primary border border-black/10 dark:border-white/10 rounded-3xl overflow-hidden hover:border-[#FF6014]/40 dark:hover:border-[#FF6014]/40 transition-all duration-300 flex flex-col hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-black/10 dark:bg-white/5">
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-full object-cover opacity-80 dark:opacity-70 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className="px-3 py-1 bg-black/60 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-black uppercase tracking-wider text-white font-['Bai_Jamjuree']">
            {project.category.replace("_", " ")}
          </span>
          {project.featured && (
            <span className="px-3 py-1 bg-[#FF6014] backdrop-blur-md border border-[#FF6014]/40 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-lg shadow-[#FF6014]/30 font-['Bai_Jamjuree']">
              <Star className="w-2.5 h-2.5 inline-block mr-1 -mt-0.5 fill-current" />
              Featured
            </span>
          )}
        </div>

        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={onEdit}
            className="p-2 bg-black/60 backdrop-blur-md hover:bg-[#FF6014] rounded-xl border border-white/20 transition-all text-white"
            type="button"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={onDelete}
            className="p-2 bg-black/60 backdrop-blur-md hover:bg-red-500 rounded-xl border border-white/20 transition-all text-white"
            type="button"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="mb-3">
          <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-1 font-['Bai_Jamjuree']">
            {project.title}
          </h3>
          <p className="text-[10px] sm:text-xs font-bold text-[#FF6014] uppercase tracking-widest font-['Bai_Jamjuree']">
            {project.tagline}
          </p>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 line-clamp-2 mb-6 leading-relaxed font-medium">
          {project.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mt-auto">
          <div className="flex items-center gap-2 text-slate-600 font-['Bai_Jamjuree']">
            <Calendar className="w-3.5 h-3.5 text-[#FF6014]" />
            <span className="text-[11px] font-black uppercase tracking-wider">
              {project.year}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-600 font-['Bai_Jamjuree']">
            <Briefcase className="w-3.5 h-3.5 text-[#FF6014]" />
            <span className="text-[11px] font-black uppercase tracking-wider truncate">
              {project.projectType}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mt-4">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2.5 py-1 glass-card-compact border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-wider text-slate-700 font-['Bai_Jamjuree']"
            >
              {t}
            </span>
          ))}
          {project.tech.length > 4 && (
            <span className="px-2.5 py-1 glass-card-compact border border-slate-200 rounded-lg text-[9px] font-black uppercase tracking-wider text-[#FF6014] font-['Bai_Jamjuree']">
              +{project.tech.length - 4}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

