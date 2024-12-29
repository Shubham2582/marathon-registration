import { countries } from "./countries";
import { statesByCountry } from "./states";
import { citiesByState } from "./cities";

export const getCountries = (): string[] => {
  return [...countries]; // Convert readonly array to regular array
};

export const getStates = (country: string): string[] => {
  return [...(statesByCountry[country as keyof typeof statesByCountry] || [])];
};

export const getCities = (state: string): string[] => {
  return [...(citiesByState[state] || [])];
};

export { countries, statesByCountry, citiesByState };
