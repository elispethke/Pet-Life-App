import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, radius, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  box: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  content: {
    flex: 1,
  },
  label: {
    fontFamily: fontFamily.body.bold,
    fontSize: fontSize.xs,
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    color: colors.fieldLabel,
  },
  input: {
    fontFamily: fontFamily.body.medium,
    fontSize: fontSize.lg,
    color: colors.textPrimary,
    paddingVertical: spacing.xs,
  },
  toggle: {
    paddingLeft: spacing.md,
    paddingVertical: spacing.sm,
  },
  error: {
    marginTop: spacing.xs,
    fontFamily: fontFamily.body.semibold,
    fontSize: fontSize.sm,
    color: colors.errorText,
  },
});

// Variação da borda conforme o estado do campo.
const state = StyleSheet.create({
  idle: {},
  focused: { borderColor: colors.grape },
  flagged: { borderColor: colors.grape, backgroundColor: colors.fieldFlagged },
  error: { borderColor: colors.statusOverdue },
});

export const styles = { ...base, state };
