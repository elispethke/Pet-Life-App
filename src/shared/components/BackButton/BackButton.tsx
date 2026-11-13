import { Pressable } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { colors } from '@/shared/theme';
import { styles } from './BackButton.styles';

type BackButtonProps = {
  onPress: () => void;
  testID?: string;
};

// Botão redondo de voltar (seta para a esquerda), usado no topo das telas internas.
export function BackButton({ onPress, testID = 'back-button' }: BackButtonProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel="Voltar"
      onPress={onPress}
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
    >
      <Svg width={22} height={22} viewBox="0 0 24 24" fill="none">
        <Path d="M15 5l-7 7 7 7" stroke={colors.grape} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
      </Svg>
    </Pressable>
  );
}
