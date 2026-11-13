import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  header: {
    marginTop: spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: spacing.md,
  },
  title: {
    flex: 1,
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.title,
    color: colors.textPrimary,
  },
  guide: {
    marginTop: spacing.sm,
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  footer: {
    alignItems: 'center',
    gap: spacing.md,
    paddingTop: spacing.sm,
  },
  shutter: {
    width: sizes.shutter,
    height: sizes.shutter,
    borderRadius: sizes.shutter / 2,
    borderWidth: 6,
    borderColor: colors.white,
    backgroundColor: colors.grape,
  },
  gallery: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
    color: colors.textPrimary,
    paddingVertical: spacing.sm,
  },
});
