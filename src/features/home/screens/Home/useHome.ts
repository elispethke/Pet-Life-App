import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { usePetProfile } from '@/features/pets';
import { useFeatureGate } from '@/features/plan';
import { overallStatus, useVaccineViews } from '@/features/vaccines';
import { useAuth } from '@/providers/AuthProvider';

const MAX_REMINDERS = 3;

// Dados e ações da tela Início: tutora, pet, resumo das vacinas e próximos lembretes.
export function useHome() {
  const router = useRouter();
  const canUse = useFeatureGate();
  const { user } = useAuth();
  const pet = usePetProfile();
  const views = useVaccineViews();

  const ownerName = user?.displayName?.trim().split(' ')[0] ?? 'tutor';

  // Próximos lembretes: vacinas e vermífugos de vencimento mais próximo (inclusive os já vencidos).
  const reminders = useMemo(
    () =>
      views
        .filter((view) => view.kind !== 'visit')
        .slice(0, MAX_REMINDERS)
        .map((view) => ({
          id: view.id,
          kind: view.kind,
          title: view.name.replace(' (múltipla)', ''),
          dateLabel: view.nextDueLabel,
          statusLabel: view.info.label,
          status: view.chipVariant,
        })),
    [views],
  );

  const summary = useMemo(() => {
    const health = views.filter((view) => view.kind !== 'visit');
    return {
      vaccines: overallStatus(health.map((view) => view.info.status)),
      pendingCount: health.filter((view) => view.info.status !== 'ok').length,
    };
  }, [views]);

  return {
    ownerName,
    pet,
    reminders,
    vaccinesSummary: summary.vaccines,
    pendingReminders: summary.pendingCount,
    openHealth: () => router.push('/vaccines'),
    // Os dois atalhos passam pelo useFeatureGate: sem plano, abrem o aviso "Recurso do plano anual".
    openScan: () => {
      if (canUse('scan')) router.push('/scan-card');
    },
    openFoodAnalysis: () => {
      if (canUse('food')) router.push('/food-analysis');
    },
  };
}
