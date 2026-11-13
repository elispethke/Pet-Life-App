import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  form: {
    flex: 1,
    gap: spacing.md,
  },
  forgot: {
    alignSelf: 'flex-end',
    paddingVertical: spacing.xs,
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.grape,
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
