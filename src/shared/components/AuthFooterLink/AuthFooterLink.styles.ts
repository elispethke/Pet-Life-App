import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    paddingVertical: spacing.sm,
  },
  text: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  action: {
    fontFamily: fontFamily.body.bold,
    color: colors.grape,
  },
});
