import { useRef, useState } from 'react';
import { usePets } from '@/providers/PetsProvider';
import type { Species } from '@/features/pets/types';
import { isValidPetName } from '@/features/pets/utils';

export const PET_NAME_ERROR = 'Digite o nome do pet.';
export const SAVE_ERROR = 'Não foi possível salvar o pet. Tente novamente.';

// Estado e lógica da tela Novo pet: espécie, nome, erro, carregamento e o pet salvo.
export function useNewPetForm() {
  const { createPet } = usePets();
  const [species, setSpecies] = useState<Species>('dog');
  const [name, setNameValue] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const submitting = useRef(false);

  const setName = (value: string) => {
    setNameValue(value);
    setError(undefined);
  };

  const submit = async () => {
    if (submitting.current) return;

    if (!isValidPetName(name)) {
      setError(PET_NAME_ERROR);
      return;
    }

    submitting.current = true;
    setLoading(true);
    try {
      // Com o pet salvo, as rotas protegidas de (app) levam sozinhas ao Início.
      await createPet({ species, name });
    } catch {
      setError(SAVE_ERROR);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return { species, name, error, loading, setSpecies, setName, submit };
}
