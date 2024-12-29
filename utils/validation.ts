export const validateName = (name: string): boolean => {
  const nameRegex = /^[A-Za-z\s]+$/;
  return nameRegex.test(name);
};
