export default function Home() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      {/* Hero Section */}
      <section
        id="hero"
        className="mb-24 flex flex-col items-start gap-6 pt-10"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl text-white">
          Aftab Farhan Arko
        </h1>
        <p className="text-lg text-zinc-400">
          Full-stack developer building modern web applications with a focus on 
          performance and user experience.
        </p>
        <div className="flex gap-4">
          <a
            href="#contact"
            className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Get in touch
          </a>
          <a
            href="#project"
            className="rounded-full border border-zinc-800 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-900"
          >
            View Projects
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold text-white">About Me</h2>
        <div className="space-y-4 text-zinc-400">
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
        <h2 className="mb-8 text-2xl font-bold text-white">My Skills</h2>
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
              className="p-4 border border-zinc-800 rounded-lg text-center font-medium text-zinc-300 hover:border-zinc-700 transition-colors"
            >
              {skill}
            </div>
          ))}
        </div>
      </section>

      {/* Client Project Section */}
      <section id="client-project" className="mb-24 scroll-mt-24">
        <h2 className="mb-8 text-2xl font-bold text-white">Client Projects</h2>
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
              className="group flex flex-col gap-2 rounded-2xl border border-zinc-800 p-6 transition-colors hover:bg-zinc-900/50"
            >
              <h3 className="text-lg font-semibold text-zinc-100">{project.title}</h3>        
              <p className="text-sm text-zinc-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-zinc-900 px-2 py-0.5 text-xs font-medium text-zinc-300 border border-zinc-800"
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
        <h2 className="mb-8 text-2xl font-bold text-white">Personal Projects</h2>
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
              className="group relative flex flex-col gap-2 rounded-2xl border border-zinc-800 p-6 transition-colors hover:bg-zinc-900/50"
            >
              <h3 className="text-lg font-semibold text-zinc-100">{project.title}</h3>        
              <p className="text-sm text-zinc-400">
                {project.description}
              </p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="rounded-md bg-zinc-900 px-2 py-0.5 text-xs font-medium text-zinc-300 border border-zinc-800"
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
        <h2 className="mb-8 text-2xl font-bold text-white">Get in Touch</h2>
        <p className="mb-8 text-zinc-400">
          I am currently looking for new opportunities. Whether you have a      
          question or just want to say hi, I will try my best to get back to    
          you!
        </p>
        <form className="space-y-4 max-w-md">
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Name</label>      
            <input
              type="text"
              className="w-full p-2 border border-zinc-800 rounded-lg bg-transparent text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Email</label>     
            <input
              type="email"
              className="w-full p-2 border border-zinc-800 rounded-lg bg-transparent text-white focus:outline-none focus:border-zinc-600 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1 text-zinc-300">Message</label>   
            <textarea className="w-full p-2 border border-zinc-800 rounded-lg bg-transparent text-white h-32 focus:outline-none focus:border-zinc-600 transition-colors"></textarea>
          </div>
          <button
            type="submit"
            className="px-6 py-2 bg-white text-black rounded-lg font-medium hover:bg-zinc-200 transition-colors"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}