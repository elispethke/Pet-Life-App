export type Species = 'dog' | 'cat';

// Pet guardado no estado global (em memória). Datas em ISO (AAAA-MM-DD).
export type Pet = {
  id: string;
  ownerId: string;
  species: Species;
  name: string;
  breed: string;
  birthDate: string;
  weightKg: number;
  sex: 'Macho' | 'Fêmea';
  neutered: boolean;
  microchip: string;
};

export type NewPetInput = {
  species: Species;
  name: string;
};

// Pet pronto para mostrar nas telas: textos já formatados (idade calculada pela data de nascimento).
export type PetProfile = {
  id: string;
  name: string;
  species: Species;
  speciesLabel: string;
  breed: string;
  ageMonths: number;
  ageLabel: string;
  weightKg: number;
  birthDateLabel: string;
  sex: string;
  neutered: boolean;
  neuteredLabel: string;
  microchip: string;
};
