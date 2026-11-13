import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: colors.overlay,
  },
  sheet: {
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.lg + 4,
    borderTopRightRadius: radius.lg + 4,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
    alignItems: 'center',
    gap: spacing.md,
  },
  lockBadge: {
    width: sizes.lockBadge,
    height: sizes.lockBadge,
    borderRadius: sizes.lockBadge / 2,
    backgroundColor: colors.mango,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.title,
    color: colors.textPrimary,
    textAlign: 'center',
  },
  text: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.lg,
    color: colors.textMuted,
    textAlign: 'center',
  },
  actions: {
    alignSelf: 'stretch',
    gap: spacing.xs,
    alignItems: 'center',
  },
  primary: {
    alignSelf: 'stretch',
  },
});
