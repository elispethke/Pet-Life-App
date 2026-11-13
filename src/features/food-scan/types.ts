export type Nutrient = {
  id: string;
  label: string;
  percent: number;
};

// Produto lido do rótulo (leitura simulada).
export type FoodProduct = {
  name: string;
  info: string;
  kcalPerKg: number;
  nutrients: Nutrient[];
  firstIngredient: string;
};

export type PortionInput = {
  weightKg: number;
  ageMonths: number;
  neutered: boolean;
  kcalPerKg: number;
  meals?: number;
};

export type Portion = {
  lifeFactor: number;
  lifeStage: 'filhote' | 'adulto';
  meals: number;
  // Valores exatos do cálculo.
  restingKcal: number;
  dailyKcal: number;
  gramsPerDay: number;
  gramsPerMeal: number;
  // Valores arredondados para mostrar (porção a cada 10 g por dia, a cada 5 g por refeição, kcal a cada 10).
  displayGramsPerDay: number;
  displayGramsPerMeal: number;
  displayKcal: number;
};
