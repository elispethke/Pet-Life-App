import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  title: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.title,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  petName: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.heading,
    color: colors.textPrimary,
  },
  petSubtitle: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    rowGap: spacing.md,
  },
  gridItem: {
    width: '50%',
  },
  gridItemFull: {
    width: '100%',
  },
  gridLabel: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.textSecondary,
  },
  gridValue: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
  },
  footerRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  vaccineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  vaccineName: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  shareContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
});
