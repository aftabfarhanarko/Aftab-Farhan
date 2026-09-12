"use client";
import React from "react";
import { motion } from "framer-motion";

interface MarqueeItem {
  id: string;
  name: string;
  imageUrl: string;
}

export default function SkillsMarquee({ items }: { items: MarqueeItem[] }) {
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative mt-12 sm:mt-16 overflow-hidden py-4">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 sm:w-32 z-10 bg-gradient-to-r from-slate-50 via-slate-50/80 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 sm:w-32 z-10 bg-gradient-to-l from-slate-50 via-slate-50/80 to-transparent" />

      <motion.div
        className="flex w-max items-center gap-5 sm:gap-7"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((skill, idx) => (
          <div
            key={`${skill.id}-${idx}`}
            title={skill.name}
            className="group relative shrink-0 w-14 h-14 sm:w-16 sm:h-16 md:w-[72px] md:h-[72px] p-2.5 sm:p-3 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-orange-300 hover:scale-110 transition-all duration-300 flex items-center justify-center cursor-pointer"
          >
            <img
              src={skill.imageUrl}
              alt={skill.name}
              draggable={false}
              className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
}
