import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { AppProviders, useAuth } from '@/providers';
import { fontsToLoad } from '@/shared/theme';

// Segura a tela de abertura do sistema (splash) até as fontes carregarem e a sessão ser restaurada.
// Fica no escopo do módulo, sem await, como manda a documentação.
SplashScreen.preventAutoHideAsync();

function RootNavigator() {
  const [fontsLoaded, fontsError] = useFonts(fontsToLoad);
  const { status } = useAuth();
  const ready = (fontsLoaded || fontsError !== null) && status !== 'loading';

  useEffect(() => {
    if (ready) {
      SplashScreen.hide();
    }
  }, [ready]);

  // ÚNICA proteção por login do app: com sessão só existe o grupo (app); sem sessão só o grupo (auth).
  // Quando o status muda, o Router apaga o histórico do grupo bloqueado e volta para "/" (a rota index),
  // que decide o destino (src/app/index.tsx).
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Protected guard={status === 'signedIn'}>
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={status === 'signedOut'}>
          <Stack.Screen name="(auth)" />
        </Stack.Protected>
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AppProviders>
      <RootNavigator />
    </AppProviders>
  );
}
