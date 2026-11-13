import { useEffect, useState } from 'react';
import { readFoodLabel } from '@/features/food-analysis/api';
import type { FoodProduct } from '@/features/food-analysis/api';
import { calcDailyPortion } from '@/features/food-analysis/utils';
import { usePetProfile } from '@/features/pets';
import { formatThousands } from '@/shared/utils';

// Análise da ração: "lê" o produto de exemplo e calcula a porção do pet com a fórmula do produto
// (peso, idade e castração do pet que está no estado global).
export function useFoodAnalysis() {
  const pet = usePetProfile();
  const [product, setProduct] = useState<FoodProduct | undefined>();

  useEffect(() => {
    let active = true;
    readFoodLabel().then((read) => {
      if (active) setProduct(read);
    });
    return () => {
      active = false;
    };
  }, []);

  if (!pet || !product) {
    return { petName: pet?.name ?? '', product, portion: undefined, details: '', stage: '' };
  }

  const portion = calcDailyPortion({
    weightKg: pet.weightKg,
    ageMonths: pet.ageMonths,
    neutered: pet.neutered,
    kcalPerKg: product.kcalPerKg,
  });
  const female = pet.sex === 'Fêmea';
  const neuteredText = pet.neutered ? (female ? 'castrada' : 'castrado') : female ? 'inteira' : 'inteiro';
  const weight = String(pet.weightKg).replace('.', ',');

  return {
    petName: pet.name,
    product,
    portion,
    stage: portion.lifeStage,
    details: `${portion.meals} refeições · cerca de ${formatThousands(portion.displayKcal)} kcal · ${weight} kg, ${portion.lifeStage}, ${neuteredText}`,
  };
}
