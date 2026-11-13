type Nutrient = {
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

// Versão SIMULADA da leitura do rótulo (a leitura por IA e a base de rações virão da API).
// A assinatura é async, como será a da API real.
export const EXAMPLE_PRODUCT: FoodProduct = {
  name: 'Ração Adultos Raças Grandes 15 kg',
  info: 'Exemplo · código 789…',
  kcalPerKg: 3800,
  nutrients: [
    { id: 'protein', label: 'Proteína', percent: 26 },
    { id: 'fat', label: 'Gordura', percent: 14 },
    { id: 'fiber', label: 'Fibra', percent: 4 },
  ],
  firstIngredient: 'frango',
};

export async function readFoodLabel(): Promise<FoodProduct> {
  return EXAMPLE_PRODUCT;
}
