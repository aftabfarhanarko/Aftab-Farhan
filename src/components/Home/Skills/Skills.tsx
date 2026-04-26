import {
  Monitor,
  Server,
  Database,
  Cloud,
  Cpu,
  ArrowRight,
  Sparkles,
  Wrench,
  Settings,
  Globe,
  GitBranch,
  Terminal,
  Satellite,
  Box,
  ShieldCheck,
  Paintbrush,
  Workflow,
  Container,
  Rocket,
  Check,
} from "lucide-react";

// Custom Colored Icons
const JavaScriptIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#F7DF1E" d="M0 0h24v24H0z" />
    <path d="M6 18h12V6H6v12z" fill="none" />
    <path
      d="M18.674 19.425l.432-2.559c.702.405 1.458.621 2.241.621.648 0 1.053-.297 1.053-.729 0-.486-.351-.702-1.377-.945-1.539-.378-2.592-.999-2.592-2.511 0-1.377 1.026-2.43 2.862-2.43 1.107 0 2.025.27 2.754.729l-.459 2.457c-.567-.351-1.242-.54-1.944-.54-.675 0-.999.27-.999.648 0 .432.378.621 1.431.891 1.62.405 2.538 1.053 2.538 2.565 0 1.566-1.188 2.592-3.159 2.592-1.323 0-2.457-.351-3.186-.789zm-5.724-.324c-.729.459-1.782.729-2.916.729-2.349 0-3.834-1.377-3.834-3.726V9.018h2.619v7.02c0 .891.405 1.35 1.242 1.35.324 0 .594-.054.81-.135l.079 2.848z"
      fill="#000"
      transform="translate(-3, -2) scale(0.8)"
    />
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path fill="#3178C6" d="M0 0h24v24H0z" />
    <path
      d="M15.887 19.141c.641.422 1.533.729 2.51.729 1.533 0 2.483-.751 2.483-1.841 0-1.071-.702-1.579-2.364-2.288-1.781-.75-2.844-1.688-2.844-3.411 0-1.879 1.44-3.235 3.73-3.235 1.192 0 2.071.274 2.731.67l-.766 2.413c-.499-.288-1.152-.49-1.902-.49-.787 0-1.214.365-1.214.864 0 .538.452.787 1.884 1.402 1.939.845 3.321 1.805 3.321 3.968 0 2.15-1.613 3.562-4.148 3.562-1.383 0-2.574-.384-3.321-.922l.901-2.431zm-10.432-.173c-.768.442-1.879.729-3.07.729-2.474 0-4.041-1.441-4.041-3.879V9.123h2.757v7.355c0 .94.422 1.421 1.306 1.421.341 0 .624-.057.854-.144l.194 2.213z"
      fill="#fff"
      transform="translate(1, -1) scale(0.8)"
    />
  </svg>
);

const ReactIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="-11.5 -10.23174 23 20.46348"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="0" cy="0" r="2.05" fill="#61dafb" />
    <g stroke="#61dafb" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 180 180"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      maskUnits="userSpaceOnUse"
      x="0"
      y="0"
      width="180"
      height="180"
    >
      <circle cx="90" cy="90" r="90" fill="black" />
    </mask>
    <g mask="url(#mask0)">
      <circle cx="90" cy="90" r="90" fill="black" />
      <path
        d="M149.508 157.52L69.142 54H54V125.97H66.1136V69.3836L139.999 164.845C143.333 162.614 146.509 160.165 149.508 157.52Z"
        fill="white"
      />
      <rect x="115" y="54" width="12" height="72" fill="white" />
    </g>
  </svg>
);

const NodejsIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#339933"
      d="M12 2L4.5 6.3v8.4L12 19l7.5-4.3V6.3L12 2zm5.9 11.9L12 17.3l-5.9-3.4V7.7L12 4.3l5.9 3.4v6.2z"
    />
    <path
      fill="#339933"
      d="M12 6.5l-4.5 2.6v5.2l4.5 2.6 4.5-2.6V9.1L12 6.5zm0 8.4l-2.6-1.5V9.1l2.6 1.5v4.3z"
    />
  </svg>
);

const MongoDBIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#47A248"
      d="M12 22s-5.5-3.5-5.5-10c0-6.5 5.5-10 5.5-10s5.5 3.5 5.5 10c0 6.5-5.5 10-5.5 10zm0-17.5c-2.5 2-3.5 5-3.5 7.5 0 2.5 1 5.5 3.5 7.5 2.5-2 3.5-5 3.5-7.5 0-2.5-1-5.5-3.5-7.5z"
    />
    <path
      fill="#13AA52"
      d="M12 18.5c-1.5-1-2.5-3-2.5-6.5 0-3.5 1-5.5 2.5-6.5V18.5z"
    />
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#06B6D4"
      d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"
    />
  </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    className={className}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fill="#F05032"
      d="M23.546 10.93L13.067.452a1.49 1.49 0 0 0-2.133 0l-2.126 2.127 3.016 3.016a1.49 1.49 0 0 1 2.116 2.116l-3.016-3.016v5.885a1.49 1.49 0 0 1 0 2.133l3.016 3.016a1.49 1.49 0 0 1-2.116 2.116l-3.016-3.016v-5.885a1.49 1.49 0 0 1-2.133 0l-3.016-3.016-2.126 2.126a1.49 1.49 0 0 0 0 2.133l10.479 10.479a1.49 1.49 0 0 0 2.133 0l10.479-10.479a1.49 1.49 0 0 0 0-2.133z"
    />
  </svg>
);

// Map each skill name to a Custom Icon or Lucide icon
const skillIconMap: Record<
  string,
  React.ComponentType<{ className?: string }>
> = {
  JavaScript: JavaScriptIcon,
  TypeScript: TypeScriptIcon,
  React: ReactIcon,
  "Next.js": NextjsIcon,
  Python: Terminal,
  "Node.js": NodejsIcon,
  "Express.js": Server,
  MongoDB: MongoDBIcon,
  PostgreSQL: Database,
  Firebase: Database,
  "Framer Motion": Sparkles,
  GSAP: Sparkles,
  "CSS Animations": Sparkles,
  "Tailwind Animations": TailwindIcon,
  "Scroll Animations": Sparkles,
  "Micro Interactions": Sparkles,
  Git: GitIcon,
  GitHub: Globe,
  "GitHub Actions": Workflow,
  Vercel: Globe,
  Netlify: Globe,
  Docker: Container,
  "CI/CD": Rocket,
  Railway: Globe,
  Render: Globe,
  "VS Code": Terminal,
  Postman: Satellite,
  "MongoDB Atlas": MongoDBIcon,
  Prisma: Box,
  Figma: Paintbrush,
  "Chrome DevTools": Globe,
  npm: Box,
  ESLint: ShieldCheck,
  Prettier: Paintbrush,
};

interface Skill {
  name: string;
  type: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  icon: React.ComponentType<{ className?: string }>;
}

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend & Languages",
      skills: [
        { name: "JavaScript", type: "Language" },
        { name: "TypeScript", type: "Language" },
        { name: "React", type: "Library" },
        { name: "Next.js", type: "Framework" },
      ],
      icon: Monitor,
    },
    {
      title: "Backend & APIs",
      skills: [
        { name: "Node.js", type: "Runtime" },
        { name: "Express.js", type: "Framework" },
      ],
      icon: Server,
    },
    {
      title: "Database & Storage",
      skills: [
        { name: "MongoDB", type: "Database" },
        { name: "PostgreSQL", type: "Database" },
        { name: "Firebase", type: "Platform" },
      ],
      icon: Database,
    },
    {
      title: "Animation & Motion",
      skills: [
        { name: "Framer Motion", type: "Library" },
        { name: "GSAP", type: "Library" },
        { name: "CSS Animations", type: "CSS" },
        { name: "Tailwind Animations", type: "CSS" },
        { name: "Scroll Animations", type: "UX" },
        { name: "Micro Interactions", type: "UX" },
      ],
      icon: Sparkles,
    },
    {
      title: "Tools & Deployment",
      skills: [
        { name: "Git", type: "Tool" },
        { name: "GitHub", type: "Platform" },
        { name: "GitHub Actions", type: "CI/CD" },
        { name: "Vercel", type: "Platform" },
        { name: "Netlify", type: "Platform" },
        { name: "Docker", type: "Tool" },
        { name: "CI/CD", type: "Process" },
        { name: "Railway", type: "Platform" },
        { name: "Render", type: "Platform" },
      ],
      icon: Wrench,
    },
    {
      title: "Development Tools & Workflow",
      skills: [
        { name: "VS Code", type: "IDE" },
        { name: "Postman", type: "Tool" },
        { name: "MongoDB Atlas", type: "Platform" },
        { name: "Prisma", type: "ORM" },
        { name: "Figma", type: "Design" },
        { name: "Chrome DevTools", type: "Tool" },
        { name: "npm", type: "Tool" },
        { name: "ESLint", type: "Tool" },
        { name: "Prettier", type: "Tool" },
      ],
      icon: Settings,
    },
  ];

  return (
    <section id="skills" className="mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      {/* Left-aligned header */}
      <div className="text-left mb-12 sm:mb-16">
        <span className="text-xs sm:text-sm font-bold text-foreground/40 uppercase tracking-[0.2em]">
          Technical Arsenal
        </span>
        <h2 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-black text-foreground tracking-tight">
          Mastering the Modern Stack
        </h2>
        <p className="mt-4 max-w-2xl text-foreground/60 text-sm sm:text-base leading-relaxed">
          A comprehensive view of the technologies and tools I leverage to build
          scalable, high-performance applications.
        </p>
      </div>

      {/* Grid of category cards */}
      <div className="grid gap-5 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
        {skillCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div
              key={category.title}
              className="relative p-5 sm:p-6 rounded-2xl border border-white/10 bg-foreground/[0.02] backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-foreground/[0.05] group"
            >
              {/* Category header */}
              <div className="flex items-center gap-3 mb-4 sm:mb-5">
                <div className="p-2.5 sm:p-3 rounded-xl bg-foreground/10 border border-white/10 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-foreground tracking-tight">
                  {category.title}
                </h3>
              </div>

              {/* Skill tags with custom icons */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const SkillIcon = skillIconMap[skill.name] || Check;
                  return (
                    <div
                      key={skill.name}
                      className="group/skill flex flex-col gap-1"
                    >
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background/30 border border-white/10 text-xs sm:text-sm font-medium text-foreground/70 hover:text-foreground hover:border-white/30 transition-all cursor-default"
                        title={`${skill.name} (${skill.type})`}
                      >
                        <SkillIcon className="w-4 h-4 transition-transform group-hover/skill:scale-110" />
                        {skill.name}
                      </span>
                      <span className="text-[10px] font-bold text-foreground/20 uppercase tracking-widest px-1">
                        {skill.type}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
