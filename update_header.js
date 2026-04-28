const fs = require('fs');
const path = 'src/components/Home/SoftSkills/Soft-Skills.tsx';
let content = fs.readFileSync(path, 'utf8');

const oldHeader = `      {/* ── Header ── */}
      <div className="flex items-center gap-4 sm:gap-6 mb-8 sm:mb-12">
        <div className="relative">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-[1.05] mb-4">
            <span className="text-black dark:text-white">Soft </span>
            <span className="text-black/25 dark:text-white/25">Skills</span>
          </h2>
        </div>
        <div className="h-px flex-1 bg-black/10 dark:bg-white/10" />
        <span className="text-xs sm:text-sm font-mono text-black/40 dark:text-white/40 hidden sm:block">
          &lt;professional-qualities /&gt;
        </span>
      </div>

      {/* ── Intro banner ── */}
      <div className="mb-8 p-4 sm:p-5 rounded-2xl bg-black/[0.03] dark:bg-white/[0.03] border-l-4 border-l-black dark:border-l-white">
        <p className="text-sm sm:text-sm lg:text-base text-black/70 dark:text-white/70 leading-relaxed">
          Beyond technical expertise, I bring strong interpersonal skills that
          enable effective collaboration, clear communication, and successful
          project outcomes. These qualities have been essential in my roles as{" "}
          <span className="text-black dark:text-white font-semibold">
            Developer
          </span>{" "}
          and{" "}
          <span className="text-black dark:text-white font-semibold">
            Project Lead
          </span>
          .
        </p>
      </div>`;

const newHeader = `      {/* ── Header ── */}
      <div className="text-left mb-12 sm:mb-16">
        <div className="flex items-center gap-3 mb-2">
          <span className="text-xs sm:text-sm font-bold text-foreground/40 uppercase tracking-[0.2em]">
            Interpersonal Excellence
          </span>
          <div className="h-px w-12 bg-foreground/20" />
          <span className="text-[10px] font-mono text-foreground/30 hidden sm:block">
            &lt;professional-qualities /&gt;
          </span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          Beyond the <span className="text-foreground/30">Technicalities</span>
        </h2>

        <div className="mt-8 relative max-w-4xl">
          <div className="absolute -left-6 top-0 bottom-0 w-1 bg-foreground/10 rounded-full" />
          <p className="text-base sm:text-lg text-foreground/60 leading-relaxed pl-6">
            While code builds the foundation, <span className="text-foreground font-bold">collaboration</span>, <span className="text-foreground font-bold">leadership</span>, and <span className="text-foreground font-bold">strategic thinking</span> drive success. I bridge the gap between complex logic and real-world impact, ensuring every project is not just functional, but exceptional.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 pl-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Team Lead</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Problem Solver</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-foreground/40" />
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Strategic Partner</span>
            </div>
          </div>
        </div>
      </div>`;

if (content.includes(oldHeader)) {
    fs.writeFileSync(path, content.replace(oldHeader, newHeader));
    console.log('Successfully updated');
} else {
    // Try matching with different line endings or whitespace if needed
    console.error('Could not find oldHeader exactly');
    process.exit(1);
}
