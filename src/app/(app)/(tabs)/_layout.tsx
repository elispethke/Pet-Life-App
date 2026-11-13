import { Tabs, useRouter } from 'expo-router';
import { useFeatureGate } from '@/features/plan';
import { TabBar } from '@/shared/components';

// Abas do app logado. O botão central da barra abre /scan-card pelo useFeatureGate.
export default function TabsLayout() {
  const router = useRouter();
  const canUse = useFeatureGate();

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{ headerShown: false }}
      tabBar={({ state, navigateToTab }) => (
        <TabBar
          activeKey={state.routes[state.index]?.name}
          onPressTab={(key) => {
            if (key === 'routine' && !canUse('routine')) return;
            const route = state.routes.find((item) => item.name === key);
            if (route) navigateToTab(route.key);
          }}
          onPressScan={() => {
            if (canUse('scan')) router.push('/scan-card');
          }}
        />
      )}
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
