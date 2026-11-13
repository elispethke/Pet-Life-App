import type { ScanItem, VaccineRecord } from '@/features/vaccine-card/types';
import { addYears, parseBrDate, toIsoDate } from '@/shared/utils';

export const DATE_ERROR = 'Use a data no formato dd/mm/aaaa.';
export const NAME_ERROR = 'Digite o nome da vacina.';

// Ids dos campos de cada vacina lida, para ligar o que o tutor digita ao item.
export const fieldIds = {
  name: (itemId: string) => `${itemId}-name`,
  applied: (itemId: string) => `${itemId}-applied`,
  next: (itemId: string) => `${itemId}-next`,
  text: (itemId: string) => `${itemId}-text`,
};

// Valores iniciais dos campos, como foram lidos.
export function initialFieldValues(items: ScanItem[]): Record<string, string> {
  const values: Record<string, string> = {};
  for (const item of items) {
    if (item.layout === 'detailed') {
      values[fieldIds.name(item.id)] = item.name;
      values[fieldIds.applied(item.id)] = item.appliedOn ?? '';
      values[fieldIds.next(item.id)] = item.nextDueOn ?? '';
    } else {
      values[fieldIds.text(item.id)] = item.text ?? '';
    }
  }
  return values;
}

// Lê uma data DD/MM/AAAA dentro de um texto livre (ex.: "Aplicada em 02/05/2026" ou "20/04/2026 · lote A4521").
function findDate(text: string): Date | null {
  const match = /(\d{2}\/\d{2}\/\d{4})/.exec(text);
  return match ? parseBrDate(match[1]) : null;
}

function findBatch(text: string): string | undefined {
  return /lote\s+(\S+)/i.exec(text)?.[1];
}

export type BuildResult = {
  records: VaccineRecord[];
  // Erros por id de campo. Se houver algum, nada deve ser salvo (a revisão é obrigatória).
  errors: Record<string, string>;
};

// Converte o que o tutor revisou em registros de vacina. Valida tudo: data inválida bloqueia o salvamento.
// Sem "próxima dose" informada, assume reforço anual (aplicada + 1 ano).
export function buildRecords(items: ScanItem[], values: Record<string, string>): BuildResult {
  const records: VaccineRecord[] = [];
  const errors: Record<string, string> = {};

  for (const item of items) {
    if (item.layout === 'detailed') {
      const name = (values[fieldIds.name(item.id)] ?? '').trim();
      const applied = parseBrDate(values[fieldIds.applied(item.id)] ?? '');
      const next = parseBrDate(values[fieldIds.next(item.id)] ?? '');
      if (!name) errors[fieldIds.name(item.id)] = NAME_ERROR;
      if (!applied) errors[fieldIds.applied(item.id)] = DATE_ERROR;
      if (!next) errors[fieldIds.next(item.id)] = DATE_ERROR;
      if (name && applied && next) {
        records.push({ id: item.id, name, kind: 'vaccine', appliedOn: toIsoDate(applied), nextDueOn: toIsoDate(next) });
      }
    } else {
      const text = values[fieldIds.text(item.id)] ?? '';
      const applied = findDate(text);
      if (!applied) {
        errors[fieldIds.text(item.id)] = DATE_ERROR;
        continue;
      }
      records.push({
        id: item.id,
        name: item.name,
        kind: 'vaccine',
        appliedOn: toIsoDate(applied),
        nextDueOn: toIsoDate(addYears(applied, 1)),
        batch: findBatch(text),
      });
    }
  }

  return { records, errors };
}
