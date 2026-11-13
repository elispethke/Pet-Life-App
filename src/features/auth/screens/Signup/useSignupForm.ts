import { useRef, useState } from 'react';
import { useAuth } from '@/providers/AuthProvider';
import { AuthError } from '@/features/auth/types';
import { MESSAGES, hasErrors, validateSignup } from '@/features/auth/utils';
import type { SignupErrors } from '@/features/auth/utils';

// Estado e lógica da tela Criar conta: valores, aceite dos termos, erros, envio e carregamento.
export function useSignupForm() {
  const { signUp } = useAuth();
  const [name, setNameValue] = useState('');
  const [email, setEmailValue] = useState('');
  const [password, setPasswordValue] = useState('');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [errors, setErrors] = useState<SignupErrors>({});
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);

  const clear = (field: keyof SignupErrors) => {
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError(undefined);
  };

  const setName = (value: string) => {
    setNameValue(value);
    clear('name');
  };
  const setEmail = (value: string) => {
    setEmailValue(value);
    clear('email');
  };
  const setPassword = (value: string) => {
    setPasswordValue(value);
    clear('password');
  };
  const toggleTerms = () => {
    setAcceptedTerms((current) => !current);
    clear('terms');
  };

  const submit = async () => {
    if (submitting.current) return;

    const found = validateSignup({ name, email, password, acceptedTerms });
    setErrors(found);
    if (hasErrors(found)) return;

    submitting.current = true;
    setLoading(true);
    setSubmitError(undefined);
    try {
      await signUp({ name, email, password });
    } catch (error) {
      setSubmitError(error instanceof AuthError ? error.message : MESSAGES.unknown);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return {
    name,
    email,
    password,
    acceptedTerms,
    errors,
    submitError,
    loading,
    setName,
    setEmail,
    setPassword,
    toggleTerms,
    submit,
  };
}
