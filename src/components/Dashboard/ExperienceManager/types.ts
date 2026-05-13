export type Role = {
  id?: number;
  title: string;
  subtitle: string;
  iconName: string;
  responsibilities: string[];
};

export type Achievement = {
  id?: number;
  metric: string;
  label: string;
};

export type Experience = {
  id?: number;
  company: string;
  url: string;
  location: string;
  period: string;
  type: string;
  techStack: string[];
  roles: Role[];
  achievements: Achievement[];
};

export const INITIAL_EXP: Experience = {
  company: "",
  url: "",
  location: "",
  period: "",
  type: "current",
  techStack: [],
  roles: [
    { title: "", subtitle: "", iconName: "Briefcase", responsibilities: [""] },
  ],
  achievements: [{ metric: "", label: "" }],
};

