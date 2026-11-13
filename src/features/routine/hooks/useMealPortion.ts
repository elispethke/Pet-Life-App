import { useMemo } from 'react';
import { EXAMPLE_PRODUCT, calcDailyPortion } from '@/features/food-analysis';
import { usePetProfile } from '@/features/pets';

// Porção calculada para o pet com a ração de exemplo. A Rotina usa para mostrar os gramas de cada refeição.
export function useMealPortion() {
  const pet = usePetProfile();

  return useMemo(() => {
    if (!pet) return undefined;
    return calcDailyPortion({
      weightKg: pet.weightKg,
      ageMonths: pet.ageMonths,
      neutered: pet.neutered,
      kcalPerKg: EXAMPLE_PRODUCT.kcalPerKg,
    });
  }, [pet]);
}
