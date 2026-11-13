import type { NewPetInput, Pet } from '@/features/pets/types';

// Versão SIMULADA da API de pets: só monta o pet (espécie e nome vêm do formulário; o resto são dados
// de exemplo). Quem guarda a lista é o PetsProvider. A assinatura é async, como será a da API real.
let nextId = 1;

export async function createPet(ownerId: string, input: NewPetInput): Promise<Pet> {
  const isDog = input.species === 'dog';
  return {
    id: `pet-${nextId++}`,
    ownerId,
    species: input.species,
    name: input.name.trim(),
    breed: isDog ? 'Golden Retriever' : 'Sem raça definida',
    birthDate: '2022-03-14',
    weightKg: isDog ? 28 : 4.2,
    sex: isDog ? 'Macho' : 'Fêmea',
    neutered: true,
    microchip: isDog ? '985 112 004 771 203' : '985 112 004 771 204',
  };
}
