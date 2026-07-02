export interface Stat {
  num: string;
  label: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface Proficiency {
  name: string;
  pct: number;
}

export interface AboutData {
  roleTag?: string;
  roleDescription?: string;
  introParagraphs?: string[];
  clientFocusedText?: string;
  stats?: Stat[];
  proficiencies?: Proficiency[];
  frontendSkills?: string[];
  backendSkills?: string[];
  tools?: string[];
  projects?: Project[];
  quoteText?: string;
  quoteAuthor?: string;
  mentorTitle?: string;
  mentorDescription?: string;
  availabilityText?: string;
}

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

export const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    },
  },
};
