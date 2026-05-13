export type Stat = {
  num: string;
  label: string;
};

export type Project = {
  title: string;
  description: string;
};

export type AboutData = {
  fullName: string;
  roleTag: string;
  roleDescription: string;
  introParagraphs: string[];
  clientFocusedText: string;
  stats: Stat[];
  frontendSkills: string[];
  backendSkills: string[];
  tools: string[];
  projects: Project[];
  quoteText: string;
  quoteAuthor: string;
  mentorTitle: string;
  mentorDescription: string;
};

