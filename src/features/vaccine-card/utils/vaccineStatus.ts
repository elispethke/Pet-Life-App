import type { StatusInfo, VaccineRecord, VaccineStatus } from '@/features/vaccine-card/types';
import { daysBetween, formatIsoAsBr, fromIsoDate } from '@/shared/utils';

// Quantos dias antes do vencimento o item passa a pedir atenção.
export const WARNING_DAYS = 30;

// Função PURA: calcula o status só pela data de vencimento e pela data de hoje.
//   vencida      -> vencimento antes de hoje
//   vence em N   -> vence em até 30 dias (inclusive hoje)
//   em dia       -> vence daqui a mais de 30 dias
export function vaccineStatus(nextDueOn: string, today: Date = new Date()): StatusInfo {
  const daysUntilDue = daysBetween(today, fromIsoDate(nextDueOn));

  if (daysUntilDue < 0) {
    return { status: 'bad', daysUntilDue, label: 'vencida' };
  }
  if (daysUntilDue === 0) {
    return { status: 'warn', daysUntilDue, label: 'vence hoje' };
  }
  if (daysUntilDue <= WARNING_DAYS) {
    return { status: 'warn', daysUntilDue, label: daysUntilDue === 1 ? 'em 1 dia' : `em ${daysUntilDue} dias` };
  }
  return { status: 'ok', daysUntilDue, label: 'em dia' };
}

// Linha de apoio da lista de saúde: "Aplicada 12/03/2026", "Vence 28/11/2026" ou "Venceu 01/10/2026".
export function recordDetail(record: VaccineRecord, status: VaccineStatus): string {
  if (status === 'ok') {
    return `${record.kind === 'visit' ? 'Realizada' : 'Aplicada'} ${formatIsoAsBr(record.appliedOn)}`;
  }
  return `${status === 'bad' ? 'Venceu' : 'Vence'} ${formatIsoAsBr(record.nextDueOn)}`;
}

// Resumo do cartão do pet: o pior status entre as vacinas e vermífugos.
export function overallStatus(statuses: VaccineStatus[]): { label: string; status: VaccineStatus } {
  if (statuses.includes('bad')) return { label: 'Vacina vencida', status: 'bad' };
  if (statuses.includes('warn')) return { label: 'Vacina a vencer', status: 'warn' };
  return { label: 'Vacinas em dia', status: 'ok' };
}
