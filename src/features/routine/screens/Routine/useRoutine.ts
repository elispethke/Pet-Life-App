import { useRouter } from 'expo-router';
import { useMemo } from 'react';
import { usePetProfile } from '@/features/pets';
import { useFeatureGate } from '@/features/plan';
import { useMealPortion } from '@/features/routine/hooks';
import type { RoutineItem } from '@/features/routine/types';
import { useRoutineState } from '@/providers/RoutineProvider';
import type { ChipVariant } from '@/shared/components';
import { weekdayLabel } from '@/shared/utils';

type RoutineView = RoutineItem & {
  detail: string;
  chipLabel: string;
  chipVariant: ChipVariant;
  done: boolean;
};

const CHIP = {
  done: { label: 'feito', variant: 'ok' },
  snoozed: { label: 'adiado', variant: 'warn' },
  pending: { label: 'pendente', variant: 'info' },
} as const;

// Dados e ações da Rotina: lista do estado global com textos prontos, progresso, marcar como feito,
// "Novo horário" e o atalho para a análise da ração (recurso do plano).
export function useRoutine() {
  const router = useRouter();
  const canUse = useFeatureGate();
  const pet = usePetProfile();
  const mealPortion = useMealPortion();
  const { items, toggleItem } = useRoutineState();

  const views: RoutineView[] = useMemo(
    () =>
      items.map((item) => {
        const grams = item.amountG ?? mealPortion?.displayGramsPerMeal;
        const detail =
          item.status === 'snoozed' && item.snoozedUntil
            ? `adiado para ${item.snoozedUntil}`
            : item.kind === 'meal'
              ? `${grams ?? '…'} g de ração`
              : `${item.durationMin ?? 0} minutos`;
        const chip = CHIP[item.status];
        return { ...item, detail, chipLabel: chip.label, chipVariant: chip.variant, done: item.status === 'done' };
      }),
    [items, mealPortion],
  );

  const doneCount = views.filter((view) => view.done).length;
  const weekday = weekdayLabel(new Date());

  return {
    petName: pet?.name ?? '',
    dateLabel: `Hoje · ${weekday}`,
    progressLabel: `${doneCount} de ${views.length}`,
    views,
    mealGrams: mealPortion?.displayGramsPerMeal,
    toggle: (id: string) => {
      toggleItem(id);
    },
    newItem: () => router.push('/routine-new'),
    openFoodAnalysis: () => {
      if (canUse('food')) router.push('/food-analysis');
    },
  };
}
