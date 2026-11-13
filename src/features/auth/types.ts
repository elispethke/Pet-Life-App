// Tipos públicos da feature auth.

export type AuthUser = {
  id: string;
  email: string | null;
  displayName: string | null;
};

// carregando: ainda restaurando a sessão salva; logado e deslogado: estado definido.
export type AuthStatus = 'loading' | 'signedIn' | 'signedOut';

export type SignInInput = {
  email: string;
  password: string;
};

export type SignUpInput = {
  name: string;
  email: string;
  password: string;
};

// Erro já traduzido: `message` é a frase em português que a tela mostra ao usuário.
export class AuthError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'AuthError';
  }
}
