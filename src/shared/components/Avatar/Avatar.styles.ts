import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize, sizes } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: colors.grape,
  },
  initial: {
    fontFamily: fontFamily.display.semibold,
    fontSize: fontSize.xl,
    color: colors.grape,
  },
});

// Pet: círculo branco com patinha. Tutora: círculo lavanda com a inicial do nome.
const variant = StyleSheet.create({
  pet: { backgroundColor: colors.white },
  owner: { backgroundColor: colors.lavender },
});

const size = StyleSheet.create({
  md: { width: sizes.avatarSmall, height: sizes.avatarSmall, borderRadius: sizes.avatarSmall / 2 },
  lg: { width: sizes.avatar + 12, height: sizes.avatar + 12, borderRadius: (sizes.avatar + 12) / 2 },
});

export const styles = { ...base, variant, size };
