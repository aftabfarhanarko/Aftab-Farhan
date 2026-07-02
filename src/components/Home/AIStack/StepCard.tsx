"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

interface StepInfo {
  step: number;
  title: string;
  description: string;
  actions: string[];
}

export default function StepCard({ stepInfo }: { stepInfo: StepInfo }) {
  return (
    <div className="grid md:grid-cols-3 gap-6 text-left items-center">
      <div className="md:col-span-2">
        <span className="text-[10px] font-black tracking-widest text-black/40 dark:text-white/40 uppercase block mb-1">
          CURRENT STAGE DETAILS (STAGE {stepInfo.step} OF 6)
        </span>
        <h4 className="text-xl font-bold text-foreground mb-2">
          {stepInfo.title}
        </h4>
        <p className="text-xs sm:text-sm text-black/60 dark:text-white/60 leading-relaxed max-w-2xl">
          {stepInfo.description}
        </p>
      </div>

      <div>
        <span className="text-[10px] font-black tracking-widest text-black/40 dark:text-white/40 uppercase block mb-2.5">
          AUTOMATED OUTPUTS & ACTIONS
        </span>
        <ul className="space-y-1.5">
          {stepInfo.actions.map((act, i) => (
            <li key={i} className="flex items-center gap-2 text-xs text-black/70 dark:text-white/70">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
              <span>{act}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
