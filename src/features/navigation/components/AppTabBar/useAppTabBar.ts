import { useRouter } from 'expo-router';
import { useFeatureGate } from '@/features/plan';

export type TabKey = 'home' | 'wallet' | 'routine' | 'plan';

// Lógica da barra inferior: qual aba está ativa e o que acontece ao tocar em cada item.
// Rotina e Escanear são recursos do plano: sem plano, o toque abre o aviso "Recurso bloqueado".
export function useAppTabBar(activeRouteName: string, navigate: (key: TabKey) => void) {
  const router = useRouter();
  const canUse = useFeatureGate();

  // "Vacinas e lembretes" pertence à aba Carteira.
  const activeKey: string = activeRouteName === 'vaccines' ? 'wallet' : activeRouteName;

  const pressTab = (key: TabKey) => {
    if (key === 'routine' && !canUse('routine')) return;
    navigate(key);
  };

  const pressScan = () => {
    if (canUse('scan')) {
      router.push('/scan-card');
    }
  };

  return { activeKey, pressTab, pressScan };
}
