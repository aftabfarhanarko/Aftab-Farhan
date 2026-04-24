export default function Skills() {
  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Redux", "Framer Motion"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
      ),
    },
    {
      title: "Backend",
      skills: ["Node.js", "Express", "Django", "Python", "REST API", "GraphQL"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="M12 2H2v10h10V2z"/><path d="M22 12H12v10h10V12z"/><path d="M12 12H2v10h10V12z"/><path d="M22 2H12v10h10V2z"/></svg>
      ),
    },
    {
      title: "Database",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Prisma", "Redis", "Firebase"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5V19A9 3 0 0 0 21 19V5"/><path d="M3 12A9 3 0 0 0 21 12"/></svg>
      ),
    },
    {
      title: "Tools & DevOps",
      skills: ["Git", "Docker", "AWS", "Vercel", "Postman", "Figma"],
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-foreground"><path d="m16 18 2 .47 1.4-2.4L18 14.5l.3-.3.3-.3 1.5.1 1.4-2.4L19.5 10l.3-.3.3-.3 1.5.1 1.4-2.4L21 4l-2.4-1.4L17 4.1l-.3-.3-.3-.3 1.5.1 1.4-2.4L17 0l-2.4 1.4.1 1.5-.3.3-.3.3L12 2.1 10.6 4.5l1.5.1.3.3.3.3L11.1 7.2l1.4 2.4 1.5-.1.3.3.3.3 1.5-1.5 2.4 1.4-1.5 1.5.3.3.3.3 1.5-.1 1.4 2.4-1.5 1.5.3.3.3.3 1.5-.1 1.4 2.4-1.5 1.5z"/></svg>
      ),
    },
  ];

  return (
    <section id="skill" className="mb-32 scroll-mt-24">
      <h2 className="mb-12 text-3xl font-black text-foreground flex items-center gap-4">
        <span className="h-1 w-12 bg-foreground rounded-full"></span>
        My Skills
      </h2>
      <div className="grid gap-8 md:grid-cols-2">
        {skillCategories.map((category) => (
          <div
            key={category.title}
            className="p-8 rounded-3xl border border-white/10 bg-foreground/5 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-foreground/10 group shadow-lg"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 rounded-2xl bg-foreground/10 border border-white/20 group-hover:scale-110 transition-transform">
                {category.icon}
              </div>
              <h3 className="text-xl font-bold text-foreground tracking-tight">
                {category.title}
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {category.skills.map((skill) => (
                <span
                  key={skill}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-background/50 border border-white/10 text-sm font-medium text-foreground/70 hover:text-foreground hover:border-white/50 transition-all cursor-default group/skill"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-foreground/30 group-hover/skill:text-foreground transition-colors"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}



