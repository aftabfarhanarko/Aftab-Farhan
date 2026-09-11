"use client";
import React, { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { AI_TOOLS, WORKFLOW_STAGES } from "./aiData";
import ToolCard from "./ToolCard";
import AIHighlightCard from "./AIHighlightCard";
import AIPipeline from "./AIPipeline";

export default function AIStack() {
  const [activeAI, setActiveAI] = useState<string>("deepseek");
  const [isPlayingWorkflow, setIsPlayingWorkflow] = useState(true);
  const [activeStep, setActiveStep] = useState(1);

  // Sync active AI tool when stepping through the pipeline
  const handleStepClick = useCallback((stepNum: number) => {
    setActiveStep(stepNum);
    const stage = WORKFLOW_STAGES.find((s) => s.step === stepNum);
    if (stage) {
      setActiveAI(stage.toolId);
    }
  }, []);

  // Sync active pipeline stage when selecting an AI tool card manually
  const handleToolClick = useCallback((toolId: string) => {
    setActiveAI(toolId);
    const stage = WORKFLOW_STAGES.find((s) => s.toolId === toolId);
    if (stage) {
      setActiveStep(stage.step);
    }
    // Pause auto-play so user can inspect the selected tool
    setIsPlayingWorkflow(false);
  }, []);

  const selectedAIInfo =
    AI_TOOLS.find((tool) => tool.id === activeAI) || AI_TOOLS[0];

  const selectedStepInfo =
    WORKFLOW_STAGES.find((s) => s.step === activeStep) || WORKFLOW_STAGES[0];

  return (
    <section
      id="ai-stack"
      className="relative mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0 bg-transparent py-6 lg:py-0"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left mb-10 gap-4"
      >
        <div className="flex flex-col items-center md:items-start text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-orange-500/20 bg-orange-500/10 mb-3">
            <Cpu className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">
              Advanced Tooling
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            AI-Native <span className="text-orange-600">Workflow</span>
          </h2>
        </div>
        <p className="text-base sm:text-lg text-slate-600 max-w-md text-center md:text-right leading-relaxed font-medium">
          Leveraging agentic coding systems and reasoning models to accelerate
          software lifecycle development, write secure APIs, and build premium layouts at speed.
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 lg:gap-8 items-start">
        {/* Left: AI Tools Grid (8 Cols) */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
          {AI_TOOLS.map((tool, i) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={i}
              isActive={activeAI === tool.id}
              onClick={() => handleToolClick(tool.id)}
            />
          ))}
        </div>

        {/* Right: Selected AI Highlight Card (4 Cols) */}
        <AIHighlightCard selectedAIInfo={selectedAIInfo} />
      </div>

      {/* 6-Stage Collaborative Pipeline Simulator */}
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