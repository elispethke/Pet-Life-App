import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import * as petsApi from '@/features/pets/api';
import type { NewPetInput, Pet } from '@/features/pets/types';
import { useAuth } from './AuthProvider';

type PetsContextValue = {
  // Pet do tutor logado (o primeiro). `undefined` até cadastrar um em "Novo pet".
  pet: Pet | undefined;
  createPet: (input: NewPetInput) => Promise<Pet>;
};

const PetsContext = createContext<PetsContextValue | undefined>(undefined);

// Fonte ÚNICA dos pets, em memória (some ao fechar o app).
export function PetsProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const ownerId = user?.id ?? '';
  const [pets, setPets] = useState<Pet[]>([]);

  const pet = useMemo(() => pets.find((item) => item.ownerId === ownerId), [pets, ownerId]);

  const createPet = useCallback(
    async (input: NewPetInput) => {
      const created = await petsApi.createPet(ownerId, input);
      setPets((current) => [...current, created]);
      return created;
    },
    [ownerId],
  );

  const value = useMemo(() => ({ pet, createPet }), [pet, createPet]);
  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}

export function usePets(): PetsContextValue {
  const context = useContext(PetsContext);
  if (!context) {
    throw new Error('usePets deve ser usado dentro de <PetsProvider>.');
  }
  return context;
}
