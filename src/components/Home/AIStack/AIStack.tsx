"use client";
import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Compass,
  Layers,
  Code2,
  Bug,
  RotateCcw,
  TestTube2,
  FileText,
  Rocket,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Cpu,
  Zap,
} from "lucide-react";

export default function AIStack() {
  const workflowStages = [
    {
      step: "01",
      title: "Plan & Research",
      icon: Compass,
      desc: "Explore implementation approaches, evaluate architectural patterns, and analyze library dependencies before writing code.",
    },
    {
      step: "02",
      title: "Architecture",
      icon: Layers,
      desc: "Design API endpoints, database schemas, microservice boundaries, and system integration strategies.",
    },
    {
      step: "03",
      title: "Development",
      icon: Code2,
      desc: "Accelerate feature implementation while keeping code clean, modular, typed, and adhering to modern standards.",
    },
    {
      step: "04",
      title: "Debugging",
      icon: Bug,
      desc: "Investigate stack traces, isolate edge-case failures, trace data flows, and rapidly evaluate potential fixes.",
    },
    {
      step: "05",
      title: "Refactoring",
      icon: RotateCcw,
      desc: "Enhance code readability, decouple monolithic functions, improve performance, and enforce SOLID principles.",
    },
    {
      step: "06",
      title: "Testing",
      icon: TestTube2,
      desc: "Generate unit, integration, and E2E test scenarios while validating boundaries and potential error states.",
    },
    {
      step: "07",
      title: "Documentation",
      icon: FileText,
      desc: "Draft clear API specifications, inline code comments, deployment guides, and maintainable project documentation.",
    },
    {
      step: "08",
      title: "Delivery & CI/CD",
      icon: Rocket,
      desc: "Automate build checks, streamline release notes, optimize bundle sizes, and verify production deployment health.",
    },
  ];

  const toolkit = [
    { name: "Cursor", role: "IDE AI Partner", icon: "/cursor-app-icon.png" },
    { name: "DeepSeek", role: "Logic & Deep Analysis", icon: "/deepseek-logo-icon.png" },
    { name: "Windsurf", role: "Contextual Code Agent", icon: "/Windsurf.png" },
    { name: "Antigravity SDK", role: "Agentic Engineering Layer", icon: "/antigravity-logo.png" },
    { name: "Grok", role: "Real-time Reasoning", icon: "/grok.png" },
    { name: "Trae AI", role: "Adaptive IDE Agent", icon: "/trae.jpg" },
  ];

  const valueAdds = [
    { label: "Complex Debugging", desc: "Isolate obscure runtime bugs & race conditions" },
    { label: "API & Backend Architecture", desc: "Design REST/GraphQL schemas & microservices" },
    { label: "Code Refactoring", desc: "Enforce SOLID principles & clean abstractions" },
    { label: "Test Generation & Edge Cases", desc: "Comprehensive unit/integration coverage" },
    { label: "Technical Documentation", desc: "Auto-generate API references & architecture notes" },
    { label: "Developer Workflow Automation", desc: "Streamline routine tasks & CI/CD pipelines" },
  ];

  return (
    <section id="ai-assisted-dev" className="mb-20 sm:mb-24 scroll-mt-24">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="mb-12 flex flex-col items-center sm:items-start text-center sm:text-left space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-200/80 bg-orange-50/80 text-[#FF6014] text-xs font-black shadow-sm">
          <Sparkles className="w-3.5 h-3.5 text-[#FF6014]" />
          <span>AI ENGINEERING WORKFLOW</span>
        </div>

        <h2 className="text-[32px] sm:text-[40px] md:text-[46px] font-black tracking-tight leading-tight text-slate-900">
          AI-Powered <span className="text-[#FF6014]">Engineering Workflow</span>
        </h2>

        <p className="text-base sm:text-lg text-slate-800 leading-[1.75] font-medium max-w-3xl">
          Leveraging AI as an advanced productivity layer to accelerate software development, conduct root-cause debugging, optimize system architecture, and deliver production-ready code faster.
        </p>
      </motion.div>

      {/* Main Content Layout */}
      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: 8-Stage Engineering Workflow */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between px-1 mb-2">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Terminal className="w-4 h-4 text-[#FF6014]" />
              Structured 8-Stage Development Pipeline
            </h3>
            <span className="text-xs font-bold text-slate-700 bg-slate-100 px-3 py-1 rounded-full border border-slate-200">
              End-to-End Delivery
            </span>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {workflowStages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <motion.div
                  key={stage.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.05 }}
                  whileHover={{ y: -4, scale: 1.01 }}
                  className="p-5 rounded-2xl border border-slate-200/90 bg-white hover:border-orange-300 transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-orange-500/5 group text-left relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-50/80 border border-orange-200/80 flex items-center justify-center text-[#FF6014] group-hover:bg-[#FF6014] group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-black text-slate-700 font-mono">
                      STAGE {stage.step}
                    </span>
                  </div>

                  <h4 className="text-base font-black text-slate-900 mb-1.5 group-hover:text-[#FF6014] transition-colors">
                    {stage.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium text-justify">
                    {stage.desc}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Toolkit & Ownership Guarantee */}
        <div className="lg:col-span-4 space-y-6">
          {/* AI Engineering Toolkit Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md hover:border-orange-300 transition-all duration-300 text-left space-y-4 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#FF6014]" />
                AI Engineering Toolkit
              </h3>
              <span className="w-2 h-2 rounded-full bg-[#FF6014] animate-pulse" />
            </div>

            <div className="space-y-2.5">
              {toolkit.map((tool) => (
                <motion.div
                  key={tool.name}
                  whileHover={{ x: 4 }}
                  className="flex items-center justify-between p-3 rounded-xl bg-slate-50/80 border border-slate-100 hover:border-orange-300 hover:bg-orange-50/40 transition-all cursor-default group/item"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 p-1 flex items-center justify-center shrink-0 shadow-2xs group-hover/item:scale-110 group-hover/item:border-orange-300 transition-all">
                      <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain rounded" />
                    </div>
                    <span className="text-sm font-bold text-slate-900 group-hover/item:text-[#FF6014] transition-colors truncate">{tool.name}</span>
                  </div>
                  <span className="text-[10px] font-extrabold text-slate-800 bg-white px-2 py-1 rounded-md border border-slate-200/80 shrink-0 ml-2 shadow-2xs">
                    {tool.role}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Ownership & Authenticity Statement Card */}
          <motion.div
            whileHover={{ y: -3 }}
            className="p-6 rounded-2xl border border-orange-200/90 bg-orange-50/40 text-left space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
          >
            <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6014]" />
            <div className="flex items-center gap-2 text-[#FF6014]">
              <ShieldCheck className="w-5 h-5 shrink-0" />
              <span className="text-xs font-black uppercase tracking-wider text-slate-900">
                Engineering Ownership
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium text-justify">
              AI serves strictly as a productivity assistant and force multiplier. I maintain complete architectural responsibility, code validation, security review, and technical decision-making for all shipped software.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Bottom Area: Where AI Adds Value */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-10 p-6 sm:p-8 rounded-2xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all text-left space-y-4 relative overflow-hidden group"
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <h3 className="text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
              <Zap className="w-5 h-5 text-[#FF6014]" />
              Where AI Adds Maximum Value
            </h3>
            <p className="text-xs sm:text-sm text-slate-700 font-medium">
              Practical software engineering impact areas in modern production workflows.
            </p>
          </div>
          <span className="text-xs font-bold text-[#FF6014] bg-orange-50 px-3.5 py-1.5 rounded-xl border border-orange-200/90 shrink-0 shadow-2xs">
            High Efficiency &amp; Quality
          </span>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 pt-2">
          {valueAdds.map((item) => (
            <motion.div
              key={item.label}
              whileHover={{ y: -2, scale: 1.01 }}
              className="p-3.5 rounded-xl bg-slate-50/80 border border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/30 transition-all shadow-2xs group/val"
            >
              <div className="flex items-center gap-2 text-slate-900 font-bold text-sm mb-1 group-hover/val:text-[#FF6014] transition-colors">
                <CheckCircle2 className="w-4 h-4 text-[#FF6014] shrink-0" />
                <span>{item.label}</span>
              </div>
              <p className="text-xs text-slate-700 font-medium text-justify pl-6">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}