import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  safe: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  bar: {
    height: sizes.tabBarHeight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: spacing.sm,
  },
  item: {
    minWidth: 56,
    alignItems: 'center',
    gap: 2,
    paddingVertical: spacing.xs,
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.xs,
  },
  fab: {
    width: sizes.fab,
    height: sizes.fab,
    borderRadius: sizes.fab / 2,
    marginTop: -spacing.xl,
    backgroundColor: colors.grape,
    borderWidth: 4,
    borderColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const label = StyleSheet.create({
  active: { color: colors.grape },
  idle: { color: colors.fieldLabel },
});

export const styles = { ...base, variant: { label } };
