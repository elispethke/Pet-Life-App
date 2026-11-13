import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  header: {
    alignItems: 'center',
  },
  hero: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginTop: spacing.xl,
    textAlign: 'center',
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.heading,
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.sm,
    textAlign: 'center',
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
});
