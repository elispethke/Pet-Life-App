import { useRouter } from 'expo-router';
import { useRef, useState } from 'react';
import { useMealPortion } from '@/features/food-scan';
import type { RoutineKind } from '@/features/routine/types';
import { isValidTime } from '@/features/routine/utils';
import { useRoutineState } from '@/providers/RoutineProvider';

export const TIME_ERROR = 'Use o horário no formato hh:mm (por exemplo, 07:30).';
export const AMOUNT_ERROR = 'Digite um número maior que zero.';
const DEFAULT_WALK_MINUTES = '30';

// Estado do formulário "Novo horário": tipo, horário e gramas (comida) ou duração em minutos (passeio).
export function useNewRoutineItem() {
  const router = useRouter();
  const { addItem } = useRoutineState();
  const mealPortion = useMealPortion();
  const defaultMealGrams = String(mealPortion?.displayGramsPerMeal ?? 180);

  const [kind, setKindValue] = useState<RoutineKind>('meal');
  const [time, setTimeValue] = useState('');
  const [amount, setAmountValue] = useState(defaultMealGrams);
  const [errors, setErrors] = useState<{ time?: string; amount?: string }>({});
  const [saving, setSaving] = useState(false);
  const submitting = useRef(false);

  const setKind = (next: RoutineKind) => {
    setKindValue(next);
    setAmountValue(next === 'meal' ? defaultMealGrams : DEFAULT_WALK_MINUTES);
    setErrors({});
  };
  const setTime = (value: string) => {
    setTimeValue(value);
    setErrors((current) => ({ ...current, time: undefined }));
  };
  const setAmount = (value: string) => {
    setAmountValue(value);
    setErrors((current) => ({ ...current, amount: undefined }));
  };

  const submit = async () => {
    if (submitting.current) return;
    const value = Number(amount.replace(',', '.'));
    const found = {
      time: isValidTime(time) ? undefined : TIME_ERROR,
      amount: Number.isFinite(value) && value > 0 ? undefined : AMOUNT_ERROR,
    };
    setErrors(found);
    if (found.time || found.amount) return;

    submitting.current = true;
    setSaving(true);
    try {
      await addItem({ kind, time, amount: Math.round(value) });
      router.back();
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };

  return {
    kind,
    time,
    amount,
    errors,
    saving,
    amountLabel: kind === 'meal' ? 'Gramas' : 'Duração (minutos)',
    setKind,
    setTime,
    setAmount,
    submit,
    close: () => router.back(),
  };
}
