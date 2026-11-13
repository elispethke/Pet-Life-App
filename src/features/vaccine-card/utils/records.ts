import type { VaccineRecord } from '@/features/vaccine-card/types';

// Junta registros novos aos existentes: se já existe um com o mesmo nome (e tipo), ele é substituído
// (uma nova leitura da carteirinha atualiza a vacina, não duplica).
export function upsertRecords(current: VaccineRecord[], incoming: VaccineRecord[]): VaccineRecord[] {
  const key = (record: VaccineRecord) => `${record.kind}:${record.name.trim().toLowerCase()}`;
  const incomingKeys = new Set(incoming.map(key));
  return [...current.filter((record) => !incomingKeys.has(key(record))), ...incoming];
}
