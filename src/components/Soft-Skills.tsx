"use client";
import React, { useState } from "react";

const SoftSkills = () => {
  const [activeSkill, setActiveSkill] = useState<string | null>(null);

  const softSkills = [
    {
      id: "communication",
      title: "Communication",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>
      ),
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconColor: "text-foreground",
      level: 95,
      description:
        "Clear and effective communication with clients, team members, and stakeholders.",
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
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconColor: "text-foreground",
      level: 92,
      description:
        "Working effectively within cross-functional teams to achieve common goals.",
      subSkills: [
        { name: "Cross-functional Collaboration", level: 93 },
        { name: "Mentoring & Knowledge Sharing", level: 90 },
        { name: "Conflict Resolution", level: 88 },
        { name: "Agile/Scrum Participation", level: 94 },
        { name: "Pair Programming", level: 85 },
      ],
      examples: [
        "Collaborated with 15+ team members across development, design, and marketing",
        "Mentored 5 junior developers in best practices and coding standards",
        "Facilitated daily stand-ups and sprint planning sessions",
        "Worked with remote teams across different time zones",
      ],
    },
    {
      id: "leadership",
      title: "Leadership",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
          />
        </svg>
      ),
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconColor: "text-foreground",
      level: 90,
      description:
        "Guiding teams, making strategic decisions, and taking ownership of projects.",
      subSkills: [
        { name: "Team Leadership", level: 92 },
        { name: "Strategic Planning", level: 88 },
        { name: "Decision Making", level: 90 },
        { name: "Delegation", level: 87 },
        { name: "Project Ownership", level: 93 },
      ],
      examples: [
        "Led a team of 5 developers as Senior Full-Stack Developer",
        "Currently serving as COO overseeing company operations",
        "Managed 30+ enterprise projects as Project Manager",
        "Established operational frameworks and company policies",
      ],
    },
    {
      id: "problem-solving",
      title: "Problem Solving",
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
      color: "from-yellow-500/20 to-orange-500/20",
      borderColor: "border-yellow-500/30",
      iconColor: "text-yellow-500",
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
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
      ),
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconColor: "text-foreground",
      level: 91,
      description:
        "Quickly learning new technologies and adapting to changing requirements.",
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
      icon: (
        <svg
          className="w-8 h-8"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      color: "from-foreground/5 to-transparent",
      borderColor: "border-white/10",
      iconColor: "text-foreground",
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
        "Simultaneously managed 10+ active projects as Project Manager",
        "Consistently delivered projects on or ahead of schedule",
        "Optimized resource allocation for 50+ projects",
        "Implemented efficient sprint planning processes",
      ],
    },
  ];

  const coreStrengths = [
    { name: "Client-Facing Communication", icon: "💬" },
    { name: "Team Leadership", icon: "👥" },
    { name: "Strategic Thinking", icon: "🎯" },
    { name: "Mentoring", icon: "🌟" },
    { name: "Decision Making", icon: "⚡" },
    { name: "Conflict Resolution", icon: "🤝" },
    { name: "Presentation", icon: "📊" },
    { name: "Negotiation", icon: "💼" },
  ];

  return (
    <section id="soft-skills" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Soft Skills
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;professional-qualities /&gt;
        </span>
      </div>

      {/* Intro */}
      <div className="mb-8 p-6 rounded-2xl bg-foreground/5 border-l-4 border-l-foreground">
        <p className="text-foreground/70 text-lg leading-relaxed">
          Beyond technical expertise, I bring strong interpersonal skills that
          enable effective collaboration, clear communication, and successful
          project outcomes. These qualities have been essential in my roles as{" "}
          <span className="text-foreground font-medium">COO</span>,{" "}
          <span className="text-foreground font-medium">Project Manager</span>, and{" "}
          <span className="text-foreground font-medium">Senior Developer</span>.
        </p>
      </div>

      {/* Core Strengths */}
      <div className="mb-8">
        <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-wider mb-4">
          Core Professional Strengths
        </h3>
        <div className="flex flex-wrap gap-3">
          {coreStrengths.map((strength, index) => (
            <div
              key={index}
              className="px-4 py-3 bg-foreground/5 border border-white/10 rounded-xl flex items-center gap-2 hover:border-white/30 transition-all cursor-default"
            >
              <span className="text-xl">{strength.icon}</span>
              <span className="text-sm font-medium text-foreground/70">
                {strength.name}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {softSkills.map((skill) => (
          <div
            key={skill.id}
            className={`group relative rounded-xl bg-gradient-to-br ${skill.color} border ${skill.borderColor} backdrop-blur-sm transition-all duration-300 hover:scale-[1.02]`}
            onMouseEnter={() => setActiveSkill(skill.id)}
            onMouseLeave={() => setActiveSkill(null)}
          >
            <div className="p-5">
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className={`${skill.iconColor}`}>{skill.icon}</div>
                <div className="text-right">
                  <div className="text-2xl font-black text-foreground">
                    {skill.level}%
                  </div>
                  <div className="text-xs text-foreground/40">Proficiency</div>
                </div>
              </div>

              {/* Title & Description */}
              <h3 className="text-lg font-bold text-foreground mb-1">
                {skill.title}
              </h3>
              <p className="text-sm text-foreground/60 leading-relaxed mb-4">
                {skill.description}
              </p>

              {/* Sub-skills with Progress Bars */}
              <div className="space-y-3">
                {skill.subSkills
                  .slice(0, activeSkill === skill.id ? undefined : 3)
                  .map((sub, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-xs mb-1">
                        <span className="text-foreground/60">{sub.name}</span>
                        <span className="text-foreground/40">{sub.level}%</span>
                      </div>
                      <div className="h-1.5 bg-foreground-muted/20 rounded-full overflow-hidden">
                        <div
                          className={`h-full bg-gradient-to-r ${skill.iconColor.replace("text", "from")} to-transparent rounded-full transition-all duration-500`}
                          style={{ width: `${sub.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
              </div>

              {/* Expand/Collapse Indicator */}
              <button className="mt-3 text-xs text-foreground/40 hover:text-foreground transition-colors">
                {activeSkill === skill.id
                  ? "Show Less"
                  : `+${skill.subSkills.length - 3} More Skills`}
              </button>

              {/* Examples (shown on hover/expand) */}
              {activeSkill === skill.id && (
                <div className="mt-4 pt-4 border-t border-white/10">
                  <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                    Real-World Application
                  </p>
                  <ul className="space-y-1.5">
                    {skill.examples.map((example, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <svg
                          className="w-3.5 h-3.5 text-foreground mt-0.5 flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                        <span className="text-xs text-foreground/60">
                          {example}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Communication & Collaboration Highlight */}
      <div className="mt-8 grid md:grid-cols-2 gap-6">
        <div className="p-6 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🗣️</span>
            <h4 className="font-bold text-foreground">
              Communication Excellence
            </h4>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed">
            As a bridge between technical teams and business stakeholders, I
            ensure clear, transparent communication at all levels. From client
            presentations to technical documentation, I adapt my communication
            style to the audience.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-foreground/5 to-transparent border border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🤝</span>
            <h4 className="font-bold text-foreground">
              Collaborative Leadership
            </h4>
          </div>
          <p className="text-sm text-foreground/60 leading-relaxed">
            I believe in leading through collaboration and empowerment. Whether
            managing projects or guiding development teams, I foster an
            environment where everyone's input is valued and the best solutions
            emerge through teamwork.
          </p>
        </div>
      </div>

      {/* Quote */}
      <div className="mt-8 p-6 rounded-xl bg-foreground/5 border border-white/10 text-center">
        <p className="text-foreground/70 italic">
          "Technical skills get the job done, but soft skills make the journey
          successful. My ability to communicate clearly, collaborate
          effectively, and lead with empathy has been key to delivering 50+
          successful projects and building lasting client relationships."
        </p>
      </div>
    </section>
  );
};

export default SoftSkills;



