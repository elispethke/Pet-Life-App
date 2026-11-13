import { StyleSheet } from 'react-native';
import { colors, radius, spacing } from '@/shared/theme';

const CORNER = 34;
const BORDER = 4;

const base = StyleSheet.create({
  frame: {
    flex: 1,
    marginVertical: spacing.xs,
    backgroundColor: colors.cameraBg,
    borderRadius: radius.md,
    justifyContent: 'space-evenly',
    paddingHorizontal: spacing.xl,
  },
  line: {
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.cameraLine,
  },
  corner: {
    position: 'absolute',
    width: CORNER,
    height: CORNER,
    borderColor: colors.grape,
  },
});

// Largura de cada linha de "texto" da carteirinha ilustrada.
const lineWidth = StyleSheet.create({
  full: { width: '100%' },
  long: { width: '88%' },
  medium: { width: '72%' },
  short: { width: '55%' },
});

const cornerPosition = StyleSheet.create({
  topLeft: { top: 0, left: 0, borderTopWidth: BORDER, borderLeftWidth: BORDER, borderTopLeftRadius: radius.md },
  topRight: { top: 0, right: 0, borderTopWidth: BORDER, borderRightWidth: BORDER, borderTopRightRadius: radius.md },
  bottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: BORDER,
    borderLeftWidth: BORDER,
    borderBottomLeftRadius: radius.md,
  },
  bottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: BORDER,
    borderRightWidth: BORDER,
    borderBottomRightRadius: radius.md,
  },
});

export const styles = { ...base, lineWidth, cornerPosition };
