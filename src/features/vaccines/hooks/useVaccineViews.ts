import { useMemo } from 'react';
import type { VaccineView } from '@/features/vaccines/types';
import { recordDetail, vaccineStatus } from '@/features/vaccines/utils';
import { useVaccines } from '@/providers/VaccinesProvider';
import { formatIsoAsBr } from '@/shared/utils';

// Registros do estado global com o status JÁ CALCULADO (pela data de vencimento) e os textos prontos.
// Ordenados do vencimento mais próximo para o mais distante. Várias telas usam este hook.
export function useVaccineViews(): VaccineView[] {
  const { records } = useVaccines();

  return useMemo(() => {
    const today = new Date();
    return records
      .map((record) => {
        const info = vaccineStatus(record.nextDueOn, today);
        return {
          ...record,
          info,
          detail: recordDetail(record, info.status),
          chipVariant: info.status,
          nextDueLabel: formatIsoAsBr(record.nextDueOn),
        };
      })
      .sort((a, b) => a.nextDueOn.localeCompare(b.nextDueOn));
  }, [records]);
}
