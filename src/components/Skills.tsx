export default function Skills() {
  const skills = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "Node.js",
    "TypeScript",
    "PostgreSQL",
    "Docker",
    "AWS",
  ];

  return (
    <section id="skill" className="mb-32 scroll-mt-24">
      <h2 className="mb-12 text-3xl font-black text-foreground flex items-center gap-4">
        <span className="h-1 w-12 bg-accent rounded-full"></span>
        My Skills
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">  
        {skills.map((skill) => (
          <div
            key={skill}
            className="p-6 border border-accent-muted/20 bg-accent-muted/5 rounded-2xl text-center font-bold text-foreground/80 hover:border-accent/50 hover:bg-accent/5 transition-all group hover:-translate-y-1 shadow-sm"
          >
            <span className="group-hover:text-accent transition-colors">      
              {skill}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
