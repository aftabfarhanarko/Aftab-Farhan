export default function Home() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      {/* Hero Section */}
      <section
        id="hero"
        className="relative mb-32 flex flex-col lg:flex-row items-center justify-between gap-12 pt-16"
      >
        {/* Floating Badges */}
        <div className="absolute left-[-2rem] top-20 hidden xl:block">
          <div className="px-3 py-1.5 rounded-lg bg-accent-muted/10 border border-accent/20 backdrop-blur-sm text-accent text-[10px] font-mono">
            def build():
          </div>
        </div>
        <div className="absolute right-0 bottom-20 hidden xl:block">
          <div className="px-3 py-1.5 rounded-lg bg-accent-muted/10 border border-accent/20 backdrop-blur-sm text-accent text-[10px] font-mono">
            api.response(200)
          </div>
        </div>

        {/* Left Content */}
        <div className="flex-1 flex flex-col items-start gap-6 z-10">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-foreground/80">
              Hi, I''m{" "}
              <span className="font-bold text-foreground">
                Aftab Farhan Arko
              </span>
            </h3>
            <h1 className="text-5xl sm:text-7xl font-black tracking-tight text-accent uppercase italic">
              Full Stack Developer
            </h1>
            <h4 className="text-xl font-semibold text-foreground/90 mt-2">
              Building Reliable, Scalable Web Solutions
            </h4>
          </div>

          <p className="text-lg text-foreground/60 max-w-xl leading-relaxed">
            I design robust{" "}
            <span className="text-foreground font-bold border-b border-accent/30">
              system architectures
            </span>{" "}
            to solve complex problems. I build scalable, high-performance web
            solutions that are reliable and help your business grow.
          </p>

          <div className="flex flex-wrap gap-4 mt-4">
            <a
              href="#contact"
              className="flex items-center gap-2 rounded-lg bg-accent px-6 py-3 text-sm font-bold text-background transition-all hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(57,255,20,0.3)]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" x2="12" y1="15" y2="3" />
              </svg>
              View Resume
            </a>
            <a
              href="#project"
              className="rounded-lg border-2 border-accent px-6 py-3 text-sm font-bold text-accent transition-all hover:bg-accent/5 hover:scale-105 active:scale-95"
            >
              View Projects
            </a>
          </div>

          {/* Stats Section */}
          <div className="flex gap-12 mt-12 pt-8 border-t border-accent-muted/20 w-full">
            <div>
              <div className="text-3xl font-black text-foreground">2+</div>
              <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mt-1">
                Years Experience
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-foreground">5+</div>
              <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mt-1">
                Projects
              </div>
            </div>
            <div>
              <div className="text-3xl font-black text-foreground">150+</div>
              <div className="text-[10px] font-bold text-foreground/40 uppercase tracking-widest mt-1">
                Problems Solved
              </div>
            </div>
          </div>
        </div>

        {/* Right Content - Profile Image Placeholder */}
        <div className="relative flex-shrink-0 lg:w-[450px] lg:h-[450px] flex items-center justify-center">
          {/* Glowing Rings */}
          <div className="absolute inset-0 rounded-full border border-accent/10 animate-[spin_20s_linear_infinite]"></div>
          <div className="absolute inset-4 rounded-full border-2 border-dashed border-accent/20 animate-[spin_30s_linear_infinite_reverse]"></div>
          <div className="absolute inset-[-20px] rounded-full bg-accent/5 blur-3xl opacity-50"></div>

          {/* Main Circle */}
          <div className="relative w-72 h-72 sm:w-80 sm:h-80 rounded-full border-4 border-accent p-2 shadow-[0_0_50px_rgba(57,255,20,0.2)] overflow-hidden bg-accent-muted/20 group">
            <div className="w-full h-full rounded-full bg-gradient-to-b from-accent-muted/40 to-transparent flex items-center justify-center text-accent/20">
              {/* User will add image here later */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="120"
                height="120"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="0.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            {/* Tech Stack Badge */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 px-4 py-2 rounded-full bg-background/80 backdrop-blur-md border border-accent/30 shadow-xl">
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground/90">
                <span className="w-2 h-2 rounded-full bg-blue-500"></span>{" "}
                Python
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground/90">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>{" "}
                Django
              </div>
              <div className="flex items-center gap-1.5 text-[10px] font-bold text-foreground/90">
                <span className="w-2 h-2 rounded-full bg-cyan-500"></span> React
              </div>
            </div>
          </div>

          {/* Floating Icons around circle */}
          <div className="absolute top-10 right-10 p-2 rounded-lg bg-background/50 border border-accent/20 backdrop-blur-sm text-accent shadow-lg animate-bounce">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="16 18 22 12 16 6" />
              <polyline points="8 6 2 12 8 18" />
            </svg>
          </div>
          <div className="absolute bottom-20 left-0 p-2 rounded-lg bg-background/50 border border-accent/20 backdrop-blur-sm text-accent shadow-lg animate-pulse">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <ellipse cx="12" cy="5" rx="9" ry="3" />
              <path d="M3 5V19A9 3 0 0 0 21 19V5" />
              <path d="M3 12A9 3 0 0 0 21 12" />
            </svg>
          </div>
        </div>
      </section>
      {/* About Section */}
      <section id="about" className="mb-32 scroll-mt-24">
        <h2 className="mb-12 text-3xl font-black text-foreground flex items-center gap-4">
          <span className="h-1 w-12 bg-accent rounded-full"></span>
          About Me
        </h2>
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6 text-foreground/70 text-lg leading-relaxed">
            <p>
              Hello! I am{" "}
              <span className="text-foreground font-bold">Arko</span>, a
              passionate developer based in Bangladesh. I love turning complex
              problems into{" "}
              <span className="text-accent font-medium italic underline decoration-accent/30">
                simple, beautiful, and intuitive
              </span>
              designs.
            </p>
            <p>
              I specialize in React, Next.js, and Node.js, and I am always eager
              to learn new technologies and improve my skills.
            </p>
          </div>
          <div className="p-8 rounded-2xl border border-accent-muted/20 bg-accent-muted/5 space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
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
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3.3 3.3 0 0 0-3-3H2z" />
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3.3 3.3 0 0 1 3-3h7z" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-foreground">Education</h4>
                <p className="text-sm text-foreground/50">
                  BSc in Computer Science & Engineering
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
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
                <h4 className="font-bold text-foreground">Experience</h4>
                <p className="text-sm text-foreground/50">
                  Full-stack development for 2+ years
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skill Section */}
      <section id="skill" className="mb-32 scroll-mt-24">
        <h2 className="mb-12 text-3xl font-black text-foreground flex items-center gap-4">
          <span className="h-1 w-12 bg-accent rounded-full"></span>
          My Skills
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
          {[
            "React",
            "Next.js",
            "Tailwind CSS",
            "Node.js",
            "TypeScript",
            "PostgreSQL",
            "Docker",
            "AWS",
          ].map((skill) => (
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

      {/* Contact Section */}
      <section id="contact" className="mb-32 scroll-mt-24">
        <h2 className="mb-12 text-3xl font-black text-foreground flex items-center gap-4">
          <span className="h-1 w-12 bg-accent rounded-full"></span>
          Get in Touch
        </h2>
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <p className="text-foreground/60 text-lg leading-relaxed">
              I am currently looking for new opportunities. Whether you have a
              question or just want to say hi, I will try my best to get back to
              you!
            </p>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent">
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
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold text-foreground">Email</h4>
                  <p className="text-foreground/50">contact@example.com</p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/80 uppercase tracking-widest text-[10px]">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full p-4 border border-accent-muted/30 rounded-2xl bg-accent-muted/5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-foreground/80 uppercase tracking-widest text-[10px]">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full p-4 border border-accent-muted/30 rounded-2xl bg-accent-muted/5 text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all shadow-inner"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-sm font-bold text-foreground/80 uppercase tracking-widest text-[10px]">
                Message
              </label>
              <textarea
                placeholder="How can I help you?"
                className="w-full p-4 border border-accent-muted/30 rounded-2xl bg-accent-muted/5 text-foreground placeholder:text-foreground/20 h-40 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all resize-none shadow-inner"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-10 py-4 bg-accent text-background rounded-2xl font-black uppercase tracking-widest text-xs transition-all hover:bg-accent/90 hover:scale-[1.02] active:scale-95 shadow-[0_10px_30px_rgba(57,255,20,0.2)]"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
