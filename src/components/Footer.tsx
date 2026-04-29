"use client";
import React from "react";
import { motion } from "framer-motion";

// ----------------------------------------------------
// All skill groups from your image – no extra labels
// ----------------------------------------------------
const skillGroups = [
  {
    title: "Frontend & Languages",
    description: "Modern JavaScript ecosystems & frameworks",
    skills: [
      { name: "JavaScript", level: 95, icon: "🟨" },
      { name: "TypeScript", level: 88, icon: "🔷" },
      { name: "React", level: 95, icon: "⚛️" },
      { name: "Next.js", level: 90, icon: "▲" },
    ],
  },
  {
    title: "Animation & Motion",
    description: "Smooth, interactive user experiences",
    skills: [
      { name: "Framer Motion", level: 80, icon: "🌀" },
      { name: "GSAP", level: 75, icon: "💚" },
      { name: "CSS Animations", level: 90, icon: "🎞️" },
      { name: "Tailwind Animations", level: 85, icon: "🌊" },
      { name: "Scroll Animations", level: 82, icon: "📜" },
      { name: "Micro Interactions", level: 78, icon: "🖱️" },
      { name: "UX Principles", level: 70, icon: "🧠" },
    ],
  },
  {
    title: "Backend & APIs",
    description: "Server‑side logic and RESTful services",
    skills: [
      { name: "Node.js", level: 90, icon: "🟢" },
      { name: "Express.js", level: 88, icon: "🚂" },
    ],
  },
  {
    title: "Database & Storage",
    description: "Data modelling, caching, and cloud integration",
    skills: [
      { name: "MongoDB", level: 78, icon: "🍃" },
      { name: "PostgreSQL", level: 82, icon: "🐘" },
      { name: "Firebase", level: 70, icon: "🔥" },
    ],
  },
  {
    title: "Development Tools & Workflow",
    description: "Efficiency, collaboration, and code quality",
    skills: [
      { name: "VS Code", level: 98, icon: "🖥️" },
      { name: "Postman", level: 90, icon: "📮" },
      { name: "MongoDB Atlas", level: 75, icon: "☁️" },
      { name: "Prisma", level: 85, icon: "🔺" },
      { name: "Figma", level: 70, icon: "🎨" },
      { name: "Chrome DevTools", level: 92, icon: "🔍" },
      { name: "npm", level: 95, icon: "📦" },
      { name: "ESLint", level: 85, icon: "🛡️" },
      { name: "Prettier", level: 90, icon: "✨" },
    ],
  },
];

// ----------------------------------------------------
// Reusable Skill Bar (premium micro‑animation)
// ----------------------------------------------------
const SkillBar = ({
  name,
  level,
  icon,
  index,
}: {
  name: string;
  level: number;
  icon: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, x: -20 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true, margin: "-40px" }}
    transition={{ duration: 0.35, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
    className="flex items-center gap-3 group"
  >
    {/* Icon */}
    <div className="w-8 h-8 rounded-lg bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.06] dark:border-white/[0.06] flex items-center justify-center text-sm shrink-0 group-hover:scale-110 transition-transform">
      {icon}
    </div>

    {/* Name + Progress */}
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs sm:text-sm font-medium text-black/80 dark:text-white/80 truncate">
          {name}
        </span>
        <span className="text-[10px] font-mono text-black/40 dark:text-white/40 ml-2">
          {level}%
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-black/[0.05] dark:bg-white/[0.05] overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 + index * 0.04, ease: "easeOut" }}
          className="h-full rounded-full bg-gradient-to-r from-black/30 to-black dark:from-white/40 dark:to-white/20"
        />
      </div>
    </div>
  </motion.div>
);

// ----------------------------------------------------
// Main Skills Component
// ----------------------------------------------------
export default function Skills() {
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="skills"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      {/* Section Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="mb-12"
      >
        <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 inline-block" />
          Technical Expertise
        </span>
        <h2
          className="font-black tracking-tight leading-none text-black dark:text-white"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(40px, 6vw, 58px)",
          }}
        >
          Skills <span className="text-black/30 dark:text-white/30">&</span>{" "}
          <span className="text-black/30 dark:text-white/30">Tools.</span>
        </h2>
      </motion.div>

      {/* Skills Cards Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {skillGroups.map((group) => (
          <motion.div
            key={group.title}
            variants={itemVariants}
            className="rounded-2xl border border-black/[0.07] dark:border-white/[0.07] bg-black/[0.02] dark:bg-white/[0.02] p-6 lg:p-8 hover:border-black/15 dark:hover:border-white/15 transition-colors group/card"
          >
            {/* Group Header */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-black dark:text-white mb-1">
                {group.title}
              </h3>
              <p className="text-xs text-black/50 dark:text-white/50 leading-relaxed">
                {group.description}
              </p>
            </div>

            {/* Skill Bars */}
            <div className="space-y-5">
              {group.skills.map((skill, idx) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  icon={skill.icon}
                  index={idx}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Subtle footer note */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.8 }}
        className="mt-10 text-center text-[11px] text-black/25 dark:text-white/25 font-mono"
      >
        [ Continuously expanding my stack with the latest tools & best practices ]
      </motion.p>
    </section>
  );
}