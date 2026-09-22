"use client";

import React, { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  ArrowRight,
  BrainCircuit,
  Bug,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Code2,
  Compass,
  Copy,
  Cpu,
  FastForward,
  FileText,
  Layers,
  Lock,
  Pause,
  Play,
  RotateCcw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
  Workflow,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/*  Design Tokens                                                             */
/* -------------------------------------------------------------------------- */

const BRAND = "#FF6014"; // primary orange
const BRAND_SOFT = "#FF8A4C"; // orange for text on dark surfaces
const AUTOPLAY_MS = 5000;

/* -------------------------------------------------------------------------- */
/*  Data Models                                                               */
/* -------------------------------------------------------------------------- */

interface WorkflowStage {
  step: string;
  title: string;
  icon: LucideIcon;
  tool: string;
  howIWork: string;
  aiRole: string;
  guardrail: string;
  file: string;
  snippet: string;
}

interface ToolItem {
  key: string;
  name: string;
  role: string;
  tag: string;
  icon: string;
  useCase: string;
}

interface Metric {
  label: string;
  value: string;
  subtext: string;
  icon: LucideIcon;
}

const WORKFLOW_STAGES: WorkflowStage[] = [
  {
    step: "01",
    title: "Plan & Research",
    icon: Compass,
    tool: "DeepSeek R1 & Grok 3",
    howIWork:
      "Formulate systematic technical architecture blueprints, evaluate system design tradeoffs, and assess library compatibility prior to writing initial code.",
    aiRole: "Requirement analysis & tradeoff modeling",
    guardrail:
      "Architectural scope boundary validation & business requirement alignment",
    file: "stage-01_plan.ts",
    snippet: `// STAGE 01: Deep Architectural Reasoning & Tech Stack Planning
const archPlan = await deepseekR1.reason({
  systemType: "Distributed High-Concurrency API Gateway",
  throughputGoal: "10,000 req/sec sub-50ms latency",
  evaluations: ["PostgreSQL vs MongoDB", "Redis Caching vs Memory Cache"],
  securityModel: "OAuth2 + RBAC JWT Verification"
});`,
  },
  {
    step: "02",
    title: "Architecture & Schema",
    icon: Layers,
    tool: "Antigravity SDK & DeepSeek",
    howIWork:
      "Model relational & NoSQL database schemas, draft REST/GraphQL API contracts, and enforce strict type safety boundaries across microservices.",
    aiRole: "Schema modeling & API contract generation",
    guardrail:
      "Human verification of data integrity rules & ACID compliance bounds",
    file: "stage-02_contract.ts",
    snippet: `// STAGE 02: Relational Schema & Strict API Contract Modeling
export interface UserSessionContract {
  readonly sessionId: string;
  readonly userId: string;
  readonly role: "SUPER_ADMIN" | "ENGINEER" | "CLIENT";
  readonly permissions: ReadonlySet<PermissionFlag>;
  readonly metadata: StrictSchemaValidation<AuditMetadata>;
}`,
  },
  {
    step: "03",
    title: "Agentic Development",
    icon: Code2,
    tool: "Cursor IDE & Windsurf Agent",
    howIWork:
      "Accelerate feature implementation using context-aware agentic coding, automated boilerplate scaffolding, and type-safe IDE completions.",
    aiRole: "Context-aware multi-file implementation",
    guardrail:
      "Strict code style enforcement & manual peer review of generated modules",
    file: "stage-03_feature.ts",
    snippet: `// STAGE 03: Agentic Multi-File Feature Scaffolding
@agent.implementFeature({
  prompt: "Construct resilient API route with rate-limiting and cache invalidation",
  contextFiles: ["@src/lib/db.ts", "@src/types/contract.ts"],
  enforceTypeSafety: true,
  generateErrorHandlers: true
});`,
  },
  {
    step: "04",
    title: "Diagnostic Debugging",
    icon: Bug,
    tool: "Trae AI & Cursor Debugger",
    howIWork:
      "Analyze complex stack traces, trace memory leaks, diagnose async race conditions, and rapidly isolate root-cause runtime failures.",
    aiRole: "Stack trace analysis & memory leak isolation",
    guardrail: "Verification of fix behavior against regression edge cases",
    file: "stage-04_diagnostic.log",
    snippet: `// STAGE 04: Automated Diagnostic & Heap Snapshot Analysis
[DIAGNOSTIC] Analyzing runtime stack trace at src/services/websocket.ts:42
[FOUND] Unhandled event listener memory leak in async stream handler
[PATCH] Replaced raw listener with AutoDispose Signal pattern -> HEAP CLEAN`,
  },
  {
    step: "05",
    title: "SOLID Refactoring",
    icon: RotateCcw,
    tool: "Cursor & DeepSeek",
    howIWork:
      "Deconstruct monolithic routines, enforce SOLID object-oriented principles, eliminate code smells, and optimize runtime memory efficiency.",
    aiRole: "SOLID abstraction & performance optimization",
    guardrail: "Zero-breaking-change interface guarantee",
    file: "stage-05_refactor.ts",
    snippet: `// STAGE 05: Decoupled SOLID Clean Architecture Refactor
export class OrderProcessor implements IOrderProcessor {
  constructor(
    private readonly validator: IOrderValidator,
    private readonly paymentGateway: IPaymentService,
    private readonly logger: ILoggerService
  ) {}
}`,
  },
  {
    step: "06",
    title: "Automated Testing",
    icon: TestTube2,
    tool: "Antigravity Agent SDK",
    howIWork:
      "Generate comprehensive unit, integration, and E2E regression test suites while validating boundary conditions and failure states.",
    aiRole: "E2E & unit test suite scaffolding",
    guardrail: "100% test execution validation & code coverage thresholds",
    file: "stage-06_resilience.test.ts",
    snippet: `// STAGE 06: Automated Integration & Edge Case Test Suite
describe("Circuit Breaker Resiliency", () => {
  it("should trigger fallback response upon 3 consecutive network timeouts", async () => {
    const response = await simulateNetworkTimeout({ failures: 3 });
    expect(response.status).toBe("FALLBACK_MODE_ACTIVE");
  });
});`,
  },
  {
    step: "07",
    title: "Documentation & Specs",
    icon: FileText,
    tool: "Cursor & Antigravity",
    howIWork:
      "Synthesize comprehensive OpenAPI 3.1 specifications, inline TypeScript JSDoc comments, and clear architectural design references.",
    aiRole: "OpenAPI spec & developer docs generation",
    guardrail:
      "Validation against production API behavior & endpoint responses",
    file: "stage-07_docs.ts",
    snippet: `/**
 * @summary Execute high-throughput data processing batch
 * @paramPayload {BatchRequestPayload} Verified schema object
 * @returns {Promise<Result<BatchResponse, ExecutionError>>}
 */
export async function processBatchJob(payload: BatchRequestPayload) { ... }`,
  },
  {
    step: "08",
    title: "Delivery & CI/CD",
    icon: Rocket,
    tool: "Antigravity SDK & GitHub Actions",
    howIWork:
      "Automate build checks, streamline release notes generation, optimize JS bundle distribution, and verify production deployment health.",
    aiRole: "CI/CD pipeline quality gate & release verification",
    guardrail:
      "Production zero-downtime health verification & security scans",
    file: ".github/workflows/deploy.yml",
    snippet: `# STAGE 08: GitHub Actions Automated Production Quality Gate
name: Production Deployment Pipeline
on: [push]
jobs:
  verify-and-deploy:
    steps:
      - run: pnpm run lint && pnpm run typecheck && pnpm run test
      - run: pnpm run build:production`,
  },
];

const TOOLKIT: ToolItem[] = [
  {
    key: "Cursor",
    name: "Cursor IDE",
    role: "Primary agentic IDE partner",
    tag: "Daily driver",
    icon: "/cursor-app-icon.png",
    useCase:
      "Multi-file context coding, workspace refactoring & instant inline AI edits.",
  },
  {
    key: "DeepSeek",
    name: "DeepSeek R1",
    role: "Deep reasoning engine",
    tag: "Logic & math",
    icon: "/deepseek-logo-icon.png",
    useCase:
      "Architectural tradeoff evaluation, complex algorithm design & math logic.",
  },
  {
    key: "Windsurf",
    name: "Windsurf Agent",
    role: "Contextual codebase agent",
    tag: "Deep context",
    icon: "/Windsurf.png",
    useCase:
      "Full-repo dependency graph awareness & automated feature propagation.",
  },
  {
    key: "Antigravity",
    name: "Antigravity SDK",
    role: "Agentic engineering layer",
    tag: "Orchestration",
    icon: "/antigravity-logo.png",
    useCase:
      "Autonomous multi-agent task execution, testing & workflow validation.",
  },
  {
    key: "Grok",
    name: "Grok 3",
    role: "Real-time AI intelligence",
    tag: "Research & benchmarking",
    icon: "/grok.png",
    useCase:
      "Latest API specs, benchmark research & fast technological comparison.",
  },
  {
    key: "Trae",
    name: "Trae AI",
    role: "Adaptive diagnostic IDE agent",
    tag: "Debugging partner",
    icon: "/trae.jpg",
    useCase:
      "Runtime stack trace analysis, memory leak isolation & rapid error fixing.",
  },
];

const METRICS: Metric[] = [
  {
    label: "Development speedup",
    value: "3.5x",
    subtext: "Faster boilerplate & feature delivery",
    icon: FastForward,
  },
  {
    label: "Code ownership",
    value: "100%",
    subtext: "Human verified & security audited",
    icon: ShieldCheck,
  },
  {
    label: "Type safety",
    value: "Zero drift",
    subtext: "Strict TypeScript & DB contracts",
    icon: Lock,
  },
  {
    label: "Workflow integration",
    value: "8 stages",
    subtext: "Automated end-to-end circuit",
    icon: Workflow,
  },
];

const OWNERSHIP_CHECKS = [
  "100% manually audited pull requests",
  "Strict static & dynamic type safety",
  "Zero unchecked LLM-generated logic",
];

/* -------------------------------------------------------------------------- */
/*  Syntax Highlighter Helper                                                 */
/* -------------------------------------------------------------------------- */

const TOKEN_RE =
  /("[^"]*"|'[^']*'|`[^`]*`|@[\w.]+|\b(?:const|await|export|interface|readonly|class|constructor|private|implements|describe|it|async|function|return|expect|true|false)\b|\b\d[\d,]*\b)/g;

function renderLine(line: string): React.ReactNode {
  const trimmed = line.trim();

  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("/**") ||
    trimmed.startsWith("*")
  ) {
    return <span className="italic text-slate-500 font-normal">{line}</span>;
  }

  const tag = line.match(/^(\[[A-Z]+\])(.*)$/);
  if (tag) {
    return (
      <>
        <span className="font-bold" style={{ color: BRAND_SOFT }}>
          {tag[1]}
        </span>
        <span className="text-slate-300 font-normal">{tag[2]}</span>
      </>
    );
  }

  return line.split(TOKEN_RE).map((token, i) => {
    if (i % 2 === 0) return <React.Fragment key={i}>{token}</React.Fragment>;
    if (/^["'`]/.test(token))
      return (
        <span key={i} className="text-emerald-300 font-semibold">
          {token}
        </span>
      );
    if (token.startsWith("@"))
      return (
        <span key={i} className="text-sky-300 font-semibold">
          {token}
        </span>
      );
    if (/^\d/.test(token))
      return (
        <span key={i} className="text-amber-300 font-semibold">
          {token}
        </span>
      );
    return (
      <span key={i} style={{ color: BRAND_SOFT }} className="font-semibold">
        {token}
      </span>
    );
  });
}

/* -------------------------------------------------------------------------- */
/*  Main Component                                                            */
/* -------------------------------------------------------------------------- */

export default function AIStack() {
  const stages = WORKFLOW_STAGES;
  const total = stages.length;

  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false);

  const sectionRef = useRef<HTMLElement | null>(null);
  const railRef = useRef<HTMLDivElement | null>(null);
  const chipsRef = useRef<HTMLDivElement | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const reduceMotion = useReducedMotion();
  const inView = useInView(sectionRef, { amount: 0.2 });

  const running = isAutoPlay && inView && !isHovering && !reduceMotion;

  const active = stages[activeIdx];
  const ActiveIcon = active.icon;
  const fillPct = (activeIdx / (total - 1)) * 100;
  const codeLines = active.snippet.split("\n");

  const goTo = (idx: number) => setActiveIdx((idx + total) % total);

  const selectStage = (idx: number) => {
    goTo(idx);
    setIsAutoPlay(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.snippet);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  // GSAP Rail animation
  useEffect(() => {
    const root = sectionRef.current;
    if (!root || reduceMotion) return;

    const ctx = gsap.context(() => {
      const rail = railRef.current;
      if (!rail) return;

      gsap.from(rail.querySelectorAll(".pipe-node"), {
        y: 18,
        opacity: 0,
        duration: 0.55,
        ease: "power3.out",
        stagger: 0.07,
        scrollTrigger: { trigger: rail, start: "top 85%", once: true },
      });

      rail.querySelectorAll<HTMLElement>(".pipe-particle").forEach((el, i) => {
        gsap
          .timeline({ repeat: -1, delay: i * 1.5 })
          .set(el, { left: "0%", opacity: 0 })
          .to(el, { left: "100%", duration: 4.5, ease: "none" }, 0)
          .to(el, { opacity: 1, duration: 0.4 }, 0)
          .to(el, { opacity: 0, duration: 0.4 }, 4.1);
      });
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const container = chipsRef.current;
    const chip = container?.children[activeIdx] as HTMLElement | undefined;
    if (!container || !chip) return;
    container.scrollTo({
      left: chip.offsetLeft - container.clientWidth / 2 + chip.clientWidth / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [activeIdx, reduceMotion]);

  return (
    <section
      id="ai-assisted-dev"
      ref={sectionRef}
      className="mb-20 w-full scroll-mt-24 sm:mb-24 text-left"
    >
      <SectionHeader
        badge="AI-POWERED SOFTWARE ENGINEERING"
        titlePrefix="AI Tooling &"
        titleHighlight="Workflow Integration"
        subtitle="Leveraging agentic coding models, deep reasoning engines, and automated validation circuits to deliver production-grade software at enterprise speed."
        align="left"
        icon={Sparkles}
      />

      {/* ------------------------------ Metrics ------------------------------ */}
      <dl className="mb-12 grid grid-cols-2 border-y border-slate-200 lg:grid-cols-4">
        {METRICS.map((m, i) => {
          const MIcon = m.icon;
          return (
            <div
              key={m.label}
              className={[
                "border-slate-200 px-4 py-5 sm:px-6",
                i % 2 === 1 ? "border-l" : "",
                i >= 2 ? "border-t lg:border-t-0" : "",
                i > 0 ? "lg:border-l" : "",
              ].join(" ")}
            >
              <dt className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800">
                <MIcon size={15} style={{ color: BRAND }} aria-hidden />
                {m.label}
              </dt>
              <dd className="mt-2 text-2xl sm:text-3xl font-black tracking-tight text-slate-900 font-mono">
                {m.value}
              </dd>
              <dd className="mt-1 text-xs text-slate-600 font-medium">
                {m.subtext}
              </dd>
            </div>
          );
        })}
      </dl>

      {/* ------------------------- 8-Stage Pipeline Console -------------------------- */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Rail area */}
        <div
          className="p-5 sm:p-7"
          style={{
            backgroundImage:
              "radial-gradient(rgb(226 232 240) 1px, transparent 1px)",
            backgroundSize: "18px 18px",
          }}
        >
          <div className="mb-7 max-w-2xl">
            <h3 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900">
              Eight stages, one pipeline
            </h3>
            <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
              Pick a stage to see what AI does there, what I check myself, and
              the code that comes out of it.
            </p>
          </div>

          {/* Desktop rail */}
          <nav aria-label="Engineering pipeline stages" className="hidden md:block">
            <div ref={railRef} className="relative grid grid-cols-8">
              {/* Track */}
              <div
                aria-hidden
                className="absolute left-[6.25%] right-[6.25%] top-7 h-[3px] -translate-y-1/2 rounded-full bg-slate-200"
              >
                <motion.div
                  className="h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, #FF8A00, ${BRAND})`,
                  }}
                  initial={false}
                  animate={{ width: `${fillPct}%` }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.6,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                />
                {[0, 1, 2].map((p) => (
                  <span
                    key={p}
                    className="pipe-particle absolute top-1/2 size-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
                    style={{
                      left: "0%",
                      opacity: 0,
                      boxShadow: `0 0 0 2px ${BRAND}, 0 0 12px 3px rgba(255,96,20,0.55)`,
                    }}
                  />
                ))}
              </div>

              {stages.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === activeIdx;
                const isDone = i < activeIdx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => selectStage(i)}
                    aria-current={isActive ? "step" : undefined}
                    aria-label={`Stage ${s.step}: ${s.title}`}
                    className="pipe-node group flex cursor-pointer flex-col items-center outline-none"
                  >
                    <span
                      className={[
                        "relative z-10 grid size-14 place-items-center rounded-full border-2 transition-all duration-200",
                        "group-focus-visible:ring-4 group-focus-visible:ring-orange-300",
                        isActive
                          ? "border-[#FF6014] bg-[#FF6014] text-white shadow-xs"
                          : isDone
                            ? "border-orange-300 bg-orange-50 text-[#FF6014] group-hover:bg-orange-100"
                            : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600",
                      ].join(" ")}
                    >
                      {isActive && (
                        <span
                          aria-hidden
                          className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#FF6014]/30 motion-reduce:animate-none"
                        />
                      )}
                      <Icon size={22} />
                    </span>
                    <span
                      className={`mt-3 font-mono text-[11px] tabular-nums ${
                        isActive ? "text-[#FF6014]" : "text-slate-400"
                      }`}
                    >
                      {s.step}
                    </span>
                    <span
                      className={`mt-0.5 max-w-[96px] text-center text-xs leading-snug ${
                        isActive
                          ? "font-semibold text-slate-900"
                          : "text-slate-500 group-hover:text-slate-800"
                      }`}
                    >
                      {s.title}
                    </span>
                  </button>
                );
              })}
            </div>
          </nav>

          {/* Mobile stage picker */}
          <nav
            aria-label="Engineering pipeline stages"
            className="md:hidden"
          >
            <div
              ref={chipsRef}
              className="relative -mx-1 flex snap-x gap-2 overflow-x-auto px-1 pb-2 [scrollbar-width:none]"
            >
              {stages.map((s, i) => {
                const Icon = s.icon;
                const isActive = i === activeIdx;
                return (
                  <button
                    key={s.step}
                    type="button"
                    onClick={() => selectStage(i)}
                    aria-current={isActive ? "step" : undefined}
                    className={`flex shrink-0 snap-center items-center gap-2 rounded-full border px-3.5 py-2 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#FF6014] ${
                      isActive
                        ? "border-[#FF6014] bg-[#FF6014] font-semibold text-white"
                        : "border-slate-200 bg-white text-slate-600"
                    }`}
                  >
                    <Icon size={15} />
                    <span className="font-mono text-xs tabular-nums opacity-80">
                      {s.step}
                    </span>
                    <span>{s.title}</span>
                  </button>
                );
              })}
            </div>
          </nav>
        </div>

        {/* Detail panel */}
        <div
          className="grid border-t border-slate-200 lg:grid-cols-12"
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* Spec */}
          <div className="flex flex-col justify-between p-6 sm:p-8 lg:col-span-5 bg-white">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.step}
                initial={{ opacity: 0, x: reduceMotion ? 0 : -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: reduceMotion ? 0 : 10 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <div className="flex items-center gap-4">
                  <span
                    className="grid size-12 shrink-0 place-items-center rounded-xl text-white shadow-xs"
                    style={{ background: BRAND }}
                  >
                    <ActiveIcon size={22} />
                  </span>
                  <div>
                    <p className="text-xs text-slate-500 font-mono">
                      Stage {Number(active.step)} of {total}
                    </p>
                    <h4 className="text-lg sm:text-xl font-black leading-tight tracking-tight text-slate-900">
                      {active.title}
                    </h4>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                  {active.howIWork}
                </p>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg bg-orange-50/80 border border-orange-200 text-xs font-bold text-slate-800 shadow-2xs">
                  <Cpu size={14} style={{ color: BRAND }} aria-hidden />
                  <span>Built with <strong className="text-[#FF6014]">{active.tool}</strong></span>
                </div>

                <dl className="mt-4 space-y-3 border-t border-slate-100 pt-4">
                  <div className="flex gap-3">
                    <BrainCircuit
                      size={16}
                      className="mt-0.5 shrink-0"
                      style={{ color: BRAND }}
                      aria-hidden
                    />
                    <div>
                      <dt className="text-xs font-extrabold text-slate-900 uppercase font-mono">
                        What AI does
                      </dt>
                      <dd className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                        {active.aiRole}
                      </dd>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <ShieldCheck
                      size={16}
                      className="mt-0.5 shrink-0 text-emerald-600"
                      aria-hidden
                    />
                    <div>
                      <dt className="text-xs font-extrabold text-slate-900 uppercase font-mono">
                        What I check
                      </dt>
                      <dd className="text-xs sm:text-sm leading-relaxed text-slate-700 font-medium">
                        {active.guardrail}
                      </dd>
                    </div>
                  </div>
                </dl>
              </motion.div>
            </AnimatePresence>

            {/* Controls */}
            <div className="mt-6 pt-3 border-t border-slate-100">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-1.5">
                  <button
                    type="button"
                    onClick={() => selectStage(activeIdx - 1)}
                    aria-label="Previous stage"
                    className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    type="button"
                    onClick={() => selectStage(activeIdx + 1)}
                    aria-label="Next stage"
                    className="grid size-9 place-items-center rounded-lg border border-slate-200 text-slate-600 transition-colors hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setIsAutoPlay((v) => !v)}
                  aria-pressed={isAutoPlay}
                  className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-bold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50 cursor-pointer"
                >
                  {isAutoPlay ? <Pause size={14} className="text-[#FF6014]" /> : <Play size={14} className="text-[#FF6014]" />}
                  <span>{isAutoPlay ? "Pause auto-cycle" : "Resume auto-cycle"}</span>
                </button>
              </div>

              <div
                className="mt-3.5 h-[3px] overflow-hidden rounded-full bg-slate-100"
                aria-hidden
              >
                {running && (
                  <motion.div
                    key={`progress-${activeIdx}`}
                    className="h-full rounded-full"
                    style={{ background: BRAND }}
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    onAnimationComplete={() =>
                      setActiveIdx((p) => (p + 1) % total)
                    }
                  />
                )}
              </div>
            </div>
          </div>

          {/* Terminal */}
          <div className="flex flex-col bg-slate-950 text-slate-200 lg:col-span-7">
            <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3 bg-slate-900/90">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 gap-1.5" aria-hidden>
                  <span className="size-3 rounded-full bg-red-500/80" />
                  <span className="size-3 rounded-full bg-yellow-500/80" />
                  <span className="size-3 rounded-full bg-green-500/80" />
                </div>
                <span className="flex min-w-0 items-center gap-1.5 truncate font-mono text-xs text-slate-400">
                  <Terminal
                    size={13}
                    className="shrink-0 text-[#FF8A4C]"
                    aria-hidden
                  />
                  <span className="truncate">{active.file}</span>
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-slate-300 transition-colors hover:bg-white/10 cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check size={13} className="text-emerald-400" />
                    <span className="text-emerald-400 font-bold">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy size={13} />
                    <span>Copy code</span>
                  </>
                )}
              </button>
            </div>

            <div className="min-h-[268px] flex-1 overflow-x-auto px-5 py-5 custom-scrollbar">
              <AnimatePresence mode="wait" initial={false}>
                <motion.ol
                  key={active.step}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  className="min-w-max font-mono text-[12.5px] leading-6"
                >
                  {codeLines.map((line, i) => (
                    <li key={i} className="flex gap-4">
                      <span
                        aria-hidden
                        className="w-5 shrink-0 select-none text-right font-mono text-slate-600"
                      >
                        {i + 1}
                      </span>
                      <span className="whitespace-pre text-slate-200">
                        {renderLine(line)}
                      </span>
                    </li>
                  ))}
                </motion.ol>
              </AnimatePresence>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-white/10 px-5 py-3 text-xs text-slate-400">
              <span className="flex items-center gap-2 text-emerald-400">
                <span
                  className="size-2 rounded-full bg-emerald-500 motion-safe:animate-pulse"
                  aria-hidden
                />
                Pipeline verified and type-checked
              </span>
              <span className="hidden font-mono text-slate-500 sm:inline">
                TypeScript 5.4 | Node v22
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ------------------------------ Toolkit ------------------------------ */}
      <div className="mt-16">
        <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
          The toolkit
        </h3>
        <p className="mt-1.5 max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600 font-medium">
          Six tools, each with one job. Whichever ones are used in the stage
          you&apos;re viewing are marked.
        </p>

        <ul className="mt-6 divide-y divide-slate-200 border-y border-slate-200 bg-white rounded-2xl overflow-hidden shadow-2xs">
          {TOOLKIT.map((tool) => {
            const inUse = active.tool.includes(tool.key);
            return (
              <li
                key={tool.name}
                className={`relative grid grid-cols-[auto_1fr] items-center gap-x-4 gap-y-1.5 px-3 py-5 transition-colors duration-300 sm:px-5 md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,1.6fr)_9.5rem] md:gap-x-6 ${
                  inUse ? "bg-orange-50/70" : ""
                }`}
              >
                <span
                  aria-hidden
                  className={`absolute inset-y-0 left-0 w-[3px] origin-center transition-transform duration-300 ${
                    inUse ? "scale-y-100" : "scale-y-0"
                  }`}
                  style={{ background: BRAND }}
                />

                <img
                  src={tool.icon}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  className="size-10 rounded-lg bg-white object-contain p-1 ring-1 ring-slate-200 md:row-auto shadow-2xs"
                />

                <div>
                  <h4 className="text-base font-black text-slate-900">
                    {tool.name}
                  </h4>
                  <p className="text-xs font-bold text-[#FF6014]">{tool.role}</p>
                </div>

                <p className="col-start-2 text-xs sm:text-sm leading-relaxed text-slate-700 font-medium md:col-start-auto">
                  {tool.useCase}
                </p>

                <div className="col-start-2 flex items-center gap-2 md:col-start-auto md:flex-col md:items-end md:gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold text-slate-700 bg-slate-100/80 border border-slate-200 px-2.5 py-0.5 rounded-md">
                    {tool.tag}
                  </span>
                  <span
                    aria-hidden={!inUse}
                    className={`rounded-full px-2.5 py-0.5 text-xs font-bold text-white transition-opacity duration-300 ${
                      inUse ? "opacity-100" : "opacity-0"
                    }`}
                    style={{ background: BRAND }}
                  >
                    Stage {active.step}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ------------------------------ Ownership Protocol (Light Glass Design) ---------------------------- */}
      <div className="relative mt-16 overflow-hidden rounded-2xl glass-card-featured p-6 sm:p-8 shadow-sm hover:shadow-md transition-all text-left">
        <span
          aria-hidden
          className="absolute inset-y-0 left-0 w-1.5 bg-[#FF6014]"
        />
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center gap-2 text-[#FF6014]">
              <ShieldCheck size={18} aria-hidden />
              <span className="text-xs font-mono font-black uppercase tracking-wider text-slate-900">
                Human-in-the-loop protocol
              </span>
            </div>
            <h4 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight leading-snug">
              Strict code ownership &amp; zero-hallucination guarantee
            </h4>
            <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
              AI serves strictly as an intelligent productivity multiplier and coding assistant. I maintain complete architectural responsibility, manual code inspection, security vulnerability auditing, and strict deterministic validation for every line of code deployed to production.
            </p>

            <div className="mt-4 flex flex-wrap items-center gap-2 text-xs font-extrabold text-slate-800">
              {["AI proposes", "I audit", "CI enforces"].map((label, i, arr) => (
                <React.Fragment key={label}>
                  <span className="rounded-lg border border-orange-200/80 bg-white px-3 py-1 text-slate-900 shadow-2xs">
                    {label}
                  </span>
                  {i < arr.length - 1 && (
                    <ArrowRight
                      size={14}
                      className="text-[#FF6014]"
                      aria-hidden
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>

          <ul className="space-y-2.5 self-center lg:col-span-5">
            {OWNERSHIP_CHECKS.map((text) => (
              <li
                key={text}
                className="flex items-center gap-3 rounded-xl border border-orange-200/80 bg-white/90 px-4 py-3 text-xs sm:text-sm font-bold text-slate-900 shadow-2xs"
              >
                <CheckCircle2
                  size={18}
                  className="shrink-0 text-[#FF6014]"
                  aria-hidden
                />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}