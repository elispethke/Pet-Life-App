import { Stack } from 'expo-router';
import { usePets } from '@/providers';

// Grupo (app): telas de quem já entrou. Sem pet cadastrado só existe "Novo pet"; com pet, todo o resto
// (abas, escanear, rotina etc.). Cada grupo diz para onde ir quando está bloqueado: sem pet -> Novo pet;
// com pet (inclusive logo depois de salvar o pet) -> Início.
export default function AppLayout() {
  const { pet } = usePets();
  const hasPet = pet !== undefined;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={!hasPet} redirectTo="/home">
        <Stack.Screen name="new-pet" />
      </Stack.Protected>
      <Stack.Protected guard={hasPet} redirectTo="/new-pet">
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="feature-locked" options={{ presentation: 'transparentModal', animation: 'fade' }} />
      </Stack.Protected>
    </Stack>
  );
}
