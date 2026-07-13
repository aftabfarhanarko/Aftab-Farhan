// AIStack.tsx
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
    <section
      id="ai-stack"
      className="relative mb-16 sm:mb-20 lg:mb-24 scroll-mt-24 px-4 sm:px-6 lg:px-0 bg-[#08080A] rounded-3xl lg:bg-transparent lg:rounded-none py-10 lg:py-0"
    >
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="flex flex-col items-center text-center md:flex-row md:items-end md:justify-between md:text-left mb-10 gap-4"
      >
        <div className="flex flex-col items-center md:items-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/[0.03] mb-3">
            <Cpu className="w-3.5 h-3.5 text-white/50" />
            <span className="text-[10px] font-bold text-white/45 uppercase tracking-widest">
              Advanced Tooling
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-white">
            AI-Native <span className="text-white/35">Workflow</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-white/50 max-w-md text-center md:text-right leading-relaxed">
          Leveraging cutting-edge agentic coding assistants and large reasoning models to accelerate
          software lifecycle, write secure APIs, and implement premium frontends at 10x velocity.
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
              onClick={() => setActiveAI(tool.id)}
            />
          ))}
        </div>

        {/* Right: Selected AI Highlight Card (4 Cols) — sticks in place while grid scrolls */}
        <AIHighlightCard selectedAIInfo={selectedAIInfo} />
      </div>
    </section>
  );
}