import { View } from 'react-native';
import { styles } from './CameraFrame.styles';

const LINES = ['full', 'medium', 'full', 'long', 'full', 'short'] as const;
const CORNERS = ['topLeft', 'topRight', 'bottomLeft', 'bottomRight'] as const;

// Moldura da câmera com os quatro cantos roxos e linhas que lembram a carteirinha de papel.
export function CameraFrame() {
  return (
    <View testID="camera-frame" style={styles.frame} accessibilityLabel="Moldura da câmera">
      {LINES.map((width, index) => (
        <View key={index} style={[styles.line, styles.lineWidth[width]]} />
      ))}
      {CORNERS.map((position) => (
        <View key={position} style={[styles.corner, styles.cornerPosition[position]]} pointerEvents="none" />
      ))}
    </View>
  );
}
