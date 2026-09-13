"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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
  Activity,
  ArrowRight,
  Bot,
  Gauge,
  Workflow,
} from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIStack() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const mainPathRef = useRef<SVGPathElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const workflowStages = [
    {
      step: "01",
      title: "Plan & Research",
      icon: Compass,
      tool: "DeepSeek R1 & Grok",
      howIWork: "Evaluate architectural tradeoffs, assess dependency compatibility, and formulate systematic technical design plans prior to implementation.",
      aiRole: "Requirement Analysis & Tech Stack Evaluation",
      x: 80,
      y: 70,
    },
    {
      step: "02",
      title: "Architecture",
      icon: Layers,
      tool: "Antigravity SDK & DeepSeek",
      howIWork: "Draft relational & NoSQL schemas, model REST/GraphQL endpoints, and map decoupled microservice boundary contracts.",
      aiRole: "System Schema & API Endpoint Modeling",
      x: 280,
      y: 70,
    },
    {
      step: "03",
      title: "Development",
      icon: Code2,
      tool: "Cursor IDE & Windsurf Agent",
      howIWork: "Accelerate feature implementation using context-aware agentic coding, automated boilerplate generation, and type-safe completions.",
      aiRole: "Context-Aware Agentic Coding",
      x: 480,
      y: 70,
    },
    {
      step: "04",
      title: "Debugging",
      icon: Bug,
      tool: "Trae AI & Cursor Debugger",
      howIWork: "Analyze complex stack traces, trace memory leaks, diagnose async race conditions, and rapidly isolate root-cause failures.",
      aiRole: "Log Analysis & Root Cause Isolation",
      x: 680,
      y: 70,
    },
    {
      step: "05",
      title: "Refactoring",
      icon: RotateCcw,
      tool: "Cursor & DeepSeek",
      howIWork: "Deconstruct monolithic routines, enforce SOLID object-oriented principles, eliminate code smells, and optimize memory efficiency.",
      aiRole: "SOLID Abstraction & Performance Tuning",
      x: 680,
      y: 190,
    },
    {
      step: "06",
      title: "Testing",
      icon: TestTube2,
      tool: "Antigravity Agent SDK",
      howIWork: "Generate unit, integration, and E2E regression test suites while validating edge-case boundary parameters.",
      aiRole: "Automated Unit & E2E Test Suite",
      x: 480,
      y: 190,
    },
    {
      step: "07",
      title: "Documentation",
      icon: FileText,
      tool: "Cursor & Antigravity",
      howIWork: "Synthesize comprehensive OpenAPI specs, inline TypeScript docstrings, and maintainable architectural design references.",
      aiRole: "API Spec & Technical Documentation",
      x: 280,
      y: 190,
    },
    {
      step: "08",
      title: "Delivery & CI/CD",
      icon: Rocket,
      tool: "Antigravity SDK & GitHub Actions",
      howIWork: "Automate build checks, streamline release notes generation, optimize bundle distribution, and verify production deployment health.",
      aiRole: "CI/CD Pipeline & Production Check",
      x: 80,
      y: 190,
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

  // GSAP Real-Life Dynamic Motion Animations (Primary Orange Palette)
  useEffect(() => {
    if (!svgRef.current || !mainPathRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const pathEl = mainPathRef.current!;
      const pathLength = pathEl.getTotalLength();

      // 1. Initial SVG Line Draw on Scroll
      gsap.set(pathEl, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
      });

      gsap.to(pathEl, {
        strokeDashoffset: 0,
        duration: 1.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        },
      });

      // 2. Animated Flowing Dashed Signal Line
      const flowDash = svgRef.current?.querySelector(".flowing-dash-line");
      if (flowDash) {
        gsap.to(flowDash, {
          strokeDashoffset: -200,
          duration: 3,
          repeat: -1,
          ease: "none",
        });
      }

      // 3. Real-Life Energy Particles Traveling Along SVG Path (Primary Orange Colors)
      const particleElements = svgRef.current?.querySelectorAll(".path-energy-particle");
      particleElements?.forEach((particle, idx) => {
        const progressObj = { progress: idx * 0.25 }; // Staggered starting points

        gsap.to(progressObj, {
          progress: "+=1",
          duration: 4.5,
          repeat: -1,
          ease: "none",
          onUpdate: () => {
            const currentProgress = progressObj.progress % 1;
            const pt = pathEl.getPointAtLength(currentProgress * pathLength);
            particle.setAttribute("cx", String(pt.x));
            particle.setAttribute("cy", String(pt.y));
          },
        });
      });

      // 4. Stagger animate SVG Nodes scale in
      gsap.from(".svg-workflow-node", {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
        stagger: 0.08,
        duration: 0.6,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // 5. Auto stage loop timer
      const interval = setInterval(() => {
        setActiveStageIdx((prev) => (prev + 1) % workflowStages.length);
      }, 4500);

      return () => clearInterval(interval);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activeStage = workflowStages[activeStageIdx];
  const ActiveIcon = activeStage.icon;

  return (
    <section id="ai-assisted-dev" ref={containerRef} className="mb-20 sm:mb-24 scroll-mt-24 w-full">
      {/* Section Header */}
      <SectionHeader
        badge="AI ENGINEERING WORKFLOW"
        titlePrefix="AI Tooling &"
        titleHighlight="Workflow Integration"
        subtitle="Accelerating production output using modern generative AI tools and automated developer workflows."
        align="left"
        icon={Sparkles}
      />

      {/* FREESTANDING GSAP ANIMATED SVG WORKFLOW (PRIMARY ORANGE BRAND PALETTE) */}
      <div className="mb-10 w-full text-left">
        {/* Top Status Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6014] shadow-2xs">
              <Workflow className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Automated 8-Stage Engineering Circuit
                <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF6014] border border-orange-200 text-[10px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF6014] animate-ping" />
                  REAL-TIME GSAP MOTION
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-semibold">
                Select any node in the circuit to observe real-time data flow mechanics.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-2xs">
            <Bot className="w-4 h-4 text-[#FF6014]" />
            <span className="text-xs font-mono font-bold text-slate-700">
              Active Stage: <span className="text-[#FF6014] font-black">{activeStage.step} - {activeStage.title}</span>
            </span>
          </div>
        </div>

        {/* Freestanding SVG Circuit Canvas with Primary Orange Palette */}
        <div className="w-full overflow-x-auto custom-scrollbar pb-2">
          <div className="min-w-[760px] relative">
            <svg
              ref={svgRef}
              viewBox="0 0 760 260"
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                {/* SVG Glow Filters - Primary Orange */}
                <filter id="glow-orange-particle" x="-50%" y="-50%" width="200%" height="200%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                <filter id="glow-orange-path" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="4" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>

                {/* Primary Orange Brand Gradient */}
                <linearGradient id="brandOrangeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6014" />
                  <stop offset="35%" stopColor="#FF8A00" />
                  <stop offset="70%" stopColor="#EA580C" />
                  <stop offset="100%" stopColor="#FF6014" />
                </linearGradient>
              </defs>

              {/* 1. Underlying Base Track */}
              <path
                d="M 80,70 L 280,70 L 480,70 L 680,70 C 750,70 750,190 680,190 L 480,190 L 280,190 L 80,190"
                fill="none"
                stroke="#F1F5F9"
                strokeWidth="6"
                strokeLinecap="round"
              />

              {/* 2. Main Primary Orange Gradient Path */}
              <path
                ref={mainPathRef}
                d="M 80,70 L 280,70 L 480,70 L 680,70 C 750,70 750,190 680,190 L 480,190 L 280,190 L 80,190"
                fill="none"
                stroke="url(#brandOrangeGradient)"
                strokeWidth="4"
                strokeLinecap="round"
                filter="url(#glow-orange-path)"
              />

              {/* 3. Flowing Dashed Signal Line */}
              <path
                className="flowing-dash-line"
                d="M 80,70 L 280,70 L 480,70 L 680,70 C 750,70 750,190 680,190 L 480,190 L 280,190 L 80,190"
                fill="none"
                stroke="#FFFFFF"
                strokeWidth="2.5"
                strokeDasharray="10 14"
                strokeLinecap="round"
                opacity="0.9"
              />

              {/* 4. Real-Life Energy Particles (Primary Orange & Amber Accents) */}
              <circle
                className="path-energy-particle"
                r="7.5"
                fill="#FF6014"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="url(#glow-orange-particle)"
              />
              <circle
                className="path-energy-particle"
                r="7.5"
                fill="#FF8A00"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="url(#glow-orange-particle)"
              />
              <circle
                className="path-energy-particle"
                r="7.5"
                fill="#EA580C"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="url(#glow-orange-particle)"
              />
              <circle
                className="path-energy-particle"
                r="7.5"
                fill="#FF6014"
                stroke="#FFFFFF"
                strokeWidth="2"
                filter="url(#glow-orange-particle)"
              />

              {/* 5. SVG Stage Nodes */}
              {workflowStages.map((stage, idx) => {
                const isActive = activeStageIdx === idx;

                return (
                  <g
                    key={stage.step}
                    className="svg-workflow-node cursor-pointer group/node"
                    onClick={() => setActiveStageIdx(idx)}
                    onMouseEnter={() => setActiveStageIdx(idx)}
                  >
                    {/* Active Primary Orange Ripple Waves */}
                    {isActive && (
                      <>
                        <circle
                          cx={stage.x}
                          cy={stage.y}
                          r="34"
                          fill="none"
                          stroke="#FF6014"
                          strokeWidth="2.5"
                          className="animate-ping opacity-60"
                        />
                        <circle
                          cx={stage.x}
                          cy={stage.y}
                          r="42"
                          fill="none"
                          stroke="#FF8A00"
                          strokeWidth="1.5"
                          className="animate-pulse opacity-40"
                        />
                      </>
                    )}

                    {/* Outer Node Ring */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r="26"
                      fill={isActive ? "#FF6014" : "#FFFFFF"}
                      stroke={isActive ? "#FF6014" : "#CBD5E1"}
                      strokeWidth={isActive ? "3" : "2"}
                      filter={isActive ? "url(#glow-orange-particle)" : undefined}
                      className="transition-all duration-300 group-hover/node:stroke-[#FF6014] group-hover/node:scale-110 shadow-md"
                    />

                    {/* Inner Node Disc */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r="18"
                      fill={isActive ? "#FFFFFF" : "#F8FAFC"}
                    />

                    {/* Stage Step Number */}
                    <text
                      x={stage.x}
                      y={stage.y + 4}
                      textAnchor="middle"
                      fill={isActive ? "#FF6014" : "#64748B"}
                      fontSize="11"
                      fontWeight="900"
                      fontFamily="monospace"
                      className="pointer-events-none"
                    >
                      {stage.step}
                    </text>

                    {/* Stage Title Text */}
                    <text
                      x={stage.x}
                      y={stage.y > 120 ? stage.y - 34 : stage.y + 44}
                      textAnchor="middle"
                      fill={isActive ? "#FF6014" : "#1E293B"}
                      fontSize="11"
                      fontWeight={isActive ? "900" : "700"}
                      className="transition-colors duration-300 pointer-events-none"
                    >
                      {stage.title}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Dynamic Detail Spotlight Box */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 rounded-2xl glass-card-primary grid md:grid-cols-12 gap-6 items-center shadow-xs"
          >
            {/* Left Info Column */}
            <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-slate-100 pb-4 md:pb-0 md:pr-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FF6014] text-white flex items-center justify-center shrink-0 shadow-md">
                  <ActiveIcon size={20} />
                </div>
                <div>
                  <span className="text-[11px] font-mono font-black text-[#FF6014] uppercase tracking-widest block">
                    STAGE {activeStage.step} PIPELINE
                  </span>
                  <h4 className="text-lg font-black text-slate-900 leading-tight">
                    {activeStage.title}
                  </h4>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-orange-50/60 border border-orange-200/80 text-xs font-bold text-slate-800 shadow-2xs">
                <Cpu size={14} className="text-[#FF6014]" />
                <span>AI Tool: <strong className="text-[#FF6014]">{activeStage.tool}</strong></span>
              </div>
            </div>

            {/* Right Work Mechanism Description */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FF6014]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
                  Engineering Integration &amp; Workflow Mechanics:
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed text-justify">
                {activeStage.howIWork}
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-extrabold text-emerald-600">
                <ShieldCheck size={15} />
                <span>Primary Focus: {activeStage.aiRole}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stage Navigation Pills */}
        <div className="mt-6 pt-4 border-t border-slate-200/80 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            Quick Stage Selector:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {workflowStages.map((st, i) => (
              <button
                key={st.step}
                onClick={() => setActiveStageIdx(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  activeStageIdx === i
                    ? "bg-[#FF6014] text-white border-[#FF6014] shadow-xs"
                    : "glass-card-compact text-slate-700 hover:border-orange-200 hover:text-[#FF6014]"
                }`}
              >
                {st.step}. {st.title}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* AI TOOLKIT ROW & OWNERSHIP STATEMENT */}
      <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: AI Engineering Toolkit */}
        <motion.div
          whileHover={{ y: -3 }}
          className="lg:col-span-8 p-6 rounded-3xl glass-card-primary shadow-sm hover:shadow-md transition-all text-left space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FF6014]" />
              AI Engineering Toolkit &amp; IDE Integration
            </h3>
            <span className="text-xs font-bold text-[#FF6014] bg-orange-50 border border-orange-200 px-3 py-1 rounded-full">
              Production Force Multiplier
            </span>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {toolkit.map((tool) => (
              <motion.div
                key={tool.name}
                whileHover={{ y: -2 }}
                className="flex items-center gap-3 p-3 rounded-2xl glass-card-compact hover:border-orange-300 transition-all"
              >
                <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 p-1.5 flex items-center justify-center shrink-0 shadow-2xs">
                  <img src={tool.icon} alt={tool.name} className="w-full h-full object-contain rounded" />
                </div>
                <div>
                  <h5 className="text-sm font-black text-slate-900">{tool.name}</h5>
                  <p className="text-[10px] font-bold text-[#FF6014] uppercase tracking-wider">{tool.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Right: Engineering Ownership Guarantee */}
        <motion.div
          whileHover={{ y: -3 }}
          className="lg:col-span-4 p-6 rounded-3xl glass-card-featured text-left space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
        >
          <div className="absolute top-0 left-0 w-1.5 h-full bg-[#FF6014]" />
          <div className="flex items-center gap-2 text-[#FF6014]">
            <ShieldCheck className="w-5 h-5 shrink-0" />
            <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
              Engineering Ownership
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium text-justify">
            AI serves strictly as a productivity assistant and force multiplier. I maintain complete architectural responsibility, code validation, security review, and technical decision-making for all shipped software.
          </p>
        </motion.div>
      </div>
    </section>
  );
}