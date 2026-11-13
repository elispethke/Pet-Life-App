import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    flex: 1,
    minHeight: sizes.speciesTile,
    justifyContent: 'space-between',
    padding: spacing.lg,
    borderRadius: radius.md,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
  },
});

// Roxo (ação principal) ou lavanda (apoio).
const container = StyleSheet.create({
  primary: { backgroundColor: colors.grape },
  soft: { backgroundColor: colors.lavender },
});

const label = StyleSheet.create({
  primary: { color: colors.textOnGrape },
  soft: { color: colors.deepPurple },
});

export const styles = { ...base, variant: { container, label } };
