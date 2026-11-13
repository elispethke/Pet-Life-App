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

  // O Stack fica sempre montado (o Router precisa dele para achar a rota inicial); a splash cobre a espera.
  // Rotas protegidas: com sessão só existe o grupo (app); sem sessão (ou ainda carregando) só o grupo (auth).
  // Quando o status muda, o Router redireciona para o `redirectTo` do grupo bloqueado e apaga o histórico dele:
  // saiu da conta -> Abertura ("/"); entrou -> "/new-pet" (o grupo (app) manda para o Início se já houver pet).
  return (
    <>
      <StatusBar style="dark" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Protected guard={status === 'signedIn'} redirectTo="/">
          <Stack.Screen name="(app)" />
        </Stack.Protected>
        <Stack.Protected guard={status !== 'signedIn'} redirectTo="/new-pet">
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
