import { Text, View } from 'react-native';
import { Button, Card, Chip, Screen } from '@/shared/components';
import { styles } from './RoutineScreen.styles';
import { useRoutine } from './useRoutine';

// Rotina do dia: linha do tempo de comida e passeio. Tocar em um cartão marca como feito (ou desfaz).
export function RoutineScreen() {
  const { petName, dateLabel, progressLabel, views, mealGrams, toggle, newItem, openFoodAnalysis } = useRoutine();

  return (
    <Screen withTabBar scroll>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.date}>{dateLabel}</Text>
            <Text accessibilityRole="header" style={styles.title}>
              Rotina do {petName}
            </Text>
          </View>
          <Chip testID="routine-progress" label={progressLabel} variant="info" />
        </View>

        {views.map((item) => (
          <Card key={item.id} testID={`routine-${item.id}`} dimmed={item.done} onPress={() => toggle(item.id)}>
            <View style={styles.row}>
              <Text style={styles.time}>{item.time}</Text>
              <View style={styles.rowText}>
                <Text style={styles.itemTitle}>{item.label}</Text>
                <Text style={styles.itemDetail}>{item.detail}</Text>
              </View>
              <Chip label={item.chipLabel} variant={item.chipVariant} />
            </View>
          </Card>
        ))}

        <Card testID="routine-food-note" onPress={openFoodAnalysis}>
          <Text style={styles.note}>
            Os {mealGrams ?? '…'} g vêm da porção calculada na análise da ração.
          </Text>
        </Card>

        <View style={styles.footer}>
          <Button testID="routine-new" label="Novo horário" onPress={newItem} />
        </View>
      </View>
    </Screen>
  );
}
