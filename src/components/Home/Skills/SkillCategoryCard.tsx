"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SkillCategory, getCategoryConfig } from "./types";

interface SkillCategoryCardProps {
  category: SkillCategory;
}

const categoryDescriptions: Record<string, string> = {
  "Frontend Development": "Crafting responsive, high-performance, and pixel-perfect user interfaces.",
  "Frontend": "Crafting responsive, high-performance, and pixel-perfect user interfaces.",
  "Backend Development": "Engineering secure, scalable server-side systems and robust REST APIs.",
  "Backend": "Engineering secure, scalable server-side systems and robust REST APIs.",
  "Database": "Designing optimized relational schemas, indexes, and query structures.",
  "Animation": "Creating smooth micro-interactions and dynamic web experiences.",
  "Tools": "Managing development configurations, linters, bundlers, and workflows.",
  "DevOps": "Automating containerized workloads, CI/CD pipelines, and cloud deployments.",
  "Mobile Development": "Building high-performance native and cross-platform mobile apps.",
  "Mobile": "Building high-performance native and cross-platform mobile apps.",
  "API Integration": "Connecting third-party services, webhooks, and authentication flows.",
  "API": "Connecting third-party services, webhooks, and authentication flows.",
  "AI Coding Stack": "Leveraging agentic AI tools and LLMs to accelerate development cycles.",
  "AI / ML": "Developing intelligent machine learning integrations and LLM pipelines.",
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
      className="group relative flex flex-col p-6 sm:p-7 rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-300 min-h-[340px] justify-between"
    >
      {/* Top Header Section */}
      <div>
        <div className="w-12 h-12 bg-orange-50 border border-orange-200 rounded-xl flex items-center justify-center shrink-0 mb-5">
          <Icon className="w-6 h-6 text-[#FF6014]" strokeWidth={2} />
        </div>

        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-xl font-bold text-slate-900 tracking-tight mb-2 group-hover:text-[#FF6014] transition-colors">
            {category.title}
          </h3>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
            {getCategoryDescription(category.title)}
          </p>
        </div>
      </div>

      {/* Skills list badges */}
      <div className="flex flex-wrap gap-2.5 mt-auto">
        {category.skills.map((skill) => (
          <div
            key={skill.id}
            className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border border-slate-200 bg-slate-50 hover:bg-orange-50 hover:border-orange-200 transition-all duration-200 cursor-default"
          >
            {skill.imageUrl ? (
              <div className="w-5 h-5 rounded overflow-hidden shrink-0 flex items-center justify-center bg-white border border-slate-200 p-0.5">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-full h-full object-contain"
                />
              </div>
            ) : (
              <span className="w-2 h-2 rounded-full shrink-0 bg-[#FF6014]" />
            )}
            <span className="text-sm font-semibold text-slate-800">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
