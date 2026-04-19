export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Hero Section */}
      <section
        id="hero"
        className="mb-24 flex flex-col items-start gap-6 pt-10"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Aftab Farhan Arko
        </h1>
        <p className="text-lg text-zinc-600 dark:text-zinc-400">
          Full-stack developer building modern web applications with a focus on
          performance and user experience.
        </p>
        <div className="flex gap-4">
          <a
            href="#contact"
            className="rounded-full bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-700 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            Get in touch
          </a>
          <a
            href="#project"
            className="rounded-full border border-zinc-200 px-6 py-2 text-sm font-medium transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold">About Me</h2>
        <div className="space-y-4 text-zinc-600 dark:text-zinc-400">
          <p>
            Hello! I am Arko, a passionate developer based in Bangladesh. I love
            turning complex problems into simple, beautiful, and intuitive
            designs.
          </p>
          <p>
            I specialize in React, Next.js, and Node.js, and I am always eager
            to learn new technologies and improve my skills.
          </p>
        </div>
      </section>

      {/* Skill Section */}
      <section id="skill" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold">My Skills</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {[
            "React",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "TypeScript",
            "PostgreSQL",
          ].map((skill) => (
            <div
              key={skill}
              className="p-4 border border-zinc-100 dark:border-zinc-800 rounded-lg text-center font-medium"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Client Project Section */}
      <section id="client-project" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold">Client Projects</h2>
        <div className="grid gap-8">
          {[
            {
              title: "E-commerce Platform",
              description:
                "A comprehensive store for a local business with full checkout functionality.",
              tech: ["Next.js", "Stripe", "Prisma"],
            },
            {
              title: "Portfolio for Artist",
              description:
                "A minimal and high-performance showcase for a professional photographer.",
              tech: ["React", "Framer Motion", "Tailwind"],
            },
          ].map((project, i) => (
            <div
              key={i}
              className="group flex flex-col gap-2 rounded-2xl border border-zinc-100 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Project Section */}
      <section id="project" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold">Personal Projects</h2>
        <div className="grid gap-8">
          {[
            {
              title: "Task Management App",
              description:
                "A collaborative tool for teams to manage tasks and deadlines in real-time.",
              tech: ["Next.js", "Socket.io", "MongoDB"],
              link: "#",
            },
            {
              title: "Weather Dashboard",
              description:
                "A clean dashboard showing weather data with interactive maps.",
              tech: ["React", "OpenWeather API", "Leaflet"],
              link: "#",
            },
          ].map((project, i) => (
            <div
              key={i}
              className="group relative flex flex-col gap-2 rounded-2xl border border-zinc-100 p-6 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-900"
            >
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-zinc-100 px-2 py-0.5 text-xs font-medium dark:bg-zinc-800"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <a
                href={project.link}
                className="absolute inset-0 focus:outline-none"
              >
                <span className="sr-only">View project</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold">Get in Touch</h2>
        <p className="mb-8 text-zinc-600 dark:text-zinc-400">
          I am currently looking for new opportunities. Whether you have a
          question or just want to say hi, I will try my best to get back to
          you!
        </p>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              type="text"
              className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Message</label>
            <textarea className="w-full p-2 border border-zinc-200 dark:border-zinc-800 rounded-lg bg-transparent h-32"></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-zinc-900 dark:bg-zinc-50 dark:text-zinc-900 text-white rounded-lg hover:bg-zinc-700 dark:hover:bg-zinc-200 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
