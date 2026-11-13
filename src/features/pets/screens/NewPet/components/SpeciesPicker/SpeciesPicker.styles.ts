import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  tile: {
    flex: 1,
    minHeight: sizes.speciesTile,
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
  },
});

// Opção selecionada (roxa, texto branco) ou não (amarelo escuro, texto roxo escuro).
const tileVariant = StyleSheet.create({
  selected: { backgroundColor: colors.grape },
  unselected: { backgroundColor: colors.mangoDeep },
});

const labelVariant = StyleSheet.create({
  selected: { color: colors.textOnGrape },
  unselected: { color: colors.deepPurple },
});

export const styles = { ...base, variant: { tile: tileVariant, label: labelVariant } };
