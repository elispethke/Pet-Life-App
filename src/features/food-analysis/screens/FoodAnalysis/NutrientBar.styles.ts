import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    gap: spacing.xs + 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  value: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  track: {
    height: sizes.progressBar,
    borderRadius: radius.pill,
    backgroundColor: colors.border,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: radius.pill,
    backgroundColor: colors.grape,
  },
});

// Estilo dinâmico: largura do preenchimento conforme o percentual.
const fillWidth = (percent: number) => ({ width: `${percent}%` as const });

export const styles = { ...base, fillWidth };
