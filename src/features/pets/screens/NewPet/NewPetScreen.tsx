import { Text, View } from 'react-native';
import { Button } from '@/shared/components/Button';
import { Logo } from '@/shared/components/Logo';
import { Screen } from '@/shared/components/Screen';
import { TextField } from '@/shared/components/TextField';
import { SpeciesPicker } from './SpeciesPicker';
import { useNewPetForm } from './useNewPetForm';
import { styles } from './NewPetScreen.styles';

// Tela Novo pet: aparece depois do login só para quem ainda não tem pet. Guarda o pet no estado global
// (em memória); ao salvar, o app segue sozinho para o Início.
export function NewPetScreen() {
  const form = useNewPetForm();

  return (
    <Screen variant="yellow" keyboardAware>
      <View style={styles.header}>
        <Logo size="lg" />
        <Text accessibilityRole="header" style={styles.title}>
          Quem é o seu companheiro?
        </Text>
        <Text style={styles.subtitle}>Escolha a espécie e o nome do pet.</Text>
      </View>

      <View style={styles.spacer} />

      <View style={styles.form}>
        <SpeciesPicker value={form.species} onChange={form.setSpecies} />
        <TextField
          testID="new-pet-name"
          label="Nome do pet"
          value={form.name}
          onChangeText={form.setName}
          error={form.error}
          autoCapitalize="words"
          returnKeyType="done"
          onSubmitEditing={form.submit}
          editable={!form.loading}
        />
        <Button testID="new-pet-submit" label="Continuar" onPress={form.submit} loading={form.loading} />
      </View>
    </Screen>
  );
}
