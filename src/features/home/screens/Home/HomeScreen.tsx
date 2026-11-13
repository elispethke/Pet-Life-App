import { Text, View } from 'react-native';
import { Avatar, Card, Chip, HighlightCard, Icon, Screen } from '@/shared/components';
import { colors } from '@/shared/theme';
import { ShortcutCard } from './ShortcutCard';
import { styles } from './HomeScreen.styles';
import { useHome } from './useHome';

// Tela Início: saudação, cartão do pet e próximos lembretes (dados simulados).
export function HomeScreen() {
  const { ownerName, pet, reminders, vaccinesSummary, pendingReminders, openHealth, openScan, openFoodAnalysis } =
    useHome();
  const petName = pet?.name ?? '';

  return (
    <Screen withTabBar scroll>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Oi, {ownerName}</Text>
            <Text accessibilityRole="header" style={styles.title}>
              Como está o {petName}?
            </Text>
          </View>
          <Avatar variant="owner" size="lg" initial={ownerName} />
        </View>

        <HighlightCard testID="home-pet-card">
          <View style={styles.petRow}>
            <Avatar variant="pet" size="lg" />
            <View style={styles.petInfo}>
              <Text style={styles.petName}>{petName}</Text>
              <Text style={styles.petDetails}>
                {pet ? `${pet.breed} · ${pet.ageLabel} · ${pet.weightKg} kg` : ''}
              </Text>
            </View>
          </View>
          <View style={styles.chips}>
            <Chip label={vaccinesSummary.label} variant={vaccinesSummary.status} />
            <Chip
              label={pendingReminders === 0 ? 'Sem lembretes' : `${pendingReminders} lembrete${pendingReminders === 1 ? '' : 's'}`}
              variant="info"
            />
          </View>
        </HighlightCard>

        <View style={styles.shortcuts}>
          <ShortcutCard testID="home-scan" label="Escanear carteirinha" icon="scan" variant="primary" onPress={openScan} />
          <ShortcutCard testID="home-food" label="Analisar ração" icon="paw" variant="soft" onPress={openFoodAnalysis} />
        </View>

        <Text accessibilityRole="header" style={styles.sectionTitle}>
          Próximos lembretes
        </Text>
        <View style={styles.reminders}>
          {reminders.map((reminder) => (
            <Card key={reminder.id} testID={`reminder-${reminder.id}`} onPress={openHealth}>
              <View style={styles.reminderRow}>
                <Icon name={reminder.kind === 'dewormer' ? 'bell' : 'shield'} color={colors.grape} />
                <View style={styles.reminderText}>
                  <Text style={styles.reminderTitle}>{reminder.title}</Text>
                  <Text style={styles.reminderDate}>{reminder.dateLabel}</Text>
                </View>
                <Chip label={reminder.statusLabel} variant={reminder.status} />
              </View>
            </Card>
          ))}
        </View>
      </View>
    </Screen>
  );
}
