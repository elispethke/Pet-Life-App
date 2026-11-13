// Funções puras de data, usadas por várias features. Datas são guardadas como texto ISO (AAAA-MM-DD)
// e mostradas como DD/MM/AAAA. Todas trabalham no fuso local do aparelho, à meia-noite.

const WEEKDAYS = ['domingo', 'segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado'];

const pad = (value: number) => String(value).padStart(2, '0');

export function toIsoDate(date: Date): string {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function fromIsoDate(iso: string): Date {
  const [year, month, day] = iso.split('-').map(Number);
  return new Date(year, month - 1, day);
}

export function formatBrDate(date: Date): string {
  return `${pad(date.getDate())}/${pad(date.getMonth() + 1)}/${date.getFullYear()}`;
}

export function formatIsoAsBr(iso: string): string {
  return formatBrDate(fromIsoDate(iso));
}

// Lê "DD/MM/AAAA". Devolve null se o texto não for uma data real (por exemplo, "02/05/20?5" ou "31/02/2026").
export function parseBrDate(text: string): Date | null {
  const match = /^(\d{2})\/(\d{2})\/(\d{4})$/.exec(text.trim());
  if (!match) return null;
  const [day, month, year] = [Number(match[1]), Number(match[2]), Number(match[3])];
  const date = new Date(year, month - 1, day);
  const real = date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
  return real ? date : null;
}

export function addYears(date: Date, years: number): Date {
  return new Date(date.getFullYear() + years, date.getMonth(), date.getDate());
}

// Dias inteiros entre duas datas (negativo se `to` for antes de `from`).
export function daysBetween(from: Date, to: Date): number {
  const start = Date.UTC(from.getFullYear(), from.getMonth(), from.getDate());
  const end = Date.UTC(to.getFullYear(), to.getMonth(), to.getDate());
  return Math.round((end - start) / 86_400_000);
}

export function weekdayLabel(date: Date): string {
  return WEEKDAYS[date.getDay()];
}

export function ageInMonths(birthIso: string, today: Date): number {
  const birth = fromIsoDate(birthIso);
  let months = (today.getFullYear() - birth.getFullYear()) * 12 + (today.getMonth() - birth.getMonth());
  if (today.getDate() < birth.getDate()) months -= 1;
  return Math.max(0, months);
}

export function formatAge(months: number): string {
  if (months < 12) return months === 1 ? '1 mês' : `${months} meses`;
  const years = Math.floor(months / 12);
  return years === 1 ? '1 ano' : `${years} anos`;
}
