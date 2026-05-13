export type HeroStat = {
  label: string;
  value: string;
};

export type HeroSocial = {
  platform: string;
  url: string;
};

export type HeroFormData = {
  name: string;
  title: string;
  description: string;
  image: string;
  stats: HeroStat[];
  socials: HeroSocial[];
};

