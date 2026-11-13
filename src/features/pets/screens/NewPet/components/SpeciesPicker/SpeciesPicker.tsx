import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';
import { colors } from '@/shared/theme';
import type { Species } from '@/features/pets/types';
import { styles } from './SpeciesPicker.styles';

type SpeciesPickerProps = {
  value: Species;
  onChange: (species: Species) => void;
};

const OPTIONS: { species: Species; label: string }[] = [
  { species: 'dog', label: 'Cachorro' },
  { species: 'cat', label: 'Gato' },
];

function PawIcon({ color }: { color: string }) {
  return (
    <Svg width={26} height={26} viewBox="0 0 24 24" fill={color}>
      <Circle cx={5.5} cy={10.5} r={2.2} />
      <Circle cx={9.5} cy={5.8} r={2.2} />
      <Circle cx={14.5} cy={5.8} r={2.2} />
      <Circle cx={18.5} cy={10.5} r={2.2} />
      <Path d="M12 11c-3 0-6 3.2-6 6 0 1.8 1.4 2.5 3 2.5 1.2 0 2-.5 3-.5s1.8.5 3 .5c1.6 0 3-.7 3-2.5 0-2.8-3-6-6-6z" />
    </Svg>
  );
}

// Escolha entre Cachorro e Gato (uma opção sempre selecionada).
export function SpeciesPicker({ value, onChange }: SpeciesPickerProps) {
  return (
    <View style={styles.row} accessibilityRole="radiogroup">
      {OPTIONS.map(({ species, label }) => {
        const selected = species === value;
        const variant = selected ? 'selected' : 'unselected';
        return (
          <Pressable
            key={species}
            testID={`species-${species}`}
            accessibilityRole="radio"
            accessibilityState={{ checked: selected }}
            accessibilityLabel={label}
            onPress={() => onChange(species)}
            style={[styles.tile, styles.variant.tile[variant]]}
          >
            <PawIcon color={selected ? colors.white : colors.deepPurple} />
            <Text style={[styles.label, styles.variant.label[variant]]}>{label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
