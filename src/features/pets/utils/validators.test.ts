import { isValidPetName } from './validators';

describe('isValidPetName', () => {
  it('aceita um nome com pelo menos 1 letra', () => {
    expect(isValidPetName('Thor')).toBe(true);
    expect(isValidPetName('  Mel ')).toBe(true);
    expect(isValidPetName('B')).toBe(true);
  });

  it('rejeita vazio e só espaços', () => {
    expect(isValidPetName('')).toBe(false);
    expect(isValidPetName('    ')).toBe(false);
  });
});
