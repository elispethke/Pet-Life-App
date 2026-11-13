import { MESSAGES, hasErrors, validateLogin, validateSignup } from './formValidation';

describe('validateLogin', () => {
  it('não devolve erros para e-mail válido e senha preenchida', () => {
    expect(validateLogin({ email: 'marina@email.com', password: 'x' })).toEqual({});
  });

  it('aponta e-mail inválido e senha vazia ao mesmo tempo', () => {
    expect(validateLogin({ email: 'marina', password: '' })).toEqual({
      email: MESSAGES.email,
      password: MESSAGES.passwordRequired,
    });
  });

  it('não exige 8 caracteres no login', () => {
    expect(validateLogin({ email: 'marina@email.com', password: 'abc' })).toEqual({});
  });
});

describe('validateSignup', () => {
  const valid = { name: 'Marina Souza', email: 'marina@email.com', password: '12345678', acceptedTerms: true };

  it('não devolve erros para dados válidos', () => {
    expect(validateSignup(valid)).toEqual({});
  });

  it('exige nome, e-mail, senha de 8+ e aceite dos termos', () => {
    expect(validateSignup({ name: '', email: 'x', password: '1234567', acceptedTerms: false })).toEqual({
      name: MESSAGES.name,
      email: MESSAGES.email,
      password: MESSAGES.passwordShort,
      terms: MESSAGES.terms,
    });
  });

  it('cada campo é validado sozinho', () => {
    expect(validateSignup({ ...valid, acceptedTerms: false })).toEqual({ terms: MESSAGES.terms });
    expect(validateSignup({ ...valid, password: '1234567' })).toEqual({ password: MESSAGES.passwordShort });
  });
});

describe('hasErrors', () => {
  it('diferencia objeto vazio de objeto com erros', () => {
    expect(hasErrors({})).toBe(false);
    expect(hasErrors({ email: 'x' })).toBe(true);
  });
});
