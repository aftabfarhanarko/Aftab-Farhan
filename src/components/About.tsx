export default function About() {
  return (
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
  );
}
