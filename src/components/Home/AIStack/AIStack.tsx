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

  const supportingTools = ["Cursor AI", "DeepSeek", "Grok", "Windsurf", "Claude Code"];

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
        className="p-6 sm:p-8 rounded-2xl border border-indigo-200/80 bg-gradient-to-br from-indigo-50/60 via-white to-violet-50/50 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 shadow-sm"
      >
        <div className="space-y-3 max-w-2xl text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/10 text-indigo-600 text-xs font-bold shadow-xs">
            <Cpu className="w-3.5 h-3.5 text-indigo-600" />
            <span>Modern AI Engineering Workflow</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            AI-Assisted <span className="text-indigo-600">Development</span>
          </h3>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium">
            Leveraging modern AI-assisted engineering tools to accelerate debugging, refactoring, code quality checks, and technical documentation—enabling faster delivery of robust production software.
          </p>

          <div className="flex flex-wrap gap-x-4 gap-y-2 pt-1">
            {capabilities.map((cap) => (
              <span key={cap} className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                {cap}
              </span>
            ))}
          </div>
        </div>

        <div className="w-full lg:w-auto p-4 rounded-xl bg-white border border-indigo-100 text-left shrink-0 space-y-2 min-w-[240px] shadow-xs">
          <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 block font-mono">
            Supporting AI Toolset
          </span>
          <div className="flex flex-wrap gap-1.5">
            {supportingTools.map((tool) => (
              <span
                key={tool}
                className="px-2.5 py-1 rounded-md bg-indigo-50/70 border border-indigo-100 text-xs font-bold text-indigo-700"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}