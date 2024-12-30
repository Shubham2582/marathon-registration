export const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"] as const;

export type BloodGroup = (typeof bloodGroups)[number];
