import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative mb-32 flex flex-col lg:flex-row items-center justify-between gap-12 pt-16"
    >
      {/* Floating Badges */}
      <div className="absolute left-[-4rem] top-24 hidden xl:block animate-bounce duration-[3000ms]">
        <div className="px-4 py-2 rounded-xl bg-accent-muted/10 border border-accent/20 backdrop-blur-md text-accent text-xs font-mono shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          def build():
        </div>
      </div>
      <div className="absolute right-[-2rem] bottom-32 hidden xl:block animate-pulse">
        <div className="px-4 py-2 rounded-xl bg-accent-muted/10 border border-accent/20 backdrop-blur-md text-accent text-xs font-mono shadow-[0_0_15px_rgba(57,255,20,0.1)]">
          api.response(200)
        </div>
      </div>

      {/* Left Content */}
      <div className="flex-1 flex flex-col items-start gap-8 z-10">
        <div className="space-y-4">
          <h3 className="text-xl font-medium text-foreground/80 animate-in fade-in slide-in-from-left duration-700">
            Hi, I''m{" "}
            <span className="font-bold text-foreground">Md Mim Shifat</span>
          </h3>
          <h1 className="text-6xl sm:text-8xl font-black tracking-tighter text-accent uppercase italic leading-[0.9] animate-in fade-in slide-in-from-left duration-1000 delay-100">
            Full Stack Developer
          </h1>
          <h4 className="text-2xl font-bold text-foreground/90 mt-4 tracking-tight animate-in fade-in slide-in-from-left duration-1000 delay-200">
            Building Reliable, Scalable Web Solutions
          </h4>
        </div>

        <p className="text-xl text-foreground/60 max-w-xl leading-relaxed animate-in fade-in slide-in-from-left duration-1000 delay-300">
          I design robust{" "}
          <span className="text-foreground font-bold border-b-2 border-accent/30">
            system architectures
          </span>{" "}
          to solve complex problems. I build scalable, high-performance web
          solutions that are reliable and help your business grow.
        </p>

        <div className="flex flex-wrap gap-6 mt-4 animate-in fade-in slide-in-from-left duration-1000 delay-400">
          <a
            href="#contact"
            className="flex items-center gap-3 rounded-xl bg-accent px-8 py-4 text-sm font-black text-background transition-all hover:bg-accent/90 hover:scale-105 active:scale-95 shadow-[0_10px_40px_rgba(57,255,20,0.4)] group"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="group-hover:translate-y-0.5 transition-transform"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" x2="12" y1="15" y2="3" />
            </svg>
            View Resume
          </a>
          <a
            href="#project"
            className="rounded-xl border-2 border-accent px-8 py-4 text-sm font-black text-accent transition-all hover:bg-accent/10 hover:scale-105 active:scale-95"
          >
            View Projects
          </a>
        </div>

        {/* Stats Section */}
        <div className="flex gap-16 mt-12 pt-10 border-t border-accent-muted/20 w-full animate-in fade-in slide-in-from-bottom duration-1000 delay-500">
          <div>
            <div className="text-4xl font-black text-foreground tracking-tighter">
              2+
            </div>
            <div className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mt-2">
              Years Experience
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-foreground tracking-tighter">
              5+
            </div>
            <div className="text-[11px] font-black text-foreground/40 uppercase tracking-widest mt-2">
              Projects
            </div>
          </div>
          <div>
            <div className="text-4xl font-black text-foreground tracking-tighter">
              150+
            </div>
            <div className="text-[11px] font-black text-foreground/40 uppercase tracking-[0.2em] mt-2">
              Problems Solved
            </div>
          </div>
        </div>
      </div>

      {/* Right Content - Circular Profile */}
      <div className="relative flex-shrink-0 lg:w-[500px] lg:h-[500px] flex items-center justify-center animate-in fade-in zoom-in duration-1000">
        {/* Outer Rotating Dash Ring */}
        <div className="absolute inset-0 rounded-full border-2 border-dashed border-accent/20 animate-[spin_60s_linear_infinite]"></div>

        {/* Inner Glowing Rings */}
        <div className="absolute inset-8 rounded-full border border-accent/30 animate-[spin_40s_linear_infinite_reverse]"></div>
        <div className="absolute inset-[-40px] rounded-full bg-accent/10 blur-[100px] opacity-60"></div>

        {/* Profile Circle Container */}
        <div className="relative w-80 h-80 sm:w-96 sm:h-96 rounded-full border-[6px] border-accent/80 p-3 shadow-[0_0_80px_rgba(57,255,20,0.3)] bg-background z-10 group">
          <div className="w-full h-full rounded-full overflow-hidden relative bg-accent-muted/10">
            <Image
              src="/image.png"
              alt="Profile"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
          </div>

          {/* Tech Stack Badge - Bottom of circle */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-2.5 rounded-full bg-background/90 backdrop-blur-xl border border-accent/40 shadow-[0_10px_30px_rgba(0,0,0,0.5)] z-20 whitespace-nowrap">
            <div className="flex items-center gap-2 text-xs font-black text-foreground/90">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"></span>{" "}
              Python
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-foreground/90 border-l border-accent-muted/30 pl-4">
              <span className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>{" "}
              Django
            </div>
            <div className="flex items-center gap-2 text-xs font-black text-foreground/90 border-l border-accent-muted/30 pl-4">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.5)]"></span>{" "}
              React
            </div>
          </div>
        </div>

        {/* Floating Action Icons */}
        <div className="absolute top-12 right-12 p-3 rounded-xl bg-background/80 border border-accent/30 backdrop-blur-md text-accent shadow-2xl z-20 animate-bounce hover:scale-110 transition-transform cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="16 18 22 12 16 6" />
            <polyline points="8 6 2 12 8 18" />
          </svg>
        </div>
        <div className="absolute bottom-24 left-4 p-3 rounded-xl bg-background/80 border border-accent/30 backdrop-blur-md text-accent shadow-2xl z-20 animate-pulse hover:scale-110 transition-transform cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <ellipse cx="12" cy="5" rx="9" ry="3" />
            <path d="M3 5V19A9 3 0 0 0 21 19V5" />
            <path d="M3 12A9 3 0 0 0 21 12" />
          </svg>
        </div>
        <div className="absolute right-0 top-1/2 -translate-y-1/2 p-3 rounded-xl bg-background/80 border border-accent/30 backdrop-blur-md text-accent shadow-2xl z-20 animate-[bounce_4s_infinite] hover:scale-110 transition-transform cursor-pointer">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
            <line x1="3" x2="21" y1="9" y2="9" />
            <line x1="9" x2="9" y1="21" y2="9" />
          </svg>
        </div>
      </div>
    </section>
  );
}
