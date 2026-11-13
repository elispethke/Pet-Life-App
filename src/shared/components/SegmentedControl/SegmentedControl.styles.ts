import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: colors.border,
    borderRadius: radius.pill,
    padding: spacing.xs - 1,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.md,
  },
});

const item = StyleSheet.create({
  selected: { backgroundColor: colors.white },
  idle: {},
});

const label = StyleSheet.create({
  selected: { color: colors.grape },
  idle: { color: colors.textMuted },
});

export const styles = { ...base, variant: { item, label } };
