"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillCategory, getCategoryConfig } from "./types";
import { Code, CheckCircle, Cpu, Database, Layers, Sparkles } from "lucide-react";

interface SkillCategoryCardProps {
  category: SkillCategory;
}

const categoryDescriptions: Record<string, string> = {
  "Frontend Development": "Building responsive, accessible, and high-performance user interfaces.",
  "Frontend": "Building responsive, accessible, and high-performance user interfaces.",
  "Backend Development": "Designing scalable APIs, real-time services, and backend architectures.",
  "Backend": "Designing scalable APIs, real-time services, and backend architectures.",
  "Database": "Designing optimized relational schemas, indexes, and query structures.",
  "Authentication & Security": "Implementing secure auth strategies, RBAC, and data privacy standard enforcement.",
  "Authentication": "Implementing secure auth strategies, RBAC, and data privacy standard enforcement.",
  "Security": "Implementing secure auth strategies, RBAC, and data privacy standard enforcement.",
  "DevOps & Tools": "Automating containerized workloads, CI/CD pipelines, and cloud deployments.",
  "DevOps": "Automating containerized workloads, CI/CD pipelines, and cloud deployments.",
  "Tools": "Managing development configurations, linters, bundlers, and developer workflows.",
  "Animation": "Creating smooth micro-interactions and dynamic web experiences.",
  "Mobile Development": "Building high-performance cross-platform mobile apps.",
  "Mobile": "Building high-performance cross-platform mobile apps.",
  "API Integration": "Connecting third-party services, webhooks, and RESTful microservices.",
  "API": "Connecting third-party services, webhooks, and RESTful microservices.",
};

function getCategoryDescription(title: string): string {
  const direct = categoryDescriptions[title];
  if (direct) return direct;
  const matched = Object.keys(categoryDescriptions).find((k) =>
    title.toLowerCase().includes(k.toLowerCase())
  );
  return matched ? categoryDescriptions[matched] : "Technical capabilities and stack integrations.";
}

// Tech Skill Chip component with crisp logo rendering & spring hover animation
function SkillChip({ skill }: { skill: { id: string; name: string; imageUrl?: string } }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      whileHover={{ scale: 1.06, y: -2 }}
      transition={{ type: "spring", stiffness: 400, damping: 20 }}
      className="group/chip inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-slate-200/90 bg-slate-50/80 hover:bg-orange-50/60 hover:border-orange-300 transition-all duration-200 cursor-default shadow-xs"
    >
      {skill.imageUrl && !imgError ? (
        <div className="w-5 h-5 rounded-md overflow-hidden shrink-0 flex items-center justify-center bg-white border border-slate-200 p-0.5 shadow-2xs group-hover/chip:border-orange-200">
          <img
            src={skill.imageUrl}
            alt={skill.name}
            onError={() => setImgError(true)}
            className="w-full h-full object-contain"
          />
        </div>
      ) : (
        <div className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center bg-orange-100/80 text-[#FF6014]">
          <Code className="w-3 h-3 text-[#FF6014]" />
        </div>
      )}
      <span className="text-xs sm:text-sm font-bold text-slate-900 group-hover/chip:text-[#FF6014] transition-colors whitespace-nowrap">
        {skill.name}
      </span>
    </motion.div>
  );
}

export default function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  const { icon: Icon } = getCategoryConfig(category.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="group relative flex flex-col p-6 sm:p-7 rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-xl hover:shadow-orange-500/5 hover:border-orange-300 transition-all duration-300 min-h-[290px] justify-between text-left overflow-hidden"
    >
      {/* Top Sweep Accent Beam */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 bg-orange-50 border border-orange-200/80 rounded-xl flex items-center justify-center shrink-0 shadow-xs group-hover:bg-[#FF6014] group-hover:text-white transition-colors duration-300">
              <Icon className="w-5 h-5 text-[#FF6014] group-hover:text-white transition-colors duration-300" strokeWidth={2.2} />
            </div>
            <h3 className="text-[20px] sm:text-[22px] font-black text-slate-900 tracking-tight leading-snug group-hover:text-[#FF6014] transition-colors">
              {category.title}
            </h3>
          </div>

          {/* Skill Count Pill */}
          <span className="px-2.5 py-1 text-[11px] font-extrabold text-slate-700 bg-slate-100 border border-slate-200 rounded-full shrink-0">
            {category.skills.length} skills
          </span>
        </div>

        {/* Category Description */}
        <p className="text-sm sm:text-[15px] text-slate-800 leading-relaxed font-medium mb-6">
          {getCategoryDescription(category.title)}
        </p>
      </div>

      {/* Skills list chips grid */}
      <div className="flex flex-wrap gap-2 pt-3 border-t border-slate-100">
        {category.skills.map((skill) => (
          <SkillChip key={skill.id} skill={skill} />
        ))}
      </div>
    </motion.div>
  );
}
