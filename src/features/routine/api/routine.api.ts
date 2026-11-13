import type { NewRoutineItemInput, RoutineItem } from '@/features/routine/types';

// Versão SIMULADA da API da rotina. As assinaturas são async, como serão as da API real.
// Quem guarda a lista do dia é o RoutineProvider.

// Dados iniciais (voltam a ser estes sempre que o app reinicia). Refeição sem `amountG` usa a porção calculada.
export const INITIAL_ITEMS: RoutineItem[] = [
  { id: 'seed-breakfast', kind: 'meal', label: 'Café da manhã', time: '07:30', status: 'done' },
  { id: 'seed-walk-morning', kind: 'walk', label: 'Passeio da manhã', time: '08:00', durationMin: 30, status: 'done' },
  { id: 'seed-walk-afternoon', kind: 'walk', label: 'Passeio da tarde', time: '18:00', durationMin: 30, status: 'snoozed', snoozedUntil: '18:30' },
  { id: 'seed-dinner', kind: 'meal', label: 'Jantar', time: '19:30', status: 'pending' },
];

let nextId = 1;

export async function createRoutineItem({ kind, time, amount }: NewRoutineItemInput): Promise<RoutineItem> {
  const base = { id: `routine-${nextId++}`, kind, time: time.trim(), status: 'pending' as const };
  return kind === 'meal'
    ? { ...base, label: 'Refeição', amountG: amount }
    : { ...base, label: 'Passeio', durationMin: amount };
}

// Marca como feito; se já estava feito, volta para pendente.
export async function toggleRoutineItem(item: RoutineItem): Promise<RoutineItem> {
  return item.status === 'done'
    ? { ...item, status: 'pending', snoozedUntil: undefined }
    : { ...item, status: 'done', snoozedUntil: undefined };
}
