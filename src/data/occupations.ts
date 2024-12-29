export const occupations = [
  "Student",
  "Professional",
  "Self-Employed",
  "Business Owner",
  "Government Employee",
  "Healthcare Professional",
  "Teacher/Educator",
  "IT Professional",
  "Engineer",
  "Retired",
  "Other",
] as const;

export type Occupation = (typeof occupations)[number];
