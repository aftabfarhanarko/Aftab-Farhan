import React from "react";
import {
  Monitor,
  Server,
  Database,
  Sparkles,
  Wrench,
  Settings,
  Cpu,
  Globe,
  Cloud,
  GitBranch,
  Zap,
  Layers,
  Terminal,
} from "lucide-react";

export interface Skill {
  id: string;
  name: string;
  imageUrl?: string;
}

export interface SkillCategory {
  id: string;
  title: string;
  skills: Skill[];
}

export type AccentKey =
  | "blue"
  | "green"
  | "amber"
  | "pink"
  | "purple"
  | "teal"
  | "default";

export interface CategoryConfig {
  icon: React.ElementType;
  accent: AccentKey;
}

export const categoryConfig: Record<string, CategoryConfig> = {
  Frontend:    { icon: Monitor,    accent: "blue"    },
  Backend:     { icon: Server,     accent: "green"   },
  Database:    { icon: Database,   accent: "amber"   },
  Animation:   { icon: Sparkles,   accent: "pink"    },
  Tools:       { icon: Wrench,     accent: "purple"  },
  DevOps:      { icon: Cloud,      accent: "teal"    },
  Mobile:      { icon: Cpu,        accent: "pink"    },
  API:         { icon: Globe,      accent: "teal"    },
  Deployment:  { icon: Cloud,      accent: "teal"    },
  Hosting:     { icon: Cloud,      accent: "teal"    },
  Version:     { icon: GitBranch,  accent: "purple"  },
  Control:     { icon: GitBranch,  accent: "purple"  },
  Testing:     { icon: Zap,        accent: "amber"   },
  Design:      { icon: Layers,     accent: "pink"    },
  Terminal:    { icon: Terminal,   accent: "default" },
  Settings:    { icon: Settings,   accent: "default" },
};

export const accentClasses: Record<
  AccentKey,
  { iconWrap: string; iconColor: string; dot: string }
> = {
  blue: {
    iconWrap: "bg-blue-500/10 border-blue-500/20",
    iconColor: "text-blue-600 dark:text-blue-400",
    dot: "bg-blue-500 dark:bg-blue-400",
  },
  green: {
    iconWrap: "bg-emerald-500/10 border-emerald-500/20",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    dot: "bg-emerald-500 dark:bg-emerald-400",
  },
  amber: {
    iconWrap: "bg-amber-500/10 border-amber-500/20",
    iconColor: "text-amber-600 dark:text-amber-400",
    dot: "bg-amber-500 dark:bg-amber-400",
  },
  pink: {
    iconWrap: "bg-pink-500/10 border-pink-500/20",
    iconColor: "text-pink-600 dark:text-pink-400",
    dot: "bg-pink-500 dark:bg-pink-400",
  },
  purple: {
    iconWrap: "bg-violet-500/10 border-violet-500/20",
    iconColor: "text-violet-600 dark:text-violet-400",
    dot: "bg-violet-500 dark:bg-violet-400",
  },
  teal: {
    iconWrap: "bg-teal-500/10 border-teal-500/20",
    iconColor: "text-teal-600 dark:text-teal-400",
    dot: "bg-teal-500 dark:bg-teal-400",
  },
  default: {
    iconWrap: "bg-foreground/[0.07] border-border",
    iconColor: "text-foreground/60",
    dot: "bg-foreground/30",
  },
};

export function getCategoryConfig(title: string): CategoryConfig {
  const direct = categoryConfig[title];
  if (direct) return direct;
  const matched = Object.keys(categoryConfig).find((k) => title.includes(k));
  return matched
    ? categoryConfig[matched]
    : { icon: Settings, accent: "default" };
}
