import { Text, View } from 'react-native';
import { BackButton, Card, Chip, Screen, SegmentedControl } from '@/shared/components';
import { styles } from './VaccineListScreen.styles';
import { useVaccineList } from './useVaccineList';

const TABS = [
  { value: 'vaccines', label: 'Vacinas' },
  { value: 'dewormer', label: 'Vermífugo' },
  { value: 'visits', label: 'Consultas' },
] as const;

// Vacinas e lembretes: lista por segmento, com o status de cada item (dados simulados).
export function VaccineListScreen() {
  const { petName, tab, setTab, records, remindersOn, toggleReminders, goBack } = useVaccineList();

  return (
    <Screen scroll>
      <View style={styles.content}>
        <BackButton onPress={goBack} />
        <Text accessibilityRole="header" style={styles.title}>
          Saúde do {petName}
        </Text>
        <SegmentedControl options={[...TABS]} value={tab} onChange={setTab} />

        {records.map((record) => (
          <Card key={record.id} testID={`health-${record.id}`}>
            <View style={styles.row}>
              <View style={styles.rowText}>
                <Text style={styles.name}>{record.name}</Text>
                <Text style={styles.detail}>{record.detail}</Text>
              </View>
              <Chip label={record.info.label} variant={record.chipVariant} />
            </View>
          </Card>
        ))}
        {records.length === 0 ? <Text style={styles.empty}>Nada registrado por aqui ainda.</Text> : null}

        <Card testID="health-reminder-setting" onPress={toggleReminders}>
          <View style={styles.row}>
            <View style={styles.rowText}>
              <Text style={styles.name}>Avisar 7 dias antes</Text>
              <Text style={styles.detail}>Notificação às 9h</Text>
            </View>
            <Chip label={remindersOn ? 'ligado' : 'desligado'} variant={remindersOn ? 'info' : 'neutral'} />
          </View>
        </Card>
      </View>
    </Screen>
  );
}
