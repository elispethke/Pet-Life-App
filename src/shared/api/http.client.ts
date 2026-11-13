import { Platform } from 'react-native';
import { clearTokens, readTokens, saveTokens } from './tokenStorage';
import type { Tokens } from './tokenStorage';

// Cliente HTTP único do app. Fala com a PetLife-API, manda o token de acesso e, se ele tiver vencido (401),
// renova UMA vez e repete o pedido; se a renovação falhar, encerra a sessão.

// URL da API: EXPO_PUBLIC_API_URL, ou o padrão de cada plataforma. No emulador Android o computador é
// 10.0.2.2; em celular físico use o IP do computador na rede (veja docs/auth.md).
const DEFAULT_URL = Platform.OS === 'android' ? 'http://10.0.2.2:3333' : 'http://localhost:3333';
const BASE_URL = (process.env.EXPO_PUBLIC_API_URL || DEFAULT_URL).replace(/\/+$/, '');
const TIMEOUT_MS = 15_000;

// Erro devolvido pela API (a mensagem já vem em português e segura para mostrar).
export class HttpError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly fields?: Record<string, string>,
  ) {
    super(message);
    this.name = 'HttpError';
  }
}

// Não chegou na API (sem internet, servidor desligado, demorou demais).
export class NetworkError extends Error {
  constructor() {
    super('Não foi possível conectar ao servidor.');
    this.name = 'NetworkError';
  }
}

type RequestOptions = {
  method?: 'GET' | 'POST';
  body?: unknown;
  // Manda o token de acesso (e renova se vencer).
  auth?: boolean;
};

// Quem usa o cliente (a feature auth) registra aqui o que fazer quando a sessão acaba.
let sessionExpiredHandler: (() => void) | undefined;
export function setSessionExpiredHandler(handler: () => void): void {
  sessionExpiredHandler = handler;
}

async function sendJson<T>(path: string, method: string, body: unknown, accessToken?: string): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
      signal: controller.signal,
    });
  } catch {
    throw new NetworkError();
  } finally {
    clearTimeout(timer);
  }

  const text = await response.text();
  const data = text ? (JSON.parse(text) as { message?: string; fields?: Record<string, string> }) : undefined;

  if (!response.ok) {
    throw new HttpError(response.status, data?.message ?? 'Não foi possível concluir. Tente novamente.', data?.fields);
  }
  return data as T;
}

// Só uma renovação por vez: se dois pedidos tomam 401 juntos, o segundo espera o mesmo resultado.
// (Isso importa: o refresh token é de uso único, uma segunda tentativa derrubaria a sessão.)
let refreshing: Promise<Tokens | null> | null = null;

function refreshTokens(): Promise<Tokens | null> {
  refreshing ??= renew().finally(() => {
    refreshing = null;
  });
  return refreshing;
}

async function renew(): Promise<Tokens | null> {
  const current = await readTokens();
  if (!current) return null;

  try {
    const fresh = await sendJson<Tokens>('/auth/refresh', 'POST', { refreshToken: current.refreshToken });
    await saveTokens(fresh);
    return fresh;
  } catch (error) {
    // Token de renovação recusado: a sessão acabou. Sem internet é outra história (os tokens continuam valendo).
    if (error instanceof HttpError) {
      await clearTokens();
      return null;
    }
    throw error;
  }
}

async function endSession(): Promise<void> {
  await clearTokens();
  sessionExpiredHandler?.();
}

export async function httpRequest<T>(path: string, { method = 'GET', body, auth = false }: RequestOptions = {}): Promise<T> {
  if (!auth) {
    return sendJson<T>(path, method, body);
  }

  const tokens = await readTokens();
  if (!tokens) {
    throw new HttpError(401, 'Sessão expirada. Entre novamente.');
  }

  try {
    return await sendJson<T>(path, method, body, tokens.accessToken);
  } catch (error) {
    if (!(error instanceof HttpError) || error.status !== 401) throw error;

    // Token de acesso vencido: renova UMA vez e repete.
    const fresh = await refreshTokens();
    if (!fresh) {
      await endSession();
      throw error;
    }
    try {
      return await sendJson<T>(path, method, body, fresh.accessToken);
    } catch (retryError) {
      if (retryError instanceof HttpError && retryError.status === 401) await endSession();
      throw retryError;
    }
  }
}
