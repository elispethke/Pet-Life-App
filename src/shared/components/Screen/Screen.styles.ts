import { StyleSheet } from 'react-native';
import { colors, spacing } from '@/shared/theme';

const base = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
  },
  keyboardArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});

// Fundo de cada variante: amarelo cheio (telas de destaque) ou amarelo claro (telas comuns).
const variant = StyleSheet.create({
  yellow: { backgroundColor: colors.mango },
  light: { backgroundColor: colors.screen },
});

export const styles = { ...base, variant };
