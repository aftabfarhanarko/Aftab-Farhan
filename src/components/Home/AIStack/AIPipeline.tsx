"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, Play } from "lucide-react";
import StepCard from "./StepCard";

interface StepInfo {
  step: number;
  title: string;
  toolId: string;
  description: string;
  actions: string[];
}

interface Tool {
  id: string;
  name: string;
  color: string;
}

interface AIPipelineProps {
  isPlayingWorkflow: boolean;
  setIsPlayingWorkflow: (val: boolean) => void;
  activeStep: number;
  handleStepClick: (stepNum: number) => void;
  selectedStepInfo: StepInfo;
  WORKFLOW_STAGES: StepInfo[];
  AI_TOOLS: Tool[];
}

export default function AIPipeline({
  isPlayingWorkflow,
  setIsPlayingWorkflow,
  activeStep,
  handleStepClick,
  selectedStepInfo,
  WORKFLOW_STAGES,
  AI_TOOLS,
}: AIPipelineProps) {
  return (
    <div className="mt-12 sm:mt-16 border border-black/10 dark:border-white/10 rounded-2xl bg-black/[0.01] dark:bg-white/[0.01] p-6 sm:p-8">
      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-black/[0.05] dark:bg-white/[0.05] border border-black/5 dark:border-white/5">
            <Workflow className="w-4 h-4 text-foreground" />
          </div>
          <div className="text-left">
            <h3 className="text-lg font-bold text-foreground">6-Stage AI Collaborative Pipeline</h3>
            <p className="text-xs text-black/45 dark:text-white/45">The continuous lifecycle simulation showing how agent capabilities interconnect.</p>
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
                  isCurrent ? "border-transparent bg-transparent scale-105" : "border-black/5 dark:border-white/5 bg-transparent hover:border-black/10 dark:hover:border-white/10"
                }`}
                style={{
                  borderColor: isCurrent ? associatedTool?.color : undefined,
                  boxShadow: isCurrent && associatedTool ? `0 0 15px -3px ${associatedTool.color}25` : undefined
                }}
              >
                <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-black mb-3 border transition-colors ${
                  isCurrent ? "text-white border-transparent" : "bg-black/5 text-black/50 dark:bg-white/5 dark:text-white/50 border-black/5 dark:border-white/5 group-hover:bg-black/10 dark:group-hover:bg-white/10"
                }`} style={{ backgroundColor: isCurrent ? associatedTool?.color : undefined }}>
                  {stage.step}
                </span>
                <h5 className="text-xs sm:text-sm font-bold text-foreground mb-1 leading-tight group-hover:text-black dark:group-hover:text-white">{stage.title}</h5>
                {associatedTool && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded border mt-auto block" style={{ color: associatedTool.color, borderColor: `${associatedTool.color}33`, backgroundColor: `${associatedTool.color}11` }}>
                    {associatedTool.name}
                  </span>
                )}
                {isCurrent && <motion.div className="absolute bottom-0 left-0 right-0 h-1 rounded-b-xl" style={{ backgroundColor: associatedTool?.color }} layoutId="activeBar" />}
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
          >
            <StepCard stepInfo={selectedStepInfo} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
