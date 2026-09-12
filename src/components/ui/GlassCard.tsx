"use client";
import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";

export interface GlassCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  variant?: "primary" | "compact" | "featured" | "interactive";
  className?: string;
  glowBeam?: boolean;
}

export default function GlassCard({
  children,
  variant = "primary",
  className = "",
  glowBeam = true,
  ...props
}: GlassCardProps) {
  const variantStyles = {
    primary:
      "bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.04)] hover:bg-white/95 hover:border-orange-300/80 hover:shadow-[0_20px_40px_-15px_rgba(255,96,20,0.08)]",
    compact:
      "bg-white/80 backdrop-blur-md border border-slate-200/85 shadow-[0_4px_16px_-4px_rgba(0,0,0,0.03)] hover:bg-white/95 hover:border-orange-300/70 hover:shadow-[0_10px_25px_-8px_rgba(255,96,20,0.08)]",
    featured:
      "bg-gradient-to-br from-white/95 via-orange-50/30 to-white/90 backdrop-blur-2xl border border-orange-200/80 shadow-[0_16px_40px_-12px_rgba(255,96,20,0.08)] hover:border-orange-400/90 hover:shadow-[0_24px_50px_-15px_rgba(255,96,20,0.14)]",
    interactive:
      "bg-white/85 backdrop-blur-xl border border-slate-200/90 shadow-sm hover:border-orange-300/80 hover:shadow-xl hover:shadow-orange-500/5 hover:-translate-y-1",
  };

  return (
    <motion.div
      whileHover={{ y: variant === "compact" ? -2 : -4 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className={`relative rounded-2xl overflow-hidden text-left transition-all duration-300 group ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {/* Top Sweep Glow Beam */}
      {glowBeam && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#FF6014]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-20" />
      )}
      {children}
    </motion.div>
  );
}
