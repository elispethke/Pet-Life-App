// Número com ponto de milhar, no padrão brasileiro: 1360 -> "1.360".
export function formatThousands(value: number): string {
  return String(Math.round(value)).replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}
