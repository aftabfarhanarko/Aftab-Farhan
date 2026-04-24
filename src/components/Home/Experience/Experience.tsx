"use client"
import React, { useState } from "react";

const Experience = () => {
  const [activeTab, setActiveTab] = useState<"all" | "current" | "previous">(
    "all",
  );

  const experiences = [
    {
      id: 1,
      company: "NexoviaSoft",
      logo: "N",
      url: "https://www.nexoviasoft.com",
      location: "Dhaka, Bangladesh",
      period: "2023 - Present",
      type: "current",
      roles: [
        {
          title: "Chief Operating Officer",
          type: "COO • Full-time",
          icon: "shield",
          responsibilities: [
            "Led daily operations and strategic planning for company growth",
            "Managed cross-functional teams including development, design, and marketing",
            "Optimized workflow processes resulting in 40% faster project delivery",
            "Oversaw resource allocation and budget management for 50+ projects",
            "Established company policies and operational frameworks",
            "Drove business development and client relationship management",
          ],
        },
        {
          title: "Senior Project Manager",
          type: "Project Management • Full-time",
          icon: "project",
          responsibilities: [
            "Managed end-to-end delivery of 30+ enterprise web development projects",
            "Coordinated between clients and technical teams to ensure clear communication",
            "Implemented Agile/Scrum methodologies for efficient project execution",
            "Monitored project timelines, milestones, and deliverables",
            "Conducted quality assurance and ensured premium solution delivery",
            "Led client meetings, requirement gathering, and project planning sessions",
          ],
        },
      ],
      techStack: [
        "React",
        "Next.js",
        "Node.js",
        "AWS",
        "MongoDB",
        "PostgreSQL",
        "Docker",
      ],
      achievements: [
        { metric: "50+", label: "Projects Delivered" },
        { metric: "40%", label: "Efficiency Increase" },
        { metric: "30+", label: "Enterprise Clients" },
        { metric: "15+", label: "Team Members" },
      ],
    },
    {
      id: 2,
      company: "TechSolutions Ltd",
      logo: "T",
      url: "#",
      location: "Remote / Dhaka, Bangladesh",
      period: "2021 - 2023",
      type: "previous",
      roles: [
        {
          title: "Senior Full-Stack Developer",
          type: "Full-time • Team Lead",
          icon: "code",
          responsibilities: [
            "Led a team of 5 developers in building scalable web applications",
            "Architected and developed RESTful APIs serving 100K+ daily requests",
            "Implemented microservices architecture reducing system downtime by 60%",
            "Mentored junior developers and conducted code reviews",
            "Optimized database queries resulting in 45% faster response times",
            "Integrated third-party services including payment gateways and analytics",
          ],
        },
      ],
      techStack: [
        "React",
        "Node.js",
        "Express",
        "MySQL",
        "Redis",
        "Docker",
        "GitHub Actions",
      ],
      achievements: [
        { metric: "15+", label: "Apps Launched" },
        { metric: "100K+", label: "Daily Users" },
        { metric: "45%", label: "Performance Gain" },
        { metric: "5", label: "Team Members Led" },
      ],
    },
    {
      id: 3,
      company: "DigitalCraft Agency",
      logo: "D",
      url: "#",
      location: "Dhaka, Bangladesh",
      period: "2019 - 2021",
      type: "previous",
      roles: [
        {
          title: "Web Developer",
          type: "Full-time • Frontend Focus",
          icon: "code",
          responsibilities: [
            "Developed responsive and interactive web applications for 20+ clients",
            "Converted Figma designs into pixel-perfect React components",
            "Implemented state management with Redux and Context API",
            "Optimized website performance achieving 95+ Lighthouse scores",
            "Collaborated with designers and backend developers",
            "Built custom e-commerce solutions with payment integrations",
          ],
        },
      ],
      techStack: [
        "React",
        "JavaScript",
        "Redux",
        "SASS",
        "Webpack",
        "Jest",
        "Storybook",
      ],
      achievements: [
        { metric: "20+", label: "Websites Built" },
        { metric: "95+", label: "Performance Score" },
        { metric: "100%", label: "Client Satisfaction" },
        { metric: "10+", label: "E-comm Stores" },
      ],
    },
  ];

  const companyServices = [
    "Custom Software Solutions",
    "Secure Cloud Infrastructure",
    "Advanced AI Integration",
    "DevOps & Cloud Deployment",
    "UI/UX Design",
    "Digital Marketing",
    "E-Commerce Development",
    "Odoo ERP Solutions",
  ];

  const filteredExperiences =
    activeTab === "all"
      ? experiences
      : experiences.filter((exp) => exp.type === activeTab);

  const getIcon = (type: string) => {
    switch (type) {
      case "shield":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
            />
          </svg>
        );
      case "project":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
            />
          </svg>
        );
      case "code":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
            />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="experience" className="mb-32 scroll-mt-24">
      {/* Header */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            Experience
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <div className="flex items-center gap-2">
          <span className="text-sm font-mono text-foreground/40 hidden sm:block">
            &lt;6+ years /&gt;
          </span>
          <span className="text-xs px-3 py-1 bg-foreground/10 text-foreground rounded-full font-medium">
            Senior Level
          </span>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="p-4 rounded-xl bg-foreground/5 border border-white/10 text-center">
          <div className="text-2xl font-black text-foreground">6+</div>
          <div className="text-xs text-foreground/50">Years Experience</div>
        </div>
        <div className="p-4 rounded-xl bg-foreground/5 border border-white/10 text-center">
          <div className="text-2xl font-black text-foreground">50+</div>
          <div className="text-xs text-foreground/50">Projects Completed</div>
        </div>
        <div className="p-4 rounded-xl bg-foreground/5 border border-white/10 text-center">
          <div className="text-2xl font-black text-foreground">30+</div>
          <div className="text-xs text-foreground/50">Happy Clients</div>
        </div>
        <div className="p-4 rounded-xl bg-foreground/5 border border-white/10 text-center">
          <div className="text-2xl font-black text-foreground">15+</div>
          <div className="text-xs text-foreground/50">Tech Stack</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 border-b border-white/10">
        {[
          { id: "all", label: "All Experience" },
          { id: "current", label: "Current Role" },
          { id: "previous", label: "Previous Roles" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as typeof activeTab)}
            className={`px-5 py-2.5 text-sm font-medium transition-all relative ${
              activeTab === tab.id
                ? "text-foreground"
                : "text-foreground/50 hover:text-foreground/70"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative">
        {/* Vertical Line */}
        <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-foreground/30 via-foreground/20 to-transparent hidden md:block" />

        <div className="space-y-8">
          {filteredExperiences.map((exp, index) => (
            <div key={exp.id} className="relative">
              {/* Timeline Dot */}
              <div
                className="absolute left-8 -translate-x-1/2 w-4 h-4 rounded-full bg-foreground border-4 border-background hidden md:block"
                style={{ top: "2rem" }}
              />

              {/* Experience Card */}
              <div className="md:ml-16">
                {/* Company Header */}
                <div
                  className={`p-6 rounded-2xl bg-gradient-to-br ${
                    exp.type === "current"
                      ? "from-foreground/10 via-foreground/5 to-transparent border-white/30"
                      : "from-foreground-muted/10 to-transparent border-white/10"
                  } border mb-4`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br flex items-center justify-center text-white text-xl font-black ${
                          exp.type === "current"
                            ? "from-foreground to-foreground/60"
                            : "from-foreground/30 to-foreground/10"
                        }`}
                      >
                        {exp.logo}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-foreground">
                          {exp.company}
                        </h3>
                        <div className="flex items-center gap-2 text-sm text-foreground/40">
                          <span>{exp.location}</span>
                          <span>•</span>
                          {exp.url !== "#" ? (
                            <a
                              href={exp.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:text-foreground transition-colors inline-flex items-center gap-1"
                            >
                              {exp.url.replace("https://www.", "")}
                              <svg
                                className="w-3 h-3"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                              </svg>
                            </a>
                          ) : (
                            <span>Previous Company</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {exp.type === "current" && (
                        <span className="px-3 py-1.5 bg-foreground/10 text-foreground rounded-full text-xs font-medium flex items-center gap-1.5">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-foreground"></span>
                          </span>
                          Current
                        </span>
                      )}
                      <span className="text-sm font-medium text-foreground/60 bg-foreground/10 px-3 py-1.5 rounded-full">
                        {exp.period}
                      </span>
                    </div>
                  </div>

                  {/* Roles */}
                  <div className="space-y-4">
                    {exp.roles.map((role, roleIndex) => (
                      <div key={roleIndex} className="pl-2">
                        <div className="flex items-center gap-2 mb-2">
                          <div
                            className={`p-1.5 rounded-md ${
                              exp.type === "current"
                                ? "bg-foreground/10 text-foreground"
                                : "bg-foreground/10 text-foreground/60"
                            }`}
                          >
                            {getIcon(role.icon)}
                          </div>
                          <div>
                            <h4 className="font-bold text-foreground">
                              {role.title}
                            </h4>
                            <p className="text-xs text-foreground/40">
                              {role.type}
                            </p>
                          </div>
                        </div>
                        <ul className="grid md:grid-cols-2 gap-x-4 gap-y-1.5 ml-11">
                          {role.responsibilities.map((item, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <svg
                                className="w-3.5 h-3.5 text-foreground mt-1 flex-shrink-0"
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
                              <span className="text-sm text-foreground/70">
                                {item}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Tech Stack */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-2">
                      Tech Stack & Tools
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {exp.techStack.map((tech) => (
                        <span
                          key={tech}
                          className="px-2.5 py-1 text-xs bg-foreground/5 border border-white/10 rounded-md text-foreground/60"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Achievements for Current Role */}
                  {exp.type === "current" && (
                    <div className="mt-4 pt-4 border-t border-white/10">
                      <p className="text-xs font-semibold text-foreground/40 uppercase tracking-wider mb-3">
                        Key Achievements at {exp.company}
                      </p>
                      <div className="grid grid-cols-4 gap-2">
                        {exp.achievements.map((item, i) => (
                          <div
                            key={i}
                            className="text-center p-2 rounded-lg bg-foreground/5"
                          >
                            <div className="text-lg font-black text-foreground">
                              {item.metric}
                            </div>
                            <div className="text-xs text-foreground/50">
                              {item.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Current Company Services (Only for NexoviaSoft) */}
      <div className="mt-8 p-6 rounded-xl bg-foreground/5 border border-white/10">
        <h4 className="font-bold text-foreground mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-foreground rounded-full" />
          Services I Oversee at NexoviaSoft
        </h4>
        <div className="flex flex-wrap gap-2">
          {companyServices.map((service) => (
            <span
              key={service}
              className="px-3 py-1.5 text-sm bg-foreground/5 border border-white/10 rounded-full text-foreground/70 hover:text-foreground hover:border-white/30 transition-colors"
            >
              {service}
            </span>
          ))}
        </div>
        <p className="text-sm text-foreground/50 mt-4 italic">
          "Leading operations and project delivery for a premium web development
          and digital solutions company serving 30+ enterprise clients
          worldwide."
        </p>
      </div>
    </section>
  );
};

export default Experience;



