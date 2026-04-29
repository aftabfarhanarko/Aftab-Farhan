"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  MessageSquare,
  Users,
  ShieldCheck,
  Lightbulb,
  CheckCircle2,
  Zap,
  Target,
  Star,
  Handshake,
  BarChart3,
  Briefcase,
} from "lucide-react";

const softSkills = [
  {
    id: "communication",
    title: "Communication",
    Icon: MessageSquare,
    level: 95,
    description: "Clear communication with clients, teams, and stakeholders at every level.",
    subSkills: [
      { name: "Client Communication", level: 95 },
      { name: "Technical Documentation", level: 90 },
      { name: "Presentation Skills", level: 88 },
    ],
    examples: [
      "Led 50+ client meetings and requirement sessions",
      "Bridged technical and non-technical stakeholders",
      "Created comprehensive project documentation",
    ],
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    Icon: Users,
    level: 92,
    description: "Working effectively within cross-functional teams to achieve common goals.",
    subSkills: [
      { name: "Cross-functional Collaboration", level: 93 },
      { name: "Mentoring & Knowledge Sharing", level: 90 },
      { name: "Conflict Resolution", level: 88 },
    ],
    examples: [
      "Collaborated with 15+ team members across dev & design",
      "Mentored junior developers in best practices",
      "Facilitated sprints and stand-ups across time zones",
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    Icon: ShieldCheck,
    level: 90,
    description: "Guiding teams, making strategic decisions, and owning projects end-to-end.",
    subSkills: [
      { name: "Team Leadership", level: 92 },
      { name: "Strategic Planning", level: 88 },
      { name: "Decision Making", level: 90 },
    ],
    examples: [
      "Led a team of 5 developers as Senior Full-Stack Dev",
      "Managed 30+ enterprise projects as Project Manager",
      "Established operational frameworks and policies",
    ],
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    Icon: Lightbulb,
    level: 94,
    description: "Analytical thinking and creative solutions for complex technical challenges.",
    subSkills: [
      { name: "Analytical Thinking", level: 95 },
      { name: "Debugging & Troubleshooting", level: 93 },
      { name: "System Architecture", level: 90 },
    ],
    examples: [
      "Optimized queries for 45% faster response times",
      "Reduced downtime by 60% via microservices",
      "Improved delivery speed by 40% through workflow fixes",
    ],
  },
];

const coreStrengths = [
  { name: "Client Communication", Icon: MessageSquare },
  { name: "Team Leadership", Icon: Users },
  { name: "Strategic Thinking", Icon: Target },
  { name: "Mentoring", Icon: Star },
  { name: "Decision Making", Icon: Zap },
  { name: "Conflict Resolution", Icon: Handshake },
  { name: "Presentation", Icon: BarChart3 },
  { name: "Negotiation", Icon: Briefcase },
];

// Fires once when the element scrolls into view
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function SkillCard({
  skill,
  delay = 0,
}: {
  skill: (typeof softSkills)[0];
  delay?: number;
}) {
  const { ref, inView } = useInView(0.2);
  const { title, Icon, level, description, subSkills, examples } = skill;

  return (
    <div
      ref={ref}
      className="rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] hover:border-black/20 dark:hover:border-white/20 transition-all duration-300 overflow-hidden"
    >
      <div className="p-5 sm:p-6">

        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-2.5 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5">
            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-black dark:text-white" />
          </div>
          <div className="text-right">
            <div className="text-2xl sm:text-3xl font-black text-black dark:text-white leading-none">
              {level}%
            </div>
            <div className="text-[11px] sm:text-xs text-black/40 dark:text-white/40 mt-0.5">
              Proficiency
            </div>
          </div>
        </div>

        <h3 className="text-base sm:text-lg font-bold text-black dark:text-white mb-1.5">
          {title}
        </h3>
        <p className="text-xs sm:text-sm text-black/50 dark:text-white/50 leading-relaxed mb-5">
          {description}
        </p>

        {/* 3 Progress Bars — animate when scrolled into view */}
        <div className="space-y-3 sm:space-y-4">
          {subSkills.map((sub, i) => (
            <div key={sub.name}>
              <div className="flex justify-between text-xs sm:text-sm mb-1.5">
                <span className="text-black/60 dark:text-white/60 font-medium">
                  {sub.name}
                </span>
                <span className="text-black/35 dark:text-white/35">{sub.level}%</span>
              </div>
              <div className="h-1.5 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-black dark:bg-white rounded-full"
                  style={{
                    width: inView ? `${sub.level}%` : "0%",
                    transition: `width 900ms cubic-bezier(0.4, 0, 0.2, 1) ${delay + i * 120}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Real-World Examples */}
        <div className="mt-5 pt-4 border-t border-black/[0.07] dark:border-white/[0.07]">
          <p className="text-[10px] sm:text-[11px] font-bold text-black/35 dark:text-white/35 uppercase tracking-wider mb-2.5">
            Real-World Application
          </p>
          <ul className="space-y-1.5 sm:space-y-2">
            {examples.map((ex, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 flex-shrink-0 text-black/40 dark:text-white/40" />
                <span className="text-xs sm:text-sm text-black/55 dark:text-white/55 leading-relaxed">
                  {ex}
                </span>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </div>
  );
}

export default function SoftSkills() {
  return (
    <section
      id="soft-skills"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      <div className="grid lg:grid-cols-[1fr_300px] gap-10 lg:gap-16 items-start">

        {/* Left */}
        <div>
          {/* Core Strengths */}
          <div className="mb-8">
            <h3 className="text-xs font-bold text-black/40 dark:text-white/40 uppercase tracking-wider mb-3">
              Core Professional Strengths
            </h3>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              {coreStrengths.map(({ name, Icon }) => (
                <div
                  key={name}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 bg-black/[0.03] dark:bg-white/[0.04] border border-black/10 dark:border-white/10 rounded-xl hover:border-black/25 dark:hover:border-white/25 hover:bg-black/[0.06] dark:hover:bg-white/[0.07] transition-all cursor-default"
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black/50 dark:text-white/50" />
                  <span className="text-xs sm:text-sm font-medium text-black/70 dark:text-white/70">
                    {name}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Grid */}
          <div className="grid gap-4 sm:grid-cols-2">
            {softSkills.map((skill, i) => (
              <SkillCard key={skill.id} skill={skill} delay={i * 80} />
            ))}
          </div>
        </div>

        {/* Right: sticky panel */}
        <div className="lg:sticky lg:top-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-black/10 dark:border-white/15 bg-black/[0.03] dark:bg-white/5 mb-5">
            <Star className="w-3.5 h-3.5 text-black/40 dark:text-white/50" />
            <span className="text-xs font-semibold text-black/50 dark:text-white/50 uppercase tracking-widest">
              Interpersonal Skills
            </span>
          </div>

          <h2 className="text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] mb-4">
            <span className="text-black dark:text-white">Soft </span>
            <span className="text-black/25 dark:text-white/25">Skills</span>
          </h2>

          <p className="text-sm sm:text-base text-black/50 dark:text-white/50 leading-relaxed mb-8 max-w-xs">
            Beyond technical expertise, I bring strong interpersonal skills that
            enable effective collaboration, clear communication, and successful
            project outcomes.
          </p>

          <div className="p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/10 dark:border-white/10">
            <p className="text-xs sm:text-sm text-black/50 dark:text-white/50 leading-relaxed">
              These qualities have been essential in my roles as{" "}
              <span className="text-black dark:text-white font-semibold">Developer</span>{" "}
              and{" "}
              <span className="text-black dark:text-white font-semibold">Project Lead</span>.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}