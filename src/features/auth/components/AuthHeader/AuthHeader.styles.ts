import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    gap: spacing.sm,
    marginBottom: spacing.xl,
  },
  title: {
    marginTop: spacing.md,
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.heading,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
