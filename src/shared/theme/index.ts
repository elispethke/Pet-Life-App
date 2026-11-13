import { colors } from './colors';
import { fontFamily, fontSize } from './typography';
import { radius, spacing } from './spacing';

export const theme = { colors, fontFamily, fontSize, spacing, radius } as const;

export type Theme = typeof theme;
export { colors, fontFamily, fontSize, spacing, radius };
export { fontsToLoad } from './fonts';
