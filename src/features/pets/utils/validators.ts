export const PET_NAME_MIN_LENGTH = 1;

export function isValidPetName(value: string): boolean {
  return value.trim().length >= PET_NAME_MIN_LENGTH;
}
