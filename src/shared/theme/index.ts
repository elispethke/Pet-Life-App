import { colors } from './colors';
import { fontFamily, fontSize } from './typography';
import { radius, sizes, spacing } from './spacing';

export const theme = { colors, fontFamily, fontSize, spacing, sizes, radius } as const;

export type Theme = typeof theme;
export { colors, fontFamily, fontSize, spacing, sizes, radius };
export { fontsToLoad } from './fonts';
