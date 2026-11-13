import { StyleSheet } from 'react-native';
import { colors, radius, sizes, spacing } from '@/shared/theme';

export const styles = StyleSheet.create({
  container: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    gap: spacing.md,
    overflow: 'hidden',
  },
  circle: {
    position: 'absolute',
    right: -sizes.highlightCircle / 3,
    bottom: -sizes.highlightCircle / 2.2,
    width: sizes.highlightCircle,
    height: sizes.highlightCircle,
    borderRadius: sizes.highlightCircle / 2,
    backgroundColor: colors.grape,
  },
});

// Degradê amarelo do canto superior esquerdo para o inferior direito (como no design).
export const gradient = {
  colors: [colors.mango, colors.mangoLight] as const,
  start: { x: 0, y: 0 },
  end: { x: 1, y: 1 },
};
