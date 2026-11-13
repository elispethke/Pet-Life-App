import { Text, View } from 'react-native';
import { BackButton, Button, Screen, SegmentedControl, TextField } from '@/shared/components';
import { styles } from './NewRoutineItemScreen.styles';
import { useNewRoutineItem } from './useNewRoutineItem';

const KINDS = [
  { value: 'meal', label: 'Comida' },
  { value: 'walk', label: 'Passeio' },
] as const;

// Formulário "Novo horário": adiciona um item à rotina do dia (em memória).
export function NewRoutineItemScreen() {
  const form = useNewRoutineItem();

  return (
    <Screen keyboardAware>
      <View style={styles.content}>
        <BackButton onPress={form.close} />
        <Text accessibilityRole="header" style={styles.title}>
          Novo horário
        </Text>
        <Text style={styles.subtitle}>Escolha o tipo e o horário.</Text>

        <SegmentedControl options={[...KINDS]} value={form.kind} onChange={form.setKind} />
        <TextField
          testID="routine-time"
          label="Horário"
          value={form.time}
          onChangeText={form.setTime}
          error={form.errors.time}
          keyboardType="numbers-and-punctuation"
          autoCapitalize="none"
          returnKeyType="next"
        />
        <TextField
          testID="routine-amount"
          label={form.amountLabel}
          value={form.amount}
          onChangeText={form.setAmount}
          error={form.errors.amount}
          keyboardType="numeric"
          returnKeyType="done"
          onSubmitEditing={form.submit}
        />
      </View>

      <View style={styles.footer}>
        <Button testID="routine-save" label="Salvar" onPress={form.submit} loading={form.saving} />
      </View>
    </Screen>
  );
}
