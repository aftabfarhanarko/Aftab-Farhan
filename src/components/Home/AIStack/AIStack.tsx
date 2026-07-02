"use client";
import React, { useState, useEffect } from "react";
import { Cpu } from "lucide-react";
import { AI_TOOLS, WORKFLOW_STAGES } from "./aiData";
import ToolCard from "./ToolCard";
import AIHighlightCard from "./AIHighlightCard";
import AIPipeline from "./AIPipeline";

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
      <div className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left mb-10 gap-4">
        <div className="flex flex-col items-center md:items-start">
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
        <p className="text-xs sm:text-sm text-black/50 dark:text-white/50 max-w-md text-center md:text-right leading-relaxed">
          Leveraging cutting-edge agentic coding assistants and large reasoning models to accelerate software lifecycle, write secure APIs, and implement premium frontends at 10x velocity.
        </p>
      </div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: 6 AI Tools Grid (8 Cols) */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {AI_TOOLS.map((tool) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              isActive={activeAI === tool.id}
              onClick={() => {
                setActiveAI(tool.id);
                const matchingStep = WORKFLOW_STAGES.find(s => s.toolId === tool.id);
                if (matchingStep) {
                  setActiveStep(matchingStep.step);
                }
                setIsPlayingWorkflow(false);
              }}
            />
          ))}
        </div>

        {/* Right: Selected AI Highlight Card (4 Cols) */}
        <AIHighlightCard selectedAIInfo={selectedAIInfo} />
      </div>

      {/* ────────────────── SECTION 2: ANIMATED WORKFLOW TIMELINE ────────────────── */}
      <AIPipeline
        isPlayingWorkflow={isPlayingWorkflow}
        setIsPlayingWorkflow={setIsPlayingWorkflow}
        activeStep={activeStep}
        handleStepClick={handleStepClick}
        selectedStepInfo={selectedStepInfo}
        WORKFLOW_STAGES={WORKFLOW_STAGES}
        AI_TOOLS={AI_TOOLS}
      />
    </section>
  );
}
