"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: "easeOut" },
    },
  };

  const techStack = ["Node.js", "Express.js", "Prisma ORM", "PostgreSQL"];

  const stats = [
    { num: "4+", label: "Years Exp." },
    { num: "10+", label: "Projects" },
    { num: "7+", label: "Clients" },
    { num: "12+", label: "Tech Stack" },
  ];

  return (
    <section
      id="about"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 md:-mt-30 sm:px-6 lg:px-0"
    >
      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid lg:grid-cols-5 gap-8 lg:gap-14 items-start"
      >
        {/* ── Left column ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Section label + headline */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-foreground/40 border border-white/10 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-foreground/30 inline-block" />
              backend engineer
            </span>

            <h2
              className="font-black tracking-tight leading-none text-foreground"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(40px, 6vw, 58px)",
              }}
            >
              About
              <span className=" text-foreground/30">Me.</span>
            </h2>

            <p className="mt-4 text-sm text-foreground/50 font-light leading-relaxed max-w-xs">
              Crafting scalable systems and guiding the next generation of
              developers along the way.
            </p>
          </motion.div>

          {/* Stats 2×2 grid */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-2.5"
          >
            {stats.map(({ num, label }) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-xl bg-foreground/[0.03] border border-white/[0.07] px-5 py-4 group hover:border-white/20 transition-colors duration-300"
              >
                {/* decorative orb */}
                <div className="absolute -top-5 -right-5 w-14 h-14 rounded-full bg-foreground/5 group-hover:bg-foreground/8 transition-colors duration-300" />
                <p
                  className="text-3xl font-black text-foreground leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {num}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-foreground/35 font-normal">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column ── */}
        <div className="lg:col-span-3 flex flex-col gap-3.5">
          {/* Intro card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-foreground/[0.02] border border-white/[0.07] px-6 py-7"
          >
            <p
              className="text-xl font-black text-foreground mb-0.5 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Aftab Farhan Arko
            </p>
            <p className="text-xs text-foreground/40 font-light tracking-wide mb-5">
              Passionate Web Developer · Backend Engineer · Mentor
            </p>

            <div className="space-y-3 text-sm text-foreground/60 font-light leading-relaxed">
              <p>
                Hi, I'm{" "}
                <span className="text-foreground font-normal">
                  Aftab Farhan Arko
                </span>{" "}
                — a web developer with over{" "}
                <span className="text-foreground font-normal">
                  4+ years of experience
                </span>{" "}
                building modern full-stack applications. I love transforming
                ideas into scalable, intelligent, and impactful digital
                products.
              </p>
              <p>
                I specialize in{" "}
                <span className="text-foreground font-normal">
                  robust backend systems
                </span>{" "}
                using Node.js, Express.js, Prisma ORM, and PostgreSQL — focused
                on{" "}
                <span className="text-foreground font-normal">
                  maintainability, security, and scale
                </span>
                .
              </p>
              <p>
                Beyond coding, I'm passionate about{" "}
                <span className="text-foreground font-normal">
                  mentoring students
                </span>{" "}
                and junior developers, simplifying complex concepts and helping
                others grow alongside me.
              </p>
            </div>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-white/[0.07]">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] px-3 py-1.5 rounded-full border border-white/10 text-foreground/50 bg-foreground/[0.03] hover:border-white/20 hover:text-foreground/70 transition-colors cursor-default tracking-wide"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-foreground/[0.02] border border-white/[0.07] border-l-2 border-l-foreground/20 px-6 py-5"
            style={{ borderRadius: "0 16px 16px 0" }}
          >
            <blockquote className="text-sm text-foreground/55 italic font-light leading-relaxed">
              "Coding isn't just logic — it's an art of connecting systems,
              people, and ideas through technology."
            </blockquote>
            <p className="text-right text-[11px] text-foreground/30 mt-2">
              — Aftab Farhan Arko
            </p>
          </motion.div>

          {/* Mentor badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 rounded-xl bg-foreground/[0.02] border border-white/[0.07] px-4 py-3.5"
          >
            <div className="w-9 h-9 rounded-lg bg-foreground/[0.05] border border-white/[0.07] flex items-center justify-center shrink-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-foreground/50"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-foreground/80 leading-none mb-1">
                Mentoring & Collaboration
              </p>
              <p className="text-xs text-foreground/35 font-light">
                Helping students & junior devs grow
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
