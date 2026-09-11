"use client";
import React from "react";
import { motion } from "framer-motion";
import { SocialLink, scaleIn, SocialIcon } from "./types";
import {
  TerminalCard,
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
  return (
    <motion.div
      {...scaleIn(0.2)}
      className="relative flex-shrink-0 flex items-center md:mt-0 mt-10 justify-center order-1 md:order-2 max-md:self-center"
    >
      <TerminalCard />
      <CurrentStackBadge />

      {/* Decorative Rings */}
      <div className="absolute w-[300px] h-[300px] sm:w-[420px] sm:h-[420px] md:w-[460px] md:h-[460px] rounded-full border border-dashed border-slate-200 animate-[spin_80s_linear_infinite]" />
      <div className="absolute w-[260px] h-[260px] sm:w-[380px] sm:h-[380px] md:w-[420px] md:h-[420px] rounded-full border border-slate-200/60 animate-[spin_50s_linear_infinite_reverse]" />

      {/* Profile image circle */}
      <div className="relative w-[260px] h-[260px] min-[375px]:w-[310px] min-[375px]:h-[310px] sm:w-[380px] sm:h-[380px] rounded-full border-4 border-white p-2 shadow-xl bg-slate-50 z-10 group">
        <div className="w-full h-full rounded-full overflow-hidden bg-slate-100 relative flex items-center justify-center border border-slate-200">
          {image ? (
            <img
              src={image}
              alt={`${name || "Developer"} - ${title || "Software Engineer"}`}
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-[#FF6014] via-[#ff7c42] to-amber-500 flex items-center justify-center text-white text-6xl font-black uppercase shadow-inner">
              {name ? name.charAt(0) : "A"}
            </div>
          )}
        </div>

        {socials && socials.length > 0 && (
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 rounded-full bg-white border border-slate-200 shadow-lg z-20 whitespace-nowrap">
            {socials.map((social, i) => (
              <div key={social.id} className="flex items-center gap-3">
                {i > 0 && <span className="w-px h-3 bg-slate-200" />}
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-[#FF6014] transition-colors"
                >
                  <SocialIcon platform={social.platform} />
                  {social.platform}
                </a>
              </div>
            ))}
          </div>
        )}
      </div>

      <FloatingIconBadges />
    </motion.div>
  );
}
