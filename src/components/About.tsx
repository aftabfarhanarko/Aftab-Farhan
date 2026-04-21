export default function About() {
  const stats = [
    { label: "Years Experience", value: "6+" },
    { label: "Projects Completed", value: "50+" },
    { label: "Technologies", value: "12+" },
    { label: "Happy Clients", value: "30+" },
  ];

  const coreExpertise = [
    "MERN Stack",
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Node.js",
    "Express.js",
    "MongoDB",
    "Tailwind CSS",
    "Web Development",
    "REST APIs",
    "GraphQL",
  ];

  return (
    <section id="about" className="mb-32 scroll-mt-24">
      {/* Header with animated accent */}
      <div className="flex items-center gap-6 mb-12">
        <div className="relative">
          <h2 className="text-3xl lg:text-4xl font-black text-foreground tracking-tight">
            About Me
          </h2>
          <div className="absolute -bottom-3 left-0 w-20 h-1 bg-foreground rounded-full" />
        </div>
        <div className="h-px flex-1 bg-foreground/10" />
        <span className="text-sm font-mono text-foreground/40 hidden sm:block">
          &lt;full-stack-dev /&gt;
        </span>
      </div>

      <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
        {/* Main Content - 3 columns */}
        <div className="lg:col-span-3 space-y-8">
          {/* Introduction Card */}
          <div className="relative p-8 rounded-2xl bg-foreground/[0.02] border border-white/10">
            <div className="absolute top-0 right-0 w-32 h-32 bg-foreground/5 rounded-full blur-3xl -z-10" />

            <p className="text-foreground/80 text-lg leading-relaxed mb-4">
              <span className="text-4xl font-black text-foreground block mb-2 tracking-tight">
                Arko
              </span>
              <span className="text-foreground font-medium">
                Senior Full Stack Developer
              </span>{" "}
              based in Bangladesh
            </p>

            <p className="text-foreground/60 text-base leading-relaxed">
              I architect and build high-performance web applications that
              scale. With deep expertise in modern web technologies, I transform 
              complex business requirements into elegant, production-ready solutions.
            </p>
          </div>

          {/* Core Expertise Section */}
          <div className="space-y-4">
            <h3 className="text-sm font-bold text-foreground/40 uppercase tracking-wider">
              Core Expertise
            </h3>
            <div className="flex flex-wrap gap-2">
              {coreExpertise.map((skill) => (
                <span
                  key={skill}
                  className="px-4 py-2 text-sm font-medium bg-foreground/5 border border-white/10 rounded-full text-foreground/70 hover:text-foreground hover:border-white/30 transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* MERN Stack Highlight */}
          <div className="p-6 rounded-xl bg-gradient-to-r from-foreground/5 to-transparent border-l-4 border-l-foreground">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-2xl">⚡</span>
              <h3 className="font-bold text-foreground">
                MERN Stack Specialist
              </h3>
            </div>
            <p className="text-sm text-foreground/60 leading-relaxed">
              MongoDB • Express.js • React • Node.js — Building full-stack
              JavaScript applications with seamless frontend-backend
              integration.
            </p>
          </div>
        </div>

        {/* Sidebar - 2 columns */}
        <div className="lg:col-span-2 space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="p-5 rounded-xl bg-foreground/5 border border-white/10 text-center hover:border-white/20 transition-colors"
              >
                <div className="text-2xl lg:text-3xl font-black text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-xs font-medium text-foreground/40 uppercase tracking-wider">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Professional Info - No Education */}
          <div className="p-6 rounded-xl bg-foreground/[0.03] border border-white/10 space-y-5">
            {/* Specialization */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m18 16 4-4-4-4" />
                  <path d="m6 8-4 4 4 4" />
                  <path d="m14.5 4-5 16" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">
                  Specialization
                </h4>
                <p className="text-xs text-foreground/40 mt-0.5">
                  Full Stack Development
                </p>
                <p className="text-xs text-foreground/50">
                  Modern Web Apps
                </p>
              </div>
            </div>

            {/* Experience */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">
                  Experience
                </h4>
                <p className="text-xs text-foreground/40 mt-0.5">
                  Software Engineering
                </p>
                <p className="text-xs text-foreground/50">
                  6+ years, Senior Level
                </p>
              </div>
            </div>

            {/* Tech Stack Summary */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
                  <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
                  <line x1="6" y1="6" x2="6.01" y2="6" />
                  <line x1="6" y1="18" x2="6.01" y2="18" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">
                  Tech Stack
                </h4>
                <p className="text-xs text-foreground/40 mt-0.5">
                  JS • TS • Python
                </p>
                <p className="text-xs text-foreground/50">
                  React • Next • Node
                </p>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-foreground/10 flex items-center justify-center text-foreground shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground text-sm">Location</h4>
                <p className="text-xs text-foreground/40 mt-0.5">Based in</p>
                <p className="text-xs text-foreground/50">Dhaka, Bangladesh</p>
              </div>
            </div>
          </div>

          {/* Availability Badge */}
          <div className="flex items-center gap-3 p-4 rounded-xl bg-foreground/5 border border-white/10">
            <div className="relative">
              <div className="w-2 h-2 rounded-full bg-foreground" />
              <div className="absolute inset-0 w-2 h-2 rounded-full bg-foreground animate-ping" />
            </div>
            <span className="text-sm font-medium text-foreground/70">
              Available for opportunities
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
