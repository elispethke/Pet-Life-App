import { Pressable, Text, View } from 'react-native';
import { styles } from './SegmentedControl.styles';

type Option<T extends string> = { value: T; label: string };

type SegmentedControlProps<T extends string> = {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
};

// Alternador de segmentos (Vacinas, Vermífugo, Consultas). Só esta tela usa, por isso fica na pasta dela.
export function SegmentedControl<T extends string>({ options, value, onChange }: SegmentedControlProps<T>) {
  return (
    <View style={styles.container} accessibilityRole="tablist">
      {options.map((option) => {
        const selected = option.value === value;
        const variant = selected ? 'selected' : 'idle';
        return (
          <Pressable
            key={option.value}
            testID={`segment-${option.value}`}
            accessibilityRole="tab"
            accessibilityState={{ selected }}
            onPress={() => onChange(option.value)}
            style={[styles.item, styles.variant.item[variant]]}
          >
            <Text style={[styles.label, styles.variant.label[variant]]}>{option.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
