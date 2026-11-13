import { StyleSheet } from 'react-native';
import { colors, sizes } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    width: sizes.iconButton,
    height: sizes.iconButton,
    borderRadius: sizes.iconButton / 2,
    borderWidth: 2,
    borderColor: colors.grape,
    backgroundColor: colors.lavender,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pressed: {
    opacity: 0.8,
  },
});
