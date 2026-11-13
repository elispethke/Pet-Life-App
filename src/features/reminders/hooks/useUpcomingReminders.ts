import { useMemo } from 'react';
import type { Reminder } from '@/features/reminders/types';
import { useVaccineViews } from '@/features/vaccine-card';

const MAX_REMINDERS = 3;

// Próximos lembretes, calculados a partir das vacinas e vermífugos do estado global:
// os de vencimento mais próximo (inclusive os vencidos) vêm primeiro.
export function useUpcomingReminders(): Reminder[] {
  const views = useVaccineViews();

  return useMemo(
    () =>
      views
        .filter((view) => view.kind !== 'visit')
        .slice(0, MAX_REMINDERS)
        .map((view) => ({
          id: view.id,
          kind: view.kind === 'dewormer' ? 'dewormer' : 'vaccine',
          title: view.name.replace(' (múltipla)', ''),
          dateLabel: view.nextDueLabel,
          statusLabel: view.info.label,
          status: view.chipVariant,
        })),
    [views],
  );
}
