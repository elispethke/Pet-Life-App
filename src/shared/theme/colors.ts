// Paleta do PetLife: fundo amarelo, detalhes roxos.
export const colors = {
  // Marca
  grape: '#5B2A9E', // Roxo Uva: ação principal, ícones, títulos
  mango: '#FFC21A', // Amarelo Manga: fundo de destaque
  lavender: '#CDBDF2', // Lavanda Suave: apoio
  deepPurple: '#2A1050', // Roxo Profundo: texto principal

  // Superfícies
  screen: '#FFF3C4', // fundo das telas
  card: '#FFFFFF',
  white: '#FFFFFF',

  // Texto
  textPrimary: '#2A1050',
  textSecondary: '#6B4F00',
  textOnGrape: '#FFFFFF',

  // Status de vacina e rotina (só para estado, nunca decoração)
  statusOk: '#14975F',
  statusWarning: '#FFC21A',
  statusOverdue: '#E5484D',
} as const;
