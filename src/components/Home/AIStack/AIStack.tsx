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
} from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AIStack() {
  const [activeStageIdx, setActiveStageIdx] = useState<number>(0);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const workflowStages = [
    {
      step: "01",
      title: "Plan & Research",
      icon: Compass,
      tool: "DeepSeek & Grok",
      howIWork: "আমি নতুন ফিচার বা প্রজেক্ট শুরু করার আগে লাইব্রেরি ডিপেনডেন্সি, আর্কিটেকচারাল প্যারামিটার এবং লজিক্যাল এপ্রোচ এনালিসিস করার জন্য AI রিকনসিলিয়েশন ব্যবহার করি।",
      aiRole: "Requirement Analysis & Tech Stack Evaluation",
      x: 80,
      y: 70,
    },
    {
      step: "02",
      title: "Architecture",
      icon: Layers,
      tool: "Antigravity SDK & DeepSeek",
      howIWork: "ডেটাবেস স্কিমা, REST/GraphQL API এন্ডপয়েন্ট মডেলিং এবং মাইক্রোসার্ভিস বাাউন্ডারি ডিজাইন AI-এর মাধ্যমে মাল্টি-মডেল ড্রাফটিং করে ভ্যালিডেট করি।",
      aiRole: "System Schema & API Endpoint Design",
      x: 280,
      y: 70,
    },
    {
      step: "03",
      title: "Development",
      icon: Code2,
      tool: "Cursor & Windsurf",
      howIWork: "ক্লিন এবং টাইপড (TypeScript/React) কোড লেখার জন্য Context-aware AI এজেন্টের সাহায্যে বয়লারপ্লেট জেনারেশন ও রিয়েল-টাইম অটো-কমপ্লিশন ব্যবহার করি।",
      aiRole: "Context-Aware Agentic Coding",
      x: 480,
      y: 70,
    },
    {
      step: "04",
      title: "Debugging",
      icon: Bug,
      tool: "Trae AI & Cursor",
      howIWork: "স্ট্যাক ট্রেস, অবস্কিউর রানটাইম ফেলিউর এবং মেমোরি লিক ডিটেক্ট করার জন্য AI লগ ইন্টারপ্রেট করে দ্রুত রুট কজ (Root Cause) আইসোলেট করি।",
      aiRole: "Log Analysis & Root Cause Isolation",
      x: 680,
      y: 70,
    },
    {
      step: "05",
      title: "Refactoring",
      icon: RotateCcw,
      tool: "Cursor & DeepSeek",
      howIWork: "মনোলিথিক ফাংশন ডিকুপল করা, SOLID নীতি প্রয়োগ করা এবং পারফর্ম্যান্স অপটিমাইজেশনের জন্য AI-অ্যাসিস্টেড রিকনস্ট্রাকশন করি।",
      aiRole: "SOLID Abstraction & Performance Tuning",
      x: 680,
      y: 190,
    },
    {
      step: "06",
      title: "Testing",
      icon: TestTube2,
      tool: "Antigravity Agent",
      howIWork: "ইউনিট টেস্ট, ইন্টিগ্রেশন টেস্ট এবং এজ-কেস বাউন্ডারি ভ্যালিডেশন স্কেল করার জন্য অটোমেটেড টেস্ট কেস ডকস তৈরি করি।",
      aiRole: "Automated Unit & E2E Test Suite",
      x: 480,
      y: 190,
    },
    {
      step: "07",
      title: "Documentation",
      icon: FileText,
      tool: "Cursor & Antigravity",
      howIWork: "এপিআই স্পেসিফিকেশন, ইনলাইন টাইপস এবং মেইনটেনেবল আর্কিটেকচারাল রিডমি (README) ডকুমেন্টেশন AI এর সাহায্যে অটো জেনারেট করি।",
      aiRole: "API Spec & Technical Documentation",
      x: 280,
      y: 190,
    },
    {
      step: "08",
      title: "Delivery & CI/CD",
      icon: Rocket,
      tool: "Antigravity SDK & GitHub Actions",
      howIWork: "বিল্ড ভ্যালিডেশন, রিলিজ নোটস সামারি এবং প্রডাকশন ডিপ্লয়মেন্ট হেলথ চেক অটোমেটেড পাইপলাইনের মাধ্যমে সুনিশ্চিত করি।",
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

  // GSAP Animations setup
  useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Animate SVG Path Lines drawing on scroll
      const paths = svgRef.current?.querySelectorAll(".workflow-path");
      paths?.forEach((path) => {
        const p = path as SVGPathElement;
        const length = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(p, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        });
      });

      // 2. Animate GSAP Pulse Dots along the line continuously
      const pulses = svgRef.current?.querySelectorAll(".path-pulse");
      pulses?.forEach((pulse) => {
        gsap.to(pulse, {
          strokeDashoffset: -240,
          duration: 3.2,
          repeat: -1,
          ease: "none",
        });
      });

      // 3. Stagger animate SVG Nodes scale in
      gsap.from(".svg-workflow-node", {
        scale: 0,
        opacity: 0,
        transformOrigin: "center center",
        stagger: 0.08,
        duration: 0.5,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 75%",
        },
      });

      // 4. Auto stage loop timer
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

      {/* WHITE BACKGROUND PURE SVG GSAP WORKFLOW CARD */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="p-6 sm:p-8 md:p-10 rounded-3xl bg-white border border-slate-200/90 text-slate-900 shadow-xl relative overflow-hidden group text-left"
      >
        {/* Subtle Ambient Background Gradient */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Top Header Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-5 border-b border-slate-100 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-orange-50 border border-orange-200/80 flex items-center justify-center text-[#FF6014] shadow-xs">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                Automated 8-Stage AI Engineering Circuit
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 text-[10px] font-mono font-black uppercase tracking-wider">
                  LIVE PIPELINE
                </span>
              </h3>
              <p className="text-xs text-slate-500 font-bold mt-0.5">
                Click or hover any node in the SVG diagram to inspect how I work with AI at each stage.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-50 border border-slate-200/80 px-4 py-2 rounded-2xl shadow-2xs">
            <Bot className="w-4 h-4 text-[#FF6014]" />
            <span className="text-xs font-mono font-bold text-slate-700">
              Active Stage: <span className="text-[#FF6014] font-black">{activeStage.step} - {activeStage.title}</span>
            </span>
          </div>
        </div>

        {/* SVG Circuit Diagram Frame */}
        <div className="w-full overflow-x-auto custom-scrollbar pb-4 relative z-10">
          <div className="min-w-[760px] relative">
            <svg
              ref={svgRef}
              viewBox="0 0 760 260"
              className="w-full h-auto overflow-visible select-none"
            >
              <defs>
                {/* SVG Glow Filters */}
                <filter id="glow-orange-light" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="5" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <filter id="glow-node-light" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="6" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <linearGradient id="pathGradientLight" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#FF6014" />
                  <stop offset="50%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#FF6014" />
                </linearGradient>
              </defs>

              {/* Connecting Track (Background) */}
              <path
                d="M 80,70 L 280,70 L 480,70 L 680,70 C 750,70 750,190 680,190 L 480,190 L 280,190 L 80,190"
                fill="none"
                stroke="#E2E8F0"
                strokeWidth="5"
                strokeLinecap="round"
              />

              {/* Animated GSAP Gradient Track */}
              <path
                className="workflow-path"
                d="M 80,70 L 280,70 L 480,70 L 680,70 C 750,70 750,190 680,190 L 480,190 L 280,190 L 80,190"
                fill="none"
                stroke="url(#pathGradientLight)"
                strokeWidth="3.5"
                strokeLinecap="round"
              />

              {/* Pulse Light Dot Running Along Circuit */}
              <path
                className="path-pulse"
                d="M 80,70 L 280,70 L 480,70 L 680,70 C 750,70 750,190 680,190 L 480,190 L 280,190 L 80,190"
                fill="none"
                stroke="#FF6014"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray="25 175"
                filter="url(#glow-orange-light)"
              />

              {/* SVG Stage Nodes */}
              {workflowStages.map((stage, idx) => {
                const isActive = activeStageIdx === idx;

                return (
                  <g
                    key={stage.step}
                    className="svg-workflow-node cursor-pointer group/node"
                    onClick={() => setActiveStageIdx(idx)}
                    onMouseEnter={() => setActiveStageIdx(idx)}
                  >
                    {/* Active Pulsing Ring */}
                    {isActive && (
                      <circle
                        cx={stage.x}
                        cy={stage.y}
                        r="32"
                        fill="none"
                        stroke="#FF6014"
                        strokeWidth="2.5"
                        className="animate-ping opacity-60"
                      />
                    )}

                    {/* Outer Circle Container */}
                    <circle
                      cx={stage.x}
                      cy={stage.y}
                      r="26"
                      fill={isActive ? "#FF6014" : "#FFFFFF"}
                      stroke={isActive ? "#FF6014" : "#CBD5E1"}
                      strokeWidth={isActive ? "3" : "2"}
                      filter={isActive ? "url(#glow-node-light)" : undefined}
                      className="transition-all duration-300 group-hover/node:stroke-[#FF6014] group-hover/node:scale-110 shadow-md"
                    />

                    {/* Inner Circle Disc */}
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

        {/* Dynamic Detail Spotlight Panel: How I Work With AI */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStage.step}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="mt-6 p-6 rounded-2xl bg-slate-50 border border-slate-200/90 grid md:grid-cols-12 gap-6 items-center shadow-xs"
          >
            {/* Left Column: Stage Info & AI Tool */}
            <div className="md:col-span-4 space-y-3 border-b md:border-b-0 md:border-r border-slate-200 pb-4 md:pb-0 md:pr-6">
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

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
                <Cpu size={14} className="text-[#FF6014]" />
                <span>AI Tool: <strong className="text-[#FF6014]">{activeStage.tool}</strong></span>
              </div>
            </div>

            {/* Right Column: How I Work Description */}
            <div className="md:col-span-8 space-y-2">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[#FF6014]" />
                <span className="text-xs font-black uppercase tracking-wider text-slate-900 font-mono">
                  আমি কিভাবে AI দিয়ে কাজ করি (Workflow Mechanics):
                </span>
              </div>
              <p className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed text-justify">
                {activeStage.howIWork}
              </p>
              <div className="pt-1 flex items-center gap-2 text-xs font-extrabold text-emerald-600">
                <ShieldCheck size={15} />
                <span>AI Role: {activeStage.aiRole}</span>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Stage Selector Pills */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider font-mono">
            Direct Stage Navigation:
          </span>
          <div className="flex items-center gap-1.5 flex-wrap">
            {workflowStages.map((st, i) => (
              <button
                key={st.step}
                onClick={() => setActiveStageIdx(i)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-all cursor-pointer border ${
                  activeStageIdx === i
                    ? "bg-[#FF6014] text-white border-[#FF6014] shadow-xs"
                    : "bg-slate-50 text-slate-700 border-slate-200 hover:bg-orange-50 hover:border-orange-200 hover:text-[#FF6014]"
                }`}
              >
                {st.step}. {st.title}
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* AI TOOLKIT GRID & OWNERSHIP GUARANTEE */}
      <div className="mt-8 grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: AI Engineering Toolkit */}
        <motion.div
          whileHover={{ y: -3 }}
          className="lg:col-span-8 p-6 rounded-3xl border border-slate-200/90 bg-white shadow-sm hover:shadow-md transition-all text-left space-y-4"
        >
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#FF6014]" />
              AI Engineering Toolkit & IDE Integration
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
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 border border-slate-200/80 hover:border-orange-300 hover:bg-orange-50/30 transition-all"
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
          className="lg:col-span-4 p-6 rounded-3xl border border-orange-200/90 bg-orange-50/50 text-left space-y-3 relative overflow-hidden shadow-sm hover:shadow-md transition-all"
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