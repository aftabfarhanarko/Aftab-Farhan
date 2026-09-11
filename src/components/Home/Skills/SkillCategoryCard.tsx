"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillCategory, getCategoryConfig } from "./types";

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
  const matched = Object.keys(categoryDescriptions).find((k) => title.toLowerCase().includes(k.toLowerCase()));
  return matched ? categoryDescriptions[matched] : "Technical capabilities and stack integrations.";
}

export default function SkillCategoryCard({ category }: SkillCategoryCardProps) {
  const { icon: Icon } = getCategoryConfig(category.title);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group relative flex flex-col p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 min-h-[280px] justify-between"
    >
      {/* Top Header Section */}
      <div>
        <div className="flex items-center gap-3.5 mb-4">
          <div className="w-10 h-10 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-center shrink-0">
            <Icon className="w-5 h-5 text-[#FF6014]" strokeWidth={2} />
          </div>
          <h3 className="text-[20px] sm:text-[22px] font-bold text-slate-900 tracking-tight group-hover:text-[#FF6014] transition-colors">
            {category.title}
          </h3>
        </div>

        {/* Description */}
        <p className="text-sm sm:text-[15px] text-slate-600 leading-relaxed font-normal mb-6">
          {getCategoryDescription(category.title)}
        </p>
      </div>

      {/* Skills list badges */}
      <div className="flex flex-wrap gap-2 pt-2">
        {category.skills.map((skill) => (
          <div
            key={skill.id}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 cursor-default"
          >
            {skill.imageUrl ? (
              <div className="w-4 h-4 rounded overflow-hidden shrink-0 flex items-center justify-center bg-white border border-slate-200 p-0.5">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-[#FF6014]" />
            )}
            <span className="text-xs sm:text-sm font-semibold text-slate-800">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
