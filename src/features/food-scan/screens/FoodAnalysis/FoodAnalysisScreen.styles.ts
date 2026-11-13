import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.md,
  },
  productRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  productIcon: {
    width: sizes.avatarSmall + 4,
    height: sizes.avatarSmall + 4,
    borderRadius: radius.sm,
    borderWidth: 3,
    borderColor: colors.grape,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productText: {
    flex: 1,
  },
  productName: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  productInfo: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  portionCard: {
    alignItems: 'center',
    gap: spacing.xs,
  },
  portionLabel: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  portionValue: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.display,
    color: colors.grape,
  },
  portionDetails: {
    textAlign: 'center',
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  nutrients: {
    gap: spacing.md,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  disclaimer: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  footer: {
    paddingTop: spacing.lg,
  },
});
