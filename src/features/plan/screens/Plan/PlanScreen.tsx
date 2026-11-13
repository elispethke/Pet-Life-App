import { Text, View } from 'react-native';
import { Button, Chip, HighlightCard, Icon, Screen } from '@/shared/components';
import { colors } from '@/shared/theme';
import { styles } from './PlanScreen.styles';
import { usePlanScreen } from './usePlanScreen';

const BENEFITS = [
  'Digitalizar carteirinhas',
  'Lembretes de vacina e rotina',
  'Análise de ração por foto',
  'Pets ilimitados',
];

// Tela Plano: o plano anual de €19. O pagamento é SIMULADO: "Assinar" só liga o estado "com plano".
export function PlanScreen() {
  const { active, statusLabel, subscribe } = usePlanScreen();

  return (
    <Screen withTabBar scroll>
      <View style={styles.content}>
        <View style={styles.header}>
          <View>
            <Text style={styles.kicker}>Seu plano</Text>
            <Text accessibilityRole="header" style={styles.title}>
              PetLife anual
            </Text>
          </View>
          <Chip testID="plan-status" label={statusLabel} variant={active ? 'ok' : 'neutral'} />
        </View>

        <HighlightCard>
          <Text style={styles.cardLabel}>Plano anual</Text>
          <View style={styles.priceRow}>
            <Text style={styles.price}>€19</Text>
            <Text style={styles.period}>/ano</Text>
          </View>
          <Text style={styles.monthly}>cerca de €1,58 por mês</Text>
        </HighlightCard>

        <View style={styles.benefits}>
          {BENEFITS.map((benefit) => (
            <View key={benefit} style={styles.benefit}>
              <Icon name="check" color={colors.grape} />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>

        <View style={styles.spacer} />

        {active ? (
          <Button testID="plan-manage" label="Gerenciar assinatura" />
        ) : (
          <>
            <Button testID="plan-subscribe" label="Assinar por €19" onPress={subscribe} />
            <Text style={styles.note}>Pagamento simulado nesta versão. Cancele quando quiser.</Text>
          </>
        )}
      </View>
    </Screen>
  );
}
