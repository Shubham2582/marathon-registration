export const countries = [
  "India",
  "United States",
  "United Kingdom",
  "Canada",
  "Australia",
  "Singapore",
  "Malaysia",
  "UAE",
  "South Africa",
  "New Zealand",
] as const;

export type Country = (typeof countries)[number];
