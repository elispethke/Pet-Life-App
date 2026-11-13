import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  form: {
    flex: 1,
    gap: spacing.md,
  },
  hint: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  submitError: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.errorText,
  },
  footer: {
    gap: spacing.sm,
    paddingTop: spacing.lg,
  },
});
