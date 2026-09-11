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
    <div className="mt-12 sm:mt-16 border border-slate-200 rounded-[2.5rem] bg-white p-6 sm:p-8 relative overflow-hidden shadow-xl">
      {/* Background soft ambient lights */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-orange-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Title bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-10 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-600">
            <Workflow className="w-5 h-5" />
          </div>
          <div className="text-left">
            <h3 className="text-base sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              6-Stage Collaborative AI Pipeline
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Simulation of tools working in series to deliver quality code at high speed.
            </p>
          </div>
        </div>

        {/* Auto Play Controller */}
        <button
          onClick={() => setIsPlayingWorkflow(!isPlayingWorkflow)}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all border cursor-pointer ${
            isPlayingWorkflow
              ? "bg-orange-600 text-white border-transparent shadow-md hover:bg-orange-700"
              : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200 hover:text-slate-900"
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
        <div className="absolute top-7 left-[8%] right-[8%] h-1 bg-slate-100 rounded-full hidden lg:block z-0 overflow-hidden">
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
            className="absolute top-0 w-20 h-full bg-gradient-to-r from-transparent via-orange-500/60 to-transparent"
          />
        </div>

        {/* Interactive Steps Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 relative z-10">
          {WORKFLOW_STAGES.map((stage) => {
            const isCurrent = activeStep === stage.step;
            const associatedTool = AI_TOOLS.find((t) => t.id === stage.toolId);
            const toolColor = associatedTool?.color || "#EA580C";

            return (
              <div
                key={stage.step}
                className="flex flex-col items-center group/btn"
              >
                <button
                  onClick={() => handleStepClick(stage.step)}
                  className={`w-14 h-14 rounded-2xl flex items-center justify-center text-sm font-black transition-all relative border outline-none ${
                    isCurrent
                      ? "border-transparent text-slate-900 shadow-md"
                      : "bg-slate-50 border-slate-200 text-slate-400 hover:border-slate-300 hover:text-slate-700"
                  }`}
                  style={{
                    backgroundColor: isCurrent ? `${toolColor}15` : undefined,
                    borderColor: isCurrent ? toolColor : undefined,
                    boxShadow: isCurrent
                      ? `0 0 20px -3px ${toolColor}35`
                      : undefined,
                  }}
                >
                  {/* Glowing core pulse inside active node */}
                  {isCurrent && (
                    <motion.div
                      layoutId="activeGlow"
                      className="absolute -inset-0.5 rounded-2xl pointer-events-none"
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
                  <span className="relative z-10 font-bold">{stage.step}</span>
                </button>

                {/* Info Text */}
                <div className="mt-3 text-center flex flex-col items-center">
                  <h5 className="text-[11px] sm:text-xs font-black text-slate-800 group-hover/btn:text-orange-600 transition-colors tracking-tight line-clamp-1 max-w-[120px]">
                    {stage.title}
                  </h5>
                  {associatedTool && (
                    <span
                      className="text-[9px] font-black uppercase tracking-wider mt-1 px-1.5 py-0.5 rounded font-mono border"
                      style={{
                        color: toolColor,
                        borderColor: `${toolColor}30`,
                        backgroundColor: `${toolColor}10`,
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
      <div className="relative pt-8 border-t border-slate-100 z-10">
        {/* Sim Progress Indicator */}
        {isPlayingWorkflow && (
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-slate-100 overflow-hidden">
            <motion.div
              key={activeStep}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 5, ease: "linear" }}
              className="h-full"
              style={{
                backgroundColor:
                  AI_TOOLS.find((t) => t.id === selectedStepInfo.toolId)?.color ||
                  "#EA580C",
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
