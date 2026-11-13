import type { ReactNode } from 'react';
import { Pressable, View } from 'react-native';
import { styles } from './Card.styles';

type CardProps = {
  children: ReactNode;
  // Cartão concluído (por exemplo, item da rotina já feito) fica mais apagado.
  dimmed?: boolean;
  onPress?: () => void;
  testID?: string;
};

// Cartão branco com borda lavanda clara. Se receber `onPress`, vira um botão.
export function Card({ children, dimmed = false, onPress, testID }: CardProps) {
  if (onPress) {
    return (
      <Pressable
        testID={testID}
        accessibilityRole="button"
        onPress={() => {
          onPress();
        }}
        style={({ pressed }) => [styles.container, dimmed && styles.dimmed, pressed && styles.pressed]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View testID={testID} style={[styles.container, dimmed && styles.dimmed]}>
      {children}
    </View>
  );
}
