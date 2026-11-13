import { useRef, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { AuthError } from '@/features/auth/types';
import { MESSAGES, hasErrors, validateLogin } from '@/features/auth/utils';
import type { LoginErrors } from '@/features/auth/utils';

// Estado e lógica da tela de Login: valores, erros por campo, erro do envio e carregamento.
export function useLoginForm() {
  const { signIn } = useAuth();
  const [email, setEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [errors, setErrors] = useState<LoginErrors>({});
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  // Trava de duplo toque: o estado `loading` só muda no próximo desenho, a ref muda na hora.
  const submitting = useRef(false);

  const setEmail = (value: string) => {
    setEmailValue(value);
    setErrors((current) => ({ ...current, email: undefined }));
    setSubmitError(undefined);
  };

  const setPassword = (value: string) => {
    setPasswordValue(value);
    setErrors((current) => ({ ...current, password: undefined }));
    setSubmitError(undefined);
  };

  const submit = async () => {
    if (submitting.current) return;

    const found = validateLogin({ email, password });
    setErrors(found);
    if (hasErrors(found)) return;

    submitting.current = true;
    setLoading(true);
    setSubmitError(undefined);
    try {
      await signIn({ email, password });
      // Sucesso: o AuthProvider muda o status e as rotas protegidas levam o usuário para (app).
    } catch (error) {
      setSubmitError(error instanceof AuthError ? error.message : MESSAGES.unknown);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return { email, password, errors, submitError, loading, setEmail, setPassword, submit };
}
