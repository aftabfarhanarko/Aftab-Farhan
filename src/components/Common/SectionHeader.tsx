"use client";

import React from "react";
import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";

interface SectionHeaderProps {
  badge: string;
  titlePrefix?: string;
  titleHighlight: string;
  titleSuffix?: string;
  subtitle?: string;
  icon?: LucideIcon;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  badge,
  titlePrefix,
  titleHighlight,
  titleSuffix,
  subtitle,
  icon: Icon,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`mb-10 sm:mb-12 flex flex-col ${
        align === "left"
          ? "items-start text-left"
          : "items-center text-center"
      } ${className}`}
    >
      {/* Badge with Custom SVG Accent */}
      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-50 border border-orange-200 shadow-2xs mb-3">
        {Icon ? (
          <Icon className="w-4 h-4 text-[#FF6014]" />
        ) : (
          <svg
            className="w-4 h-4 text-[#FF6014]"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        )}
        <span className="text-xs font-mono font-extrabold uppercase tracking-widest text-[#FF6014]">
          {badge}
        </span>
      </div>

      {/* Standardized Title Size & SVG Decorative Underline */}
      <div className="relative space-y-1">
        <h2 className="text-2xl sm:text-3xl lg:text-[30px] font-black tracking-tight leading-tight text-slate-900">
          {titlePrefix && <span>{titlePrefix} </span>}
          <span className="text-[#FF6014] relative inline-block">
            {titleHighlight}
            {/* SVG Decorative Swoosh / Underline */}
            <svg
              className="absolute -bottom-1.5 left-0 w-full h-2 text-[#FF6014]/30 pointer-events-none"
              viewBox="0 0 100 20"
              preserveAspectRatio="none"
              fill="none"
            >
              <path
                d="M0 15 Q 50 0, 100 15"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          {titleSuffix && <span> {titleSuffix}</span>}
        </h2>
      </div>

      {/* Subtitle */}
      {subtitle && (
        <p className="mt-3 text-xs sm:text-sm font-medium text-slate-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
