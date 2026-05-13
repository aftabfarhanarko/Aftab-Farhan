export type Skill = {
  id: string;
  name: string;
  imageUrl?: string;
  categoryId: string;
};

export type SkillCategory = {
  id: string;
  title: string;
  skills: Skill[];
};

export type SkillFormState = {
  name: string;
  imageUrl: string;
  categoryId: string;
};

export type CategoryFormState = {
  title: string;
};

