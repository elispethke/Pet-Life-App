// Recursos que dependem do plano anual. Cada um tem um texto na tela "Recurso bloqueado".
export type FeatureKey = 'scan' | 'routine' | 'food' | 'share';

export type PlanState = {
  active: boolean;
  // Data final do plano, no formato DD/MM/AAAA (só quando ativo).
  activeUntil: string | null;
};
