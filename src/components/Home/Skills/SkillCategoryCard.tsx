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
  "Backend Development": "Engineering secure, scalable server-side systems and robust REST/gRPC APIs.",
  "Backend": "Engineering secure, scalable server-side systems and robust REST/gRPC APIs.",
  "Database": "Designing optimized relational schemas, indexes, and high-throughput query structures.",
  "Animation": "Creating smooth, physics-based micro-interactions and cinematic web experiences.",
  "Tools": "Managing development configurations, linters, bundlers, and compilation workflows.",
  "DevOps": "Automating containerized workloads, CI/CD pipelines, and cloud deployments.",
  "Mobile Development": "Building high-performance native and cross-platform mobile applications.",
  "Mobile": "Building high-performance native and cross-platform mobile applications.",
  "API Integration": "Connecting third-party services, webhooks, and secure authentication flows.",
  "API": "Connecting third-party services, webhooks, and secure authentication flows.",
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
  const { icon: Icon, accent } = getCategoryConfig(category.title);

  // States for 3D Tilt and Spotlight
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, show: false });

  const glowColor = {
    blue: "rgba(59,130,246,0.15)",
    green: "rgba(16,185,129,0.15)",
    amber: "rgba(245,158,11,0.15)",
    pink: "rgba(236,72,153,0.15)",
    purple: "rgba(139,92,246,0.15)",
    teal: "rgba(20,184,166,0.15)",
    default: "rgba(255,255,255,0.08)"
  }[accent] || "rgba(255,255,255,0.08)";

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate tilt angles (max 8 degrees)
    const tiltX = ((y - rect.height / 2) / (rect.height / 2)) * -8;
    const tiltY = ((x - rect.width / 2) / (rect.width / 2)) * 8;

    setTilt({ x: tiltX, y: tiltY });
    setSpotlight({ x, y, show: true });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setSpotlight({ x: 0, y: 0, show: false });
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
      whileHover={{
        borderColor: "rgba(255, 255, 255, 0.15)",
        boxShadow: `0 25px 50px -12px ${glowColor}`,
      }}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="group relative flex flex-col p-6 sm:p-7 rounded-[2.25rem] border border-white/[0.06] bg-[#0E0E10]/85 backdrop-blur-xl transition-all duration-300 min-h-[380px] overflow-hidden justify-between cursor-pointer"
    >
      {/* Moving Spotlight Gradient */}
      {spotlight.show && (
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            background: `radial-gradient(200px circle at ${spotlight.x}px ${spotlight.y}px, ${glowColor.replace("0.15", "0.1")}, transparent 80%)`,
          }}
        />
      )}

      {/* Sweep Shine Effect */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-[1200ms] ease-out pointer-events-none" />

      {/* Giant Rotating Watermark Icon in background */}
      <div
        className="absolute bottom-[-20px] right-[-20px] pointer-events-none select-none z-0 opacity-40 group-hover:opacity-75 transition-opacity duration-500"
        style={{
          transform: "translateZ(10px)",
          transformStyle: "preserve-3d"
        }}
      >
        <div style={{ animation: "spin 45s linear infinite" }}>
          <Icon 
            className="w-36 h-36 text-white/[0.02] group-hover:text-white/[0.04] transition-colors duration-500" 
            strokeWidth={0.8}
          />
        </div>
      </div>

      {/* Top Header Section */}
      <div className="relative z-10" style={{ transform: "translateZ(25px)", transformStyle: "preserve-3d" }}>
        
        {/* Category Icon Square Box with Spring Rotation */}
        <motion.div 
          whileHover={{ rotate: 360, scale: 1.1 }}
          transition={{ type: "spring", stiffness: 220, damping: 12 }}
          className="w-12 h-12 bg-white/[0.04] border border-white/[0.08] shadow-inner rounded-2xl flex items-center justify-center shrink-0 transition-all duration-300 relative overflow-hidden mb-6"
        >
          <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <Icon className="w-5 h-5 text-white/95 relative z-10" strokeWidth={1.8} />
        </motion.div>

        {/* Title and Description */}
        <div className="mb-6">
          <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight mb-2.5 group-hover:text-white transition-colors">
            {category.title}
          </h3>
          <p className="text-xs sm:text-[13px] text-white/40 leading-relaxed font-medium">
            {getCategoryDescription(category.title)}
          </p>
        </div>
      </div>

      {/* Skills pills — ENLARGED and highly legible */}
      <div 
        className="flex flex-wrap gap-2.5 mt-auto relative z-10" 
        style={{ transform: "translateZ(20px)", transformStyle: "preserve-3d" }}
      >
        {category.skills.map((skill, index) => (
          <motion.div
            key={skill.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 15,
              delay: index * 0.05
            }}
            whileHover={{ 
              scale: 1.06,
              y: -2,
              borderColor: "rgba(255, 255, 255, 0.2)",
              backgroundColor: "rgba(255, 255, 255, 0.06)",
            }}
            className="inline-flex items-center gap-3 px-4 py-2 rounded-2xl border border-white/[0.06] bg-white/[0.02] transition-colors duration-200 group/chip cursor-default"
          >
            {skill.imageUrl ? (
              /* Enlarged solid white container for high-visibility logo */
              <div className="w-8 h-8 rounded-xl overflow-hidden shrink-0 flex items-center justify-center bg-white p-1 shadow-[0_3px_8px_rgba(0,0,0,0.12)]">
                <img
                  src={skill.imageUrl}
                  alt={skill.name}
                  className="w-full h-full object-contain group-hover/chip:scale-105 transition-transform duration-200"
                />
              </div>
            ) : (
              <span className="w-2 h-2 rounded-full shrink-0 bg-white/40" />
            )}
            <span className="text-[13px] sm:text-[14px] font-bold text-white/80 group-hover/chip:text-white transition-colors">
              {skill.name}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
