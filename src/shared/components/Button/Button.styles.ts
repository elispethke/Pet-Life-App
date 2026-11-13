import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  pressed: {
    opacity: 0.85,
  },
  disabled: {
    opacity: 0.5,
  },
});

// Aparência de cada variante. O componente só escolhe qual usar.
const variant = StyleSheet.create({
  primary: {
    height: sizes.buttonHeight,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.grape,
  },
  link: {
    paddingVertical: spacing.sm,
  },
});

const label = StyleSheet.create({
  primary: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.lg,
    color: colors.textOnGrape,
  },
  link: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: colors.grape,
  },
});

export const styles = { ...base, variant, label };
