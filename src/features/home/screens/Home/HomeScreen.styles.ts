import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  content: {
    gap: spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  greeting: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  title: {
    fontFamily: fontFamily.display.medium,
    fontSize: fontSize.title,
    color: colors.textPrimary,
  },
  petRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  petInfo: {
    flex: 1,
  },
  petName: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.heading,
    color: colors.textPrimary,
  },
  petDetails: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textSecondary,
  },
  chips: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  shortcuts: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  sectionTitle: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  reminders: {
    gap: spacing.md,
  },
  reminderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  reminderText: {
    flex: 1,
  },
  reminderTitle: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
  },
  reminderDate: {
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
});
