import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import type { FeatureKey } from '@/features/plan/types';
import { usePlan } from '@/providers/PlanProvider';

// Nesta fase TUDO está liberado: o bloqueio por plano só volta a valer quando isto virar `true`.
// É a única linha que muda para ligar a regra (as telas Plano e "Recurso bloqueado" já estão prontas).
const PLAN_ENFORCED = false;

// ÚNICO ponto que decide se um recurso está liberado. Sem plano, abre a tela "Recurso bloqueado".
// Para mudar a regra (por exemplo, liberar um recurso no grátis) só este arquivo muda.
export function useFeatureGate() {
  const router = useRouter();
  const { plan } = usePlan();

  // Devolve true quando pode usar. Quando não pode, abre o aviso e devolve false.
  return useCallback(
    (feature: FeatureKey): boolean => {
      if (!PLAN_ENFORCED || plan.active) return true;
      router.push({ pathname: '/feature-locked', params: { feature } });
      return false;
    },
    [plan.active, router],
  );
}
