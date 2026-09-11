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
    id: "k8s",
    label: "Orchestrate & Deploy",
    sub: "Kubernetes",
    logoUrl: "https://cdn.simpleicons.org/kubernetes/326CE5",
    color: "#326CE5",
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
    <div className="relative mb-10 p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm overflow-hidden">
      {/* Ambient background glow */}
      <motion.div
        className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full blur-3xl pointer-events-none"
        animate={{ backgroundColor: STAGES[activeStep].color, opacity: [0.05, 0.1, 0.05] }}
        transition={{ backgroundColor: { duration: 0.6 }, opacity: { duration: 2.4, repeat: Infinity, ease: "easeInOut" } }}
      />

      {/* Header */}
      <div className="relative z-10 flex items-center gap-3 mb-8 sm:mb-10">
        <div className="w-10 h-10 rounded-xl bg-orange-50 border border-orange-200 flex items-center justify-center shrink-0 shadow-sm">
          <Workflow size={20} className="text-[#FF6014]" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-wider">
            Deployment Workflow
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
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
                animate={{ opacity: isActive || isPast ? 1 : 0.6 }}
                transition={{ duration: 0.5 }}
              >
                <div className="relative shrink-0">
                  <motion.div
                    className="relative w-14 h-14 rounded-xl bg-slate-50 border flex items-center justify-center shadow-sm"
                    animate={{
                      borderColor: isActive || isPast ? stage.color : "#E5E7EB",
                      scale: isActive ? 1.05 : 1,
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <img src={stage.logoUrl} alt={stage.sub} className="w-8 h-8 object-contain" />
                  </motion.div>
                </div>

                <div className="text-left sm:text-center">
                  <p
                    className="text-sm font-bold transition-colors duration-300"
                    style={{ color: isActive ? stage.color : "#0F172A" }}
                  >
                    {stage.sub}
                  </p>
                  <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                    {stage.label}
                  </p>
                </div>
              </motion.div>

              {/* Connector */}
              {i < STAGES.length - 1 && (
                <div className="relative flex-1 min-w-[24px] sm:min-w-0 h-8 sm:h-[2px] sm:mt-[-24px] mx-0 sm:mx-2 self-stretch sm:self-auto">
                  <div className="absolute left-[27px] sm:left-0 top-0 sm:top-1/2 w-[2px] sm:w-full h-full sm:h-[2px] bg-slate-200 sm:-translate-y-1/2" />
                  <motion.div
                    className="hidden sm:block absolute top-1/2 left-0 h-[2px] rounded-full -translate-y-1/2"
                    style={{ backgroundColor: STAGES[i].color }}
                    animate={{ width: i < activeStep ? "100%" : i === activeStep ? "50%" : "0%" }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Footer note */}
      <div className="relative z-10 mt-8 sm:mt-10 pt-4 border-t border-slate-200 flex items-center gap-2 text-xs text-slate-500 font-medium">
        <GitBranch size={14} className="text-[#FF6014]" />
        Every push is containerized, tested, and deployed through an automated pipeline — no manual server touching.
      </div>
    </div>
  );
}