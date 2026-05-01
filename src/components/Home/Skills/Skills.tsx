import {
  Monitor,
  Server,
  Database,
  Sparkles,
  Wrench,
  Settings,
  Check,
} from "lucide-react";

// ── Custom Brand Icons ──────────────────────────────────────────────────────

const JavaScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#F7DF1E" />
    <path
      d="M7 17.3c.4.7 1 1.2 2 1.2.9 0 1.5-.4 1.5-1s-.4-.9-1.3-1.3l-.5-.2c-1.3-.5-2.1-1.2-2.1-2.6
         0-1.3 1-2.3 2.6-2.3 1.1 0 1.9.4 2.5 1.4l-1.4.9c-.3-.5-.6-.7-1.1-.7-.5 0-.8.3-.8.7
         0 .5.3.7 1 1l.5.2c1.5.6 2.4 1.4 2.4 2.8 0 1.6-1.3 2.5-2.9 2.5-1.6 0-2.7-.8-3.2-1.9L7 17.3z
         M14.2 17.5c.3.5.6.9 1.2.9.6 0 1-.2 1-1.1v-5.9h2v6c0 2-1.2 2.9-2.9 2.9-1.5 0-2.4-.8-2.9-1.7l1.6-1.1z"
      fill="#000"
    />
  </svg>
);

const TypeScriptIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="3" fill="#3178C6" />
    <path
      d="M3 12.5h3.5V21h2v-8.5H12V11H3v1.5z
         M14 16.8c.3.5.7.9 1.3.9.6 0 1-.3 1-.8s-.3-.7-1.1-1l-.4-.2c-1.2-.5-1.9-1.1-1.9-2.3
         0-1.1.9-1.9 2.3-1.9 1 0 1.7.3 2.2 1.2l-1.3.8c-.2-.5-.5-.6-.9-.6-.4 0-.7.2-.7.6
         0 .4.3.6.9.9l.4.2c1.4.6 2.1 1.2 2.1 2.5 0 1.4-1.1 2.2-2.6 2.2-1.5 0-2.4-.7-2.8-1.7L14 16.8z"
      fill="#fff"
    />
  </svg>
);

const ReactIcon = ({ className }: { className?: string }) => (
  <svg viewBox="-11.5 -10.23174 23 20.46348" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
    <g stroke="#61DAFB" strokeWidth="1" fill="none">
      <ellipse rx="11" ry="4.2" />
      <ellipse rx="11" ry="4.2" transform="rotate(60)" />
      <ellipse rx="11" ry="4.2" transform="rotate(120)" />
    </g>
  </svg>
);

const NextjsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="#000" />
    <path
      d="M19.07 20.21L8.9 7H7v10h1.93v-7.56l9.52 12.1c.22-.1.43-.2.62-.33z"
      fill="#fff"
    />
    <rect x="15.5" y="7" width="1.93" height="7" fill="#fff" />
  </svg>
);

const NodejsIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2L3.5 7v10L12 22l8.5-5V7L12 2zm0 2.3l6.5 3.75v7.9L12 19.7l-6.5-3.75V8.05L12 4.3z"
      fill="#339933"
    />
    <path d="M12 7.5L8 9.8v4.4l4 2.3 4-2.3V9.8L12 7.5z" fill="#339933" opacity=".6" />
  </svg>
);

const MongoDBIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 2S6.5 6 6.5 12.5c0 4.3 2.5 7.2 4.7 8.6l.8.4V3.1L12 2z"
      fill="#47A248"
    />
    <path d="M12 3.1v18.4l.6-.3c2.3-1.4 4.9-4.4 4.9-8.7C17.5 6 12 3.1 12 3.1z" fill="#47A248" opacity=".7" />
  </svg>
);

const PostgreSQLIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.1 3.5c-1.1-.3-2.3-.1-3.3.5-.6-.2-1.3-.3-2-.3-2 0-3.6.8-4.5 2-.9 1.2-1 2.8-.5 4.3-.6.9-.9 2-.9 3.1 0 2.1 1 3.8 2.6 4.6.4.2.8.3 1.2.4 0 .4 0 .8.1 1.2.1.9.4 1.6.9 2l.3.2h.5c.4 0 .8-.2 1.1-.6.2-.3.3-.6.4-1 .4.1.8.1 1.2.1.2 0 .4 0 .6-.1.1.5.3.9.6 1.2.3.4.7.5 1.1.5h.4l.3-.2c.5-.4.7-1.1.8-2 .1-.4.1-.8.1-1.2 1.7-.7 2.9-2.4 2.9-4.5 0-.8-.2-1.5-.5-2.2.5-1.4.4-3-.3-4.2-.5-.9-1.3-1.6-2.1-1.9z"
      fill="#336791"
    />
    <path
      d="M10.1 9c-.5 0-.9.6-.9 1.3s.4 1.3.9 1.3.9-.6.9-1.3S10.6 9 10.1 9zm4 0c-.5 0-.9.6-.9 1.3s.4 1.3.9 1.3.9-.6.9-1.3S14.6 9 14.1 9z"
      fill="#fff"
    />
  </svg>
);

const FirebaseIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M5.3 17.9L7.8 2l4.8 4.9-7.3 11z" fill="#FFA000" />
    <path d="M5.3 17.9l5.5-3.3 2.2 2.1-7.7 1.2z" fill="#F57F17" />
    <path d="M13 14.6l-2.2-2.1 3.2-10.5 2.8 14.4-3.8-1.8z" fill="#FFCA28" />
    <path d="M5.3 17.9l7.7-1.2 3.8 1.8-11.5-.6z" fill="#FFA000" />
  </svg>
);

const TailwindIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.36C13.27 10.72 14.33 12 16.5 12c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.36C15.23 7.28 14.17 6 12 6z
         M7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.36C8.27 16.72 9.33 18 11.5 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.36C10.23 13.28 9.17 12 7 12z"
      fill="#06B6D4"
    />
  </svg>
);

const GitIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M23.55 11.07L12.93.45a1.55 1.55 0 00-2.19 0L8.56 2.63l2.77 2.77a1.84 1.84 0 012.33 2.34l2.67 2.67a1.84 1.84 0 11-1.1 1.04l-2.49-2.49v6.55a1.84 1.84 0 11-1.51-.05V8.8a1.84 1.84 0 01-1-2.42L7.48 3.63.45 10.74a1.55 1.55 0 000 2.19l10.62 10.62a1.55 1.55 0 002.19 0l10.29-10.29a1.55 1.55 0 000-2.19z"
      fill="#F05032"
    />
  </svg>
);

const DockerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M22.7 10.1c-.5-.3-1.5-.5-2.6-.3-.1-1-.7-1.9-1.5-2.5l-.3-.2-.2.3c-.5.7-.7 1.8-.6 2.7-.7-.4-1.6-.5-2.5-.4H2.5c-.2 1.1.1 2.9 1.2 4.1.8.9 2 1.4 3.5 1.4 3.3 0 5.8-1.5 7-4.2.8 0 2.6.1 3.5-1.6l.1-.2-.2-.1z"
      fill="#2496ED"
    />
    <path
      d="M7 9H5v2h2V9zm2.5 0h-2v2h2V9zm2.5 0h-2v2h2V9zm2.5 0h-2v2h2V9zm-5-2.5H7V9h2V6.5zm2.5 0h-2V9h2V6.5zm2.5 0h-2V9h2V6.5z"
      fill="#fff"
    />
  </svg>
);

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M8 2h4a4 4 0 010 8H8V2z" fill="#F24E1E" />
    <path d="M8 10h4a4 4 0 010 8H8v-8z" fill="#A259FF" />
    <path d="M8 18v4a4 4 0 000-8v4z" fill="#0ACF83" />
    <path d="M8 2H4a4 4 0 000 8h4V2z" fill="#FF7262" />
    <circle cx="16" cy="14" r="4" fill="#1ABCFE" />
  </svg>
);

const VSCodeIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17.5 2l-7 6.5-4-3L3 7v10l3.5 1.5 4-3 7 6.5 3.5-2V4L17.5 2zM19 16.5l-5.5-4.5 5.5-4.5v9z"
      fill="#007ACC"
    />
    <path d="M19 7.5l-5.5 4.5L19 16.5" fill="#1BA8E9" />
    <path d="M6.5 15.5L10.5 12 6.5 8.5" fill="none" stroke="#fff" strokeWidth=".5" />
  </svg>
);

const PrismaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M4 22L14.5 2l5.5 16.5L4 22z" fill="#2D3748" />
    <path d="M14.5 2L20 18.5 4 22l10.5-20z" fill="#4A5568" opacity=".6" />
    <path d="M4 22l10.5-10L20 18.5" fill="#718096" opacity=".8" />
  </svg>
);

// ── Icon Map ────────────────────────────────────────────────────────────────

const skillIconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  JavaScript: JavaScriptIcon,
  TypeScript: TypeScriptIcon,
  React: ReactIcon,
  "Next.js": NextjsIcon,
  Python: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C8.2 2 8.5 3.7 8.5 3.7V6h3.6v.5H6.2S4 6.3 4 10.1c0 3.8 2.1 3.7 2.1 3.7h1.3v-1.8s-.1-2.1 2.1-2.1h3.6s2 .1 2-1.9V3.9S15.4 2 12 2zm-2 1.4c.4 0 .7.3.7.7s-.3.7-.7.7-.7-.3-.7-.7.3-.7.7-.7z" fill="#3776AB" />
      <path d="M12 22c3.8 0 3.5-1.7 3.5-1.7V18h-3.6v-.5h5.9s2.2.2 2.2-3.6c0-3.8-2.1-3.7-2.1-3.7h-1.3v1.8s.1 2.1-2.1 2.1H11s-2-.1-2 1.9v3.1S8.6 22 12 22zm2-1.4c-.4 0-.7-.3-.7-.7s.3-.7.7-.7.7.3.7.7-.3.7-.7.7z" fill="#FFD43B" />
    </svg>
  ),
  "Node.js": NodejsIcon,
  "Express.js": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <text x="1" y="16" fontSize="9" fontWeight="700" fill="currentColor" fontFamily="monospace">EXP</text>
    </svg>
  ),
  MongoDB: MongoDBIcon,
  PostgreSQL: PostgreSQLIcon,
  Firebase: FirebaseIcon,
  "Framer Motion": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 4h16v8H4z" fill="#BB4FF8" /><path d="M4 12h8l8 8H4z" fill="#8B2FC9" /><path d="M4 12l8 8" fill="none" stroke="#fff" strokeWidth="1" />
    </svg>
  ),
  GSAP: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#0AE448" /><text x="2" y="16" fontSize="8" fontWeight="900" fill="#000" fontFamily="monospace">GSAP</text>
    </svg>
  ),
  "CSS Animations": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M4 3l1.5 16.5L12 21l6.5-1.5L20 3H4zm12.5 5H8l.2 2h8l-.8 6-3.4 1-3.4-1-.2-2.5h2l.1 1.2 1.5.4 1.5-.4.2-2H7.7L7.2 8h9.5l-.2 0z" fill="#264DE4" />
    </svg>
  ),
  "Tailwind Animations": TailwindIcon,
  "Scroll Animations": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 3l-4 5h8l-4-5zm0 18l4-5H8l4 5zm-7-9H3l3 3 3-3H7V9H5v3H3l3-3" fill="currentColor" opacity=".7" />
    </svg>
  ),
  "Micro Interactions": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="3" fill="currentColor" /><circle cx="12" cy="12" r="6" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" /><circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" strokeWidth=".5" opacity=".3" />
    </svg>
  ),
  Git: GitIcon,
  GitHub: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0112 6.8c.85 0 1.71.11 2.51.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.93.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0022 12c0-5.52-4.48-10-10-10z" fill="currentColor" />
    </svg>
  ),
  "GitHub Actions": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#2088FF" opacity=".15" stroke="#2088FF" strokeWidth="1" /><path d="M8 9l4 3-4 3V9zm4 3h4" stroke="#2088FF" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Vercel: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L2 19.5h20L12 2z" fill="currentColor" />
    </svg>
  ),
  Netlify: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M16.9 8.5l-2.4-2.4-7.6 7.6 2.4 2.4 7.6-7.6zm-9.8 9.3l-2.4-2.4-.5 2.9 2.9-.5z" fill="#00AD9F" /><path d="M14.5 6.1L17 3.6l2.4 2.4-2.5 2.5-2.4-2.4z" fill="#00AD9F" />
    </svg>
  ),
  Docker: DockerIcon,
  "CI/CD": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="5" cy="12" r="2" fill="currentColor" /><circle cx="12" cy="5" r="2" fill="currentColor" /><circle cx="19" cy="12" r="2" fill="currentColor" /><path d="M7 12h5M12 7v5m4.5 0H14" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
    </svg>
  ),
  Railway: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#0B0D0E" /><path d="M7 17l2.5-10h1.2l1 7 2.5-7h1.3L13 17h-1.2l1.5-6-2 6h-.9l-1-6-1.2 6H7z" fill="#fff" />
    </svg>
  ),
  Render: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="4" fill="#46E3B7" opacity=".2" /><text x="3" y="16" fontSize="9" fontWeight="700" fill="#46E3B7" fontFamily="monospace">RND</text>
    </svg>
  ),
  "VS Code": VSCodeIcon,
  Postman: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="10" fill="#FF6C37" /><path d="M8 12.5l3-3 2 2 4-4" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  "MongoDB Atlas": MongoDBIcon,
  Prisma: PrismaIcon,
  Figma: FigmaIcon,
  "Chrome DevTools": ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="4" fill="#4285F4" /><circle cx="12" cy="12" r="8" fill="none" stroke="#EA4335" strokeWidth="2" /><path d="M12 4a8 8 0 010 16" stroke="#FBBC04" strokeWidth="2" fill="none" /><path d="M4 12h4M16 12h4" stroke="#34A853" strokeWidth="1.5" />
    </svg>
  ),
  npm: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="3" fill="#CB3837" /><path d="M4 6h16v12H4V6zm2 2v8h5v-6h3v6h2V8H6z" fill="#fff" />
    </svg>
  ),
  ESLint: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7v10l9 5 9-5V7L12 2zm0 3l6.5 3.75v7.5L12 20l-6.5-3.75V8.75L12 5z" fill="#4B32C3" /><path d="M9 11l3-2 3 2v4l-3 2-3-2v-4z" fill="#4B32C3" opacity=".5" />
    </svg>
  ),
  Prettier: ({ className }) => (
    <svg viewBox="0 0 24 24" className={className} xmlns="http://www.w3.org/2000/svg">
      <path d="M8.5 5h7M8.5 8h10M8.5 11h5M8.5 14h8M8.5 17h4M8.5 20h7" stroke="#F7B93E" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  ),
};

// ── Types ───────────────────────────────────────────────────────────────────

interface Skill {
  name: string;
}

interface SkillCategory {
  title: string;
  skills: Skill[];
  icon: React.ComponentType<{ className?: string }>;
}

// ── Component ───────────────────────────────────────────────────────────────

export default function Skills() {
  const skillCategories: SkillCategory[] = [
    {
      title: "Frontend & Languages",
      skills: [
        { name: "JavaScript" },
        { name: "TypeScript" },
        { name: "React" },
        { name: "Next.js" },
        { name: "Python" },
      ],
      icon: Monitor,
    },
    {
      title: "Backend & APIs",
      skills: [
        { name: "Node.js" },
        { name: "Express.js" },
      ],
      icon: Server,
    },
    {
      title: "Database & Storage",
      skills: [
        { name: "MongoDB" },
        { name: "PostgreSQL" },
        { name: "Firebase" },
      ],
      icon: Database,
    },
    {
      title: "Animation & Motion",
      skills: [
        { name: "Framer Motion" },
        { name: "GSAP" },
        { name: "CSS Animations" },
        { name: "Tailwind Animations" },
        { name: "Scroll Animations" },
        { name: "Micro Interactions" },
      ],
      icon: Sparkles,
    },
    {
      title: "Tools & Deployment",
      skills: [
        { name: "Git" },
        { name: "GitHub" },
        { name: "GitHub Actions" },
        { name: "Vercel" },
        { name: "Netlify" },
        { name: "Docker" },
        { name: "CI/CD" },
        { name: "Railway" },
        { name: "Render" },
      ],
      icon: Wrench,
    },
    {
      title: "Development Tools & Workflow",
      skills: [
        { name: "VS Code" },
        { name: "Postman" },
        { name: "MongoDB Atlas" },
        { name: "Prisma" },
        { name: "Figma" },
        { name: "Chrome DevTools" },
        { name: "npm" },
        { name: "ESLint" },
        { name: "Prettier" },
      ],
      icon: Settings,
    },
  ];

  return (
    <section id="skills" className="mb-32 scroll-mt-24 px-4 sm:px-6 lg:px-0">
      {/* Header */}
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

      {/* Grid */}
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

              {/* Skill tags — NO under-label text */}
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => {
                  const SkillIcon = skillIconMap[skill.name] || Check;
                  return (
                    <span
                      key={skill.name}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-background/30 border border-white/10 text-xs sm:text-sm font-medium text-foreground/70 hover:text-foreground hover:border-white/30 transition-all cursor-default"
                      title={skill.name}
                    >
                      <SkillIcon className="w-4 h-4" />
                      {skill.name}
                    </span>
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