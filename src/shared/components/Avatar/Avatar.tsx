import { Text, View } from 'react-native';
import { colors } from '@/shared/theme';
import { Icon } from '../Icon';
import { styles } from './Avatar.styles';

type AvatarProps = {
  variant: 'pet' | 'owner';
  size?: 'md' | 'lg';
  // Texto da inicial (só para a tutora).
  initial?: string;
  testID?: string;
};

export function Avatar({ variant, size = 'md', initial = '', testID }: AvatarProps) {
  return (
    <View testID={testID} style={[styles.container, styles.variant[variant], styles.size[size]]}>
      {variant === 'pet' ? (
        <Icon name="paw" size={size === 'lg' ? 32 : 20} color={colors.grape} />
      ) : (
        <Text style={styles.initial}>{initial.slice(0, 1).toUpperCase()}</Text>
      )}
    </View>
  );
}
