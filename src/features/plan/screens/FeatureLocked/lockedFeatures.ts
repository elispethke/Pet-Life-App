import type { FeatureKey } from '@/features/plan/hooks';

// Frase da tela "Recurso bloqueado" para cada recurso.
export const LOCKED_FEATURE_TEXT: Record<FeatureKey, string> = {
  scan: 'Digitalizar a carteirinha é liberado com o plano PetLife de €19 por ano.',
  routine: 'A rotina de comida e passeio é liberada com o plano PetLife de €19 por ano.',
  food: 'A análise de ração é liberada com o plano PetLife de €19 por ano.',
  share: 'Compartilhar a carteirinha é liberado com o plano PetLife de €19 por ano.',
};

export function isFeatureKey(value: unknown): value is FeatureKey {
  return typeof value === 'string' && value in LOCKED_FEATURE_TEXT;
}
