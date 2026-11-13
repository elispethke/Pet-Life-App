import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';

// Estado do plano. `activeUntil` é a data final (DD/MM/AAAA) e só existe com o plano ativo.
type PlanState = {
  active: boolean;
  activeUntil: string | null;
};

type PlanContextValue = {
  plan: PlanState;
  // Pagamento SIMULADO: só liga o estado "com plano" neste aparelho. O Stripe entra numa etapa futura.
  subscribe: () => void;
};

const PlanContext = createContext<PlanContextValue | undefined>(undefined);

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${date.getFullYear()}`;
}

// Guarda o plano do tutor (simulado, em memória). Começa sem plano ("Gratuito").
export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<PlanState>({ active: false, activeUntil: null });

  const subscribe = useCallback(() => {
    const until = new Date();
    until.setFullYear(until.getFullYear() + 1);
    setPlan({ active: true, activeUntil: formatDate(until) });
  }, []);

  const value = useMemo(() => ({ plan, subscribe }), [plan, subscribe]);

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan(): PlanContextValue {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlan deve ser usado dentro de <PlanProvider>.');
  }
  return context;
}
