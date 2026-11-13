import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  content: {
    gap: spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  date: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  title: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.title,
    color: colors.textPrimary,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  time: {
    width: 52,
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.lg,
    color: colors.grape,
  },
  rowText: {
    flex: 1,
  },
  itemTitle: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  itemDetail: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  note: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  footer: {
    paddingTop: spacing.sm,
  },
});
