import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { useVaccineViews } from '@/features/vaccines/hooks';
import { overallStatus } from '@/features/vaccines/utils';
import { useFeatureGate } from '@/features/plan';
import { usePetProfile } from '@/features/pets';

// Dados e ações da Carteira digital: pet, vacinas e vermífugos do estado global e o botão Compartilhar.
export function useWallet() {
  const router = useRouter();
  const canUse = useFeatureGate();
  const pet = usePetProfile();
  const views = useVaccineViews();

  const health = useMemo(() => views.filter((view) => view.kind !== 'visit'), [views]);
  const summary = useMemo(() => overallStatus(health.map((view) => view.info.status)), [health]);

  return {
    pet,
    summary,
    vaccines: health,
    openHealth: () => router.push('/vaccines'),
    // Compartilhar (link e QR) é do plano e chega na v1.5: sem plano abre o aviso; com plano ainda não faz nada.
    share: () => {
      canUse('share');
    },
  };
}
