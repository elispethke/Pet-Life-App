import { Text, View } from 'react-native';
import { Avatar, Button, Card, Chip, HighlightCard, Screen } from '@/shared/components';
import { QrPlaceholder } from './QrPlaceholder';
import { styles } from './WalletScreen.styles';
import { useWallet } from './useWallet';

// Carteira digital: cartão do pet, vacinas e botão Compartilhar (dados simulados).
export function WalletScreen() {
  const { pet, summary, vaccines, openHealth, share } = useWallet();

  const details = pet
    ? [
        { label: 'Nascimento', value: pet.birthDateLabel },
        { label: 'Peso', value: `${pet.weightKg} kg` },
        { label: 'Sexo', value: pet.sex },
        { label: 'Castrado', value: pet.neuteredLabel },
      ]
    : [];

  return (
    <Screen withTabBar scroll>
      <View style={styles.content}>
        <Text accessibilityRole="header" style={styles.title}>
          Carteira digital
        </Text>

        <HighlightCard testID="digital-card">
          <View style={styles.petRow}>
            <Avatar variant="pet" size="lg" />
            <View>
              <Text style={styles.petName}>{pet?.name}</Text>
              <Text style={styles.petSubtitle}>{pet ? `${pet.speciesLabel} · ${pet.breed}` : ''}</Text>
            </View>
          </View>
          <View style={styles.grid}>
            {details.map((item) => (
              <View key={item.label} style={styles.gridItem}>
                <Text style={styles.gridLabel}>{item.label}</Text>
                <Text style={styles.gridValue}>{item.value}</Text>
              </View>
            ))}
            <View style={styles.gridItemFull}>
              <Text style={styles.gridLabel}>Microchip</Text>
              <Text style={styles.gridValue}>{pet?.microchip}</Text>
            </View>
          </View>
          <View style={styles.footerRow}>
            <Chip label={summary.label} variant={summary.status} />
            <QrPlaceholder />
          </View>
        </HighlightCard>

        {vaccines.map((vaccine) => (
          <Card key={vaccine.id} testID={`wallet-${vaccine.id}`} onPress={openHealth}>
            <View style={styles.vaccineRow}>
              <Text style={styles.vaccineName}>{vaccine.name.replace(' (múltipla)', '')}</Text>
              <Chip
                label={vaccine.info.status === 'ok' ? vaccine.nextDueLabel : vaccine.info.label}
                variant={vaccine.chipVariant}
              />
            </View>
          </Card>
        ))}

        <Button testID="wallet-share" label="Compartilhar" icon="share" onPress={share} />
      </View>
    </Screen>
  );
}
