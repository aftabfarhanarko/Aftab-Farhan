"use client";
import React, { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Workflow, Play, Pause, ChevronRight } from "lucide-react";
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
  role: string;
  type: string;
  shortName?: string;
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
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Cycle steps automatically when playing
  useEffect(() => {
    if (isPlayingWorkflow) {
      timerRef.current = setInterval(() => {
        const nextStep = activeStep === 6 ? 1 : activeStep + 1;
        handleStepClick(nextStep);
      }, 5000); // 5 seconds per step
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlayingWorkflow, activeStep, handleStepClick]);

  return (
    <div className="mt-12 sm:mt-16 border border-white/[0.06] rounded-[2.5rem] bg-[#0A0A0F]/60 backdrop-blur-md p-6 sm:p-8 relative overflow-hidden">
      {/* Background soft ambient lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-violet-600/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-violet-400">
            <Workflow className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
              6-Stage Collaborative AI Pipeline
            </h3>
            <p className="text-xs text-white/40 font-medium">
              Simulation of tools working in series to deliver quality code at 10x speed.
            </p>
          </div>
        </div>

        {/* Auto Play Controller */}
        <button
          onClick={() => setIsPlayingWorkflow(!isPlayingWorkflow)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
            isPlayingWorkflow
              ? "bg-white text-black border-transparent shadow-lg shadow-white/5"
              : "bg-white/5 text-white/70 border-white/10 hover:bg-white/10 hover:text-white"
          }`}
        >
          {isPlayingWorkflow ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Pause Sim</span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Play Sim</span>
            </>
          )}
        </button>
      </div>

      {/* Timeline Flow System */}
      <div className="relative mb-10">
        {/* Horizontal Connecting Tube (Desktop Only) */}
        <div className="absolute top-7 left-[8%] right-[8%] h-1 bg-white/[0.04] rounded-full hidden lg:block z-0 overflow-hidden">
          {/* Laser Pulse Traveling along the line */}
          <motion.div
            animate={{
              left: ["-10%", "110%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-violet-500/50 to-transparent absolute-left-0"
          />
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {WORKFLOW_STAGES.map((stage) => {
            const isCurrent = activeStep === stage.step;
            const associatedTool = AI_TOOLS.find((t) => t.id === stage.toolId);
            const toolColor = associatedTool?.color || "#ffffff";

            return (
              <div
                key={stage.step}
                className="flex flex-col items-center group/btn"
              >
                <button
                  onClick={() => handleStepClick(stage.step)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black transition-all relative border outline-none ${
                    isCurrent
                      ? "border-transparent text-white"
                      : "bg-white/[0.02] border-white/[0.06] text-white/30 hover:border-white/15 hover:text-white/60"
                  }`}
                  style={{
                    backgroundColor: isCurrent ? `${toolColor}20` : undefined,
                    borderColor: isCurrent ? toolColor : undefined,
                    boxShadow: isCurrent
                      ? `0 0 25px -5px ${toolColor}40, inset 0 0 10px 0 ${toolColor}30`
                      : undefined,
                  }}
                >
                  {/* Glowing core pulse inside active node */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute -inset-0.5 rounded-2xl filter blur-sm pointer-events-none"
                      style={{ border: `2px solid ${toolColor}` }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                  )}

                  {/* Stage number */}
                  <span className="relative z-10">{stage.step}</span>
                </button>

                {/* Info Text */}
                <div className="mt-3 text-center flex flex-col items-center">
                  <h5 className="text-[11px] sm:text-xs font-black text-white/80 group-hover/btn:text-white transition-colors tracking-tight line-clamp-1 max-w-[120px]">
                    {stage.title}
                  </h5>
                  {associatedTool && (
                    <span
                      className="text-[9px] font-black uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded font-mono border"
                      style={{
                        color: toolColor,
                        borderColor: `${toolColor}22`,
                        backgroundColor: `${toolColor}08`,
                      }}
                    >
                      {associatedTool.shortName || associatedTool.name}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Detailed Current Step Details */}
      <div className="relative pt-8 border-t border-white/[0.06] z-10">
        {/* Sim Progress Indicator */}
        {isPlayingWorkflow && (
          <div className="absolute top-0 left-0 right-0 h-[1.5px] bg-white/[0.02] overflow-hidden">
            <motion.div
              key={activeStep}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full"
              style={{
                backgroundColor:
                  AI_TOOLS.find((t) => t.id === selectedStepInfo.toolId)?.color ||
                  "#8b5cf6",
              }}
            />
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <StepCard stepInfo={selectedStepInfo} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
