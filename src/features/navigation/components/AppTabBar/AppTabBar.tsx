import type { Tabs } from 'expo-router';
import type { ComponentProps } from 'react';
import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/shared/components';
import type { IconName } from '@/shared/components';
import { colors } from '@/shared/theme';
import { styles } from './AppTabBar.styles';
import { useAppTabBar } from './useAppTabBar';
import type { TabKey } from './useAppTabBar';

type TabBarProps = Parameters<NonNullable<ComponentProps<typeof Tabs>['tabBar']>>[0];

const LEFT: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'home', label: 'Início', icon: 'home' },
  { key: 'wallet', label: 'Carteira', icon: 'card' },
];
const RIGHT: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'routine', label: 'Rotina', icon: 'bell' },
  { key: 'plan', label: 'Plano', icon: 'star' },
];

// Barra inferior: Início, Carteira, Escanear (botão central elevado), Rotina e Plano.
export function AppTabBar({ state, navigateToTab }: TabBarProps) {
  const activeRouteName = state.routes[state.index]?.name ?? 'home';
  const { activeKey, pressTab, pressScan } = useAppTabBar(activeRouteName, (key) => {
    const route = state.routes.find((item) => item.name === key);
    if (route) navigateToTab(route.key);
  });

  const renderItem = (item: { key: TabKey; label: string; icon: IconName }) => {
    const active = item.key === activeKey;
    return (
      <Pressable
        key={item.key}
        testID={`tab-${item.key}`}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={item.label}
        onPress={() => pressTab(item.key)}
        style={styles.item}
      >
        <Icon name={item.icon} color={active ? colors.grape : colors.fieldLabel} />
        <Text style={[styles.label, styles.variant.label[active ? 'active' : 'idle']]}>{item.label}</Text>
      </Pressable>
    );
  };

  return (
    <SafeAreaView edges={['bottom']} style={styles.safe}>
      <View style={styles.bar}>
        {LEFT.map(renderItem)}
        <Pressable
          testID="tab-scan"
          accessibilityRole="button"
          accessibilityLabel="Escanear"
          onPress={pressScan}
          style={styles.fab}
        >
          <Icon name="scan" size={26} color={colors.white} />
        </Pressable>
        {RIGHT.map(renderItem)}
      </View>
    </SafeAreaView>
  );
}
