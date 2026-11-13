import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as routineApi from '@/features/routine/api';
import type { NewRoutineItemInput, RoutineItem } from '@/features/routine/types';
import { sortByTime } from '@/features/routine/utils';

type RoutineContextValue = {
  // Linha do tempo do dia, ordenada por horário.
  items: RoutineItem[];
  toggleItem: (id: string) => Promise<void>;
  addItem: (input: NewRoutineItemInput) => Promise<void>;
};

const RoutineContext = createContext<RoutineContextValue | undefined>(undefined);

// Fonte ÚNICA da rotina do dia, em memória (volta aos dados iniciais ao reiniciar o app).
export function RoutineProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<RoutineItem[]>(routineApi.INITIAL_ITEMS);

  const toggleItem = useCallback(
    async (id: string) => {
      const current = items.find((item) => item.id === id);
      if (!current) return;
      const updated = await routineApi.toggleRoutineItem(current);
      setItems((list) => list.map((item) => (item.id === id ? updated : item)));
    },
    [items],
  );

  const addItem = useCallback(async (input: NewRoutineItemInput) => {
    const created = await routineApi.createRoutineItem(input);
    setItems((list) => [...list, created]);
  }, []);

  const sorted = useMemo(() => sortByTime(items), [items]);
  const value = useMemo(() => ({ items: sorted, toggleItem, addItem }), [sorted, toggleItem, addItem]);
  return <RoutineContext.Provider value={value}>{children}</RoutineContext.Provider>;
}

export function useRoutineState(): RoutineContextValue {
  const context = useContext(RoutineContext);
  if (!context) {
    throw new Error('useRoutineState deve ser usado dentro de <RoutineProvider>.');
  }
  return context;
}
