// Em React Native cada peso de uma fonte customizada é uma família própria,
// então usamos `fontFamily` por peso e não `fontWeight`.
export const fontFamily = {
  display: {
    medium: 'Fredoka_500Medium',
    semibold: 'Fredoka_600SemiBold',
    bold: 'Fredoka_700Bold',
  },
  body: {
    regular: 'Nunito_400Regular',
    medium: 'Nunito_500Medium',
    semibold: 'Nunito_600SemiBold',
    bold: 'Nunito_700Bold',
  },
} as const;

export const fontSize = {
  xs: 11,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 20,
  title: 22,
  heading: 28,
  display: 44,
} as const;
