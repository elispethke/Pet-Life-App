import { ActivityIndicator, Pressable, Text } from 'react-native';
import { colors } from '@/shared/theme';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';
import { styles } from './Button.styles';

export type ButtonVariant = 'primary' | 'link';

type ButtonProps = {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  loading?: boolean;
  disabled?: boolean;
  // Ícone à esquerda do texto (por exemplo, compartilhar).
  icon?: IconName;
  testID?: string;
};

// Botão principal (pílula roxa) ou de texto/link. Durante `loading` troca o texto por um indicador
// e ignora toques, para não enviar o formulário duas vezes.
export function Button({
  label,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  icon,
  testID,
}: ButtonProps) {
  const blocked = disabled || loading;

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: blocked, busy: loading }}
      disabled={blocked}
      // Não repassa o retorno do handler (pode ser uma promessa) para quem dispara o toque.
      onPress={() => {
        onPress?.();
      }}
      style={({ pressed }) => [
        styles.container,
        styles.variant[variant],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? colors.textOnGrape : colors.grape} />
      ) : (
        <>
          {icon ? <Icon name={icon} color={variant === 'primary' ? colors.textOnGrape : colors.grape} /> : null}
          <Text style={styles.label[variant]}>{label}</Text>
        </>
      )}
    </Pressable>
  );
}
