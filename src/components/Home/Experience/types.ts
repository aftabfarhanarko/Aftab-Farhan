import {
  Shield,
  ClipboardList,
  Code2,
  Briefcase,
  Settings,
  Terminal,
  Cpu,
  Globe,
  Layout,
  Server,
  Database,
  Layers,
  Zap,
} from "lucide-react";

export const ICON_MAP: Record<string, any> = {
  Shield,
  ClipboardList,
  Code2,
  Briefcase,
  Settings,
  Terminal,
  Cpu,
  Globe,
  Layout,
  Server,
  Database,
  Layers,
  Zap,
};

export interface Role {
  title: string;
  subtitle: string;
  iconName: string;
  responsibilities: string[];
}

export interface Achievement {
  metric: string;
  label: string;
}

export interface Experience {
  id: number;
  company: string;
  url: string;
  location: string;
  period: string;
  type: string;
  techStack: string[];
  roles: Role[];
  achievements: Achievement[];
}
