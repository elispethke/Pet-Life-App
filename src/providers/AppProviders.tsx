import type { ReactNode } from 'react';
import { AuthProvider } from './AuthProvider';
import { PetsProvider } from './PetsProvider';
import { PlanProvider } from './PlanProvider';
import { RoutineProvider } from './RoutineProvider';
import { VaccinesProvider } from './VaccinesProvider';

// Junta todos os provedores de estado global (tudo em memória). A ordem importa:
// pets dependem do usuário logado, então ficam dentro do AuthProvider.
export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <PlanProvider>
        <PetsProvider>
          <VaccinesProvider>
            <RoutineProvider>{children}</RoutineProvider>
          </VaccinesProvider>
        </PetsProvider>
      </PlanProvider>
    </AuthProvider>
  );
}
