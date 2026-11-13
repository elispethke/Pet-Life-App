import { Pressable, Text, View } from 'react-native';
import { BackButton, Chip, Screen } from '@/shared/components';
import { CameraFrame } from './CameraFrame';
import { styles } from './ScanCardScreen.styles';
import { useScanCard } from './useScanCard';

// Escanear carteirinha: moldura guia, botão de captura e galeria. A câmera é simulada nesta fase.
export function ScanCardScreen() {
  const { capture, pickFromGallery, goBack } = useScanCard();

  return (
    <Screen variant="yellow">
      <BackButton onPress={goBack} />
      <View style={styles.header}>
        <Text accessibilityRole="header" style={styles.title}>
          Carteirinha de vacina
        </Text>
        <Chip label="1 de 3" variant="info" />
      </View>
      <Text style={styles.guide}>Enquadre a página inteira, com boa luz e sem reflexo.</Text>

      <CameraFrame />

      <View style={styles.footer}>
        <Pressable
          testID="scan-capture"
          accessibilityRole="button"
          accessibilityLabel="Tirar foto"
          onPress={capture}
          style={styles.shutter}
        />
        <Pressable testID="scan-gallery" accessibilityRole="button" onPress={pickFromGallery}>
          <Text style={styles.gallery}>Escolher da galeria</Text>
        </Pressable>
      </View>
    </Screen>
  );
}
