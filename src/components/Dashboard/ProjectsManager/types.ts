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

export type KeyFeatureItem = { title: string; detail: string };
export type TechnicalChallengeItem = { challenge: string; solution: string };

export type Project = {
  id: string;
  title: string;
  tagline: string;
  role?: string;
  description: string;
  image: string;
  gallery?: string[];
  overview?: string;
  problemStatement?: string;
  keyFeatures?: KeyFeatureItem[];
  technicalChallenges?: TechnicalChallengeItem[];
  demoLink: string;
  githubLink?: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  currentlyWorking: boolean;
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
  role: string;
  description: string;
  image: string;
  galleryInput: string;
  overview: string;
  problemStatement: string;
  keyFeaturesInput: string;
  technicalChallengesInput: string;
  demoLink: string;
  githubLink: string;
  category: ProjectCategory;
  year: string;
  featured: boolean;
  currentlyWorking: boolean;
  projectType: ProjectType;
  client: string;
  startDate: string;
  endDate: string;
  duration: string;
  techInput: string;
};

