export default function SkillPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-8 text-foreground">My <span className="text-accent">Skills</span></h1>
      <div className="grid grid-cols-2 gap-4">
        {["React", "Next.js", "Tailwind CSS", "Node.js", "TypeScript", "PostgreSQL"].map(skill => (
          <div key={skill} className="p-4 border border-accent-muted/20 bg-accent-muted/5 rounded-xl text-center font-medium text-foreground/80 hover:border-accent/50 hover:bg-accent/5 transition-all group">
            <span className="group-hover:text-accent transition-colors">{skill}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
