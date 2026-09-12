"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { SocialLink, scaleIn, SocialIcon } from "./types";
import {
  CurrentStackBadge,
  FloatingIconBadges,
} from "./HeroDecorations";

interface HeroRightProps {
  image: string;
  name: string;
  title: string;
  socials: SocialLink[];
}

export default function HeroRight({ image, name, title, socials }: HeroRightProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / 20;
    const y = (e.clientY - rect.top - rect.height / 2) / 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <motion.div
      {...scaleIn(0.2)}
      className="relative flex-shrink-0 flex items-center md:mt-0 mt-6 justify-center order-1 md:order-2 max-md:self-center"
    >
      <CurrentStackBadge />

      {/* Pulsing Back Ambient Aura */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[280px] h-[280px] sm:w-[400px] sm:h-[400px] rounded-full bg-gradient-to-br from-orange-400/30 to-amber-500/20 blur-2xl -z-10"
      />

      {/* Decorative Rotating Dash Ring 1 */}
      <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[450px] md:h-[450px] rounded-full border border-dashed border-orange-400/40 animate-[spin_60s_linear_infinite]" />
      
      {/* Decorative Rotating Gradient Ring 2 */}
      <div className="absolute w-[275px] h-[275px] sm:w-[390px] sm:h-[390px] md:w-[420px] md:h-[420px] rounded-full border border-slate-200/80 animate-[spin_40s_linear_infinite_reverse]" />

      {/* Interactive 3D Tilt Container */}
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX: -mousePos.y,
          rotateY: mousePos.x,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        style={{ perspective: 1000 }}
        className="relative w-[260px] h-[260px] min-[375px]:w-[310px] min-[375px]:h-[310px] sm:w-[380px] sm:h-[380px] rounded-full p-2.5 shadow-2xl bg-white/70 backdrop-blur-xl border border-white z-10 group cursor-pointer"
      >
        {/* Animated Gradient Border Ring */}
        <div className="absolute inset-0 rounded-full p-1 bg-gradient-to-br from-[#FF6014] via-amber-400 to-orange-600 opacity-90 group-hover:opacity-100 transition-opacity animate-[spin_10s_linear_infinite]">
          <div className="w-full h-full rounded-full bg-white" />
        </div>

        {/* Profile Image Wrapper */}
        <div className="relative w-full h-full rounded-full overflow-hidden bg-slate-100 flex items-center justify-center border-2 border-white shadow-inner z-10">
          {image ? (
            <img
              src={image}
              alt={`${name || "Developer"} - ${title || "Software Engineer"}`}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-108"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FF6014] via-[#ff7c42] to-amber-500 flex items-center justify-center text-white text-6xl font-black uppercase shadow-inner">
              {name ? name.charAt(0) : "A"}
            </div>
          )}

          {/* Glossy Overlay Shine */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-white/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </div>

        {/* Floating Social Pill */}
        {socials && socials.length > 0 && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 shadow-xl z-30 whitespace-nowrap hover:scale-105 transition-transform"
          >
            {socials.map((social, i) => (
              <div key={social.id} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-3 bg-slate-200" />}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-800 hover:text-[#FF6014] transition-colors"
                >
                  <SocialIcon platform={social.platform} />
                  {social.platform}
                </a>
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Floating Badges */}
      <FloatingIconBadges />
    </motion.div>
  );
}
