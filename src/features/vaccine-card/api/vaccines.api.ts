import type { ScanItem, VaccineRecord } from '@/features/vaccine-card/types';

// Versão SIMULADA da API de vacinas. As assinaturas são async, como serão as da API real
// (banco e leitura por IA). Quem guarda a lista é o VaccinesProvider.

// Dados iniciais do app (voltam a ser estes sempre que o app reinicia).
export const INITIAL_RECORDS: VaccineRecord[] = [
  { id: 'seed-v10', name: 'V10 (múltipla)', kind: 'vaccine', appliedOn: '2026-03-12', nextDueOn: '2027-03-12' },
  { id: 'seed-rabies', name: 'Antirrábica', kind: 'vaccine', appliedOn: '2026-04-20', nextDueOn: '2027-04-20' },
  { id: 'seed-flu', name: 'Gripe canina', kind: 'vaccine', appliedOn: '2025-10-01', nextDueOn: '2026-10-01' },
  { id: 'seed-dewormer', name: 'Vermífugo', kind: 'dewormer', appliedOn: '2026-08-22', nextDueOn: '2026-11-22' },
  { id: 'seed-visit', name: 'Consulta de rotina', kind: 'visit', appliedOn: '2026-09-10', nextDueOn: '2027-03-10' },
];

// "Lê" a carteirinha fotografada. É uma leitura de exemplo: uma data vem ilegível para exigir a revisão.
export async function readVaccineCard(): Promise<ScanItem[]> {
  return [
    { id: 'scan-v10', name: 'V10 (múltipla)', layout: 'detailed', appliedOn: '12/03/2026', nextDueOn: '12/03/2027' },
    { id: 'scan-giardia', name: 'Giárdia', layout: 'compact', text: 'Aplicada em 02/05/20?5', lowConfidence: true },
    { id: 'scan-rabies', name: 'Antirrábica', layout: 'compact', text: '20/04/2026 · lote A4521' },
  ];
}

// "Grava" as vacinas revisadas e devolve o que foi gravado (com id novo).
let nextId = 1;
export async function saveVaccines(records: VaccineRecord[]): Promise<VaccineRecord[]> {
  return records.map((record) => ({ ...record, id: `vaccine-${nextId++}` }));
}
