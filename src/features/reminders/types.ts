import type { ChipVariant } from '@/shared/components';

export type Reminder = {
  id: string;
  kind: 'vaccine' | 'dewormer';
  title: string;
  dateLabel: string;
  statusLabel: string;
  status: ChipVariant;
};
