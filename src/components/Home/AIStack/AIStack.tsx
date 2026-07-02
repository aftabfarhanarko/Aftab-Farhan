"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Cpu, 
  Workflow, 
  CheckCircle,
  Play
} from "lucide-react";

// AI Tools configuration referencing images in public directory
const AI_TOOLS = [
  {
    id: "antigravity",
    name: "Google Antigravity",
    type: "Agentic Coding Assistant",
    description: "DeepMind's advanced agentic programmer. My primary partner for codebase-wide editing, automated refactoring, API integration, and production-grade validation. Its multi-file reasoning is incredibly reliable for complex modifications.",
    color: "#4285F4", // Google Blue
    accentColor: "from-blue-600 to-indigo-600",
    usage: 95,
    role: "Codebase Refactoring & API Auditing",
    logoUrl: "/antigravity-logo.png"
  },
  {
    id: "cursor",
    name: "Cursor AI",
    type: "AI-First Code Editor",
    description: "My go-to editor for daily development. Inline autocomplete (Copilot++), codebase semantic indexing, and chat-assisted edits allow me to write code at maximum velocity.",
    color: "#00E5FF", // Neon Cyan
    accentColor: "from-cyan-500 to-blue-500",
    usage: 98,
    role: "Inline Completion & Codebase Editing",
    logoUrl: "/cursor-app-icon.png"
  },
  {
    id: "deepseek",
    name: "DeepSeek AI",
    type: "Reasoning & Mathematical LLM",
    description: "A highly intelligent mathematical and coding model. Chosen for writing deep backend algorithms, microservice query planning, and complex database structures.",
    color: "#0066FF", // Blue
    accentColor: "from-blue-500 to-sky-400",
    usage: 92,
    role: "Complex Algorithm Design & SQL Optimization",
    logoUrl: "/deepseek-logo-icon.png"
  },
  {
    id: "grok",
    name: "Grok AI",
    type: "Real-time Logic Assistant",
    description: "xAI's fast reasoning model. Outstanding at tracing complex errors, analyzing system logs, and brainstorming developer architectural paths.",
    color: "#EFEFEF", // White/Slate
    accentColor: "from-slate-700 to-slate-900",
    usage: 90,
    role: "Trace Debugging & Architectural Feedback",
    logoUrl: "/grok.png"
  },
  {
    id: "trae",
    name: "ByteDance Trae",
    type: "Adaptive Development IDE",
    description: "Highly fluid IDE for navigating large, nested Next.js and React workspaces. Its compiler-level code suggestions are extremely responsive and comfortable to work with.",
    color: "#FF3366", // Neon Rose/Red
    accentColor: "from-rose-500 to-orange-500",
    usage: 88,
    role: "Multi-file Navigation & Error Tracing",
    logoUrl: "/trae.jpg"
  },
  {
    id: "windsurf",
    name: "Windsurf IDE",
    type: "Agentic Flow Workspace",
    description: "Codeium's agentic workspace. Extremely convenient for setting up initial boilerplates, installing package systems, and running dev-server checks completely autonomously.",
    color: "#8B5CF6", // Purple / Violet
    accentColor: "from-purple-500 to-indigo-600",
    usage: 85,
    role: "Autopiloted Scaffolding & Rapid Boilerplate",
    logoUrl: "/Windsurf.png"
  }
];

// Workflow stages configuration using the 6 tools
const WORKFLOW_STAGES = [
  {
    step: 1,
    title: "System Architecture",
    toolId: "deepseek",
    description: "Architect database schemas, plan API routes, and write optimized query pipelines.",
    actions: ["SQL Schema Drafts", "REST Endpoints spec", "System Sequence design"]
  },
  {
    step: 2,
    title: "Agentic Boilerplate Setup",
    toolId: "windsurf",
    description: "Autonomously set up workspace directories, install dependencies, and configure environment templates.",
    actions: ["Initial Git config", "Dependencies install", "Config files (.env, tsconfig)"]
  },
  {
    step: 3,
    title: "Rapid Frontend Layouts",
    toolId: "cursor",
    description: "Convert high-fidelity design specifications into clean Next.js/Tailwind components and responsive layouts.",
    actions: ["Tailwind Component structure", "State Management wires", "Responsive Grid styling"]
  },
  {
    step: 4,
    title: "Trace Debugging & Logs",
    toolId: "grok",
    description: "Examine runtime logs, trace environment inconsistencies, and handle compiler error threads.",
    actions: ["System log analysis", "Environment setup auditing", "Package conflict resolution"]
  },
  {
    step: 5,
    title: "Agentic Codebase Refactoring",
    toolId: "antigravity",
    description: "Analyze workspace edits, execute secure route validations, write automated unit tests, and fix TypeScript lints.",
    actions: ["API Endpoint lockdown (NextAuth)", "Automatic unit tests writing", "Strict type-checking validation"]
  },
  {
    step: 6,
    title: "Final Build Validation",
    toolId: "trae",
    description: "Finalize build compilation, audit build-time optimization warnings, and test overall routing stability.",
    actions: ["Build trace debugging", "Static site generation validation", "Vercel dry run checks"]
  }
];

export default function AIStack() {
  const [activeAI, setActiveAI] = useState<string>("antigravity");
  const [activeStep, setActiveStep] = useState<number>(1);
  const [isPlayingWorkflow, setIsPlayingWorkflow] = useState<boolean>(true);

  // Auto-play workflow timeline simulation
  useEffect(() => {
    if (!isPlayingWorkflow) return;
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        const next = prev === 6 ? 1 : prev + 1;
        const currentStage = WORKFLOW_STAGES.find(s => s.step === next);
        if (currentStage) {
          setActiveAI(currentStage.toolId);
        }
        return next;
      });
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlayingWorkflow]);

  const handleStepClick = (stepNum: number) => {
    setIsPlayingWorkflow(false);
    setActiveStep(stepNum);
    const stage = WORKFLOW_STAGES.find(s => s.step === stepNum);
    if (stage) {
      setActiveAI(stage.toolId);
    }
  };

  const selectedAIInfo = AI_TOOLS.find((tool) => tool.id === activeAI) || AI_TOOLS[0];
  const selectedStepInfo = WORKFLOW_STAGES.find((s) => s.step === activeStep) || WORKFLOW_STAGES[0];

  return (
    <section id="ai-stack" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      
      {/* Title */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.03] mb-3">
            <Cpu className="w-3.5 h-3.5 text-black/50 dark:text-white/50" />
            <span className="text-[10px] font-bold text-black/45 dark:text-white/45 uppercase tracking-widest">
              Advanced Tooling
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
            AI-Native <span className="text-black/35 dark:text-white/35">Workflow</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-black/50 dark:text-white/50 max-w-md md:text-right leading-relaxed">
          Leveraging cutting-edge agentic coding assistants and large reasoning models to accelerate software lifecycle, write secure APIs, and implement premium frontends at 10x velocity.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: 6 AI Tools Grid (8 Cols) */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {AI_TOOLS.map((tool) => {
            const isActive = activeAI === tool.id;
            return (
              <motion.div
                key={tool.id}
                onClick={() => {
                  setActiveAI(tool.id);
                  // Find step matches this tool to keep workflow in sync
                  const matchingStep = WORKFLOW_STAGES.find(s => s.toolId === tool.id);
                  if (matchingStep) {
                    setActiveStep(matchingStep.step);
                  }
                  setIsPlayingWorkflow(false);
                }}
                className={`relative p-5 rounded-2xl border text-left cursor-pointer transition-all duration-300 overflow-hidden flex flex-col justify-between h-48 group ${
                  isActive 
                    ? "border-black dark:border-white bg-black/[0.02] dark:bg-white/[0.02]" 
                    : "border-black/10 dark:border-white/10 bg-transparent hover:border-black/20 dark:hover:border-white/20 hover:bg-black/[0.01] dark:hover:bg-white/[0.01]"
                }`}
                style={{
                  boxShadow: isActive ? `0 10px 30px -15px ${tool.color}` : "none"
                }}
                whileHover={{ y: -4 }}
              >
                {/* Glowing brand highlight in card */}
                {isActive && (
                  <div 
                    className="absolute -right-10 -top-10 w-28 h-28 rounded-full blur-2xl transition-all duration-500 opacity-70"
                    style={{ backgroundColor: tool.color }}
                  />
                )}

                {/* Top Section */}
                <div className="flex items-start justify-between relative z-10">
                  <div className="p-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/5 dark:border-white/5 flex items-center justify-center w-14 h-14">
                    <img 
                      src={tool.logoUrl} 
                      alt={tool.name} 
                      className="w-10 h-10 object-contain rounded-lg" 
                    />
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-bold text-black/40 dark:text-white/40 uppercase block">
                      Comfort
                    </span>
                    <span className="text-lg font-black text-foreground">
                      {tool.usage}%
                    </span>
                  </div>
                </div>

                {/* Bottom Section */}
                <div className="relative z-10 mt-4">
                  <span className="text-[10px] font-bold tracking-wider uppercase opacity-40 block mb-0.5">
                    {tool.type}
                  </span>
                  <h3 className="text-base font-bold text-foreground group-hover:text-black dark:group-hover:text-white transition-colors">
                    {tool.name}
                  </h3>
                  <div className="mt-2 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden w-full">
                    <motion.div 
                      className={`h-full bg-gradient-to-r ${tool.accentColor}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${tool.usage}%` }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                    />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Selected AI Highlight Card (4 Cols) */}
        <div className="lg:col-span-4 h-full">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedAIInfo.id}
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.01] dark:bg-white/[0.02] relative overflow-hidden flex flex-col h-full justify-between min-h-[350px]"
            >
              {/* Decorative brand background circle */}
              <div 
                className="absolute -left-16 -bottom-16 w-48 h-48 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: selectedAIInfo.color }}
              />

              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2.5 rounded-2xl bg-black/[0.04] dark:bg-white/[0.04] border border-black/5 dark:border-white/5 flex items-center justify-center w-16 h-16">
                    <img 
                      src={selectedAIInfo.logoUrl} 
                      alt={selectedAIInfo.name} 
                      className="w-12 h-12 object-contain rounded-lg" 
                    />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-foreground leading-tight">
                      {selectedAIInfo.name}
                    </h4>
                    <span className="text-xs text-black/50 dark:text-white/50">
                      {selectedAIInfo.type}
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-left">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 block mb-1">
                      Primary Role in Stack
                    </span>
                    <p className="text-sm font-semibold text-foreground">
                      {selectedAIInfo.role}
                    </p>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-black/40 dark:text-white/40 block mb-1">
                      Capabilities & Integration
                    </span>
                    <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed">
                      {selectedAIInfo.description}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-black/5 dark:border-white/5 flex items-center justify-between text-xs">
                <span className="text-black/40 dark:text-white/40">Status</span>
                <span className="flex items-center gap-1.5 font-bold text-emerald-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  Active Tool
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

      {/* ────────────────── SECTION 2: ANIMATED WORKFLOW TIMELINE ────────────────── */}
      
      <div className="mt-12 sm:mt-16 border border-black/10 dark:border-white/10 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] p-6 sm:p-8">
        
        {/* Workflow Title bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
              <Workflow className="w-4 h-4 text-foreground" />
            </div>
            <div className="text-left">
              <h3 className="text-lg font-bold text-foreground">
                6-Stage AI Collaborative Pipeline
              </h3>
              <p className="text-xs text-black/45 dark:text-white/45">
                The continuous lifecycle simulation showing how agent capabilities interconnect.
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsPlayingWorkflow(!isPlayingWorkflow)}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
              isPlayingWorkflow 
                ? "bg-black text-white dark:bg-white dark:text-black border-transparent" 
                : "bg-transparent text-foreground border-black/10 dark:border-white/10 hover:bg-black/5 dark:hover:bg-white/5"
            }`}
          >
            <Play className={`w-3 h-3 ${isPlayingWorkflow ? "animate-spin" : ""}`} />
            {isPlayingWorkflow ? "Simulation Playing" : "Resume Auto-Play"}
          </button>
        </div>

        {/* Timeline Path Grid */}
        <div className="relative">
          {/* Connecting Path background */}
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-black/5 dark:bg-white/5 -translate-y-1/2 hidden md:block z-0" />
          
          <div className="grid md:grid-cols-6 gap-4 relative z-10">
            {WORKFLOW_STAGES.map((stage) => {
              const isCurrent = activeStep === stage.step;
              const associatedTool = AI_TOOLS.find(t => t.id === stage.toolId);
              
              return (
                <button
                  key={stage.step}
                  onClick={() => handleStepClick(stage.step)}
                  className={`flex flex-col items-center p-4 rounded-xl border transition-all text-center h-full relative cursor-pointer group ${
                    isCurrent 
                      ? "border-black dark:border-white bg-black/[0.03] dark:bg-white/[0.04] scale-105" 
                      : "border-black/5 dark:border-white/5 bg-transparent hover:border-black/10 dark:hover:border-white/10"
                  }`}
                >
                  {/* Step Badge */}
                  <span 
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mb-3 border transition-colors ${
                      isCurrent
                        ? "bg-black text-white dark:bg-white dark:text-black border-transparent"
                        : "bg-black/5 text-black/50 dark:bg-white/5 dark:text-white/50 border-black/5 dark:border-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10"
                    }`}
                  >
                    {stage.step}
                  </span>

                  {/* Stage Title */}
                  <h5 className="text-xs sm:text-sm font-bold text-foreground mb-1 leading-tight group-hover:text-black dark:group-hover:text-white">
                    {stage.title}
                  </h5>

                  {/* Mini Tool Tag */}
                  {associatedTool && (
                    <span 
                      className="text-[9px] font-bold px-1.5 py-0.5 rounded border mt-auto block"
                      style={{ 
                        color: associatedTool.color, 
                        borderColor: `${associatedTool.color}33`,
                        backgroundColor: `${associatedTool.color}11`
                      }}
                    >
                      {associatedTool.name}
                    </span>
                  )}

                  {/* Active Indicator bar */}
                  {isCurrent && (
                    <motion.div 
                      className="absolute bottom-0 left-0 right-0 h-1 bg-foreground rounded-b-xl"
                      layoutId="activeBar"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Detailed Workflow Step Card */}
        <div className="mt-8 pt-6 border-t border-black/5 dark:border-white/5">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="grid md:grid-cols-3 gap-6 text-left items-center"
            >
              <div className="md:col-span-2">
                <span className="text-[10px] font-black tracking-widest text-black/40 dark:text-white/40 uppercase block mb-1">
                  CURRENT STAGE DETAILS (STAGE {selectedStepInfo.step} OF 6)
                </span>
                <h4 className="text-xl font-bold text-foreground mb-2">
                  {selectedStepInfo.title}
                </h4>
                <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-2xl">
                  {selectedStepInfo.description}
                </p>
              </div>

              <div>
                <span className="text-[10px] font-black tracking-widest text-black/40 dark:text-white/40 uppercase block mb-2.5">
                  AUTOMATED OUTPUTS & ACTIONS
                </span>
                <ul className="space-y-1.5">
                  {selectedStepInfo.actions.map((act, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-black/70 dark:text-white/70">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                      <span>{act}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

      </div>

    </section>
  );
}
