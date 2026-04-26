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
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const techStack = [
    "Node.js",
    "Express.js",
    "Prisma ORM",
    "PostgreSQL",
    // "System Design",
    // "DevOps",
  ];

  return (
    <section
      id="about"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 md:-mt-30 sm:px-6 lg:px-0"
    >
      {/* Header with same styling */}
      <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            About Me
          </h2>
          <div className="absolute -bottom-2 sm:-bottom-3 left-0 w-16 sm:w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-xs sm:text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;backend-engineer /&gt;
        </span>
      </div>

      <motion.div
        ref={ref}
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="grid lg:grid-cols-5 gap-6 sm:gap-8 lg:gap-12"
      >
        {/* Main content - 3 columns */}
        <div className="lg:col-span-3 space-y-6 sm:space-y-8">
          {/* Introduction Card */}
          <motion.div
            variants={itemVariants}
            className="relative p-5 sm:p-8 rounded-2xl bg-foreground/[0.02] border border-white/10 overflow-hidden"
          >
            {/* decorative blurred orb */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full blur-3xl -z-10" />

            <div className="space-y-4">
              <div>
                <span className="text-3xl sm:text-4xl font-black text-foreground block mb-1 tracking-tight">
                  Aftab Farhan Arko
                </span>
                <span className="text-foreground/70 text-sm sm:text-base">
                  Passionate Web Developer • Backend Engineer • Mentor
                </span>
              </div>

              <div className="space-y-3 text-foreground/70 text-sm sm:text-base leading-relaxed">
                <p>
                  Hi, I’m{" "}
                  <span className="font-semibold text-foreground">
                    Aftab Farhan Arko
                  </span>{" "}
                  - a passionate web developer with over{" "}
                  <span className="font-semibold text-foreground">
                    4 years+ of experience
                  </span>{" "}
                  building modern full-stack applications. I love transforming
                  ideas into scalable, intelligent, and impactful digital
                  products that solve real-world problems.
                </p>
                <p>
                  I specialize in{" "}
                  <span className="font-semibold text-foreground">
                    robust backend systems
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-foreground">
                    efficient workflows
                  </span>{" "}
                  using tools like Node.js, Express.js, Prisma ORM, and
                  PostgreSQL. My focus is on ,{" "}
                  <span className="font-semibold text-foreground">
                    Backend Engineering
                  </span>
                  , and DevOps, ensuring every project I build is maintainable,
                  secure, and future-ready.
                </p>
                <p>
                  Beyond coding, I’m passionate about{" "}
                  <span className="font-semibold text-foreground">
                    mentoring students
                  </span>{" "}
                  and{" "}
                  <span className="font-semibold text-foreground">
                    junior developers
                  </span>
                  , sharing knowledge, and simplifying complex concepts. I enjoy
                  collaborating in teams, reviewing code, and helping others
                  grow alongside me.
                </p>
                <p>
                  I am constantly{" "}
                  <span className="font-semibold text-foreground">
                    exploring new technologies
                  </span>
                  , experimenting with innovative solutions, and staying updated
                  with the latest trends in web development. I believe in
                  continuous learning, building boldly, and turning ideas into
                  practical projects.
                </p>
                <p>
                  Ultimately, my goal is to create{" "}
                  <span className="font-semibold text-foreground">
                    impactful software
                  </span>{" "}
                  that empowers users, simplifies processes, and transforms
                  ideas into reality.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tech Focus Tags */}
          <motion.div variants={itemVariants} className="space-y-3">
            <h3 className="text-xs sm:text-sm font-bold text-foreground/40 uppercase tracking-wider">
              Core Focus
            </h3>
            <div className="flex flex-wrap gap-2">
              {techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-xs sm:text-sm font-medium bg-foreground/5 border border-white/10 rounded-full text-foreground/70 hover:text-foreground hover:border-foreground/30 transition-colors cursor-default"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Sidebar - 2 columns */}
        <div className="lg:col-span-2 space-y-5 sm:space-y-6">
          {/* Experience Highlight */}
          <motion.div
            variants={itemVariants}
            className="p-5 sm:p-6 rounded-xl bg-foreground/[0.02] border border-white/10 text-center"
          >
            <div className="text-4xl sm:text-5xl font-black text-foreground mb-1">
              4+
            </div>
            <div className="text-sm text-foreground/40 uppercase tracking-wider">
              Years of Experience
            </div>
            <div className="mt-2 text-xs text-foreground/50">
              Full-Stack & Backend
            </div>
          </motion.div>

          {/* Quote Card */}
          <motion.div
            variants={itemVariants}
            className="relative p-5 sm:p-6 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent border border-white/10"
          >
            {/* large soft quote mark */}
            <div className="absolute -top-4 -left-2 text-6xl text-foreground/10 font-serif leading-none select-none">
              “
            </div>
            <blockquote className="relative z-10 text-sm sm:text-base text-foreground/80 italic leading-relaxed pl-4 border-l-2 border-foreground/20">
              “For me, coding isn’t just logic - it’s an art of connecting
              systems, people, and ideas through technology.”
            </blockquote>
            <div className="mt-3 text-right text-xs text-foreground/40">
              — Aftab Farhan Arko
            </div>
          </motion.div>

          {/* Mentoring & Collaboration Badge */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 p-4 rounded-xl bg-foreground/5 border border-white/10"
          >
            <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <div>
              <h4 className="font-semibold text-foreground text-sm">
                Mentoring & Collaboration
              </h4>
              <p className="text-xs text-foreground/50">
                Helping students & junior devs grow
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
