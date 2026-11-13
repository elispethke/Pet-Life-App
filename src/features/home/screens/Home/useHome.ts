import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { usePetProfile } from '@/features/pets';
import { useUpcomingReminders } from '@/features/reminders';
import { useFeatureGate } from '@/features/plan';
import { overallStatus, useVaccineViews } from '@/features/vaccine-card';
import { useAuth } from '@/providers/AuthProvider';

// Dados e ações da tela Início: tutora, pet, resumo das vacinas e próximos lembretes.
export function useHome() {
  const router = useRouter();
  const canUse = useFeatureGate();
  const { user } = useAuth();
  const pet = usePetProfile();
  const reminders = useUpcomingReminders();
  const views = useVaccineViews();

  const ownerName = user?.displayName?.trim().split(' ')[0] ?? 'tutor';

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
