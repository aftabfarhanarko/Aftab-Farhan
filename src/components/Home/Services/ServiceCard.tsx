"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Workflow } from "lucide-react";

interface Stage {
  id: string;
  label: string;
  sub: string;
  logoUrl: string;
  color: string;
}

const STAGES: Stage[] = [
  {
    id: "code",
    label: "Version Control",
    sub: "Git",
    logoUrl: "https://cdn.simpleicons.org/git/F05032",
    color: "#F05032",
  },
  {
    id: "docker",
    label: "Containerize",
    sub: "Docker",
    logoUrl: "https://cdn.simpleicons.org/docker/2496ED",
    color: "#2496ED",
  },
  {
    id: "cicd",
    label: "CI / CD Pipeline",
    sub: "GitLab",
    logoUrl: "https://cdn.simpleicons.org/gitlab/FC6D26",
    color: "#FC6D26",
  },
  {
    id: "cloud",
    label: "Cloud Deploy",
    sub: "AWS",
    logoUrl: "https://cdn.simpleicons.org/amazonaws/FF9900",
    color: "#FF9900",
  },
];

export default function DevOpsWorkflow() {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % STAGES.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mb-12 p-6 sm:p-8 rounded-[2rem] bg-[#0E0E10]/95 border border-white/[0.06] overflow-hidden">
      {/* Ambient background glow that shifts with the active stage */}
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        animate={{ backgroundColor: STAGES[activeStep].color, opacity: [0.1, 0.16, 0.1] }}
        transition={{ backgroundColor: { duration: 0.6 }, opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-8 sm:mb-10">
        <div className="w-9 h-9 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0">
          <Workflow size={16} className="text-white/60" />
        </div>
        <div>
          <p className="text-sm font-bold text-white uppercase tracking-wider">
            Deployment Workflow
          </p>
          <p className="text-[11px] text-white/40 font-medium">
            How I ship code to production, end to end
          </p>
        </div>
      </div>

      {/* Pipeline */}
      <div className="relative z-10 flex flex-col sm:flex-row items-stretch sm:items-center gap-0">
        {STAGES.map((stage, i) => {
          const isActive = i === activeStep;
          const isPast = i < activeStep;

          return (
            <React.Fragment key={stage.id}>
              {/* Node */}
              <motion.div
                className="flex sm:flex-col items-center sm:items-center gap-4 sm:gap-3 sm:w-32 sm:text-center"
                animate={{ opacity: isActive || isPast ? 1 : 0.45 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative shrink-0">
                  {/* Pulsing ring when active */}
                  <AnimatePresence>
                    {isActive && (
                      <motion.span
                        className="absolute inset-0 rounded-2xl"
                        style={{ boxShadow: `0 0 0 2px ${stage.color}` }}
                        initial={{ opacity: 0.7, scale: 1 }}
                        animate={{ opacity: 0, scale: 1.6 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeOut" }}
                      />
                    )}
                  </AnimatePresence>

                  <motion.div
                    className="relative w-14 h-14 rounded-2xl bg-white border flex items-center justify-center shadow-md"
                    animate={{
                      borderColor: isActive || isPast ? `${stage.color}55` : "rgba(255,255,255,0.08)",
                      boxShadow: isActive
                        ? `0 0 0 2px ${stage.color}45, 0 10px 24px -8px ${stage.color}55`
                        : "0 0 0 0px transparent",
                      scale: isActive ? 1.06 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={stage.logoUrl} alt={stage.sub} className="w-8 h-8 object-contain" />
                  </motion.div>
                </div>

                <div className="text-left sm:text-center">
                  <p
                    className="text-xs font-bold transition-colors duration-300"
                    style={{ color: isActive ? stage.color : isPast ? "#ffffff" : "rgba(255,255,255,0.5)" }}
                  >
                    {stage.sub}
                  </p>
                  <p className="text-[10px] text-white/35 font-medium uppercase tracking-wide">
                    {stage.label}
                  </p>
                </div>
              </motion.div>

              {/* Connector */}
              {i < STAGES.length - 1 && (
                <div className="relative flex-1 min-w-[24px] sm:min-w-0 h-8 sm:h-[2px] sm:mt-[-24px] mx-0 sm:mx-2 self-stretch sm:self-auto">
                  {/* vertical line for mobile, horizontal for desktop */}
                  <div className="absolute left-[27px] sm:left-0 top-0 sm:top-1/2 w-[2px] sm:w-full h-full sm:h-[2px] bg-white/[0.06] sm:-translate-y-1/2" />
                  {/* progress fill */}
                  <motion.div
                    className="absolute left-[27px] sm:left-0 top-0 sm:top-1/2 w-[2px] sm:w-full sm:-translate-y-1/2 rounded-full"
                    style={{ backgroundColor: STAGES[i].color }}
                    animate={{
                      height: i < activeStep ? "100%" : "0%",
                      width: undefined,
                    }}
                    transition={{ duration: 0.5 }}
                  />
                  <motion.div
                    className="hidden sm:block absolute top-1/2 left-0 h-[2px] rounded-full -translate-y-1/2"
                    style={{ backgroundColor: STAGES[i].color }}
                    animate={{ width: i < activeStep ? "100%" : i === activeStep ? "50%" : "0%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />

                  {/* traveling pulse dot along the active connector — mobile: moves vertically */}
                  {i === activeStep && (
                    <motion.div
                      className="sm:hidden absolute w-1.5 h-1.5 rounded-full left-[27px] -translate-x-1/2"
                      style={{ backgroundColor: STAGES[i].color, boxShadow: `0 0 8px 2px ${STAGES[i].color}` }}
                      animate={{ top: ["0%", "100%"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                  {/* traveling pulse dot along the active connector — desktop: moves horizontally */}
                  {i === activeStep && (
                    <motion.div
                      className="hidden sm:block absolute w-1.5 h-1.5 rounded-full top-1/2 -translate-y-1/2"
                      style={{ backgroundColor: STAGES[i].color, boxShadow: `0 0 8px 2px ${STAGES[i].color}` }}
                      animate={{ left: ["0%", "100%"] }}
                      transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="relative z-10 mt-8 sm:mt-10 pt-5 border-t border-white/[0.06] flex items-center gap-2 text-[11px] text-white/35 font-medium">
        <GitBranch size={12} className="text-white/30" />
        Every push is containerized, tested, and deployed through an automated pipeline — no manual server touching.
      </div>
    </div>
  );
}