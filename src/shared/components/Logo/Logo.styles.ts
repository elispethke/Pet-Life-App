import { StyleSheet } from 'react-native';
import { colors, fontFamily, fontSize } from '@/shared/theme';

const base = StyleSheet.create({
  text: {
    fontFamily: fontFamily.display.semibold,
    color: colors.deepPurple,
  },
  life: {
    color: colors.grape,
  },
});

const size = StyleSheet.create({
  md: { fontSize: fontSize.heading },
  lg: { fontSize: fontSize.display },
});

export const styles = { ...base, size };
