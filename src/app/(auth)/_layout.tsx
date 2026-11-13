import { Stack } from 'expo-router';

// Grupo (auth): telas de quem ainda não entrou. O nome entre parênteses não aparece na URL.
export default function AuthLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
