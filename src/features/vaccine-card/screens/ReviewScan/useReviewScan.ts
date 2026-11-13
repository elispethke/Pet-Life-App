import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { readVaccineCard } from '@/features/vaccine-card/api';
import type { ScanItem } from '@/features/vaccine-card/types';
import { buildRecords, initialFieldValues } from '@/features/vaccine-card/utils';
import { useVaccines } from '@/providers/VaccinesProvider';

// Estado da tela de revisão: a leitura simulada vira campos editáveis. "Salvar na carteira" só funciona
// se todas as datas estiverem válidas (revisão obrigatória) e então grava no estado global.
export function useReviewScan() {
  const router = useRouter();
  const { saveRecords } = useVaccines();
  const [items, setItems] = useState<ScanItem[]>([]);
  const [values, setValues] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const submitting = useRef(false);

  useEffect(() => {
    let active = true;
    readVaccineCard().then((read) => {
      if (!active) return;
      setItems(read);
      setValues(initialFieldValues(read));
    });
    return () => {
      active = false;
    };
  }, []);

  const setValue = (fieldId: string, value: string) => {
    setValues((current) => ({ ...current, [fieldId]: value }));
    setErrors((current) => ({ ...current, [fieldId]: '' }));
  };

  const lowConfidenceCount = items.filter((item) => item.lowConfidence).length;
  const summary =
    items.length === 0
      ? ''
      : `Lemos ${items.length} vacinas. ${
          lowConfidenceCount === 0
            ? 'Todas parecem corretas.'
            : `${lowConfidenceCount} precisa${lowConfidenceCount === 1 ? '' : 'm'} da sua atenção.`
        }`;

  const save = async () => {
    if (submitting.current) return;
    const result = buildRecords(items, values);
    setErrors(result.errors);
    if (Object.keys(result.errors).length > 0) return;

    submitting.current = true;
    setSaving(true);
    try {
      await saveRecords(result.records);
      router.replace('/wallet');
    } finally {
      submitting.current = false;
      setSaving(false);
    }
  };

  return { items, values, errors, summary, saving, setValue, save };
}
