import { Pressable, Text } from 'react-native';
import { Icon } from '@/shared/components';
import type { IconName } from '@/shared/components';
import { colors } from '@/shared/theme';
import { styles } from './ShortcutCard.styles';

type ShortcutCardProps = {
  label: string;
  icon: IconName;
  variant: 'primary' | 'soft';
  onPress: () => void;
  testID?: string;
};

// Atalho do Início: cartão com ícone e texto que leva a um recurso do app.
export function ShortcutCard({ label, icon, variant, onPress, testID }: ShortcutCardProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={() => {
        onPress();
      }}
      style={({ pressed }) => [styles.container, styles.variant.container[variant], pressed && styles.pressed]}
    >
      <Icon name={icon} size={26} color={variant === 'primary' ? colors.white : colors.deepPurple} />
      <Text style={[styles.label, styles.variant.label[variant]]}>{label}</Text>
    </Pressable>
  );
}
