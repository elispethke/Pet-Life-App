import { StyleSheet } from 'react-native';
import { colors, radius, sizes, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    width: sizes.qr,
    height: sizes.qr,
    padding: spacing.xs,
    borderRadius: radius.sm / 1.4,
    backgroundColor: colors.white,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cell: {
    width: '14.28%',
    height: '14.28%',
    padding: 0.5,
  },
  filled: {
    flex: 1,
    backgroundColor: colors.deepPurple,
    borderRadius: 1,
  },
});
