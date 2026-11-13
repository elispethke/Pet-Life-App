// API pública da feature vaccine-card: outras pastas só importam daqui.
export { DigitalCardScreen, ReviewScanScreen, ScanCardScreen, VaccinesScreen } from './screens';
export { useVaccineViews } from './hooks';
export { overallStatus, vaccineStatus } from './utils';
export type { VaccineView } from './types';
