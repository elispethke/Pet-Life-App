import { LinearGradient } from 'expo-linear-gradient';
import type { ReactNode } from 'react';
import { View } from 'react-native';
import { gradient, styles } from './HighlightCard.styles';

type HighlightCardProps = {
  children: ReactNode;
  testID?: string;
};

// Cartão de destaque com degradê amarelo e um círculo roxo decorativo no canto inferior direito
// (cartão do pet, carteira digital e plano).
export function HighlightCard({ children, testID }: HighlightCardProps) {
  return (
    <LinearGradient
      testID={testID}
      colors={gradient.colors}
      start={gradient.start}
      end={gradient.end}
      style={styles.container}
    >
      <View style={styles.circle} pointerEvents="none" />
      {children}
    </LinearGradient>
  );
}
