"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Cpu } from "lucide-react";
import { AI_TOOLS } from "./aiData";
import ToolCard from "./ToolCard";
import AIHighlightCard from "./AIHighlightCard";

export default function AIStack() {
  const [activeAI, setActiveAI] = useState<string>("antigravity");

  const selectedAIInfo = AI_TOOLS.find((tool) => tool.id === activeAI) || AI_TOOLS[0];

  return (
    <section id="ai-stack" className="mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left mb-10 gap-4"
      >
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
      </motion.div>

      <div className="grid lg:grid-cols-12 gap-8 items-start">
        {/* Left: AI Tools Grid (8 Cols) */}
        <div className="lg:col-span-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {AI_TOOLS.map((tool, i) => (
            <ToolCard
              key={tool.id}
              tool={tool}
              index={i}
              isActive={activeAI === tool.id}
              onClick={() => {
                setActiveAI(tool.id);
              }}
            />
          ))}
        </div>

        {/* Right: Selected AI Highlight Card (4 Cols) — sticks in place while grid scrolls */}
        <AIHighlightCard selectedAIInfo={selectedAIInfo} />
      </div>
    </section>
  );
}