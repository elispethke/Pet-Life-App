// Paleta do PetLife: fundo amarelo, detalhes roxos.
export const colors = {
  // Marca
  grape: '#5B2A9E', // Roxo Uva: ação principal, ícones, títulos
  mango: '#FFC21A', // Amarelo Manga: fundo de destaque
  mangoLight: '#FFD966', // fim do degradê amarelo dos cartões de destaque
  mangoDeep: '#E8AC1F', // amarelo mais escuro: opção não selecionada sobre o fundo amarelo
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
  textMuted: '#6A5A8A', // subtítulos e textos de apoio em telas claras
  fieldLabel: '#8F80B0', // rótulo pequeno dentro dos campos
  errorText: '#9A1F24', // texto de erro (contraste AA sobre o fundo claro)

  // Chips de status: fundo claro da cor e texto escuro da cor (só para estado)
  chipOkBg: '#DDF5EA',
  chipOkText: '#0B6B43',
  chipWarnBg: '#FFF0C2',
  chipWarnText: '#7A5300',
  chipBadBg: '#FFE0E1',
  chipBadText: '#9A1F24',
  chipNeutralBg: '#FFE9A0',

  // Realce de campo de baixa confiança e câmera
  fieldFlagged: '#F3ECFC',
  cameraBg: '#3B1A6E',
  cameraLine: 'rgba(205, 189, 242, 0.35)',

  // Fundo escurecido atrás da folha de baixo
  overlay: 'rgba(42, 16, 80, 0.55)',

  // Bordas
  border: '#E4DBF6',

  // Só para o desenho do pet (focinho e língua)
  illustrationPink: '#F59AA5',

  // Status de vacina e rotina (só para estado, nunca decoração)
  statusOk: '#14975F',
  statusWarning: '#FFC21A',
  statusOverdue: '#E5484D',
} as const;
