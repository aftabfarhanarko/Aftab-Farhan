export default function SkillPage() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl font-bold mb-6">My Skills</h1>
      <div className="grid grid-cols-2 gap-4">
        {['React', 'Next.js', 'Tailwind CSS', 'Node.js', 'TypeScript', 'PostgreSQL'].map(skill => (
          <div key={skill} className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg">
            {skill}
          </div>
        ))}
      </div>
    </div>
  );
}