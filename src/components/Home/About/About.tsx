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

  const frontendSkills = [
    "React.js", "Next.js", "TypeScript", "Redux Toolkit", "RTK Query",
    "React Query", "Tailwind CSS", "Shadcn/ui", "HTML5", "CSS3",
    "Framer Motion", "React Hook Form", "NextAuth", "Bootstrap",
  ];

  const backendSkills = [
    "Node.js", "Express.js", "PostgreSQL", "MongoDB", "Mongoose",
    "Firebase", "Prisma ORM", "GraphQL", "REST API", "JWT",
  ];

  const tools = ["Git", "GitHub", "Vercel", "Netlify"];

  const stats = [
    { num: "1.5+", label: "Years Exp." },
    { num: "10+", label: "Projects" },
    { num: "7+", label: "Clients" },
    { num: "100%", label: "Satisfaction" },
    { num: "7+", label: "Happy Clients" },
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
        {/* ── Left column (sticky, powerful stats) ── */}
        <div className="lg:col-span-2 flex flex-col gap-8 lg:sticky lg:top-28">
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-black/40 dark:text-white/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-1.5 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-black/40 dark:bg-white/40 inline-block" />
              Full Stack Developer
            </span>

            <h2
              className="font-black tracking-tight leading-none text-black dark:text-white"
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "clamp(40px, 6vw, 58px)",
              }}
            >
              About
              <span className="text-black/30 dark:text-white/30"> Me.</span>
            </h2>

            <p className="mt-4 text-sm text-black/50 dark:text-white/50 font-light leading-relaxed max-w-xs">
              Building modern full-stack applications and mentoring the next
              generation of developers.
            </p>
          </motion.div>

          {/* Client‑focused badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10"
          >
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-black dark:bg-white" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-black dark:bg-white animate-ping" />
            </div>
            <span className="text-sm font-medium text-black/70 dark:text-white/70">
              Client focused & fully committed
            </span>
          </motion.div>

          {/* Powerful stats grid (2×3) */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 gap-2.5"
          >
            {stats.map(({ num, label }) => (
              <div
                key={label}
                className="relative overflow-hidden rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/[0.07] dark:border-white/[0.07] px-5 py-4 group hover:border-black/20 dark:hover:border-white/20 transition-colors duration-300"
              >
                {/* decorative orb */}
                <div className="absolute -top-5 -right-5 w-14 h-14 rounded-full bg-black/5 dark:bg-white/5 group-hover:bg-black/8 dark:group-hover:bg-white/8 transition-colors duration-300" />
                <p
                  className="text-3xl font-black text-black dark:text-white leading-none mb-1"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {num}
                </p>
                <p className="text-[10px] uppercase tracking-widest text-black/35 dark:text-white/35 font-normal">
                  {label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Right column (scrollable details) ── */}
        <div className="lg:col-span-3 flex flex-col gap-3.5">
          {/* Intro card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-6 py-7"
          >
            <p
              className="text-xl font-black text-black dark:text-white mb-0.5 tracking-tight"
              style={{ fontFamily: "'Syne', sans-serif" }}
            >
              Aftab Farhan Arko
            </p>
            <p className="text-xs text-black/40 dark:text-white font-light tracking-wide mb-5">
              Full Stack Developer · Specialist in React, Next.js & Node.js · Mentor to Junior Developers
            </p>

            <div className="space-y-3 text-sm text-black/60 dark:text-white font-light leading-relaxed">
              <p>
                I'm{" "}
                <span className="text-black dark:text-white font-normal">
                  Aftab Farhan Arko
                </span>{" "}
                — a passionate full stack web developer with over{" "}
                <span className="text-black dark:text-white font-normal">
                  1.5 years of hands-on experience
                </span>{" "}
                crafting high-performance, production-grade web applications. I specialize in
                building scalable digital products — from pixel-perfect, responsive frontend
                interfaces to robust, maintainable backends — always using clean code and
                industry best practices.
              </p>
              <p>
                My core stack revolves around{" "}
                <span className="text-black dark:text-white font-normal">
                  React, Next.js, TypeScript, and Node.js
                </span>
                , with deep expertise in state management (Redux Toolkit, RTK Query, React Query),
                modern UI libraries (Tailwind CSS, Shadcn/ui, Framer Motion), and backend
                technologies like Express.js, PostgreSQL, MongoDB, Prisma ORM, and GraphQL.
              </p>
              <p>
                Beyond writing code, I actively{" "}
                <span className="text-black dark:text-white font-normal">
                  mentor students and junior developers
                </span>
                — simplifying complex concepts and sharing real-world MERN stack practices to
                help them grow faster. I believe coding is not just logic; it's an art of
                connecting systems, people, and ideas through technology.
              </p>
            </div>

            {/* Frontend tags */}
            <div className="mt-5 pt-5 border-t border-black/[0.07] dark:border-white/[0.07]">
              <p className="text-[10px] font-bold text-black/30 dark:text-white uppercase tracking-widest mb-2">
                Frontend
              </p>
              <div className="flex flex-wrap gap-1.5">
                {frontendSkills.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/90 bg-black/[0.03] dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-default tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Backend tags */}
            <div className="mt-3">
              <p className="text-[10px] font-bold text-black/30 dark:text-white uppercase tracking-widest mb-2">
                Backend & Database
              </p>
              <div className="flex flex-wrap gap-1.5">
                {backendSkills.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/90 bg-black/[0.03] dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-default tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Tools tags */}
            <div className="mt-3">
              <p className="text-[10px] font-bold text-black/30 dark:text-white uppercase tracking-widest mb-2">
                Tools & Hosting
              </p>
              <div className="flex flex-wrap gap-1.5">
                {tools.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] px-3 py-1.5 rounded-full border border-black/10 dark:border-white/10 text-black/50 dark:text-white/90 bg-black/[0.03] dark:bg-white/[0.03] hover:border-black/20 dark:hover:border-white/20 hover:text-black/70 dark:hover:text-white/70 transition-colors cursor-default tracking-wide"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Highlighted Projects */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-6 py-5"
          >
            <p className="text-sm font-bold text-black dark:text-white mb-3">
              Recent Client Projects
            </p>
            <div className="space-y-3">
              <div>
                <p className="text-xs font-semibold text-black/70 dark:text-white/70">
                  Artman Agro — Financial & Multi-Portal Platform
                </p>
                <p className="text-[11px] text-black/45 dark:text-white/45 leading-relaxed">
                  Built with PostgreSQL, Express.js, Next.js 16, React 19, Redux Toolkit, and RTK Query.
                  Achieved 80% optimization in data rendering and API throughput. Engineered an automated
                  financial engine for real-time ROI, profit tracking, and balance reconciliation.
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold text-black/70 dark:text-white/70">
                  Xinzo E‑commerce — Scalable Online Store
                </p>
                <p className="text-[11px] text-black/45 dark:text-white/45 leading-relaxed">
                  Architected with PostgreSQL, Node.js, Next.js 16, TypeScript, Redux Toolkit, RTK Query,
                  and GraphQL. Achieved 90% optimization in load times via SSR and strategic image handling.
                  Delivered a real‑time Fraud Checker and a secure Reseller Portal with RBAC.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quote card */}
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] border-l-2 border-l-black/20 dark:border-l-white/20 px-6 py-5"
            style={{ borderRadius: "0 16px 16px 0" }}
          >
            <blockquote className="text-sm text-black/55 dark:text-white/55 italic font-light leading-relaxed">
              "Coding isn't just logic — it's an art of connecting systems,
              people, and ideas through technology."
            </blockquote>
            <p className="text-right text-[11px] text-black/30 dark:text-white/30 mt-2">
              — Aftab Farhan Arko
            </p>
          </motion.div>

          {/* Mentor badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/[0.07] dark:border-white/[0.07] px-4 py-3.5"
          >
            <div className="w-9 h-9 rounded-lg bg-black/[0.05] dark:bg-white/[0.05] border border-black/[0.07] dark:border-white/[0.07] flex items-center justify-center shrink-0">
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
                className="text-black/50 dark:text-white/50"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium text-black/80 dark:text-white/80 leading-none mb-1">
                Mentoring & Collaboration
              </p>
              <p className="text-xs text-black/35 dark:text-white/35 font-light">
                Helping students & junior devs grow through clear explanations and real-world MERN stack practices
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}