import { View } from 'react-native';
import { styles } from './QrPlaceholder.styles';

// Desenho de QR code só ilustrativo (7 x 7). O QR de verdade e o link de compartilhamento chegam na v1.5.
const PATTERN = [
  1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1,
  1, 1, 0, 1, 1, 1, 0,
];

export function QrPlaceholder() {
  return (
    <View style={styles.container} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {PATTERN.map((filled, index) => (
        <View key={index} style={styles.cell}>
          {filled ? <View style={styles.filled} /> : null}
        </View>
      ))}
    </View>
  );
}
