export const postalCodePatterns: Record<string, { pattern: RegExp; format: string }> = {
  India: { pattern: /^[1-9][0-9]{5}$/, format: "6 digits (e.g., 110001)" },
  "United States": { pattern: /^\d{5}(-\d{4})?$/, format: "5 digits or 5+4 digits (e.g., 12345 or 12345-6789)" },
  "United Kingdom": { pattern: /^[A-Z]{1,2}[0-9][A-Z0-9]? ?[0-9][A-Z]{2}$/, format: "UK format (e.g., SW1A 1AA)" },
  Canada: { pattern: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, format: "Canadian format (e.g., K1A 0B1)" },
  Australia: { pattern: /^\d{4}$/, format: "4 digits (e.g., 2000)" },
  // Add more countries as needed
};

export const validatePostalCode = (postalCode: string, country: string): boolean => {
  const countryPattern = postalCodePatterns[country];
  if (!countryPattern) return true; // If pattern not defined, accept any format
  return countryPattern.pattern.test(postalCode);
};

export const getPostalCodeFormat = (country: string): string => {
  return postalCodePatterns[country]?.format || "No specific format";
};
