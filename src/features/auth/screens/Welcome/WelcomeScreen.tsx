import { useRouter } from 'expo-router';
import { Text, View } from 'react-native';
import { Button } from '@/shared/components/Button';
import { Logo } from '@/shared/components/Logo';
import { PetIllustration } from '@/shared/components/PetIllustration';
import { Screen } from '@/shared/components/Screen';
import { styles } from './WelcomeScreen.styles';

// Tela de Abertura: primeira tela do app. A tela só compõe componentes; não tem regra de negócio.
export function WelcomeScreen() {
  const router = useRouter();

  return (
    <Screen variant="yellow">
      <View style={styles.header}>
        <Logo size="lg" />
      </View>

      <View style={styles.hero}>
        <PetIllustration />
        <Text style={styles.title}>A carteirinha do seu pet, sempre no bolso.</Text>
        <Text style={styles.subtitle}>Vacinas, lembretes e rotina em um só lugar.</Text>
      </View>

      <Button testID="welcome-continue" label="Continuar" onPress={() => router.push('/login')} />
    </Screen>
  );
}
