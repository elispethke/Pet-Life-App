import { useState } from 'react';
import { usePetProfile } from '@/features/pets';
import { useVaccineViews } from '@/features/vaccine-card/hooks';

export type HealthTab = 'vaccines' | 'dewormer' | 'visits';

const KIND_BY_TAB = { vaccines: 'vaccine', dewormer: 'dewormer', visits: 'visit' } as const;

// Dados da tela "Saúde do pet": o segmento escolhido e a lista dele (calculada do estado global).
export function useVaccines() {
  const pet = usePetProfile();
  const views = useVaccineViews();
  const [tab, setTab] = useState<HealthTab>('vaccines');
  // "Avisar 7 dias antes" é só visual nesta fase: nenhuma notificação é agendada.
  const [remindersOn, setRemindersOn] = useState(true);

  const records = views.filter((view) => view.kind === KIND_BY_TAB[tab]);

  return {
    petName: pet?.name ?? '',
    tab,
    setTab,
    records,
    remindersOn,
    toggleReminders: () => setRemindersOn((current) => !current),
  };
}
