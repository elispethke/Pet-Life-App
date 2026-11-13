import { Text, View } from 'react-native';
import { styles } from './NutrientBar.styles';

type NutrientBarProps = {
  label: string;
  percent: number;
};

// Barra de um nutriente. O comprimento é só ilustrativo: percentual da ração sobre um máximo de 40%.
const MAX_PERCENT = 40;

export function NutrientBar({ label, percent }: NutrientBarProps) {
  const fillPercent = Math.min(100, (percent / MAX_PERCENT) * 100);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{percent}%</Text>
      </View>
      <View style={styles.track}>
        <View style={[styles.fill, styles.fillWidth(fillPercent)]} />
      </View>
    </View>
  );
}
