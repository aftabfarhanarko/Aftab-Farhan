"use client";
import React, { useState } from "react";
import {
  MessageSquare,
  Users,
  ShieldCheck,
  Lightbulb,
  RefreshCw,
  Clock,
  ChevronDown,
  ChevronUp,
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
    accent: "#3B82F6",
    level: 95,
    description:
      "Clear and effective communication with clients, team members, and stakeholders at every level.",
    subSkills: [
      { name: "Client Communication", level: 95 },
      { name: "Technical Documentation", level: 90 },
      { name: "Presentation Skills", level: 88 },
      { name: "Active Listening", level: 92 },
      { name: "Requirement Gathering", level: 94 },
    ],
    examples: [
      "Led 50+ client meetings and requirement gathering sessions",
      "Created comprehensive technical documentation for projects",
      "Bridged communication between technical and non-technical stakeholders",
      "Conducted project presentations and demo sessions",
    ],
  },
  {
    id: "team-collaboration",
    title: "Team Collaboration",
    Icon: Users,
    accent: "#10B981",
    level: 92,
    description:
      "Working effectively within cross-functional teams to achieve common goals together.",
    subSkills: [
      { name: "Cross-functional Collaboration", level: 93 },
      { name: "Mentoring & Knowledge Sharing", level: 90 },
      { name: "Conflict Resolution", level: 88 },
      { name: "Agile/Scrum Participation", level: 94 },
      { name: "Pair Programming", level: 85 },
    ],
    examples: [
      "Collaborated with 15+ team members across dev, design, and marketing",
      "Mentored junior developers in best practices and coding standards",
      "Facilitated daily stand-ups and sprint planning sessions",
      "Worked with remote teams across different time zones",
    ],
  },
  {
    id: "leadership",
    title: "Leadership",
    Icon: ShieldCheck,
    accent: "#8B5CF6",
    level: 90,
    description:
      "Guiding teams, making strategic decisions, and taking full ownership of projects.",
    subSkills: [
      { name: "Team Leadership", level: 92 },
      { name: "Strategic Planning", level: 88 },
      { name: "Decision Making", level: 90 },
      { name: "Delegation", level: 87 },
      { name: "Project Ownership", level: 93 },
    ],
    examples: [
      "Led a team of 5 developers as Senior Full-Stack Developer",
      "Managed 30+ enterprise projects as Project Manager",
      "Established operational frameworks and company policies",
      "Oversaw end-to-end project lifecycles from kickoff to delivery",
    ],
  },
  {
    id: "problem-solving",
    title: "Problem Solving",
    Icon: Lightbulb,
    accent: "#F59E0B",
    level: 94,
    description:
      "Analytical thinking and creative solutions for complex technical challenges.",
    subSkills: [
      { name: "Analytical Thinking", level: 95 },
      { name: "Debugging & Troubleshooting", level: 93 },
      { name: "System Architecture", level: 90 },
      { name: "Performance Optimization", level: 92 },
      { name: "Creative Solutions", level: 91 },
    ],
    examples: [
      "Optimized database queries resulting in 45% faster response times",
      "Reduced system downtime by 60% through microservices architecture",
      "Improved workflow processes for 40% faster project delivery",
      "Resolved critical production issues with minimal downtime",
    ],
  },
  {
    id: "adaptability",
    title: "Adaptability",
    Icon: RefreshCw,
    accent: "#06B6D4",
    level: 91,
    description:
      "Quickly learning new technologies and adapting to ever-changing requirements.",
    subSkills: [
      { name: "Quick Learning", level: 94 },
      { name: "Flexibility", level: 90 },
      { name: "Technology Adaptation", level: 92 },
      { name: "Remote Work", level: 88 },
      { name: "Agile Environment", level: 93 },
    ],
    examples: [
      "Transitioned between Frontend, Full-Stack, and Leadership roles",
      "Quickly adopted new tech stacks based on project requirements",
      "Successfully managed remote teams and projects",
      "Adapted workflows for changing client needs",
    ],
  },
  {
    id: "time-management",
    title: "Time Management",
    Icon: Clock,
    accent: "#EF4444",
    level: 89,
    description:
      "Efficiently managing multiple projects and meeting deadlines consistently.",
    subSkills: [
      { name: "Prioritization", level: 92 },
      { name: "Deadline Management", level: 90 },
      { name: "Multi-tasking", level: 88 },
      { name: "Resource Allocation", level: 89 },
      { name: "Sprint Planning", level: 91 },
    ],
    examples: [
      "Simultaneously managed 10+ active projects",
      "Consistently delivered projects on or ahead of schedule",
      "Optimized resource allocation for 50+ projects",
      "Implemented efficient sprint planning processes",
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

export default function SoftSkills() {
  const [expanded, setExpanded] = useState<string | null>(null);

  const toggle = (id: string) =>
    setExpanded((prev) => (prev === id ? null : id));

  return (
    <section
      id="soft-skills"
      className="mb-16 sm:mb-24 lg:mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0"
    >
      {/* ── Header ── */}
      <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Soft Skills
          </h2>
          <div className="absolute -bottom-2 sm:-bottom-3 left-0 w-16 sm:w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-xs sm:text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;professional-qualities /&gt;
        </span>
      </div>

      {/* ── Intro banner ── */}
      <div className="mb-8 p-4 sm:p-6 rounded-2xl bg-foreground/[0.03] border-l-4 border-l-foreground">
        <p className="text-sm sm:text-base lg:text-lg text-foreground/70 leading-relaxed">
          Beyond technical expertise, I bring strong interpersonal skills that
          enable effective collaboration, clear communication, and successful
          project outcomes. These qualities have been essential in my roles as{" "}
          <span className="text-foreground font-semibold">Developer</span> and{" "}
          <span className="text-foreground font-semibold">Project Lead</span>.
        </p>
      </div>

      {/* ── Core Strengths chips ── */}
      <div className="mb-8 sm:mb-10">
        <h3 className="text-xs sm:text-sm font-bold text-foreground/40 uppercase tracking-wider mb-3 sm:mb-4">
          Core Professional Strengths
        </h3>
        <div className="flex flex-wrap gap-2 sm:gap-3">
          {coreStrengths.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2.5 bg-foreground/[0.04] border border-white/10 rounded-xl hover:border-white/25 hover:bg-foreground/[0.07] transition-all cursor-default"
            >
              <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-foreground/50" />
              <span className="text-xs sm:text-sm font-medium text-foreground/70">
                {name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Skills grid ── */}
      <div className="grid gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {softSkills.map((skill) => {
          const {
            id,
            title,
            Icon,
            accent,
            level,
            description,
            subSkills,
            examples,
          } = skill;
          const isOpen = expanded === id;
          const visibleSubs = isOpen ? subSkills : subSkills.slice(0, 3);

          return (
            <div
              key={id}
              className="rounded-2xl border border-white/10 bg-foreground/[0.02] hover:border-white/20 hover:bg-foreground/[0.04] transition-all duration-300 overflow-hidden"
              style={{
                borderTopColor: isOpen ? accent : undefined,
                borderTopWidth: isOpen ? "2px" : undefined,
              }}
            >
              <div className="p-4 sm:p-5">
                {/* Card header */}
                <div className="flex items-start justify-between mb-3">
                  <div
                    className="p-2 sm:p-2.5 rounded-xl border border-white/10"
                    style={{ background: `${accent}18` }}
                  >
                    <Icon
                      className="w-5 h-5 sm:w-6 sm:h-6"
                      style={{ color: accent }}
                    />
                  </div>
                  <div className="text-right">
                    <div
                      className="text-xl sm:text-2xl font-black"
                      style={{ color: accent }}
                    >
                      {level}%
                    </div>
                    <div className="text-[10px] sm:text-xs text-foreground/40">
                      Proficiency
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-1">
                  {title}
                </h3>
                <p className="text-xs sm:text-sm text-foreground/55 leading-relaxed mb-4">
                  {description}
                </p>

                {/* Sub-skill progress bars */}
                <div className="space-y-2.5 sm:space-y-3">
                  {visibleSubs.map((sub) => (
                    <div key={sub.name}>
                      <div className="flex justify-between text-[10px] sm:text-xs mb-1">
                        <span className="text-foreground/60">{sub.name}</span>
                        <span className="text-foreground/40">{sub.level}%</span>
                      </div>
                      <div className="h-1 sm:h-1.5 bg-white/5 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${sub.level}%`,
                            background: `linear-gradient(90deg, ${accent}, ${accent}88)`,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Expand toggle */}
                <button
                  onClick={() => toggle(id)}
                  className="mt-3 sm:mt-4 flex items-center gap-1 text-xs font-semibold transition-colors"
                  style={{ color: isOpen ? accent : undefined }}
                >
                  {isOpen ? (
                    <>
                      <ChevronUp className="w-3.5 h-3.5" /> Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="w-3.5 h-3.5 text-foreground/40" />
                      <span className="text-foreground/40">
                        +{subSkills.length - 3} More Skills
                      </span>
                    </>
                  )}
                </button>

                {/* Examples on expand */}
                {isOpen && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-[10px] sm:text-xs font-bold text-foreground/40 uppercase tracking-wider mb-2">
                      Real-World Application
                    </p>
                    <ul className="space-y-1.5 sm:space-y-2">
                      {examples.map((ex, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle2
                            className="w-3.5 h-3.5 mt-0.5 flex-shrink-0"
                            style={{ color: accent }}
                          />
                          <span className="text-[11px] sm:text-xs text-foreground/60 leading-relaxed">
                            {ex}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Bottom highlight cards ── */}
      <div className="mt-6 sm:mt-8 grid sm:grid-cols-2 gap-4 sm:gap-6">
        <div className="p-4 sm:p-6 rounded-xl bg-foreground/[0.03] border border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-2 rounded-xl bg-blue-500/15 border border-blue-500/20">
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-blue-400" />
            </div>
            <h4 className="font-bold text-foreground text-sm sm:text-base">
              Communication Excellence
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
            As a bridge between technical teams and business stakeholders, I
            ensure clear, transparent communication at all levels — from client
            presentations to technical documentation.
          </p>
        </div>

        <div className="p-4 sm:p-6 rounded-xl bg-foreground/[0.03] border border-white/10">
          <div className="flex items-center gap-2.5 sm:gap-3 mb-2 sm:mb-3">
            <div className="p-2 rounded-xl bg-green-500/15 border border-green-500/20">
              <Users className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" />
            </div>
            <h4 className="font-bold text-foreground text-sm sm:text-base">
              Collaborative Leadership
            </h4>
          </div>
          <p className="text-xs sm:text-sm text-foreground/60 leading-relaxed">
            I lead through collaboration and empowerment, fostering environments
            where everyone's input is valued and the best solutions emerge
            through teamwork.
          </p>
        </div>
      </div>

      {/* ── Quote ── */}
      <div className="mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl bg-foreground/[0.03] border border-white/10 text-center">
        <p className="text-xs sm:text-sm text-foreground/60 italic leading-relaxed max-w-2xl mx-auto">
          "Technical skills get the job done, but soft skills make the journey
          successful. My ability to communicate clearly, collaborate
          effectively, and lead with empathy has been key to delivering
          successful projects and building lasting client relationships."
        </p>
      </div>
    </section>
  );
}
