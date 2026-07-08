export const projectCategories = [
  "FULL_STACK",
  "AI_ML",
  "FRONTEND",
  "E_COMMERCE",
  "HEALTHCARE",
  "REAL_ESTATE",
] as const;

export type ProjectCategory = (typeof projectCategories)[number];

export const projectTypes = ["MY", "TEAM", "CLIENT"] as const;

export type ProjectType = (typeof projectTypes)[number];

export type Project = {
  id: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink?: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  projectType: ProjectType;
  client?: string;
  startDate?: string;
  endDate?: string;
  duration?: string;
  tech: string[];
};

export type ProjectFormState = {
  title: string;
  tagline: string;
  description: string;
  image: string;
  demoLink: string;
  githubLink: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  projectType: ProjectType;
  client: string;
  startDate: string;
  endDate: string;
  duration: string;
  techInput: string;
};

