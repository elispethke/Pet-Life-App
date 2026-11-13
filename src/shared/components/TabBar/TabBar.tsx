import { Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Icon } from '@/shared/components/Icon';
import type { IconName } from '@/shared/components/Icon';
import { colors } from '@/shared/theme';
import { styles } from './TabBar.styles';

export type TabKey = 'home' | 'wallet' | 'routine' | 'plan';

type TabBarProps = {
  // Aba ativa (nome da rota). Qualquer valor fora das quatro abas deixa todas inativas.
  activeKey: string | undefined;
  onPressTab: (key: TabKey) => void;
  onPressScan: () => void;
};

const LEFT: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'home', label: 'Início', icon: 'home' },
  { key: 'wallet', label: 'Carteira', icon: 'card' },
];
const RIGHT: { key: TabKey; label: string; icon: IconName }[] = [
  { key: 'routine', label: 'Rotina', icon: 'bell' },
  { key: 'plan', label: 'Plano', icon: 'star' },
];

// Barra inferior: Início, Carteira, Escanear (botão central elevado), Rotina e Plano.
// Só desenha e avisa os toques; quem decide para onde ir é o layout das abas.
export function TabBar({ activeKey, onPressTab, onPressScan }: TabBarProps) {
  const renderItem = (item: { key: TabKey; label: string; icon: IconName }) => {
    const active = item.key === activeKey;
    return (
      <Pressable
        key={item.key}
        testID={`tab-${item.key}`}
        accessibilityRole="tab"
        accessibilityState={{ selected: active }}
        accessibilityLabel={item.label}
        onPress={() => onPressTab(item.key)}
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
          onPress={onPressScan}
          style={styles.fab}
        >
          <Icon name="scan" size={26} color={colors.white} />
        </Pressable>
        {RIGHT.map(renderItem)}
      </View>
    </SafeAreaView>
  );
}
