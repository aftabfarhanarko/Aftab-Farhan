import React from "react";

export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink?: string;
  category: string;
  year: string;
  featured: boolean;
  projectType: string;
  client?: string;
  tech: string[];
}

export const categoryLabel: Record<string, string> = {
  FULL_STACK: "Full-Stack",
  AI_ML: "AI / ML",
  FRONTEND: "Frontend",
  E_COMMERCE: "E-Commerce",
  HEALTHCARE: "Healthcare",
  REAL_ESTATE: "Real Estate",
};

export const categoryBadge: Record<string, string> = {
  FULL_STACK: "bg-blue-500/10  border-blue-500/25   text-blue-300/90",
  AI_ML: "bg-violet-500/10 border-violet-500/25 text-violet-300/90",
  FRONTEND: "bg-pink-500/10  border-pink-500/25   text-pink-300/90",
  E_COMMERCE: "bg-amber-500/10 border-amber-500/25  text-amber-300/90",
  HEALTHCARE: "bg-emerald-500/10 border-emerald-500/25 text-emerald-300/90",
  REAL_ESTATE: "bg-sky-500/10   border-sky-500/25    text-sky-300/90",
};

export const categoryAccentBar: Record<string, string> = {
  FULL_STACK: "from-blue-500/40   to-cyan-500/0",
  AI_ML: "from-violet-500/40 to-purple-500/0",
  FRONTEND: "from-pink-500/40   to-rose-500/0",
  E_COMMERCE: "from-amber-500/40  to-orange-500/0",
  HEALTHCARE: "from-emerald-500/40 to-teal-500/0",
  REAL_ESTATE: "from-sky-500/40    to-blue-500/0",
};

export const categoryGlow: Record<string, string> = {
  FULL_STACK:   "rgba(59,130,246,0.12)",
  AI_ML:        "rgba(139,92,246,0.12)",
  FRONTEND:     "rgba(236,72,153,0.12)",
  E_COMMERCE:   "rgba(245,158,11,0.12)",
  HEALTHCARE:   "rgba(16,185,129,0.12)",
  REAL_ESTATE:  "rgba(14,165,233,0.12)",
};

export function TechPill({ label }: { label: string }) {
  return (
    <span className="px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-card/50 border border-border/60 rounded-lg text-foreground/45 hover:border-foreground/20 hover:text-foreground/65 transition-all duration-200 cursor-default">
      {label}
    </span>
  );
}

export function ActionBtn({
  href,
  icon: Icon,
  label,
  filled = false,
  sm = false,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  filled?: boolean;
  sm?: boolean;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 font-semibold transition-all duration-200 active:scale-95
        ${sm ? "px-3.5 py-2 text-[11px] rounded-xl" : "px-5 py-2.5 text-xs rounded-xl"}
        ${
          filled
            ? "bg-foreground text-background hover:bg-foreground/85 shadow-lg shadow-foreground/15 hover:shadow-foreground/25 hover:shadow-xl"
            : "border border-border/70 text-foreground/55 hover:border-foreground/25 hover:text-foreground/80 bg-card/40 hover:bg-card/60 backdrop-blur-sm"
        }`}
    >
      <Icon className={sm ? "w-3 h-3" : "w-3.5 h-3.5"} />
      {label}
    </a>
  );
}
