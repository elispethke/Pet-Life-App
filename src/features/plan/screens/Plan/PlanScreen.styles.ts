import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  content: {
    flex: 1,
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  kicker: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  title: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.title + 6,
    color: colors.textPrimary,
  },
  cardLabel: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing.xs,
  },
  price: {
    fontFamily: fontFamily.display.bold,
    fontSize: fontSize.display + 12,
    color: colors.grape,
  },
  period: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.xl,
    color: colors.grape,
  },
  monthly: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  benefits: {
    gap: spacing.md,
  },
  benefit: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  benefitText: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  spacer: {
    flex: 1,
  },
  note: {
    textAlign: 'center',
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
