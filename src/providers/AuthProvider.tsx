import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
// O provider é a camada que liga o app à feature auth: usa só a api e os tipos dela.
import * as authApi from '@/features/auth/api/auth.api';
import type { AuthStatus, AuthUser, SignInInput, SignUpInput } from '@/features/auth/types';

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  signIn: (input: SignInInput) => Promise<void>;
  signUp: (input: SignUpInput) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Guarda quem está logado (sessão em memória). Começa em "loading" até a sessão ser restaurada.
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>('loading');

  useEffect(() => {
    return authApi.observeAuthState((nextUser) => {
      setUser(nextUser);
      setStatus(nextUser ? 'signedIn' : 'signedOut');
    });
  }, []);

  const signIn = useCallback(async (input: SignInInput) => {
    setUser(await authApi.signInWithEmail(input));
  }, []);

  const signUp = useCallback(async (input: SignUpInput) => {
    // Atualiza com o usuário devolvido, que já traz o nome (o observador dispara antes do nome ser salvo).
    setUser(await authApi.signUpWithEmail(input));
  }, []);

  const signOut = useCallback(async () => {
    await authApi.signOut();
  }, []);

  const value = useMemo(() => ({ user, status, signIn, signUp, signOut }), [user, status, signIn, signUp, signOut]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de <AuthProvider>.');
  }
  return context;
}
