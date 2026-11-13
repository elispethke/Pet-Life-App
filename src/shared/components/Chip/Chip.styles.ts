import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.sm,
  },
});

// Cores por tipo: verde (em dia), amarelo (atenção), coral (vencida), lavanda (informação) e neutro.
const container = StyleSheet.create({
  ok: { backgroundColor: colors.chipOkBg },
  warn: { backgroundColor: colors.chipWarnBg },
  bad: { backgroundColor: colors.chipBadBg },
  info: { backgroundColor: colors.lavender },
  neutral: { backgroundColor: colors.chipNeutralBg },
});

const label = StyleSheet.create({
  ok: { color: colors.chipOkText },
  warn: { color: colors.chipWarnText },
  bad: { color: colors.chipBadText },
  info: { color: colors.deepPurple },
  neutral: { color: colors.textSecondary },
});

export const styles = { ...base, variant: { container, label } };
