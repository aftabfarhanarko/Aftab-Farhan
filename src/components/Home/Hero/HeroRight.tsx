"use client";
import React from "react";
import Image from "next/image";
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

      {/* Rings */}
      <div className="absolute w-[460px] h-[460px] rounded-full border border-dashed border-foreground/15 animate-[spin_80s_linear_infinite]" />
      <div className="absolute w-[420px] h-[420px] rounded-full border border-border animate-[spin_50s_linear_infinite_reverse]" />
      <div className="absolute w-[360px] h-[360px] rounded-full bg-foreground/8 blur-[80px]" />

      {/* Profile image circle */}
      <div className="relative w-[340px] h-[340px] sm:w-[380px] sm:h-[380px] rounded-full border-[3px] border-foreground/60 p-2.5 shadow-[0_0_60px_rgba(57,255,20,0.2),inset_0_0_40px_rgba(57,255,20,0.05)] bg-background z-10 group">
        <div className="w-full h-full rounded-full overflow-hidden bg-foreground/5 relative">
          <Image
            src={image}
            alt={`${name} - ${title}`}
            fill
            sizes="(max-width: 768px) 340px, 380px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          <div className="absolute inset-0 rounded-full ring-1 ring-inset ring-border" />
        </div>

        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-3 px-5 py-2 rounded-full bg-background/95 backdrop-blur-xl border border-border shadow-[0_8px_32px_rgba(0,0,0,0.4)] z-20 whitespace-nowrap">
          {socials.map((social, i) => (
            <div key={social.id} className="flex items-center gap-3">
              {i > 0 && <span className="w-px h-3 bg-foreground/20" />}
              <a
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[11px] font-black text-foreground/70 hover:text-foreground transition-colors"
              >
                <SocialIcon platform={social.platform} />
                {social.platform}
              </a>
            </div>
          ))}
        </div>
      </div>

      <FloatingIconBadges />
    </motion.div>
  );
}
