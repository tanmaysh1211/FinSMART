export const checkPasswordRules = (password) => ({
  length: password.length >= 8,
  number: /[0-9]/.test(password),
  lowercase: /[a-z]/.test(password),
  uppercase: /[A-Z]/.test(password),
  special: /@/.test(password),
});

export const isPasswordValid = (password) => {
  const rules = checkPasswordRules(password);
  return Object.values(rules).every(Boolean);
};
