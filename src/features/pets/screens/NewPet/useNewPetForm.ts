import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { usePets } from '@/providers/PetsProvider';
import type { Species } from '@/features/pets/types';
import { isValidPetName } from '@/features/pets/utils';

const PET_NAME_ERROR = 'Digite o nome do pet.';
const SAVE_ERROR = 'Não foi possível salvar o pet. Tente novamente.';

// Estado e lógica da tela Novo pet: espécie, nome, erro, carregamento e o pet salvo.
export function useNewPetForm() {
  const router = useRouter();
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
      await createPet({ species, name });
      router.replace('/home');
    } catch {
      setError(SAVE_ERROR);
    } finally {
      submitting.current = false;
      setLoading(false);
    }
  };

  return { species, name, error, loading, setSpecies, setName, submit };
}
