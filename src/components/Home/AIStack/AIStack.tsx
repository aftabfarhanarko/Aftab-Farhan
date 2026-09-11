"use client";
import React from "react";
import { motion } from "framer-motion";
import { Cpu, CheckCircle2 } from "lucide-react";

export default function AIStack() {
  const capabilities = [
    "Development Productivity & Speed",
    "Deep Debugging & Root Cause Analysis",
    "Code Refactoring & Architecture Design",
    "Technical Documentation & Testing Assistance",
    "Rapid Prototyping & Workflow Automation",
  ];

  const supportingTools = [
    { name: "Cursor AI", icon: "https://raw.githubusercontent.com/getcursor/cursor/main/assets/icon.png" },
    { name: "Claude Code", icon: "https://svg.art/svg/claude.svg" },
    { name: "DeepSeek", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "Windsurf", icon: "" },
    { name: "Antigravity SDK", icon: "" },
  ];

  return (
    <section
      id="ai-assisted-dev"
      className="mb-16 sm:mb-20 scroll-mt-24"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="p-6 sm:p-8 rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm hover:shadow-md transition-all duration-300"
      >
        <div className="space-y-3.5 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 text-xs font-bold tracking-wide">
            <Cpu className="w-3.5 h-3.5 text-indigo-600 animate-pulse" />
            <span>Modern AI Engineering Workflow</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI-Assisted <span className="text-indigo-600">Development</span>
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Leveraging modern AI-assisted engineering tools to accelerate debugging, refactoring, code quality checks, and technical documentation—enabling faster delivery of robust production software.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
            {capabilities.map((cap, idx) => (
              <motion.span
                key={cap}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.08 }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700 bg-white/80 px-2.5 py-1 rounded-lg border border-slate-200/60 shadow-xs"
              >
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                {cap}
              </motion.span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto p-4 rounded-xl bg-white border border-indigo-100 text-left shrink-0 space-y-2.5 min-w-[250px] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block font-mono">
            Supporting AI Toolset
          </span>
          <div className="flex flex-wrap gap-2">
            {supportingTools.map((tool, idx) => (
              <motion.div
                key={tool.name}
                whileHover={{ scale: 1.04, y: -1 }}
                transition={{ duration: 0.2 }}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-50/70 border border-indigo-100 text-xs font-bold text-indigo-700 shadow-xs cursor-default"
              >
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping inline-block shrink-0" />
                <span>{tool.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}