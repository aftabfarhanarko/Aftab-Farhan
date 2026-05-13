import type { Education } from "./types";

export const EMPTY_FORM: Partial<Education> = {
  degree: "",
  field: "",
  institution: "",
  shortName: "",
  location: "",
  period: "",
  grade: "",
};

export const FIELD_CONFIG = [
  {
    key: "degree",
    label: "Degree",
    placeholder: "e.g. Bachelor of Science",
    required: true,
    colSpan: 1,
  },
  {
    key: "field",
    label: "Field of Study",
    placeholder: "e.g. Computer Science",
    required: true,
    colSpan: 1,
  },
  {
    key: "institution",
    label: "Institution",
    placeholder: "e.g. University of Dhaka",
    required: true,
    colSpan: 1,
  },
  {
    key: "shortName",
    label: "Short Name",
    placeholder: "e.g. DU",
    required: false,
    colSpan: 1,
  },
  {
    key: "location",
    label: "Location",
    placeholder: "e.g. Dhaka, Bangladesh",
    required: true,
    colSpan: 1,
  },
  {
    key: "period",
    label: "Period",
    placeholder: "e.g. 2018 – 2022",
    required: true,
    colSpan: 1,
  },
  {
    key: "grade",
    label: "Grade (Optional)",
    placeholder: "e.g. 3.8 / 4.0",
    required: false,
    colSpan: 2,
  },
] as const satisfies readonly {
  key: keyof Education;
  label: string;
  placeholder: string;
  required: boolean;
  colSpan: 1 | 2;
}[];

