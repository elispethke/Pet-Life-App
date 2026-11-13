import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Icon } from '@/shared/components';
import { colors } from '@/shared/theme';
import { styles } from './FeatureLockedScreen.styles';
import { useFeatureLocked } from './useFeatureLocked';

// Folha que sobe de baixo quando o tutor toca em um recurso do plano anual sem ter o plano.
// É aberta como "modal transparente" por cima da tela atual (que aparece escurecida atrás).
export function FeatureLockedScreen() {
  const { text, seePlan, dismiss } = useFeatureLocked();

  return (
    <View style={styles.overlay}>
      <Pressable
        testID="locked-dismiss-area"
        accessibilityLabel="Fechar"
        onPress={dismiss}
        style={styles.overlay}
      />
      <SafeAreaView edges={['bottom']} style={styles.sheet}>
        <View style={styles.lockBadge}>
          <Icon name="lock" size={26} color={colors.grape} />
        </View>
        <Text accessibilityRole="header" style={styles.title}>
          Recurso do plano anual
        </Text>
        <Text style={styles.text}>{text}</Text>
        <View style={styles.actions}>
          <View style={styles.primary}>
            <Button testID="locked-see-plan" label="Ver o plano" onPress={seePlan} />
          </View>
          <Button testID="locked-dismiss" label="Agora não" variant="link" onPress={dismiss} />
        </View>
      </SafeAreaView>
    </View>
  );
}
