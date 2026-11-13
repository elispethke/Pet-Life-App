import type { RoutineItem } from '@/features/routine/types';

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/;

// Horário válido no formato 24 h: "07:30", "19:05".
export function isValidTime(value: string): boolean {
  return TIME_PATTERN.test(value.trim());
}

// Ordena a linha do tempo do dia pelo horário.
export function sortByTime(items: RoutineItem[]): RoutineItem[] {
  return [...items].sort((a, b) => a.time.localeCompare(b.time));
}
