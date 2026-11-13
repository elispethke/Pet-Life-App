export type RoutineKind = 'meal' | 'walk';
export type RoutineStatus = 'pending' | 'done' | 'snoozed';

// Item da rotina no estado global (em memória). Horário no formato "HH:MM".
export type RoutineItem = {
  id: string;
  kind: RoutineKind;
  label: string;
  time: string;
  // Refeição: gramas (sem valor, usa a porção calculada). Passeio: duração em minutos.
  amountG?: number;
  durationMin?: number;
  status: RoutineStatus;
  snoozedUntil?: string;
};

export type NewRoutineItemInput = {
  kind: RoutineKind;
  time: string;
  amount: number;
};
