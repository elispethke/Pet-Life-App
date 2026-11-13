import { HttpError, NetworkError, clearTokens, httpRequest, readTokens, saveTokens, setSessionExpiredHandler } from '@/shared/api';
import { AuthError } from '@/features/auth/types';
import type { AuthUser, SignInInput, SignUpInput } from '@/features/auth/types';
import { MESSAGES } from '@/features/auth/utils';

// Camada que fala com a PetLife-API (cadastro, login, /me e saída). As telas só conhecem estas funções.
// Os tokens ficam no armazenamento seguro; o cliente HTTP renova o token de acesso sozinho.

type ApiUser = { id: string; name: string; email: string };
type SessionResponse = { user: ApiUser; accessToken: string; refreshToken: string };

const NETWORK_MESSAGE = 'Não foi possível conectar ao servidor. Verifique a internet e tente de novo.';

const toAuthUser = (user: ApiUser): AuthUser => ({ id: user.id, email: user.email, displayName: user.name });

// Converte qualquer erro em AuthError com mensagem em português para a tela.
function toAuthError(error: unknown): AuthError {
  if (error instanceof AuthError) return error;
  if (error instanceof NetworkError) return new AuthError(NETWORK_MESSAGE);
  if (error instanceof HttpError) {
    const firstField = error.fields ? Object.values(error.fields)[0] : undefined;
    return new AuthError(firstField ?? error.message);
  }
  return new AuthError(MESSAGES.unknown);
}

// Quem quer saber quando a sessão muda (o AuthProvider).
const listeners = new Set<(user: AuthUser | null) => void>();

function setCurrentUser(user: AuthUser | null) {
  listeners.forEach((listener) => listener(user));
}

// Se o cliente HTTP não conseguir renovar a sessão, o usuário volta para a Abertura.
setSessionExpiredHandler(() => setCurrentUser(null));

async function startSession(path: string, body: unknown): Promise<AuthUser> {
  try {
    const session = await httpRequest<SessionResponse>(path, { method: 'POST', body });
    await saveTokens({ accessToken: session.accessToken, refreshToken: session.refreshToken });
    const user = toAuthUser(session.user);
    setCurrentUser(user);
    return user;
  } catch (error) {
    throw toAuthError(error);
  }
}

export function signUpWithEmail({ name, email, password }: SignUpInput): Promise<AuthUser> {
  return startSession('/auth/register', { name: name.trim(), email: email.trim(), password });
}

export function signInWithEmail({ email, password }: SignInInput): Promise<AuthUser> {
  return startSession('/auth/login', { email: email.trim(), password });
}

export async function signOut(): Promise<void> {
  const tokens = await readTokens();
  if (tokens) {
    try {
      await httpRequest('/auth/logout', { method: 'POST', body: { refreshToken: tokens.refreshToken } });
    } catch {
      // Sem internet ou servidor fora: sai do mesmo jeito (apagamos os tokens do aparelho).
    }
  }
  await clearTokens();
  setCurrentUser(null);
}

// Restaura a sessão ao abrir o app: lê os tokens salvos e pergunta à API quem é (GET /me).
// O cliente HTTP renova o token de acesso se ele tiver vencido.
async function restoreSession(): Promise<AuthUser | null> {
  if (!(await readTokens())) return null;
  try {
    const { user } = await httpRequest<{ user: ApiUser }>('/me', { auth: true });
    return toAuthUser(user);
  } catch {
    // Sessão inválida ou API fora do ar: abre deslogado (os tokens só são apagados quando a API os recusa).
    return null;
  }
}

// Avisa quando a sessão muda e, uma vez no começo, o resultado da restauração. Devolve a função de cancelar.
export function observeAuthState(onChange: (user: AuthUser | null) => void): () => void {
  listeners.add(onChange);
  let active = true;
  restoreSession().then((user) => {
    if (active) onChange(user);
  });
  return () => {
    active = false;
    listeners.delete(onChange);
  };
}
