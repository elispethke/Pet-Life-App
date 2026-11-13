import { Text, View } from 'react-native';
import { BackButton } from '@/shared/components/BackButton';
import { styles } from './AuthHeader.styles';

type AuthHeaderProps = {
  title: string;
  subtitle: string;
  onBack: () => void;
};

// Topo das telas Login e Criar conta: botão de voltar, título e subtítulo.
export function AuthHeader({ title, subtitle, onBack }: AuthHeaderProps) {
  return (
    <View style={styles.container}>
      <BackButton onPress={onBack} />
      <Text accessibilityRole="header" style={styles.title}>
        {title}
      </Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}
