import { useMemo } from 'react';
import type { PetProfile } from '@/features/pets/types';
import { usePets } from '@/providers/PetsProvider';
import { ageInMonths, formatAge, formatIsoAsBr } from '@/shared/utils';

// Pet do tutor pronto para as telas (idade calculada pela data de nascimento). Vários telas usam.
export function usePetProfile(): PetProfile | undefined {
  const { pet } = usePets();

  return useMemo(() => {
    if (!pet) return undefined;
    const months = ageInMonths(pet.birthDate, new Date());
    return {
      id: pet.id,
      name: pet.name,
      species: pet.species,
      speciesLabel: pet.species === 'dog' ? 'Cão' : 'Gato',
      breed: pet.breed,
      ageMonths: months,
      ageLabel: formatAge(months),
      weightKg: pet.weightKg,
      birthDateLabel: formatIsoAsBr(pet.birthDate),
      sex: pet.sex,
      neutered: pet.neutered,
      neuteredLabel: pet.neutered ? 'Sim' : 'Não',
      microchip: pet.microchip,
    };
  }, [pet]);
}
