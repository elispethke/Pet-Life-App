import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as vaccinesApi from '@/features/vaccines/api';
import type { VaccineRecord } from '@/features/vaccines/types';
import { upsertRecords } from '@/features/vaccines/utils';

type VaccinesContextValue = {
  records: VaccineRecord[];
  // Adiciona (ou atualiza) as vacinas revisadas. Aparecem na hora em todas as telas.
  saveRecords: (records: VaccineRecord[]) => Promise<void>;
};

const VaccinesContext = createContext<VaccinesContextValue | undefined>(undefined);

// Fonte ÚNICA das vacinas, vermífugos e consultas, em memória (volta aos dados iniciais ao reiniciar).
export function VaccinesProvider({ children }: { children: ReactNode }) {
  const [records, setRecords] = useState<VaccineRecord[]>(vaccinesApi.INITIAL_RECORDS);

  const saveRecords = useCallback(async (incoming: VaccineRecord[]) => {
    const saved = await vaccinesApi.saveVaccines(incoming);
    setRecords((current) => upsertRecords(current, saved));
  }, []);

  const value = useMemo(() => ({ records, saveRecords }), [records, saveRecords]);
  return <VaccinesContext.Provider value={value}>{children}</VaccinesContext.Provider>;
}

export function useVaccines(): VaccinesContextValue {
  const context = useContext(VaccinesContext);
  if (!context) {
    throw new Error('useVaccines deve ser usado dentro de <VaccinesProvider>.');
  }
  return context;
}
