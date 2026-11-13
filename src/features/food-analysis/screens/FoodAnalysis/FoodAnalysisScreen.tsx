import { Text, View } from 'react-native';
import { Button, Card, Chip, Icon, Screen } from '@/shared/components';
import { colors } from '@/shared/theme';
import { NutrientBar } from './NutrientBar';
import { styles } from './FoodAnalysisScreen.styles';
import { useFoodAnalysis } from './useFoodAnalysis';

// Análise da ração: produto lido, porção diária e composição (dados simulados).
export function FoodAnalysisScreen() {
  const { petName, product, portion, details, stage } = useFoodAnalysis();

  return (
    <Screen scroll withTabBar>
      <View style={styles.content}>
        <View style={styles.productRow}>
          <View style={styles.productIcon}>
            <Icon name="scan" color={colors.grape} />
          </View>
          <View style={styles.productText}>
            <Text accessibilityRole="header" style={styles.productName}>
              {product?.name}
            </Text>
            <Text style={styles.productInfo}>{product?.info}</Text>
          </View>
        </View>

        <Card testID="food-portion">
          <View style={styles.portionCard}>
            <Text style={styles.portionLabel}>Porção diária para o {petName}</Text>
            <Text style={styles.portionValue}>{portion ? `≈ ${portion.displayGramsPerDay} g` : ''}</Text>
            <Text style={styles.portionDetails}>{details}</Text>
          </View>
        </Card>

        <Card>
          <View style={styles.nutrients}>
            {product?.nutrients.map((nutrient) => (
              <NutrientBar key={nutrient.id} label={nutrient.label} percent={nutrient.percent} />
            ))}
          </View>
        </Card>

        <View style={styles.chips}>
          <Chip label={`1º ingrediente: ${product?.firstIngredient ?? ''}`} variant="ok" />
          <Chip label={`Fase: ${stage}`} variant="info" />
        </View>
        <Text style={styles.disclaimer}>Orientação geral. Converse com o veterinário do {petName}.</Text>
      </View>

      <View style={styles.footer}>
        <Button testID="food-buy" label="Onde comprar" />
      </View>
    </Screen>
  );
}
