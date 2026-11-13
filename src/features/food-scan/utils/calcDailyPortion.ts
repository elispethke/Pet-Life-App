import type { Portion, PortionInput } from '@/features/food-scan/types';

// Fórmula de docs/product.md (não alterar sem decisão da dona do produto):
//   energia em repouso = 70 × peso_kg ^ 0,75
//   energia diária     = energia em repouso × fator de vida
//   gramas por dia     = energia diária ÷ (kcal_por_kg da ração ÷ 1000)
//
// Fator de vida: adulto castrado 1,6 · adulto inteiro 1,8 · filhote 2,0 a 3,0.
// Para filhote usamos 3,0 até 4 meses e 2,0 dos 4 aos 12 meses. (Pet "obeso em dieta", fator 1,0,
// precisa de um dado que o app ainda não tem.)

export const DEFAULT_MEALS = 2;
const PUPPY_UNTIL_MONTHS = 12;
const YOUNG_PUPPY_UNTIL_MONTHS = 4;

export function lifeFactor(ageMonths: number, neutered: boolean): number {
  if (ageMonths < YOUNG_PUPPY_UNTIL_MONTHS) return 3.0;
  if (ageMonths < PUPPY_UNTIL_MONTHS) return 2.0;
  return neutered ? 1.6 : 1.8;
}

const roundTo = (value: number, step: number) => Math.round(value / step) * step;

export function calcDailyPortion({ weightKg, ageMonths, neutered, kcalPerKg, meals = DEFAULT_MEALS }: PortionInput): Portion {
  if (weightKg <= 0 || kcalPerKg <= 0 || meals <= 0) {
    throw new RangeError('Peso, calorias da ração e número de refeições precisam ser maiores que zero.');
  }

  const factor = lifeFactor(ageMonths, neutered);
  const restingKcal = 70 * weightKg ** 0.75;
  const dailyKcal = restingKcal * factor;
  const gramsPerDay = dailyKcal / (kcalPerKg / 1000);
  const gramsPerMeal = gramsPerDay / meals;

  return {
    lifeFactor: factor,
    lifeStage: ageMonths < PUPPY_UNTIL_MONTHS ? 'filhote' : 'adulto',
    meals,
    restingKcal,
    dailyKcal,
    gramsPerDay,
    gramsPerMeal,
    displayGramsPerDay: roundTo(gramsPerDay, 10),
    displayGramsPerMeal: roundTo(gramsPerMeal, 5),
    displayKcal: roundTo(dailyKcal, 10),
  };
}
