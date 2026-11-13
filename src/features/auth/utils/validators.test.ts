import { isValidEmail, isValidName, isValidPassword } from './validators';

describe('isValidEmail', () => {
  it.each(['marina@email.com', 'a.b+tag@sub.dominio.com.br', '  marina@email.com  '])(
    'aceita %p',
    (email) => {
      expect(isValidEmail(email)).toBe(true);
    },
  );

  it.each(['', '   ', 'marina', 'marina@', '@email.com', 'marina@email', 'marina@email.c', 'ma rina@email.com', 'a@@b.com'])(
    'rejeita %p',
    (email) => {
      expect(isValidEmail(email)).toBe(false);
    },
  );
});

describe('isValidPassword', () => {
  it('aceita 8 caracteres ou mais (borda: exatamente 8)', () => {
    expect(isValidPassword('12345678')).toBe(true);
    expect(isValidPassword('uma senha longa e segura')).toBe(true);
  });

  it('rejeita menos de 8 caracteres (borda: 7) e vazio', () => {
    expect(isValidPassword('1234567')).toBe(false);
    expect(isValidPassword('')).toBe(false);
  });

  it('conta espaços como caracteres', () => {
    expect(isValidPassword('       a')).toBe(true);
  });
});

describe('isValidName', () => {
  it('aceita 2 caracteres ou mais, ignorando espaços nas pontas', () => {
    expect(isValidName('Ana')).toBe(true);
    expect(isValidName('Al')).toBe(true);
    expect(isValidName('  Marina Souza  ')).toBe(true);
  });

  it('rejeita vazio, só espaços e 1 caractere', () => {
    expect(isValidName('')).toBe(false);
    expect(isValidName('    ')).toBe(false);
    expect(isValidName('A')).toBe(false);
    expect(isValidName(' A ')).toBe(false);
  });
});
