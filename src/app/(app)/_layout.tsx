import { Stack } from 'expo-router';

// Grupo (app): telas de quem já entrou. As abas ficam em (tabs); as demais telas abrem por cima delas.
// /routine-new e /feature-locked são modais.
export default function AppLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="new-pet" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="scan-card" />
      <Stack.Screen name="review-scan" />
      <Stack.Screen name="vaccines" />
      <Stack.Screen name="food-analysis" />
      <Stack.Screen name="routine-new" options={{ presentation: 'modal' }} />
      <Stack.Screen name="feature-locked" options={{ presentation: 'transparentModal', animation: 'fade' }} />
    </Stack>
  );
}
