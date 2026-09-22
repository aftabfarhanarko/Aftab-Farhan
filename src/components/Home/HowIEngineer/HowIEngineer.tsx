"use client";

import React, { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, Mountain, Sparkles, Sprout, TrendingUp } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import SectionHeader from "@/components/Common/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* -------------------------------------------------------------------------- */
/*  Design tokens                                                             */
/* -------------------------------------------------------------------------- */

const BRAND = "#FF6014";
const BRAND_SOFT = "#FF8A4C"; // orange for text on dark surfaces

/* -------------------------------------------------------------------------- */
/*  Content (edit this block with your real ambitions)                        */
/* -------------------------------------------------------------------------- */

const NORTH_STAR =
  "I want to build software that stays fast, secure, and easy to understand as it grows, and help other developers do the same.";

interface Ambition {
  title: string;
  detail: string;
}

interface Horizon {
  range: string;
  title: string;
  icon: LucideIcon;
  ambitions: Ambition[];
}

const HORIZONS: Horizon[] = [
  {
    range: "Now",
    title: "Sharpen the craft",
    icon: Sprout,
    ambitions: [
      {
        title: "Ship production-grade apps",
        detail:
          "Deliver full-stack products with strict types, tests, and CI from day one.",
      },
      {
        title: "Master AI-assisted engineering",
        detail:
          "Keep AI as a multiplier while every line stays reviewed and owned.",
      },
      {
        title: "Go deeper on databases",
        detail: "PostgreSQL performance, indexing, and transactional design.",
      },
    ],
  },
  {
    range: "Next, 1 to 2 years",
    title: "Widen the scope",
    icon: TrendingUp,
    ambitions: [
      {
        title: "Design systems at scale",
        detail:
          "Distributed architectures, caching strategies, and observability.",
      },
      {
        title: "Lead technical decisions",
        detail: "Own architecture reviews and mentor teammates through them.",
      },
      {
        title: "Contribute to open source",
        detail: "Give back to the tools I rely on every day.",
      },
    ],
  },
  {
    range: "Later, 3+ years",
    title: "Build what lasts",
    icon: Mountain,
    ambitions: [
      {
        title: "Become a software architect",
        detail: "Shape platforms that teams can extend for years.",
      },
      {
        title: "Launch my own product",
        detail: "Take an idea from first commit to paying users.",
      },
      {
        title: "Mentor the next generation",
        detail: "Help early-career developers grow faster than I did.",
      },
    ],
  },
];

/* Each step of the staircase gets its own surface. The last one is the summit. */
const STEP_THEME = [
  {
    panel: "border border-slate-200 bg-white",
    lift: "",
    icon: "bg-orange-50 text-[#FF6014]",
    eyebrow: "text-slate-500",
    title: "text-slate-900",
    itemTitle: "text-slate-900",
    itemDetail: "text-slate-600",
    accent: BRAND,
  },
  {
    panel: "border border-orange-200 bg-orange-50/60",
    lift: "lg:pt-[92px]",
    icon: "bg-white text-[#FF6014]",
    eyebrow: "text-slate-500",
    title: "text-slate-900",
    itemTitle: "text-slate-900",
    itemDetail: "text-slate-600",
    accent: BRAND,
  },
  {
    panel: "border border-slate-900 bg-slate-950",
    lift: "lg:pt-[156px]",
    icon: "bg-[#FF6014] text-white",
    eyebrow: "text-slate-400",
    title: "text-white",
    itemTitle: "text-white",
    itemDetail: "text-slate-300",
    accent: BRAND_SOFT,
  },
];

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

export default function Ambitions() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const stepsRef = useRef<HTMLOListElement | null>(null);
  const reduceMotion = !!useReducedMotion();

  // One orchestrated moment: the three steps rise from the ground, left to right.
  useEffect(() => {
    const root = sectionRef.current;
    const steps = stepsRef.current;
    if (!root || !steps || reduceMotion) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          scrollTrigger: { trigger: steps, start: "top 80%", once: true },
        })
        .from(".step-panel", {
          clipPath: "inset(100% 0% 0% 0%)",
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.2,
          clearProps: "clipPath",
        })
        .from(
          ".ambition-item",
          {
            opacity: 0,
            y: 12,
            duration: 0.4,
            ease: "power2.out",
            stagger: 0.05,
          },
          0.5
        );
    }, root);

    return () => ctx.revert();
  }, [reduceMotion]);

  return (
    <section
      id="ambitions"
      ref={sectionRef}
      className="relative py-16 text-left sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeader
          badge="WHERE I'M HEADING"
          titlePrefix="My"
          titleHighlight="Ambitions"
          subtitle="The engineer I'm working to become, and the steps I'm taking to get there."
          align="left"
          icon={Sparkles}
        />

        {/* North star */}
        <p className="max-w-3xl text-2xl font-bold leading-snug tracking-tight text-slate-900 sm:text-3xl sm:leading-snug">
          {NORTH_STAR}
        </p>

        {/* Staircase */}
        <ol
          ref={stepsRef}
          aria-label="Ambitions by time horizon"
          className="mt-12 grid gap-4 lg:grid-cols-3 lg:items-end lg:gap-5"
        >
          {HORIZONS.map((h, i) => {
            const t = STEP_THEME[i];
            const Icon = h.icon;
            return (
              <li
                key={h.title}
                className={`step-panel relative flex flex-col rounded-2xl p-6 sm:p-7 ${t.panel} ${t.lift}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid size-10 shrink-0 place-items-center rounded-xl ${t.icon}`}
                  >
                    <Icon size={20} />
                  </span>
                  <div>
                    <p className={`text-sm ${t.eyebrow}`}>{h.range}</p>
                    <h3
                      className={`text-lg font-bold leading-tight tracking-tight ${t.title}`}
                    >
                      {h.title}
                    </h3>
                  </div>
                </div>

                <ul className="mt-6 space-y-5">
                  {h.ambitions.map((a) => (
                    <li key={a.title} className="ambition-item flex gap-3">
                      <ArrowUpRight
                        size={16}
                        className="mt-1 shrink-0"
                        style={{ color: t.accent }}
                        aria-hidden
                      />
                      <div>
                        <p className={`text-sm font-semibold ${t.itemTitle}`}>
                          {a.title}
                        </p>
                        <p
                          className={`mt-0.5 text-sm leading-relaxed ${t.itemDetail}`}
                        >
                          {a.detail}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}