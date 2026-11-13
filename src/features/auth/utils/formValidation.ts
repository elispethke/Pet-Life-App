import { PASSWORD_MIN_LENGTH, isValidEmail, isValidName, isValidPassword } from './validators';

// Regras de cada formulário, em funções puras: recebem os valores e devolvem os erros por campo.
// Campo sem erro simplesmente não aparece no resultado.

export type LoginErrors = { email?: string; password?: string };
export type SignupErrors = { name?: string; email?: string; password?: string; terms?: string };

export const MESSAGES = {
  email: 'Digite um e-mail válido.',
  passwordRequired: 'Digite sua senha.',
  passwordShort: `A senha precisa ter no mínimo ${PASSWORD_MIN_LENGTH} caracteres.`,
  name: 'Digite seu nome.',
  terms: 'Aceite os Termos e a Política de Privacidade para continuar.',
  unknown: 'Não foi possível concluir. Tente novamente.',
} as const;

export function validateLogin(values: { email: string; password: string }): LoginErrors {
  const errors: LoginErrors = {};
  if (!isValidEmail(values.email)) errors.email = MESSAGES.email;
  // No login só exigimos que a senha não esteja vazia; quem decide se está certa é a autenticação.
  if (values.password.length === 0) errors.password = MESSAGES.passwordRequired;
  return errors;
}

export function validateSignup(values: {
  name: string;
  email: string;
  password: string;
  acceptedTerms: boolean;
}): SignupErrors {
  const errors: SignupErrors = {};
  if (!isValidName(values.name)) errors.name = MESSAGES.name;
  if (!isValidEmail(values.email)) errors.email = MESSAGES.email;
  if (!isValidPassword(values.password)) errors.password = MESSAGES.passwordShort;
  if (!values.acceptedTerms) errors.terms = MESSAGES.terms;
  return errors;
}

export function hasErrors(errors: object): boolean {
  return Object.keys(errors).length > 0;
}
