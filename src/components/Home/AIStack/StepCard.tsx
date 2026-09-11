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
  const toolColor = associatedTool?.color || "#EA580C";

  return (
    <div className="grid md:grid-cols-[1.8fr_1fr] gap-8 text-left items-start">
      {/* Description Panel */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs font-black tracking-widest text-slate-400 uppercase font-mono">
            Stage {stepInfo.step} of 6
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
          {associatedTool && (
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200">
              <Cpu className="w-3.5 h-3.5" style={{ color: toolColor }} />
              <span className="text-xs font-bold uppercase text-slate-700 tracking-wider">
                Active Tech: {associatedTool.name}
              </span>
            </div>
          )}
        </div>

        <h4 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          {stepInfo.title}
        </h4>
        
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-2xl font-medium">
          {stepInfo.description}
        </p>
      </div>

      {/* Automated Outputs / Actions */}
      <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3.5">
        <span className="block text-xs font-black tracking-widest text-slate-400 uppercase font-mono">
          Automated Outputs
        </span>
        <ul className="space-y-2.5">
          {stepInfo.actions.map((act, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm sm:text-base text-slate-700 font-medium">
              <CheckCircle2
                className="w-4 h-4 shrink-0 mt-1"
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
