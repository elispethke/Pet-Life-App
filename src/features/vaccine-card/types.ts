import type { ChipVariant } from '@/shared/components';

export type RecordKind = 'vaccine' | 'dewormer' | 'visit';

// Registro de saúde guardado no estado global (em memória). Datas em ISO (AAAA-MM-DD).
// O status (em dia, vence em N dias, vencida) NUNCA é guardado: é calculado pela data de vencimento.
export type VaccineRecord = {
  id: string;
  name: string;
  kind: RecordKind;
  appliedOn: string;
  nextDueOn: string;
  batch?: string;
};

export type VaccineStatus = 'ok' | 'warn' | 'bad';

export type StatusInfo = {
  status: VaccineStatus;
  // Dias até o vencimento (negativo se já venceu).
  daysUntilDue: number;
  // Texto do chip: "em dia", "em 15 dias", "vence hoje" ou "vencida".
  label: string;
};

// Registro com o status calculado e os textos prontos para as telas.
export type VaccineView = VaccineRecord & {
  info: StatusInfo;
  detail: string;
  chipVariant: ChipVariant;
  nextDueLabel: string;
};

// Vacina lida da carteirinha de papel (leitura simulada), antes da revisão.
export type ScanItem = {
  id: string;
  name: string;
  // detailed: três campos (nome, aplicada em, próxima); compact: um campo só com o texto lido.
  layout: 'detailed' | 'compact';
  appliedOn?: string;
  nextDueOn?: string;
  text?: string;
  lowConfidence?: boolean;
};
