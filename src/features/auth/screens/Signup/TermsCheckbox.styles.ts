import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, sizes, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: spacing.md,
  },
  box: {
    width: sizes.checkbox,
    height: sizes.checkbox,
    borderRadius: radius.sm / 2,
    borderWidth: 2,
    borderColor: colors.border,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    flex: 1,
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.md,
    color: colors.textMuted,
  },
  error: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.sm,
    color: colors.errorText,
  },
});

// Caixa marcada fica roxa; com erro, a borda vira coral.
const boxState = StyleSheet.create({
  unchecked: {},
  checked: { backgroundColor: colors.grape, borderColor: colors.grape },
  error: { borderColor: colors.statusOverdue },
});

export const styles = { ...base, boxState };
