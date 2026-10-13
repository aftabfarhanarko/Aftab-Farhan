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
  Activity,
  ArrowRight,
  BadgeCheck,
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
  FileText,
  Layers,
  LockKeyhole,
  Pause,
  Play,
  RotateCcw,
  Rocket,
  ShieldCheck,
  Sparkles,
  Terminal,
  TestTube2,
  Workflow,
  Zap,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

const AUTOPLAY_MS = 5000;
const ACCENT = "#FF6014";

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
  monogram: string;
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
    monogram: "Cu",
    useCase:
      "Multi-file context coding, workspace refactoring & instant inline AI edits.",
  },
  {
    key: "DeepSeek",
    name: "DeepSeek R1",
    role: "Deep reasoning engine",
    tag: "Logic & math",
    monogram: "D",
    useCase:
      "Architectural tradeoff evaluation, complex algorithm design & math logic.",
  },
  {
    key: "Windsurf",
    name: "Windsurf Agent",
    role: "Contextual codebase agent",
    tag: "Deep context",
    monogram: "W",
    useCase:
      "Full-repo dependency graph awareness & automated feature propagation.",
  },
  {
    key: "Antigravity",
    name: "Antigravity SDK",
    role: "Agentic engineering layer",
    tag: "Orchestration",
    monogram: "A",
    useCase:
      "Autonomous multi-agent task execution, testing & workflow validation.",
  },
  {
    key: "Grok",
    name: "Grok 3",
    role: "Real-time AI intelligence",
    tag: "Research & benchmarking",
    monogram: "G",
    useCase:
      "Latest API specs, benchmark research & fast technological comparison.",
  },
  {
    key: "Trae",
    name: "Trae AI",
    role: "Adaptive diagnostic IDE agent",
    tag: "Debugging partner",
    monogram: "T",
    useCase:
      "Runtime stack trace analysis, memory leak isolation & rapid error fixing.",
  },
];

const METRICS: Metric[] = [
  {
    label: "Development speedup",
    value: "3.5×",
    subtext: "Faster boilerplate & feature delivery",
    icon: Zap,
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
    icon: LockKeyhole,
  },
  {
    label: "Workflow integration",
    value: "08 stages",
    subtext: "Automated end-to-end circuit",
    icon: Workflow,
  },
];

const OWNERSHIP_CHECKS = [
  "100% manually audited pull requests",
  "Strict static & dynamic type safety",
  "Zero unchecked LLM-generated logic",
];

const TOKEN_RE =
  /("[^"]*"|'[^']*'|`[^`]*`|@[\w.]+|\b(?:const|await|export|interface|readonly|class|constructor|private|implements|describe|it|async|function|return|expect|true|false|name|on|jobs|steps)\b|\b\d[\d,]*\b)/g;

function renderLine(line: string): React.ReactNode {
  const trimmed = line.trim();

  if (
    trimmed.startsWith("//") ||
    trimmed.startsWith("#") ||
    trimmed.startsWith("/**") ||
    trimmed.startsWith("*")
  ) {
    return <span className="italic text-slate-500">{line}</span>;
  }

  const tag = line.match(/^(\[[A-Z]+\])(.*)$/);
  if (tag) {
    return (
      <>
        <span className="font-bold text-orange-300">{tag[1]}</span>
        <span className="text-slate-300">{tag[2]}</span>
      </>
    );
  }

  return line.split(TOKEN_RE).map((token, index) => {
    if (index % 2 === 0) {
      return <React.Fragment key={index}>{token}</React.Fragment>;
    }

    if (/^["'`]/.test(token)) {
      return (
        <span key={index} className="font-medium text-emerald-300">
          {token}
        </span>
      );
    }

    if (token.startsWith("@")) {
      return (
        <span key={index} className="font-medium text-sky-300">
          {token}
        </span>
      );
    }

    if (/^\d/.test(token)) {
      return (
        <span key={index} className="font-medium text-amber-300">
          {token}
        </span>
      );
    }

    return (
      <span key={index} className="font-semibold text-orange-300">
        {token}
      </span>
    );
  });
}

const reveal = {
  hidden: { opacity: 0, y: 22 },
  visible: { opacity: 1, y: 0 },
};

export default function AIStack() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHovering, setIsHovering] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const sectionRef = useRef<HTMLElement | null>(null);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isInView = useInView(sectionRef, { amount: 0.15 });
  const reduceMotion = useReducedMotion();

  const total = WORKFLOW_STAGES.length;
  const active = WORKFLOW_STAGES[activeIdx];
  const ActiveIcon = active.icon;
  const codeLines = active.snippet.split("\n");
  const shouldAutoPlay =
    isAutoPlay && isInView && !isHovering && !reduceMotion;

  const goTo = (index: number) => {
    setActiveIdx((index + total) % total);
  };

  const selectStage = (index: number) => {
    goTo(index);
    setIsAutoPlay(false);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(active.snippet);
      setCopied(true);
      setCopyError(false);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 1800);
    } catch {
      setCopyError(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopyError(false), 2200);
    }
  };

  useEffect(() => {
    if (!shouldAutoPlay) return;
    const timer = setInterval(() => {
      setActiveIdx((current) => (current + 1) % total);
    }, AUTOPLAY_MS);
    return () => clearInterval(timer);
  }, [shouldAutoPlay, total]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root || reduceMotion) return;

    gsap.registerPlugin(ScrollTrigger);

    const context = gsap.context(() => {
      const introItems = root.querySelectorAll(".gsap-intro");
      if (introItems.length) {
        gsap.fromTo(
          introItems,
          { autoAlpha: 0, y: 22 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.75,
            stagger: 0.11,
            ease: "power3.out",
            scrollTrigger: {
              trigger: introItems[0],
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      const rail = root.querySelector(".stage-rail");
      const nodes = root.querySelectorAll(".stage-node");
      if (rail && nodes.length) {
        gsap.fromTo(
          nodes,
          { autoAlpha: 0, y: 14, scale: 0.92 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.55,
            stagger: 0.065,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: rail,
              start: "top 88%",
              once: true,
            },
          },
        );
      }

      const particles = root.querySelectorAll<HTMLElement>(".pipe-particle");
      particles.forEach((particle, index) => {
        gsap
          .timeline({ repeat: -1, delay: index * 1.35 })
          .set(particle, { left: "0%", autoAlpha: 0 })
          .to(
            particle,
            {
              left: "100%",
              autoAlpha: 1,
              duration: 4.6,
              ease: "none",
            },
            0,
          )
          .to(particle, { autoAlpha: 0, duration: 0.3 }, 4.3);
      });

      const ambientOrbs = root.querySelectorAll(".ambient-orb");
      ambientOrbs.forEach((orb, index) => {
        gsap.to(orb, {
          x: index === 0 ? -22 : 24,
          y: index === 0 ? 18 : -18,
          duration: 8 + index * 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, root);

    return () => context.revert();
  }, [reduceMotion]);

  useEffect(() => {
    const root = sectionRef.current;
    if (!root) return;

    const lines = root.querySelectorAll(".code-line");
    if (!lines.length) return;
    if (reduceMotion) {
      gsap.set(lines, { clearProps: "all" });
      return;
    }

    const tween = gsap.fromTo(
      lines,
      { autoAlpha: 0, x: -7 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.28,
        stagger: 0.025,
        ease: "power2.out",
        clearProps: "all",
      },
    );

    return () => {
      tween.kill();
    };
  }, [active.step, reduceMotion]);

  useEffect(() => {
    return () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    };
  }, []);

  return (
    <section
      id="ai-assisted-dev"
      ref={sectionRef}
      className="relative mb-20 w-full scroll-mt-24 text-left sm:mb-24"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="ambient-orb absolute -right-32 -top-40 size-[32rem] rounded-full bg-orange-400/[0.04] blur-[120px]" />
        <div className="ambient-orb absolute -bottom-56 -left-32 size-[30rem] rounded-full bg-amber-400/[0.04] blur-[120px]" />
      </div>

      <div className="mx-auto max-w-7xl">
        {/* Intro */}
        <SectionHeader
          badge="AI-POWERED WORKFLOW"
          titlePrefix="Better tools."
          titleHighlight="Thoughtful"
          titleSuffix="engineering."
          subtitle="AI accelerates the work. Clear architecture, human judgment, and careful validation keep every release grounded in quality."
          align="left"
          icon={Sparkles}
        />

        {/* Metrics */}
        <motion.dl
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="mb-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
        >
          {METRICS.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={metric.label}
                whileHover={reduceMotion ? undefined : { y: -4 }}
                transition={{ duration: 0.2 }}
                className="group rounded-2xl border border-slate-200/80 bg-white/80 p-4 shadow-sm backdrop-blur-sm transition-all hover:border-orange-200 hover:shadow-md sm:p-5"
              >
                <dt className="flex items-center gap-2 text-[11px] font-medium text-slate-500 sm:text-xs">
                  <Icon size={15} className="text-[#FF6014]" aria-hidden />
                  {metric.label}
                </dt>
                <dd className="mt-4 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                  {metric.value}
                </dd>
                <dd className="mt-1 text-[11px] leading-5 text-slate-500 sm:text-xs">
                  {metric.subtext}
                </dd>
                <div
                  className="mt-4 h-0.5 origin-left bg-gradient-to-r from-[#FF6014]/60 to-transparent transition-transform duration-500 group-hover:scale-x-110"
                  style={{ width: `${45 + index * 10}%` }}
                />
              </motion.div>
            );
          })}
        </motion.dl>

        {/* Workflow console */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
          className="overflow-hidden rounded-[1.6rem] border border-slate-200 bg-white shadow-[0_1px_3px_rgba(15,23,42,0.04),0_20px_40px_-20px_rgba(15,23,42,0.08)]"
        >
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 bg-slate-50/50 px-5 py-5 sm:px-7 sm:py-6">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6014]">
                <Activity size={13} aria-hidden />
                Engineering workflow
              </div>
              <h3 className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
                Eight stages. One quality bar.
              </h3>
              <p className="mt-1.5 max-w-xl text-xs leading-5 text-slate-600 sm:text-sm">
                Select a stage to explore the process, the AI contribution, and
                the human checks behind it.
              </p>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-[10px] font-medium text-emerald-700">
              <motion.span
                aria-hidden
                animate={reduceMotion ? undefined : { opacity: [0.45, 1, 0.45] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="size-1.5 rounded-full bg-emerald-500"
              />
              Pipeline active
            </div>
          </div>

          {/* Stage navigation */}
          <div className="border-b border-slate-200 bg-slate-50/30 px-4 py-5 sm:px-7">
            <nav aria-label="Engineering workflow stages">
              <div className="stage-rail relative hidden items-start md:grid md:grid-cols-8">
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-[6.25%] right-[6.25%] top-[19px] z-0 h-px bg-slate-200"
                >
                  {[0, 1, 2].map((particle) => (
                    <span
                      key={particle}
                      className="pipe-particle absolute left-0 top-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white opacity-0 ring-2 ring-[#FF6014]"
                      style={{
                        boxShadow: `0 0 0 2px ${ACCENT}, 0 0 10px rgba(255, 96, 20, 0.4)`,
                      }}
                    />
                  ))}
                </span>
                {WORKFLOW_STAGES.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = index === activeIdx;
                  const isComplete = index < activeIdx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => selectStage(index)}
                      aria-current={isActive ? "step" : undefined}
                      aria-label={`Stage ${stage.step}: ${stage.title}`}
                      className="stage-node group relative z-10 flex min-w-0 flex-col items-center text-center outline-none focus-visible:ring-2 focus-visible:ring-[#FF6014] focus-visible:ring-offset-4 focus-visible:ring-offset-white"
                    >
                      {index < total - 1 && (
                        <span
                          aria-hidden
                          className="absolute left-1/2 top-[19px] h-0.5 w-full bg-slate-200"
                        >
                          <motion.span
                            className="block h-full origin-left bg-[#FF6014]"
                            initial={false}
                            animate={{
                              scaleX: isComplete || isActive ? 1 : 0,
                            }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.45,
                              ease: "easeOut",
                            }}
                          />
                        </span>
                      )}
                      <span
                        className={`relative z-10 grid size-10 place-items-center rounded-xl border transition-all duration-300 ${
                          isActive
                            ? "border-[#FF6014] bg-[#FF6014] text-white shadow-md shadow-orange-500/25"
                            : isComplete
                              ? "border-orange-200 bg-orange-50 text-[#FF6014]"
                              : "border-slate-200 bg-white text-slate-400 group-hover:border-slate-300 group-hover:text-slate-600"
                        }`}
                      >
                        <Icon size={17} aria-hidden />
                        {isActive && (
                          <motion.span
                            aria-hidden
                            className="absolute -inset-1 rounded-[14px] border border-[#FF6014]/50"
                            animate={
                              reduceMotion
                                ? undefined
                                : { opacity: [0.65, 0], scale: [1, 1.28] }
                            }
                            transition={{
                              duration: 1.8,
                              repeat: Infinity,
                              ease: "easeOut",
                            }}
                          />
                        )}
                      </span>
                      <span
                        className={`mt-3 font-mono text-[9px] tracking-wider ${
                          isActive ? "font-bold text-[#FF6014]" : "text-slate-400"
                        }`}
                      >
                        {stage.step}
                      </span>
                      <span
                        className={`mt-1 max-w-[100px] px-1 text-[10px] leading-4 ${
                          isActive
                            ? "font-bold text-slate-900"
                            : "text-slate-500 group-hover:text-slate-700"
                        }`}
                      >
                        {stage.title}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1 [scrollbar-width:none] md:hidden">
                {WORKFLOW_STAGES.map((stage, index) => {
                  const Icon = stage.icon;
                  const isActive = index === activeIdx;
                  return (
                    <button
                      key={stage.step}
                      type="button"
                      onClick={() => selectStage(index)}
                      aria-current={isActive ? "step" : undefined}
                      className={`flex shrink-0 items-center gap-2 rounded-xl border px-3 py-2.5 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-300 ${
                        isActive
                          ? "border-orange-200 bg-orange-50 font-semibold text-[#FF6014]"
                          : "border-slate-200 bg-white text-slate-600"
                      }`}
                    >
                      <Icon size={14} aria-hidden />
                      <span className="font-mono text-[10px] opacity-70">
                        {stage.step}
                      </span>
                      <span>{stage.title}</span>
                    </button>
                  );
                })}
              </div>
            </nav>
          </div>

          {/* Active stage details + code */}
          <div
            className="grid lg:grid-cols-[0.88fr_1.12fr]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <div className="flex flex-col border-b border-slate-200 bg-white p-5 sm:p-7 lg:border-b-0 lg:border-r">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.step}
                  initial={{
                    opacity: 0,
                    y: reduceMotion ? 0 : 10,
                    filter: reduceMotion ? "none" : "blur(5px)",
                  }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{
                    opacity: 0,
                    y: reduceMotion ? 0 : -6,
                    filter: reduceMotion ? "none" : "blur(3px)",
                  }}
                  transition={{ duration: reduceMotion ? 0 : 0.24 }}
                  className="flex-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="grid size-11 place-items-center rounded-xl border border-orange-200 bg-orange-50 text-[#FF6014]">
                      <ActiveIcon size={20} aria-hidden />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-500">
                        Stage {active.step} / {String(total).padStart(2, "0")}
                      </p>
                      <h4 className="mt-0.5 text-lg font-bold tracking-tight text-slate-900">
                        {active.title}
                      </h4>
                    </div>
                  </div>

                  <p className="mt-5 text-sm leading-6 text-slate-600">
                    {active.howIWork}
                  </p>

                  <div className="mt-4 inline-flex max-w-full items-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-700">
                    <Cpu
                      size={14}
                      className="shrink-0 text-[#FF6014]"
                      aria-hidden
                    />
                    <span className="truncate">
                      <span className="text-slate-500">Tools </span>
                        <span className="font-medium text-slate-900">
                        {active.tool}
                      </span>
                    </span>
                  </div>

                  <div className="mt-5 space-y-4 border-t border-slate-200 pt-5">
                    <div className="flex gap-3">
                      <BrainCircuit
                        size={16}
                        className="mt-0.5 shrink-0 text-violet-600"
                        aria-hidden
                      />
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          AI contribution
                        </h5>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {active.aiRole}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <ShieldCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-emerald-600"
                        aria-hidden
                      />
                      <div>
                        <h5 className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500">
                          Human verification
                        </h5>
                        <p className="mt-1 text-xs leading-5 text-slate-600">
                          {active.guardrail}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <div className="mt-7 border-t border-slate-200 pt-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={() => selectStage(activeIdx - 1)}
                      aria-label="Previous stage"
                      className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#FF6014]"
                    >
                      <ChevronLeft size={17} />
                    </button>
                    <button
                      type="button"
                      onClick={() => selectStage(activeIdx + 1)}
                      aria-label="Next stage"
                      className="grid size-9 place-items-center rounded-lg border border-slate-200 bg-white text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#FF6014]"
                    >
                      <ChevronRight size={17} />
                    </button>
                    <span className="ml-2 font-mono text-[10px] text-slate-500">
                      {active.step} <span className="text-slate-700">/</span>{" "}
                      {String(total).padStart(2, "0")}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsAutoPlay((current) => !current)}
                    aria-pressed={isAutoPlay}
                    className="flex h-9 items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 text-[11px] font-medium text-slate-700 shadow-2xs transition-colors hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-[#FF6014]"
                  >
                    {isAutoPlay ? (
                      <Pause size={13} className="text-[#FF6014]" />
                    ) : (
                      <Play size={13} className="text-[#FF6014]" />
                    )}
                    <span>{isAutoPlay ? "Pause" : "Auto-play"}</span>
                  </button>
                </div>
                <div
                  className="mt-3 h-1 overflow-hidden rounded-full bg-slate-100"
                  aria-hidden
                >
                  {shouldAutoPlay && (
                    <motion.div
                      key={`${activeIdx}-${shouldAutoPlay}`}
                      className="h-full rounded-full bg-gradient-to-r from-[#FF6014] to-amber-500"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{
                        duration: AUTOPLAY_MS / 1000,
                        ease: "linear",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Animated code window */}
            <div className="flex min-w-0 flex-col bg-slate-950">
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.07] bg-slate-900/90 px-4 py-3 sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                  <div className="flex shrink-0 gap-1.5" aria-hidden>
                    <span className="size-2.5 rounded-full bg-rose-400/80" />
                    <span className="size-2.5 rounded-full bg-amber-300/80" />
                    <span className="size-2.5 rounded-full bg-emerald-300/80" />
                  </div>
                  <span className="h-4 w-px bg-white/10" aria-hidden />
                  <span className="flex min-w-0 items-center gap-2 truncate font-mono text-[10px] text-slate-400 sm:text-xs">
                    <Terminal
                      size={13}
                      className="shrink-0 text-orange-300"
                      aria-hidden
                    />
                    <span className="truncate">{active.file}</span>
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handleCopy}
                  className="flex shrink-0 items-center gap-1.5 rounded-md border border-white/10 bg-white/[0.04] px-2.5 py-1.5 text-[10px] font-medium text-slate-300 transition-colors hover:bg-white/[0.1] focus-visible:outline-2 focus-visible:outline-orange-300"
                  aria-label="Copy code sample"
                >
                  {copied ? (
                    <>
                      <Check size={12} className="text-emerald-300" />
                      <span className="text-emerald-200">Copied</span>
                    </>
                  ) : copyError ? (
                    <span className="text-rose-300">Copy unavailable</span>
                  ) : (
                    <>
                      <Copy size={12} />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              <div className="min-h-[285px] flex-1 overflow-x-auto px-3 py-5 sm:px-5">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.ol
                    key={active.step}
                    initial={{ opacity: 0, y: reduceMotion ? 0 : 7 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: reduceMotion ? 0 : -5 }}
                    transition={{ duration: reduceMotion ? 0 : 0.22 }}
                    className="min-w-max font-mono text-[11px] leading-[1.9] sm:text-xs"
                  >
                    {codeLines.map((line, index) => (
                      <li
                        key={`${active.step}-${index}`}
                        className="code-line flex gap-4"
                      >
                        <span
                          aria-hidden
                          className="w-5 shrink-0 select-none text-right text-slate-700"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <span className="whitespace-pre text-slate-300">
                          {renderLine(line)}
                        </span>
                      </li>
                    ))}
                  </motion.ol>
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/[0.07] px-4 py-3 text-[10px] text-slate-500 sm:px-5">
                <span className="flex items-center gap-2 text-emerald-200/80">
                  <CheckCircle2 size={13} aria-hidden />
                  Human-reviewed workflow
                </span>
                <span className="font-mono">TypeScript · Node.js</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Toolkit */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
          transition={{ duration: 0.65, delay: 0.08, ease: "easeOut" }}
          className="mt-16"
        >
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2 flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#FF6014]">
                <Layers size={13} aria-hidden />
                The toolkit
              </div>
              <h3 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                Every tool has a job.
              </h3>
            </div>
            <p className="max-w-sm text-xs leading-5 text-slate-600 sm:text-sm">
              The tools involved in the selected stage are highlighted below.
            </p>
          </div>

          <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {TOOLKIT.map((tool, index) => {
              const isInUse = active.tool.includes(tool.key);
              return (
                <motion.li
                  key={tool.name}
                  layout
                  whileHover={reduceMotion ? undefined : { y: -4 }}
                  transition={{ duration: 0.2 }}
                  className={`relative overflow-hidden rounded-2xl border p-4 transition-colors duration-300 ${
                    isInUse
                      ? "border-orange-200 bg-orange-50/70 shadow-sm"
                      : "border-slate-200/80 bg-white shadow-2xs hover:border-slate-300 hover:shadow-sm"
                  }`}
                >
                  <motion.span
                    aria-hidden
                    className="absolute inset-y-0 left-0 w-[2px] origin-top bg-gradient-to-b from-[#FF6014] to-amber-500"
                    initial={false}
                    animate={{ scaleY: isInUse ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                  <div className="flex items-start gap-3">
                    <div
                      className={`grid size-10 shrink-0 place-items-center rounded-xl border font-mono text-xs font-bold ${
                        isInUse
                          ? "border-orange-200 bg-orange-100/70 text-[#FF6014]"
                          : "border-slate-200 bg-slate-50 text-slate-600"
                      }`}
                    >
                      {tool.monogram}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-start justify-between gap-2">
                        <div>
                          <h4 className="text-sm font-bold text-slate-900">
                            {tool.name}
                          </h4>
                          <p className="mt-0.5 text-[10px] text-slate-500">
                            {tool.role}
                          </p>
                        </div>
                        <span
                          className={`rounded-full border px-2 py-1 text-[9px] ${
                            isInUse
                              ? "border-orange-200 bg-white font-medium text-[#FF6014]"
                              : "border-slate-200 bg-slate-50 text-slate-500"
                          }`}
                        >
                          {tool.tag}
                        </span>
                      </div>
                      <p className="mt-3 text-xs leading-5 text-slate-600">
                        {tool.useCase}
                      </p>
                      <AnimatePresence>
                        {isInUse && (
                          <motion.div
                            initial={{ opacity: 0, height: 0, y: 4 }}
                            animate={{ opacity: 1, height: "auto", y: 0 }}
                            exit={{ opacity: 0, height: 0, y: 4 }}
                            transition={{ duration: 0.2 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-[#FF6014]">
                              <Activity size={12} aria-hidden />
                              Active in stage {active.step}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                  <span className="pointer-events-none absolute -bottom-7 -right-3 font-mono text-7xl font-bold text-slate-100">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                </motion.li>
              );
            })}
          </ul>
        </motion.div>

        {/* Human ownership */}
        <motion.div
          variants={reveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.16 }}
          transition={{ duration: 0.65, ease: "easeOut" }}
          className="relative mt-16 overflow-hidden rounded-[1.6rem] border border-orange-200 bg-gradient-to-br from-orange-50/80 via-white to-amber-50/40 p-5 shadow-sm sm:p-8"
        >
          <div
            aria-hidden
            className="absolute -right-20 -top-28 size-72 rounded-full border border-orange-200/50"
          />
          <div
            aria-hidden
            className="absolute -right-8 -top-16 size-48 rounded-full border border-orange-200/50"
          />
          <div className="relative grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] text-[#FF6014] shadow-2xs">
                <BadgeCheck size={13} aria-hidden />
                Human-in-the-loop
              </div>
              <h3 className="max-w-xl text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl">
                AI can help build it.
                <br />
                People own what ships.
              </h3>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
                AI is a productivity multiplier—not a substitute for
                engineering judgment. Architecture, code review, security, and
                release validation remain deliberate parts of the process.
              </p>
              <div className="mt-5 flex flex-wrap items-center gap-2 text-[11px] font-medium">
                {["AI proposes", "I audit", "CI enforces"].map(
                  (label, index, items) => (
                    <React.Fragment key={label}>
                      <span className="rounded-lg border border-slate-200 bg-white px-3 py-2 font-semibold text-slate-800 shadow-2xs">
                        {label}
                      </span>
                      {index < items.length - 1 && (
                        <ArrowRight
                          size={13}
                          className="text-[#FF6014]"
                          aria-hidden
                        />
                      )}
                    </React.Fragment>
                  ),
                )}
              </div>
            </div>

            <ul className="space-y-2.5">
              {OWNERSHIP_CHECKS.map((text, index) => (
                <motion.li
                  key={text}
                  initial={{
                    opacity: 0,
                    x: reduceMotion ? 0 : 14,
                  }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: reduceMotion ? 0 : 0.4,
                    delay: index * 0.08,
                  }}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 text-xs font-semibold text-slate-800 shadow-2xs"
                >
                  <CheckCircle2
                    size={17}
                    className="shrink-0 text-emerald-600"
                    aria-hidden
                  />
                  <span>{text}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-between gap-3 border-t border-slate-200 pt-5 text-[10px] text-slate-500">
          <span className="flex items-center gap-2">
            <span className="size-1.5 rounded-full bg-[#FF6014]" />
            Built with intention
          </span>
          <span className="font-mono">PLAN → BUILD → VERIFY → SHIP</span>
        </div>
      </div>
    </section>
  );
}
