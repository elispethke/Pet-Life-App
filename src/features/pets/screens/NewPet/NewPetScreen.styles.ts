import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  header: {
    gap: spacing.sm,
  },
  title: {
    marginTop: spacing.xl,
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.heading,
    color: colors.textPrimary,
  },
  subtitle: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  spacer: {
    flex: 1,
  },
  form: {
    gap: spacing.md,
  },
});
