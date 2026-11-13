import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.card,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  dimmed: {
    opacity: 0.72,
  },
  pressed: {
    opacity: 0.85,
  },
});
