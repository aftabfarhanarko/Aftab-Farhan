"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Layers,
  Terminal,
  Database,
  Code2,
  Sparkles,
  CheckCircle2,
  Activity,
  Cpu,
  Zap,
  Cpu as EngineIcon,
} from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const engineeringPrinciples = [
  {
    id: "01",
    title: "Domain Driven Arch",
    category: "System Design",
    icon: Layers,
    tool: "TypeScript & Microservices",
    description: "Architecting decoupled, domain-centric modules with strict boundaries and clean type safety across layers.",
    points: [
      "Strict separation of concerns across presentation, business logic, and API layers",
      "Decoupled microservices & clean modular structures for maintainable scaling",
      "Robust TypeScript contract definitions avoiding dynamic runtime type drift",
    ],
  },
  {
    id: "02",
    title: "High Performance",
    category: "Full Stack Precision",
    icon: Code2,
    tool: "Next.js & Node.js",
    description: "Delivering lightning-fast web applications with hybrid rendering, query indexing, and event loop optimization.",
    points: [
      "Server-side rendering (SSR) combined with incremental static regeneration (ISR)",
      "Optimized database queries with indexing, eager loading, and connection pooling",
      "Asynchronous background task processing & web-worker offloading",
    ],
  },
  {
    id: "03",
    title: "Data Integrity & Sec",
    category: "Database & Security",
    icon: Database,
    tool: "PostgreSQL & Prisma",
    description: "Guaranteeing ACID compliance, session security, strict validation, and automated fallback states under high concurrency.",
    points: [
      "ACID compliant transactions using PostgreSQL and Prisma ORM",
      "Automated fallback states, rate limiting, and strict input validation",
      "Secure authentication with NextAuth session management and RBAC security",
    ],
  },
  {
    id: "04",
    title: "CI/CD & Automation",
    category: "CI/CD Pipeline",
    icon: Terminal,
    tool: "Docker & GitHub Actions",
    description: "Automating quality gates, containerized environment parity, and zero-downtime production deployment pipelines.",
    points: [
      "Automated linting, formatting, typechecks, and regression testing",
      "Docker containerized environments ensuring seamless parity from dev to prod",
      "Vercel & Docker deployment pipelines with automated health checks",
    ],
  },
];

// Mathematically controlled Symmetric Bezier Paths for 4 Pillars
const branchPaths = [
  { id: 0, pathD: "M 370,160 C 310,160 300,70 250,70", endX: 250, endY: 70 },   // Top-Left (Pillar 01)
  { id: 1, pathD: "M 370,160 C 310,160 300,250 250,250", endX: 250, endY: 250 }, // Bottom-Left (Pillar 02)
  { id: 2, pathD: "M 530,160 C 590,160 600,70 650,70", endX: 650, endY: 70 },   // Top-Right (Pillar 03)
  { id: 3, pathD: "M 530,160 C 590,160 600,250 650,250", endX: 650, endY: 250 }, // Bottom-Right (Pillar 04)
];

export default function HowIEngineer() {
  const [activeStepIdx, setActiveStepIdx] = useState<number>(0);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    if (!containerRef.current || !svgRef.current) return;

    const ctx = gsap.context(() => {
      const paths = svgRef.current?.querySelectorAll(".technical-branch-path");

      // 1. GSAP ScrollTrigger Progressive Path Draw
      paths?.forEach((path) => {
        const p = path as SVGPathElement;
        const length = p.getTotalLength();
        gsap.set(p, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(p, {
          strokeDashoffset: 0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            end: "bottom 85%",
            scrub: 0.5,
          },
        });
      });

      // 2. Subtle Reveal for Cards and Engine Hub
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 70%",
          end: "bottom 80%",
          scrub: 0.5,
        },
      });

      tl.fromTo(
        ".center-engine-hub",
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "power2.out" }
      );

      const nodeCards = gsap.utils.toArray<HTMLElement>(".branch-node-card");
      nodeCards.forEach((card, i) => {
        tl.fromTo(
          card,
          { opacity: 0, y: 20, scale: 0.92 },
          { opacity: 1, y: 0, scale: 1, duration: 0.4, ease: "power2.out" },
          i * 0.1
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const activePrinciple = engineeringPrinciples[activeStepIdx] || engineeringPrinciples[0];
  const ActiveIcon = activePrinciple.icon;

  return (
    <section id="how-i-engineer" ref={containerRef} className="py-16 sm:py-24 relative overflow-hidden text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        
        {/* Section Header */}
        <SectionHeader
          badge="CORE METHODOLOGY"
          titlePrefix="How I"
          titleHighlight="Engineer"
          subtitle="My foundational engineering principles for creating scalable, maintainable, and enterprise-ready software solutions."
          align="left"
          icon={Sparkles}
        />

        {/* REFINED TECHNICAL ARCHITECTURE NETWORK */}
        <div className="mb-12 w-full text-left">
          {/* Top Status Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-4 border-b border-slate-200/80">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center text-[#FF6014] shadow-2xs">
                <Activity className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-black text-slate-900 tracking-tight flex items-center gap-2">
                  System Architecture Network
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-50 text-[#FF6014] border border-orange-200 text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    TECHNICAL CONNECTOR
                  </span>
                </h3>
                <p className="text-xs text-slate-500 font-semibold">
                  Symmetric Bezier dependency connections between Core Engine &amp; Engineering Pillars.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-2xl shadow-2xs">
              <Zap className="w-4 h-4 text-[#FF6014]" />
              <span className="text-xs font-mono font-bold text-slate-700">
                Active Pillar: <span className="text-[#FF6014] font-black">{activePrinciple.id} - {activePrinciple.title}</span>
              </span>
            </div>
          </div>

          {/* SVG Technical Network Diagram */}
          <div className="w-full overflow-x-auto custom-scrollbar pb-4 relative">
            <div className="min-w-[900px] h-[320px] relative flex items-center justify-center select-none">
              
              {/* Refined Technical SVG Connectors */}
              <svg
                ref={svgRef}
                viewBox="0 0 900 320"
                className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              >
                <defs>
                  {/* Subtle Minimal Glow */}
                  <filter id="subtle-technical-glow-hub" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="2.5" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>

                  {/* Clean Technical Gradient */}
                  <linearGradient id="technicalOrangeGradientHub" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6014" />
                    <stop offset="100%" stopColor="#EA580C" />
                  </linearGradient>
                </defs>

                {/* 1. Subtle Secondary/Dashed Baseline Track */}
                {branchPaths.map((b) => (
                  <path
                    key={`base-${b.id}`}
                    d={b.pathD}
                    fill="none"
                    stroke="#E2E8F0"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                ))}

                {/* 2. Technical Secondary Dashed Track */}
                {branchPaths.map((b) => (
                  <path
                    key={`dash-${b.id}`}
                    d={b.pathD}
                    fill="none"
                    stroke="#CBD5E1"
                    strokeWidth="1"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    opacity="0.6"
                  />
                ))}

                {/* 3. Primary Branch Connector Paths with Active State Highlight */}
                {branchPaths.map((b) => {
                  const isActive = activeStepIdx === b.id;

                  return (
                    <g key={`branch-${b.id}`}>
                      <path
                        d={b.pathD}
                        fill="none"
                        stroke={isActive ? "#FF6014" : "url(#technicalOrangeGradientHub)"}
                        strokeWidth={isActive ? 2.5 : 1.75}
                        strokeLinecap="round"
                        opacity={isActive ? 1 : 0.4}
                        filter={isActive ? "url(#subtle-technical-glow-hub)" : undefined}
                        className="technical-branch-path transition-all duration-300"
                      />

                      {/* Precise Alignment End Dot at Card Connection Point */}
                      <circle
                        cx={b.endX}
                        cy={b.endY}
                        r={isActive ? 4 : 3}
                        fill={isActive ? "#FF6014" : "#94A3B8"}
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                        className="transition-all duration-300"
                      />
                    </g>
                  );
                })}

                {/* Precision Hub Anchor Dots */}
                <circle cx="370" cy="160" r="3.5" fill="#FF6014" stroke="#FFFFFF" strokeWidth="1" />
                <circle cx="530" cy="160" r="3.5" fill="#FF6014" stroke="#FFFFFF" strokeWidth="1" />
              </svg>

              {/* CENTER HUB ENGINE CARD (Sleek Professional Design) */}
              <div className="center-engine-hub absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-40 h-28 rounded-2xl bg-slate-900 border border-[#FF6014]/60 shadow-2xl flex flex-col items-center justify-center p-3.5 text-center group cursor-pointer hover:border-[#FF6014] transition-all">
                <div className="w-9 h-9 rounded-xl bg-[#FF6014] text-white flex items-center justify-center shadow-md mb-1.5 group-hover:rotate-12 transition-transform">
                  <EngineIcon size={18} />
                </div>
                <span className="text-[10px] font-black text-[#FF6014] uppercase tracking-widest font-mono">
                  SYSTEM CORE
                </span>
                <h4 className="text-xs font-black text-white tracking-tight leading-none mt-0.5">
                  ENGINEERING HUB
                </h4>
              </div>

              {/* TOP-LEFT NODE CARD (Pillar 01) */}
              <div
                onClick={() => setActiveStepIdx(0)}
                onMouseEnter={() => setActiveStepIdx(0)}
                className={`branch-node-card absolute left-4 top-[35px] z-20 w-[240px] p-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-2xs ${
                  activeStepIdx === 0
                    ? "glass-card-featured border-2 border-[#FF6014] shadow-md ring-1 ring-[#FF6014]/20"
                    : "glass-card-compact hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      activeStepIdx === 0 ? "bg-[#FF6014] text-white" : "bg-orange-50/80 text-[#FF6014] border border-orange-200/70"
                    }`}>
                      <Layers size={15} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#FF6014] uppercase tracking-wider block">
                        PILLAR 01
                      </span>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        Domain Driven Arch
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black font-mono text-slate-400">01</span>
                </div>
              </div>

              {/* BOTTOM-LEFT NODE CARD (Pillar 02) */}
              <div
                onClick={() => setActiveStepIdx(1)}
                onMouseEnter={() => setActiveStepIdx(1)}
                className={`branch-node-card absolute left-4 bottom-[35px] z-20 w-[240px] p-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-2xs ${
                  activeStepIdx === 1
                    ? "glass-card-featured border-2 border-[#FF6014] shadow-md ring-1 ring-[#FF6014]/20"
                    : "glass-card-compact hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      activeStepIdx === 1 ? "bg-[#FF6014] text-white" : "bg-orange-50/80 text-[#FF6014] border border-orange-200/70"
                    }`}>
                      <Code2 size={15} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#FF6014] uppercase tracking-wider block">
                        PILLAR 02
                      </span>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        High Performance
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black font-mono text-slate-400">02</span>
                </div>
              </div>

              {/* TOP-RIGHT NODE CARD (Pillar 03) */}
              <div
                onClick={() => setActiveStepIdx(2)}
                onMouseEnter={() => setActiveStepIdx(2)}
                className={`branch-node-card absolute right-4 top-[35px] z-20 w-[240px] p-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-2xs ${
                  activeStepIdx === 2
                    ? "glass-card-featured border-2 border-[#FF6014] shadow-md ring-1 ring-[#FF6014]/20"
                    : "glass-card-compact hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      activeStepIdx === 2 ? "bg-[#FF6014] text-white" : "bg-orange-50/80 text-[#FF6014] border border-orange-200/70"
                    }`}>
                      <Database size={15} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#FF6014] uppercase tracking-wider block">
                        PILLAR 03
                      </span>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        Data Integrity &amp; Sec
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black font-mono text-slate-400">03</span>
                </div>
              </div>

              {/* BOTTOM-RIGHT NODE CARD (Pillar 04) */}
              <div
                onClick={() => setActiveStepIdx(3)}
                onMouseEnter={() => setActiveStepIdx(3)}
                className={`branch-node-card absolute right-4 bottom-[35px] z-20 w-[240px] p-3.5 rounded-2xl transition-all duration-300 cursor-pointer shadow-2xs ${
                  activeStepIdx === 3
                    ? "glass-card-featured border-2 border-[#FF6014] shadow-md ring-1 ring-[#FF6014]/20"
                    : "glass-card-compact hover:border-orange-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      activeStepIdx === 3 ? "bg-[#FF6014] text-white" : "bg-orange-50/80 text-[#FF6014] border border-orange-200/70"
                    }`}>
                      <Terminal size={15} />
                    </div>
                    <div>
                      <span className="text-[9px] font-mono font-black text-[#FF6014] uppercase tracking-wider block">
                        PILLAR 04
                      </span>
                      <h4 className="text-xs font-black text-slate-900 leading-tight">
                        CI/CD &amp; Automation
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs font-black font-mono text-slate-400">04</span>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* DYNAMIC SPOTLIGHT DETAILS PANEL FOR FOCUSED PILLAR */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activePrinciple.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3 }}
            className="p-7 sm:p-8 rounded-3xl glass-card-primary space-y-6 text-left shadow-md"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-[#FF6014] text-white flex items-center justify-center shrink-0 shadow-lg">
                  <ActiveIcon size={24} />
                </div>
                <div>
                  <span className="text-xs font-mono font-black text-[#FF6014] uppercase tracking-widest block">
                    PILLAR {activePrinciple.id} SPECIFICATION
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    {activePrinciple.title}
                  </h3>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-orange-50/80 border border-orange-200/80 text-xs font-bold text-slate-800 shadow-2xs shrink-0">
                <Cpu size={15} className="text-[#FF6014]" />
                <span>Primary Tech: <strong className="text-[#FF6014]">{activePrinciple.tool}</strong></span>
              </div>
            </div>

            <p className="text-sm sm:text-base text-slate-700 font-medium leading-relaxed">
              {activePrinciple.description}
            </p>

            <div className="space-y-3 pt-2">
              <span className="text-xs font-black text-slate-900 uppercase tracking-widest font-mono block">
                Key Engineering Deliverables:
              </span>
              <div className="grid sm:grid-cols-3 gap-3">
                {activePrinciple.points.map((pt, pIdx) => (
                  <div key={pIdx} className="p-3.5 rounded-xl glass-card-compact flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-[#FF6014] shrink-0 mt-0.5" />
                    <span className="text-xs text-slate-800 font-semibold leading-relaxed">
                      {pt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

      </div>
    </section>
  );
}