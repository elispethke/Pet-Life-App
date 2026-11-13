import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  title: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.heading,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  rowText: {
    flex: 1,
  },
  name: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  detail: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  empty: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
    textAlign: 'center',
    paddingVertical: spacing.xl,
  },
});
