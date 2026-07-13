"use client";
import React from "react";
import { CheckCircle2, Cpu } from "lucide-react";
import { AI_TOOLS } from "./aiData";

interface StepInfo {
  step: number;
  title: string;
  toolId: string;
  description: string;
  actions: string[];
}

export default function StepCard({ stepInfo }: { stepInfo: StepInfo }) {
  const associatedTool = AI_TOOLS.find((t) => t.id === stepInfo.toolId);
  const toolColor = associatedTool?.color || "#ffffff";

  return (
    <div className="grid md:grid-cols-[1.8fr_1fr] gap-8 text-left items-start">
      {/* Description Panel */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-[10px] font-black tracking-widest text-white/30 uppercase font-mono">
            Stage {stepInfo.step} of 6
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-white/20" />
          {associatedTool && (
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-white/5 border border-white/10">
              <Cpu className="w-3 h-3" style={{ color: toolColor }} />
              <span className="text-[10px] font-black uppercase text-white/70 tracking-wider">
                Active Tech: {associatedTool.name}
              </span>
            </div>
          )}
        </div>

        <h4 className="text-lg sm:text-xl font-bold text-white tracking-tight">
          {stepInfo.title}
        </h4>
        
        <p className="text-xs sm:text-sm text-white/50 leading-relaxed max-w-2xl font-medium">
          {stepInfo.description}
        </p>
      </div>

      {/* Automated Outputs / Actions */}
      <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/[0.06] space-y-3.5">
        <span className="block text-[10px] font-black tracking-widest text-white/30 uppercase font-mono">
          Automated Outputs
        </span>
        <ul className="space-y-2.5">
          {stepInfo.actions.map((act, i) => (
            <li key={i} className="flex items-start gap-2.5 text-xs text-white/70 font-medium">
              <CheckCircle2
                className="w-4 h-4 shrink-0 mt-0.5"
                style={{ color: toolColor }}
              />
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
