import { Text, View } from 'react-native';
import { styles } from './Chip.styles';

export type ChipVariant = 'ok' | 'warn' | 'bad' | 'info' | 'neutral';

type ChipProps = {
  label: string;
  variant?: ChipVariant;
  testID?: string;
};

// Etiqueta em pílula. As cores de status (ok, warn, bad) só servem para estado, nunca para decoração.
export function Chip({ label, variant = 'info', testID }: ChipProps) {
  return (
    <View testID={testID} style={[styles.container, styles.variant.container[variant]]}>
      <Text style={[styles.label, styles.variant.label[variant]]}>{label}</Text>
    </View>
  );
}
