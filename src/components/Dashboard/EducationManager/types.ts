export type Education = {
  id: string;
  degree: string;
  field: string;
  institution: string;
  shortName?: string;
  location: string;
  period: string;
  grade?: string;
};

export type EducationFormState = Partial<Education>;

