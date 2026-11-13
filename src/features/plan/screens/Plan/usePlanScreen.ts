import { usePlan } from '@/providers/PlanProvider';

// Estado da tela Plano: sem plano mostra "Gratuito" e o botão Assinar; com plano mostra a validade.
export function usePlanScreen() {
  const { plan, subscribe } = usePlan();
  const statusLabel = plan.active ? `Plano ativo até ${plan.activeUntil}` : 'Gratuito';
  return { active: plan.active, statusLabel, subscribe };
}
