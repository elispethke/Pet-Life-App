import { AuthError } from '@/features/auth/types';
import type { AuthUser, SignInInput, SignUpInput } from '@/features/auth/types';
import { isValidEmail, isValidPassword } from '@/features/auth/utils';

// Versão SIMULADA da camada de autenticação: nada sai do aparelho e a sessão fica só em memória
// (some ao fechar o app). As funções têm a assinatura da versão real, para trocar depois sem mexer
// em hooks e telas.
//
// Regras do mock:
// - qualquer e-mail válido com senha de 8 ou mais caracteres entra;
// - erro@teste.com sempre falha (login: "E-mail ou senha incorretos."; cadastro: "Este e-mail já está em uso.").

const MOCK_DELAY_MS = 800;
const FAILING_EMAIL = 'erro@teste.com';

let currentUser: AuthUser | null = null;
const listeners = new Set<(user: AuthUser | null) => void>();

const wait = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
const normalizeEmail = (email: string) => email.trim().toLowerCase();

function setCurrentUser(user: AuthUser | null) {
  currentUser = user;
  listeners.forEach((listener) => listener(user));
}

function buildUser(email: string, displayName: string | null): AuthUser {
  return { id: `mock-${email}`, email, displayName };
}

export async function signUpWithEmail({ name, email, password }: SignUpInput): Promise<AuthUser> {
  await wait(MOCK_DELAY_MS);
  const normalized = normalizeEmail(email);
  if (normalized === FAILING_EMAIL) {
    throw new AuthError('Este e-mail já está em uso.');
  }
  if (!isValidEmail(normalized) || !isValidPassword(password)) {
    throw new AuthError('Não foi possível concluir. Tente novamente.');
  }
  const user = buildUser(normalized, name.trim());
  setCurrentUser(user);
  return user;
}

export async function signInWithEmail({ email, password }: SignInInput): Promise<AuthUser> {
  await wait(MOCK_DELAY_MS);
  const normalized = normalizeEmail(email);
  if (normalized === FAILING_EMAIL || !isValidEmail(normalized) || !isValidPassword(password)) {
    throw new AuthError('E-mail ou senha incorretos.');
  }
  const user = buildUser(normalized, normalized.split('@')[0]);
  setCurrentUser(user);
  return user;
}

export async function signOut(): Promise<void> {
  setCurrentUser(null);
}

// Avisa quando a sessão muda. Também avisa uma vez no começo (sessão "restaurada": aqui sempre vazia
// ao abrir o app). Devolve a função para parar de observar.
export function observeAuthState(onChange: (user: AuthUser | null) => void): () => void {
  listeners.add(onChange);
  Promise.resolve().then(() => onChange(currentUser));
  return () => {
    listeners.delete(onChange);
  };
}
