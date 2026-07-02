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
    <div className="relative mt-10 sm:mt-12 overflow-hidden py-2">
      {/* fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-20 z-10 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-20 z-10 bg-gradient-to-l from-background to-transparent" />

      <motion.div
        className="flex w-max items-center gap-6 sm:gap-8"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 25, ease: "linear", repeat: Infinity }}
      >
        {repeated.map((skill, idx) => (
          <img
            key={`${skill.id}-${idx}`}
            src={skill.imageUrl}
            alt={skill.name}
            title={skill.name}
            draggable={false}
            className="shrink-0 w-10 h-10 sm:w-11 sm:h-11 rounded-xl object-cover border border-border/50 select-none"
          />
        ))}
      </motion.div>
    </div>
  );
}
