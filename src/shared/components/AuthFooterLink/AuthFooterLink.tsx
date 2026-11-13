import { Pressable, Text } from 'react-native';
import { styles } from './AuthFooterLink.styles';

type AuthFooterLinkProps = {
  prompt: string;
  actionLabel: string;
  onPress: () => void;
  testID: string;
};

// Rodapé das telas de auth: "Não tem conta? Criar conta" / "Já tem conta? Entrar".
export function AuthFooterLink({ prompt, actionLabel, onPress, testID }: AuthFooterLinkProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="link"
      accessibilityLabel={`${prompt} ${actionLabel}`}
      onPress={onPress}
      style={styles.container}
    >
      <Text style={styles.text}>
        {prompt} <Text style={styles.action}>{actionLabel}</Text>
      </Text>
    </Pressable>
  );
}
