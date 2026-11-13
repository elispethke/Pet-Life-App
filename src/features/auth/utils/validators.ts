// Validações puras do formulário (sem rede, sem estado). Testadas em validators.test.ts.

export const PASSWORD_MIN_LENGTH = 8;
export const NAME_MIN_LENGTH = 2;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function isValidEmail(value: string): boolean {
  return EMAIL_PATTERN.test(value.trim());
}

export function isValidPassword(value: string): boolean {
  return value.length >= PASSWORD_MIN_LENGTH;
}

export function isValidName(value: string): boolean {
  return value.trim().length >= NAME_MIN_LENGTH;
}
