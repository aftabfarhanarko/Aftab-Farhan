"use client";
import React from "react";
import { motion } from "framer-motion";
import { HeroStat, fadeLeft, fadeUp } from "./types";

interface HeroLeftProps {
  name: string;
  title: string;
  description: string;
  stats: HeroStat[];
}

export default function HeroLeft({ name, title, description, stats }: HeroLeftProps) {
  return (
    <div className="flex-1 flex flex-col gap-6 z-10 max-w-2xl order-2 md:order-1 items-center md:items-start">
      {/* Greeting */}
      <motion.p
        {...fadeLeft(0.1)}
        className="text-center md:text-left text-lg font-medium text-foreground/50 tracking-wide"
      >
        Hi, I&apos;m{" "}
        <span className="text-foreground font-bold">{name}</span>
      </motion.p>

      <motion.div {...fadeLeft(0.18)} className="text-center md:text-left">
        <h1 className="text-2xl md:text-4xl">
          <span className="block text-foreground">{title}</span>
        </h1>
      </motion.div>

      {/* Description */}
      <motion.p
        {...fadeLeft(0.34)}
        className="text-sm text-foreground/90 text-wrap max-w-lg leading-[1.85] text-center md:text-left"
      >
        {description}
      </motion.p>

      {/* CTA buttons */}
      <motion.div {...fadeUp(0.5)} className="flex flex-wrap justify-center md:justify-start gap-4 mt-1 w-full md:w-auto">
        <motion.a
          href="#contact"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="group flex items-center justify-center gap-2.5 rounded-xl bg-foreground px-7 py-3.5 text-sm font-black text-background hover:bg-foreground/90 transition-colors w-full sm:w-auto"
        >
          <svg
            xmlns=""
            width="15"
            height="15"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="group-hover:translate-y-0.5 transition-transform duration-200"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" x2="12" y1="15" y2="3" />
          </svg>
          Download Resume
        </motion.a>
        <motion.a
          href="#project"
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          className="flex items-center justify-center rounded-xl border border-foreground/40 px-7 py-3.5 text-sm font-black text-foreground/80 hover:bg-foreground/8 hover:border-foreground hover:text-foreground transition-all w-full sm:w-auto text-center"
        >
          View Projects
        </motion.a>
      </motion.div>

      <motion.div
        {...fadeUp(0.6)}
        className="flex flex-wrap gap-6 sm:gap-12 pt-8 mt-3 border-t border-border w-full justify-center md:justify-start"
      >
        {stats.map(({ id, value, label }, i) => (
          <motion.div
            key={id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: 0.65 + i * 0.08,
              ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
            }}
            className="group cursor-default text-center md:text-left"
          >
            <div className="text-3xl font-black text-foreground tracking-tighter group-hover:text-foreground transition-colors duration-300">
              {value}
            </div>
            <div className="text-[10px] font-black uppercase tracking-[0.10em] mt-1.5">
              {label}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
