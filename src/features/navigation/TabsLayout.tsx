import { Tabs } from 'expo-router';
import { AppTabBar } from '@/features/navigation/components';

// Navegação por abas do app logado. As telas de cada aba ficam em src/app/(app)/(tabs)/.
// As telas que não são uma aba (vacinas, escanear, revisar, ração e novo horário) ficam escondidas da barra
// (href: null), mas a barra continua visível nelas, então sempre dá para voltar ou trocar de aba.
// `backBehavior="history"` faz o botão voltar do sistema retornar à tela anterior de verdade.
export function TabsLayout() {
  return (
    <Tabs
      backBehavior="history"
      tabBar={(props) => <AppTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" />
      <Tabs.Screen name="wallet" />
      <Tabs.Screen name="routine" />
      <Tabs.Screen name="plan" />
      <Tabs.Screen name="vaccines" options={{ href: null }} />
      <Tabs.Screen name="scan-card" options={{ href: null }} />
      <Tabs.Screen name="review-scan" options={{ href: null }} />
      <Tabs.Screen name="food-analysis" options={{ href: null }} />
      <Tabs.Screen name="routine-new" options={{ href: null }} />
    </Tabs>
  );
}
